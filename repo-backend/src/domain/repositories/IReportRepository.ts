import type { CreateReportInput, Report } from "../entities/Report.js";

export interface IReportRepository {
  list(): Promise<Report[]>;
  create(input: CreateReportInput): Promise<Report>;
}
