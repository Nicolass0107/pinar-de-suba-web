import type { GeoJsonGeometry } from "../../domain/entities/NeighborhoodInfo.js";

type LngLat = [number, number];
const R = 6378137;

function ringMetrics(ring: LngLat[]) {
  if (ring.length < 3) return { area: 0, perimeter: 0 };
  let area = 0;
  let perimeter = 0;
  for (let i = 0, len = ring.length - 1; i < len; i++) {
    const [lon1, lat1] = ring[i];
    const [lon2, lat2] = ring[i + 1];
    const p1 = (lat1 * Math.PI) / 180;
    const p2 = (lat2 * Math.PI) / 180;
    const dl = ((lon2 - lon1) * Math.PI) / 180;
    const dp = ((lat2 - lat1) * Math.PI) / 180;
    area += dl * (2 + Math.sin(p1) + Math.sin(p2));
    const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
    perimeter += 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  return { area: Math.abs((area * R * R) / 2), perimeter };
}

function polygonMetrics(coords: unknown) {
  const rings = (coords as LngLat[][]) || [];
  const outer = ringMetrics(rings[0] || []);
  let holeArea = 0;
  for (let i = 1; i < rings.length; i++) holeArea += ringMetrics(rings[i]).area;
  return { area: Math.max(0, outer.area - holeArea), perimeter: outer.perimeter };
}

export function computeGeoMetrics(geometry?: GeoJsonGeometry) {
  if (!geometry || !Array.isArray(geometry.coordinates)) return { areaM2: 0, perimeterM: 0 };
  if (geometry.type === "Polygon") return polygonMetrics(geometry.coordinates);
  const polys = (geometry.coordinates as unknown[]) || [];
  return polys.reduce(
    (acc, p) => {
      const m = polygonMetrics(p);
      return { areaM2: acc.areaM2 + m.area, perimeterM: acc.perimeterM + m.perimeter };
    },
    { areaM2: 0, perimeterM: 0 },
  );
}
