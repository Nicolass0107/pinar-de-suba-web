export type GeoJsonGeometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: unknown[];
};

export interface NeighborhoodInfo {
  name: string;
  locality: string;
  city: string;
  sectorCatastralId: string;
  areaM2: number;
  perimeterM: number;
  geometry: GeoJsonGeometry;
  source: string;
}
