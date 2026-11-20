import type { FastifyReply, FastifyRequest } from "fastify";
import { CreatePoi } from "../../../application/usecases/CreatePoi.js";
import { ListPois } from "../../../application/usecases/ListPois.js";

type CreateBody = { name: string; category: string; description?: string; latitude: number; longitude: number };

export class PoiController {
  constructor(private readonly listPois: ListPois, private readonly createPoi: CreatePoi) {}

  list = async (_req: FastifyRequest, reply: FastifyReply) => {
    const items = await this.listPois.execute();
    return reply.send({ items: items.map(({ createdAt, ...rest }) => rest) });
  };

  create = async (req: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) => {
    const b = req.body;
    const created = await this.createPoi.execute({
      name: b.name,
      category: b.category,
      description: b.description,
      latitude: b.latitude,
      longitude: b.longitude,
    });
    const { createdAt, ...rest } = created;
    return reply.code(201).send(rest);
  };
}
