import { z } from "zod";

export const newsIdParamSchema = z.object({
  id: z.string().min(1),
});

export const createNewsSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  content: z.string().min(1),
  publishedAt: z.string().datetime().optional(),
});

export const newsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string().optional(),
  publishedAt: z.string(),
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type NewsIdParam = z.infer<typeof newsIdParamSchema>;
