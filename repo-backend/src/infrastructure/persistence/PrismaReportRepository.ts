import type { CreateReportInput, Report } from "../../domain/entities/Report.js";
import type { IReportRepository } from "../../domain/repositories/IReportRepository.js";
import { prisma } from "./PrismaClient.js";

export class PrismaReportRepository implements IReportRepository {
  async list(): Promise<Report[]> {
    const rows = await prisma.report.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((r) => ({ ...r, status: r.status as Report["status"] }));
  }

  async create(input: CreateReportInput): Promise<Report> {
    const created = await prisma.report.create({
      data: {
        title: input.title,
        description: input.description,
        category: input.category,
        latitude: input.latitude,
        longitude: input.longitude,
        status: "OPEN",
      },
    });
    return { ...created, status: created.status as Report["status"] };
  }
}
