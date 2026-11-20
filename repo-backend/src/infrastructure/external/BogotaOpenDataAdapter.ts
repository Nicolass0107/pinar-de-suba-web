import type { NeighborhoodInfo } from "../../domain/entities/NeighborhoodInfo.js";
import type { INeighborhoodSource } from "../../domain/repositories/INeighborhoodSource.js";
import { buildPinarInfo, extractRecords } from "./sectorCatastralMapper.js";

const IDECA_SECTOR_URL =
  "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/catastro/sectorcatastral/MapServer/0/query" +
  "?where=UPPER(SCANOMBRE)%20LIKE%20%27%25PINAR%20DE%20SUBA%25%27&outFields=*&outSR=4326&f=geojson";

export class BogotaOpenDataAdapter implements INeighborhoodSource {
  constructor(private readonly url = process.env.BOGOTA_OPEN_DATA_URL ?? IDECA_SECTOR_URL) {}

  async getNeighborhoodInfo(): Promise<NeighborhoodInfo> {
    const res = await fetch(this.url, { headers: { Accept: "application/json, application/geo+json" } });
    if (!res.ok) throw new Error(`Sector Catastral request failed: ${res.status}`);
    const data = await res.json();
    if (data?.error) throw new Error(`Sector Catastral error: ${data.error.message || "unknown"}`);
    return buildPinarInfo(extractRecords(data), process.env.PINAR_SUBA_SECTOR_ID);
  }
}
