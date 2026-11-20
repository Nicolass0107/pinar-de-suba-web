import type { NeighborhoodInfo } from "../entities/NeighborhoodInfo.js";

export interface INeighborhoodSource {
  getNeighborhoodInfo(): Promise<NeighborhoodInfo>;
}
