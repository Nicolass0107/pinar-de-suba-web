import type { FastifyReply, FastifyRequest } from "fastify";
import type { NeighborhoodService } from "../../../application/services/NeighborhoodService.js";

export class NeighborhoodController {
  constructor(private readonly service: NeighborhoodService) {}

  getInfo = async (_req: FastifyRequest, reply: FastifyReply) => {
    const result = await this.service.getInfo();
    return reply.code(result.status).send(result.data);
  };
}
