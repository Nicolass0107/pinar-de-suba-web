import type { FastifyReply, FastifyRequest } from "fastify";
import { createNewsSchema, newsIdParamSchema } from "../../../contracts/news.schema.js";
import type { NewsService } from "../../../application/services/NewsService.js";
import { parseOrReply } from "../validate.js";

export class NewsController {
  constructor(private readonly service: NewsService) {}

  list = async (_req: FastifyRequest, reply: FastifyReply) => {
    const result = await this.service.list();
    return reply.code(result.status).send(result.data);
  };

  getById = async (req: FastifyRequest, reply: FastifyReply) => {
    const params = parseOrReply(newsIdParamSchema, req.params, reply);
    if (!params) return;
    const result = await this.service.getById(params.id);
    return reply.code(result.status).send(result.data);
  };

  create = async (req: FastifyRequest, reply: FastifyReply) => {
    const body = parseOrReply(createNewsSchema, req.body, reply);
    if (!body) return;
    const result = await this.service.create(body);
    return reply.code(result.status).send(result.data);
  };
}
