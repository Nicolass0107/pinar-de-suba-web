import type { GeoJsonGeometry } from "../../domain/entities/NeighborhoodInfo.js";

type LngLat = [number, number];
type GeoMetrics = { areaM2: number; perimeterM: number };
const R = 6378137;

function ringMetrics(ring: LngLat[]) {
  if (ring.length < 3) return { areaM2: 0, perimeterM: 0 };
  let area = 0;
  let perimeterM = 0;
  for (let i = 0, len = ring.length - 1; i < len; i++) {
    const [lon1, lat1] = ring[i];
    const [lon2, lat2] = ring[i + 1];
    const p1 = (lat1 * Math.PI) / 180;
    const p2 = (lat2 * Math.PI) / 180;
    const dl = ((lon2 - lon1) * Math.PI) / 180;
    const dp = ((lat2 - lat1) * Math.PI) / 180;
    area += dl * (2 + Math.sin(p1) + Math.sin(p2));
    const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
    perimeterM += 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  return { areaM2: Math.abs((area * R * R) / 2), perimeterM };
}

function polygonMetrics(coords: unknown): GeoMetrics {
  const rings = (coords as LngLat[][]) || [];
  const outer = ringMetrics(rings[0] || []);
  let holeArea = 0;
  for (let i = 1; i < rings.length; i++) holeArea += ringMetrics(rings[i]).areaM2;
  return { areaM2: Math.max(0, outer.areaM2 - holeArea), perimeterM: outer.perimeterM };
}

export function computeGeoMetrics(geometry?: GeoJsonGeometry): GeoMetrics {
  if (!geometry || !Array.isArray(geometry.coordinates)) return { areaM2: 0, perimeterM: 0 };
  if (geometry.type === "Polygon") return polygonMetrics(geometry.coordinates);
  const polys = (geometry.coordinates as unknown[]) || [];
  return polys.reduce<GeoMetrics>(
    (acc, p) => {
      const m = polygonMetrics(p);
      return { areaM2: acc.areaM2 + m.areaM2, perimeterM: acc.perimeterM + m.perimeterM };
    },
    { areaM2: 0, perimeterM: 0 },
  );
}
