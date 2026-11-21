import type { NeighborhoodInfo } from "../../domain/entities/NeighborhoodInfo.js";
import type { INeighborhoodCacheRepository } from "../../domain/repositories/INeighborhoodCacheRepository.js";
import type { INeighborhoodSource } from "../../domain/repositories/INeighborhoodSource.js";

export class GetNeighborhoodInfo {
  constructor(
    private readonly source: INeighborhoodSource,
    private readonly cache: INeighborhoodCacheRepository,
  ) {}

  async execute(): Promise<NeighborhoodInfo> {
    const cached = await this.cache.get();
    if (cached && this.isValid(cached)) return cached;
    try {
      const info = await this.source.getNeighborhoodInfo();
      try { await this.cache.save(info); } catch { /* ignore cache write errors */ }
      return info;
    } catch {
      return cached ?? (await this.source.getNeighborhoodInfo());
    }
  }

  private isValid(info: NeighborhoodInfo): boolean {
    return (
      info.areaM2 > 0 &&
      info.perimeterM > 0 &&
      Array.isArray(info.geometry?.coordinates) &&
      info.geometry.coordinates.length > 0
    );
  }
}

