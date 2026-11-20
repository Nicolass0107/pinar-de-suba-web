import { httpClient } from "./httpClient";
import type { Poi } from "../shared/types/contracts";

export const poiService = {
  list(): Promise<{ items: Poi[] }> {
    return httpClient.get("/api/pois");
  },
};
