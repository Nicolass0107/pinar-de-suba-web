import type { FastifyReply, FastifyRequest } from "fastify";
import { GetNeighborhoodInfo } from "../../../application/usecases/GetNeighborhoodInfo.js";

export class NeighborhoodController {
  constructor(private readonly getInfo: GetNeighborhoodInfo) {}

  info = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await this.getInfo.execute();
      return reply.send(data);
    } catch (err) {
      reqLog(_req, err);
      return reply.code(502).send({ error: "UPSTREAM_ERROR" });
    }
  };
}

function reqLog(_req: FastifyRequest, err: unknown) {
  // minimal: keep controller thin; logging delegated to Fastify hooks in future
  void err;
}
