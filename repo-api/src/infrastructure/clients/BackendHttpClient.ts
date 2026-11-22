import type { CreateNewsInput } from "../../contracts/news.schema.js";
import type { CreatePoiInput } from "../../contracts/poi.schema.js";
import type { CreateReportInput } from "../../contracts/report.schema.js";
import type { BackendResult, IBackendClient } from "../../application/ports/IBackendClient.js";

const RETRY_STATUS = new Set([429, 502, 503]);
const TTL_MS = 10 * 60 * 1000;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class BackendHttpClient implements IBackendClient {
  private cache = new Map<string, { at: number; result: BackendResult<unknown> }>();
  constructor(private readonly baseUrl = process.env.BACKEND_URL ?? "http://localhost:3001") {}

  getNeighborhoodInfo() { return this.cached("/neighborhood/info"); }
  listNews() { return this.cached("/news"); }
  getNewsById(id: string) { return this.request(`/news/${encodeURIComponent(id)}`); }
  async createNews(input: CreateNewsInput) { const r = await this.request("/news", "POST", input); this.invalidate("/news"); return r; }
  listPois() { return this.cached("/pois"); }
  async createPoi(input: CreatePoiInput) { const r = await this.request("/pois", "POST", input); this.invalidate("/pois"); return r; }
  listReports() { return this.cached("/reports"); }
  async createReport(input: CreateReportInput) { const r = await this.request("/reports", "POST", input); this.invalidate("/reports"); return r; }

  private invalidate(prefix: string) { for (const k of this.cache.keys()) if (k.startsWith(prefix)) this.cache.delete(k); }
  private async cached(path: string): Promise<BackendResult<unknown>> {
    const hit = this.cache.get(path);
    if (hit && Date.now() - hit.at < TTL_MS) return hit.result;
    const result = await this.request(path);
    if (result.status >= 200 && result.status < 300) this.cache.set(path, { at: Date.now(), result });
    return result;
  }

  private async request(path: string, method = "GET", body?: unknown): Promise<BackendResult<unknown>> {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(`${this.baseUrl}${path}`, { method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
        if (RETRY_STATUS.has(res.status) && attempt < 2) { await delay(3000); continue; }
        const data = await res.json().catch(() => ({}));
        return { status: res.status, data };
      } catch { if (attempt < 2) { await delay(3000); continue; } return { status: 502, data: { error: "UPSTREAM_ERROR" } }; }
    }
    return { status: 502, data: { error: "UPSTREAM_ERROR" } };
  }
}
