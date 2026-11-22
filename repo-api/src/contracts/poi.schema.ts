import { z } from "zod";

export const createPoiSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  address: z.string().optional(),
  imageUrl: z.union([z.string().url(), z.literal("")]).optional(),
  latitude: z.number(),
  longitude: z.number(),
});

export const poiItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  latitude: z.number(),
  longitude: z.number(),
});

export type CreatePoiInput = z.infer<typeof createPoiSchema>;
