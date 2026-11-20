import { z } from "zod";

export const neighborhoodInfoResponseSchema = z.object({
  name: z.string(),
  locality: z.string(),
  city: z.string(),
  sectorCatastralId: z.string(),
  areaM2: z.number(),
  perimeterM: z.number(),
  geometry: z.object({ type: z.enum(["Polygon", "MultiPolygon"]), coordinates: z.array(z.any()) }),
  source: z.string(),
});

export type NeighborhoodInfoDto = z.infer<typeof neighborhoodInfoResponseSchema>;
