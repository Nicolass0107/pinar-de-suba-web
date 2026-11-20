import type { CreateNewsInput, News } from "../../domain/entities/News.js";
import type { INewsRepository } from "../../domain/repositories/INewsRepository.js";
import { prisma } from "./PrismaClient.js";

export class PrismaNewsRepository implements INewsRepository {
  async list(): Promise<News[]> {
    return prisma.news.findMany({ orderBy: { publishedAt: "desc" } });
  }

  async findById(id: string): Promise<News | null> {
    return prisma.news.findUnique({ where: { id } });
  }

  async create(input: CreateNewsInput): Promise<News> {
    return prisma.news.create({
      data: {
        title: input.title,
        summary: input.summary,
        content: input.content,
        publishedAt: input.publishedAt ?? new Date(),
      },
    });
  }
}
