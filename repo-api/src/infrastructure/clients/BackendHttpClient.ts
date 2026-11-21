import type { CreateNewsInput } from "../../contracts/news.schema.js";
import type { CreatePoiInput } from "../../contracts/poi.schema.js";
import type { CreateReportInput } from "../../contracts/report.schema.js";
import type { BackendResult, IBackendClient } from "../../application/ports/IBackendClient.js";

const RETRY_STATUS = new Set([429, 502, 503]);
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class BackendHttpClient implements IBackendClient {
  constructor(private readonly baseUrl = process.env.BACKEND_URL ?? "http://localhost:3001") {}

  getNeighborhoodInfo() { return this.request("/neighborhood/info"); }
  listNews() { return this.request("/news"); }
  getNewsById(id: string) { return this.request(`/news/${encodeURIComponent(id)}`); }
  createNews(input: CreateNewsInput) { return this.request("/news", "POST", input); }
  listPois() { return this.request("/pois"); }
  createPoi(input: CreatePoiInput) { return this.request("/pois", "POST", input); }
  listReports() { return this.request("/reports"); }
  createReport(input: CreateReportInput) { return this.request("/reports", "POST", input); }

  private async request(path: string, method = "GET", body?: unknown): Promise<BackendResult<unknown>> {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(`${this.baseUrl}${path}`, {
          method,
          headers: body ? { "Content-Type": "application/json" } : undefined,
          body: body ? JSON.stringify(body) : undefined,
        });
        if (RETRY_STATUS.has(res.status) && attempt < 2) { await delay(3000); continue; }
        const data = await res.json().catch(() => ({}));
        return { status: res.status, data };
      } catch {
        if (attempt < 2) { await delay(3000); continue; }
        return { status: 502, data: { error: "UPSTREAM_ERROR" } };
      }
    }
    return { status: 502, data: { error: "UPSTREAM_ERROR" } };
  }
}
