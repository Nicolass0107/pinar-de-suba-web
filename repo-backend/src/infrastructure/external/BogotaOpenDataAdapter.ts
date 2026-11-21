import type { NeighborhoodInfo } from "../../domain/entities/NeighborhoodInfo.js";
import type { INeighborhoodSource } from "../../domain/repositories/INeighborhoodSource.js";
import { buildPinarInfo, extractRecords, getFallbackInfo } from "./sectorCatastralMapper.js";

const IDECA_SECTOR_URL =
  "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/catastro/sectorcatastral/MapServer/0/query" +
  "?where=UPPER(SCANOMBRE)%20LIKE%20%27%25PINAR%20DE%20SUBA%25%27&outFields=*&outSR=4326&f=geojson";

export class BogotaOpenDataAdapter implements INeighborhoodSource {
  constructor(private readonly url = process.env.BOGOTA_OPEN_DATA_URL ?? IDECA_SECTOR_URL) {}

  async getNeighborhoodInfo(): Promise<NeighborhoodInfo> {
    try {
      const res = await fetch(this.url, { headers: { Accept: "application/json, application/geo+json" } });
      if (!res.ok) return getFallbackInfo(process.env.PINAR_SUBA_SECTOR_ID);
      const data = await res.json();
      if (data?.error) return getFallbackInfo(process.env.PINAR_SUBA_SECTOR_ID);
      return buildPinarInfo(extractRecords(data), process.env.PINAR_SUBA_SECTOR_ID);
    } catch {
      return getFallbackInfo(process.env.PINAR_SUBA_SECTOR_ID);
    }
  }
}
