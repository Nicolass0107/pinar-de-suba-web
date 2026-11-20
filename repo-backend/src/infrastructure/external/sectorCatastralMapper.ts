import type { GeoJsonGeometry, NeighborhoodInfo } from "../../domain/entities/NeighborhoodInfo.js";
import { computeGeoMetrics } from "./geoMetrics.js";

export type RawRecord = Record<string, any>;

export function extractRecords(data: any): RawRecord[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.features)) return data.features;
  return data ? [data] : [];
}

const norm = (v: unknown) => String(v ?? "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

export function pickRecord(records: RawRecord[], sectorId?: string): RawRecord | undefined {
  const sid = norm(sectorId);
  const name = (r: RawRecord) => norm(r.SCANOMBRE ?? r.scanombre ?? r?.properties?.SCANOMBRE ?? r?.properties?.scanombre ?? r.nombre ?? r.barrio);
  const code = (r: RawRecord) => norm(r.SCACODIGO ?? r.scacodigo ?? r?.properties?.SCACODIGO ?? r.sector_catastral ?? r.cod_sector);
  return (
    records.find((r) => sid && code(r) === sid) ||
    records.find((r) => name(r).includes("pinar de suba")) ||
    records.find((r) => name(r) === "el pinar") ||
    records.find((r) => name(r).includes("pinar") && name(r).includes("suba")) ||
    records.find((r) => name(r).includes("pinar")) ||
    records[0]
  );
}

export function toNeighborhoodInfo(r: RawRecord): NeighborhoodInfo {
  const p = r?.properties ? { ...r.properties, geometry: r.geometry ?? r.properties.geometry } : r ?? {};
  const geometry = (p.geometry ?? p.geo_shape ?? p.the_geom ?? p.geoshape) as GeoJsonGeometry | undefined;
  const rawArea = Number(p["SHAPE.AREA"] ?? p.SHAPE_AREA ?? p.shape_area ?? p.st_area_sh ?? p.area_m2 ?? p.area ?? 0);
  const rawLen = Number(p["SHAPE.LEN"] ?? p.SHAPE_LEN ?? p.shape_leng ?? p.st_length_ ?? p.perimetro_m ?? p.perimetro ?? 0);
  const metrics = computeGeoMetrics(geometry);
  const areaM2 = rawArea > 1000 ? rawArea : metrics.areaM2;
  const perimeterM = rawLen > 100 ? rawLen : metrics.perimeterM;
  return {
    name: String(p.SCANOMBRE ?? p.scanombre ?? p.nombre ?? p.barrio ?? "Pinar de Suba"),
    locality: "Suba",
    city: "Bogotá",
    sectorCatastralId: String(p.SCACODIGO ?? p.scacodigo ?? p.sector_catastral ?? p.cod_sector ?? process.env.PINAR_SUBA_SECTOR_ID ?? ""),
    areaM2,
    perimeterM,
    geometry: geometry ?? { type: "Polygon", coordinates: [] },
    source: process.env.BOGOTA_OPEN_DATA_SOURCE ?? "Datos Abiertos Bogotá",
  };
}
