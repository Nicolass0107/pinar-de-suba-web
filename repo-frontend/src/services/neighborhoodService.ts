import { httpClient } from "./httpClient";
import type { NeighborhoodInfo } from "../shared/types/contracts";

export const neighborhoodService = {
  getInfo(): Promise<NeighborhoodInfo> {
    return httpClient.get<NeighborhoodInfo>("/api/neighborhood/info");
  },
};
