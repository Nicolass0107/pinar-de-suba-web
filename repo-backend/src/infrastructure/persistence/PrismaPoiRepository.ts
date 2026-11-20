import type { CreatePoiInput, Poi } from "../../domain/entities/Poi.js";
import type { IPoiRepository } from "../../domain/repositories/IPoiRepository.js";
import { prisma } from "./PrismaClient.js";

export class PrismaPoiRepository implements IPoiRepository {
  async list(): Promise<Poi[]> {
    return prisma.pointOfInterest.findMany({ orderBy: { createdAt: "desc" } });
  }

  async create(input: CreatePoiInput): Promise<Poi> {
    return prisma.pointOfInterest.create({
      data: {
        name: input.name,
        category: input.category,
        description: input.description,
        imageUrl: input.imageUrl,
        latitude: input.latitude,
        longitude: input.longitude,
      },
    });
  }
}
