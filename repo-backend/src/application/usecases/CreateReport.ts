import type { CreateReportInput, Report } from "../../domain/entities/Report.js";
import type { IReportRepository } from "../../domain/repositories/IReportRepository.js";

export class CreateReport {
  constructor(private readonly repository: IReportRepository) {}

  async execute(input: CreateReportInput): Promise<Report> {
    return this.repository.create(input);
  }
}
