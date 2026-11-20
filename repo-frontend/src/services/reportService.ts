import { httpClient } from "./httpClient";
import type { CreateReportInput } from "../shared/types/contracts";

export const reportService = {
  create(input: CreateReportInput): Promise<unknown> {
    return httpClient.post("/api/reports", input);
  },
};
