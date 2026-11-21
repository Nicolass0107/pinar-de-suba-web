import type { Report } from "../../domain/entities/Report.js";
import type { IReportRepository } from "../../domain/repositories/IReportRepository.js";

export class ListReports {
  constructor(private readonly repository: IReportRepository) {}

  async execute(): Promise<Report[]> {
    return this.repository.list();
  }
}
