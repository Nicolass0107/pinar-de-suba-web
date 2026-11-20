import type { NeighborhoodInfo } from "../entities/NeighborhoodInfo.js";

export interface INeighborhoodInfoService {
  getInfo(): Promise<NeighborhoodInfo>;
}
