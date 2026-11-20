import type { NeighborhoodInfo } from "../entities/NeighborhoodInfo.js";

export interface INeighborhoodCacheRepository {
  get(): Promise<NeighborhoodInfo | null>;
  save(info: NeighborhoodInfo): Promise<void>;
}