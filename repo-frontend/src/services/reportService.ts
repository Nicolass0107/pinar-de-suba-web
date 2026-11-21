import { httpClient } from "./httpClient";
import type { CreateReportInput, Report } from "../shared/types/contracts";

export const reportService = {
  list(): Promise<{ items: Report[] }> {
    return httpClient.get("/api/reports");
  },
  create(input: CreateReportInput): Promise<Report> {
    return httpClient.post("/api/reports", input);
  },
};
