import type { CreateNewsInput } from "../../contracts/news.schema.js";
import type { CreatePoiInput } from "../../contracts/poi.schema.js";
import type { CreateReportInput } from "../../contracts/report.schema.js";

export interface BackendResult<T> {
  status: number;
  data: T;
}

export interface IBackendClient {
  getNeighborhoodInfo(): Promise<BackendResult<unknown>>;
  listNews(): Promise<BackendResult<unknown>>;
  getNewsById(id: string): Promise<BackendResult<unknown>>;
  createNews(input: CreateNewsInput): Promise<BackendResult<unknown>>;
  listPois(): Promise<BackendResult<unknown>>;
  createPoi(input: CreatePoiInput): Promise<BackendResult<unknown>>;
  createReport(input: CreateReportInput): Promise<BackendResult<unknown>>;
}
