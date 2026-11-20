import type { GeoJsonGeometry, NeighborhoodInfo } from "../../domain/entities/NeighborhoodInfo.js";
import { computeGeoMetrics } from "./geoMetrics.js";

export type RawRecord = Record<string, any>;
const norm = (v: unknown) => String(v ?? "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
const FALLBACK: GeoJsonGeometry = { type: "Polygon", coordinates: [[
  [-74.0945, 4.7458], [-74.0945, 4.7535], [-74.0805, 4.7535], [-74.0805, 4.7458], [-74.0945, 4.7458],
]] };

export function extractRecords(data: any): RawRecord[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.features)) return data.features;
  return data ? [data] : [];
}

function propsOf(r: RawRecord) { return r?.properties ? { ...r.properties, geometry: r.geometry ?? r.properties.geometry } : r ?? {}; }
function nameOf(r: RawRecord) { const p = propsOf(r); return norm(p.SCANOMBRE ?? p.scanombre ?? p.nombre ?? p.barrio); }
function codeOf(r: RawRecord) { const p = propsOf(r); return String(p.SCACODIGO ?? p.scacodigo ?? p.sector_catastral ?? p.cod_sector ?? ""); }
function geomOf(r: RawRecord): GeoJsonGeometry | undefined { return propsOf(r).geometry as GeoJsonGeometry | undefined; }

function toPolys(g?: GeoJsonGeometry): unknown[][][] {
  if (!g) return [];
  if (g.type === "Polygon") return [g.coordinates as unknown[][]];
  if (g.type === "MultiPolygon") return (g.coordinates as unknown[][][]) || [];
  return [];
}

function mergeGeoms(gs: (GeoJsonGeometry | undefined)[]): GeoJsonGeometry {
  const polys = gs.flatMap(toPolys);
  if (polys.length === 0) return FALLBACK;
  if (polys.length === 1) return { type: "Polygon", coordinates: polys[0] };
  return { type: "MultiPolygon", coordinates: polys };
}

export function buildPinarInfo(records: RawRecord[], sectorId?: string): NeighborhoodInfo {
  const sid = norm(sectorId);
  const matches = records.filter((r) => nameOf(r).includes("pinar de suba") || (sid && norm(codeOf(r)) === sid));
  const selected = matches.length ? matches : records.filter((r) => nameOf(r).includes("pinar") && nameOf(r).includes("suba"));
  const list = selected.length ? selected : [];
  const geometry = list.length ? mergeGeoms(list.map(geomOf)) : FALLBACK;
  const metrics = computeGeoMetrics(geometry);
  const ids = list.map(codeOf).filter(Boolean).join(", ") || String(sectorId ?? "001324");
  return {
    name: "El Pinar de Suba",
    locality: "Suba",
    city: "Bogotá",
    sectorCatastralId: ids,
    areaM2: metrics.areaM2,
    perimeterM: metrics.perimeterM,
    geometry,
    source: process.env.BOGOTA_OPEN_DATA_SOURCE ?? "IDECA / Datos Abiertos Bogotá - Sector Catastral",
  };
}
