import cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";
import { registerRoutes, type Controllers } from "./routes.js";

export async function buildServer(controllers: Controllers): Promise<FastifyInstance> {
  const app = Fastify({ logger: true });
  await app.register(cors, { origin: true });

  app.get("/health", async () => ({ status: "ok" }));
  await registerRoutes(app, controllers);

  app.setErrorHandler((err, _req, reply) => {
    if ((err as any).validation) {
      return reply.code(400).send({ error: "VALIDATION_ERROR", details: (err as any).validation });
    }
    app.log.error(err);
    return reply.code(500).send({ error: "INTERNAL_ERROR" });
  });

  return app;
}
