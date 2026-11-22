import type { NeighborhoodInfo } from "../shared/types/contracts";

const neighborhood: NeighborhoodInfo = {
  name: "Pinar de Suba", locality: "Suba", city: "Bogotá",
  sectorCatastralId: "009412070030901", areaM2: 216003.1950632638, perimeterM: 2636.348918586246,
  geometry: { type: "Polygon", coordinates: [[[-74.0912,4.7528],[-74.0845,4.7528],[-74.0845,4.7478],[-74.0912,4.7478],[-74.0912,4.7528]]] },
  source: "Respaldo local - Pinar de Suba",
};

export function fallbackFor<T>(path: string): T | undefined {
  if (path === "/api/neighborhood/info") return neighborhood as T;
  if (path === "/api/news" || path === "/api/pois" || path === "/api/reports") return { items: [] } as T;
  return undefined;
}
