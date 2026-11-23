import { fallbackFor } from "./fallbacks";

const BASE_URL = import.meta.env.VITE_API_URL;
const cache = new Map<string, { at: number; data: unknown }>();
const inflight = new Map<string, Promise<unknown>>();
const TTL_MS = 5 * 60 * 1000;
const GET_TIMEOUT_MS = 45000;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const lsKey = (p: string) => `cache:${p}`;

function readLS<T>(path: string): T | undefined {
  try { const raw = localStorage.getItem(lsKey(path)); return raw ? (JSON.parse(raw) as T) : undefined; } catch { return undefined; }
}
function writeLS(path: string, data: unknown) {
  try { localStorage.setItem(lsKey(path), JSON.stringify(data)); } catch { /* ignore quota */ }
}

async function fetchOnce<T>(path: string, options: RequestInit, timeoutMs: number): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options, signal: ctrl.signal,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error((data as { error?: string }).error || "REQUEST_ERROR") as Error & { status?: number };
      err.status = res.status;
      throw err;
    }
    return data as T;
  } finally { clearTimeout(timer); }
}

async function fetchWithRetry<T>(path: string, options: RequestInit, timeoutMs = 15000): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try { return await fetchOnce<T>(path, options, timeoutMs); }
    catch (err) {
      lastErr = err;
      const status = (err as { status?: number }).status;
      if (status && status < 500 && status !== 429) throw err;
      if (attempt < 2) { await delay(2000); continue; }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("REQUEST_ERROR");
}

async function get<T>(path: string): Promise<T> {
  const hit = cache.get(path);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data as T;
  const pending = inflight.get(path);
  if (pending) return pending as Promise<T>;
  const p = fetchWithRetry<T>(path, {}, GET_TIMEOUT_MS)
    .then((data) => { cache.set(path, { at: Date.now(), data }); writeLS(path, data); return data; })
    .catch(() => { const ls = readLS<T>(path); if (ls !== undefined) return ls; const fb = fallbackFor<T>(path); if (fb !== undefined) return fb; throw new Error("REQUEST_ERROR"); })
    .finally(() => inflight.delete(path));
  inflight.set(path, p);
  return p;
}

export const httpClient = {
  get: <T>(path: string) => get<T>(path),
  post: <T>(path: string, body: unknown) => fetchWithRetry<T>(path, { method: "POST", body: JSON.stringify(body) }),
};
