import type { FastifyReply, FastifyRequest } from "fastify";
import { createPoiSchema } from "../../../contracts/poi.schema.js";
import type { PoiService } from "../../../application/services/PoiService.js";
import { parseOrReply } from "../validate.js";

export class PoiController {
  constructor(private readonly service: PoiService) {}

  list = async (_req: FastifyRequest, reply: FastifyReply) => {
    const result = await this.service.list();
    return reply.code(result.status).send(result.data);
  };

  create = async (req: FastifyRequest, reply: FastifyReply) => {
    const body = parseOrReply(createPoiSchema, req.body, reply);
    if (!body) return;
    const result = await this.service.create(body);
    return reply.code(result.status).send(result.data);
  };
}
