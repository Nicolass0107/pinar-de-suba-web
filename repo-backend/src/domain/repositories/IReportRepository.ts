import type { CreateReportInput, Report } from "../entities/Report.js";

export interface IReportRepository {
  create(input: CreateReportInput): Promise<Report>;
}
