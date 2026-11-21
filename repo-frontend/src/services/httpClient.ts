const BASE_URL = import.meta.env.VITE_API_URL;
const cache = new Map<string, { at: number; data: unknown }>();
const TTL_MS = 5 * 60 * 1000;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method || "GET").toUpperCase();
  if (method === "GET") {
    const hit = cache.get(path);
    if (hit && Date.now() - hit.at < TTL_MS) return hit.data as T;
  }
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 429 && attempt < 2) { await delay(2000); continue; }
        throw new Error((data as { error?: string }).error || "REQUEST_ERROR");
      }
      if (method === "GET") cache.set(path, { at: Date.now(), data });
      return data as T;
    } catch (err) {
      lastErr = err;
      if (attempt < 2) { await delay(2000); continue; }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("REQUEST_ERROR");
}

export const httpClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
};
