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
    const info = await this.source.getNeighborhoodInfo();
    await this.cache.save(info);
    return info;
  }

  private isValid(info: NeighborhoodInfo): boolean {
    return info.areaM2 > 0 && info.perimeterM > 0 && !/seed/i.test(info.source);
  }
}

