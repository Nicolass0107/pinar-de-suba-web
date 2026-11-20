import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateNews } from "../../../application/usecases/CreateNews.js";
import { GetNewsDetail } from "../../../application/usecases/GetNewsDetail.js";
import { ListNews } from "../../../application/usecases/ListNews.js";

type IdParams = { id: string };
type CreateBody = { title: string; summary: string; content: string; publishedAt?: string };

export class NewsController {
  constructor(
    private readonly listNews: ListNews,
    private readonly detail: GetNewsDetail,
    private readonly createNews: CreateNews,
  ) {}

  list = async (_req: FastifyRequest, reply: FastifyReply) => {
    const items = await this.listNews.execute();
    return reply.send({ items: items.map(({ createdAt, ...rest }) => rest) });
  };

  getById = async (req: FastifyRequest<{ Params: IdParams }>, reply: FastifyReply) => {
    const news = await this.detail.execute(req.params.id);
    if (!news) return reply.code(404).send({ error: "NEWS_NOT_FOUND" });
    const { createdAt, ...rest } = news;
    return reply.send(rest);
  };

  create = async (req: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) => {
    const b = req.body;
    const created = await this.createNews.execute({
      title: b.title,
      summary: b.summary,
      content: b.content,
      publishedAt: b.publishedAt ? new Date(b.publishedAt) : undefined,
    });
    const { createdAt, ...rest } = created;
    return reply.code(201).send(rest);
  };
}
