import type { NeighborhoodInfo } from "../../domain/entities/NeighborhoodInfo.js";
import type { INeighborhoodCacheRepository } from "../../domain/repositories/INeighborhoodCacheRepository.js";
import type { INeighborhoodSource } from "../../domain/repositories/INeighborhoodSource.js";

export class GetNeighborhoodInfo {
  constructor(
    private readonly source: INeighborhoodSource,
    private readonly cache: INeighborhoodCacheRepository,
  ) {}

  async execute(): Promise<NeighborhoodInfo> {
    let cached: NeighborhoodInfo | null = null;
    try { cached = await this.cache.get(); } catch { cached = null; }
    if (cached && this.isValid(cached)) return cached;
    const info = await this.source.getNeighborhoodInfo();
    try { await this.cache.save(info); } catch { /* ignore cache write errors */ }
    return this.isValid(info) ? info : cached ?? info;
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

