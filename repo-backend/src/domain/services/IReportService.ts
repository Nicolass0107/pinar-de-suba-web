import type { CreateReportInput, Report } from "../entities/Report.js";

export interface IReportService {
  create(input: CreateReportInput): Promise<Report>;
}
