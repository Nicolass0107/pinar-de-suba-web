import type { FastifyReply } from "fastify";
import type { ZodSchema } from "zod";

export function parseOrReply<T>(
  schema: ZodSchema<T>,
  data: unknown,
  reply: FastifyReply,
): T | undefined {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  reply.code(400).send({ error: "VALIDATION_ERROR", details: result.error.issues });
  return undefined;
}
