import { fallbackFor } from "./fallbacks";

const BASE_URL = import.meta.env.VITE_API_URL;
const cache = new Map<string, { at: number; data: unknown }>();
const inflight = new Map<string, Promise<unknown>>();
const TTL_MS = 5 * 60 * 1000;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const lsKey = (p: string) => `cache:${p}`;

function readLS<T>(path: string): T | undefined {
  try { const raw = localStorage.getItem(lsKey(path)); return raw ? (JSON.parse(raw) as T) : undefined; } catch { return undefined; }
}
function writeLS(path: string, data: unknown) {
  try { localStorage.setItem(lsKey(path), JSON.stringify(data)); } catch { /* ignore quota */ }
}

async function fetchWithRetry<T>(path: string, options: RequestInit): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 429 && attempt < 2) { await delay(2000); continue; }
        throw new Error((data as { error?: string }).error || "REQUEST_ERROR");
      }
      return data as T;
    } catch (err) { lastErr = err; if (attempt < 2) { await delay(2000); continue; } }
  }
  throw lastErr instanceof Error ? lastErr : new Error("REQUEST_ERROR");
}

async function get<T>(path: string): Promise<T> {
  const hit = cache.get(path);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data as T;
  const pending = inflight.get(path);
  if (pending) return pending as Promise<T>;
  const p = fetchWithRetry<T>(path, {})
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
