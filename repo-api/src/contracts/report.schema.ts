import { z } from "zod";

export const createReportSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const reportSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  status: z.string(),
  createdAt: z.string(),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
