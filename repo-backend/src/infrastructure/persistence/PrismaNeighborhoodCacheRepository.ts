import { Prisma } from "@prisma/client";
import type { NeighborhoodInfo } from "../../domain/entities/NeighborhoodInfo.js";
import type { INeighborhoodCacheRepository } from "../../domain/repositories/INeighborhoodCacheRepository.js";
import { prisma } from "./PrismaClient.js";

export class PrismaNeighborhoodCacheRepository implements INeighborhoodCacheRepository {
  async get(): Promise<NeighborhoodInfo | null> {
    const row = await prisma.neighborhoodCache.findUnique({ where: { id: "pinar-de-suba" } });
    if (!row) return null;
    return {
      name: row.name,
      locality: row.locality,
      city: row.city,
      sectorCatastralId: row.sectorCatastralId,
      areaM2: row.areaM2,
      perimeterM: row.perimeterM,
      geometry: row.geometry as NeighborhoodInfo["geometry"],
      source: row.source,
    };
  }

  async save(info: NeighborhoodInfo): Promise<void> {
    const geometry = info.geometry as unknown as Prisma.InputJsonValue;
    await prisma.neighborhoodCache.upsert({
      where: { id: "pinar-de-suba" },
      update: { ...info, geometry },
      create: { id: "pinar-de-suba", ...info, geometry },
    });
  }
}
