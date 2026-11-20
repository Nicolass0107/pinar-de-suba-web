import type { CreateReportInput } from "../../contracts/report.schema.js";
import type { IBackendClient } from "../ports/IBackendClient.js";

export class ReportService {
  constructor(private readonly backend: IBackendClient) {}

  create(input: CreateReportInput) {
    return this.backend.createReport(input);
  }
}
