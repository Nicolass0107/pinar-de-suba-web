import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateReport } from "../../../application/usecases/CreateReport.js";
import { ListReports } from "../../../application/usecases/ListReports.js";

type CreateBody = {
  title: string;
  description: string;
  category: string;
  latitude?: number;
  longitude?: number;
};

export class ReportController {
  constructor(
    private readonly createReport: CreateReport,
    private readonly listReports: ListReports,
  ) {}

  list = async (_req: FastifyRequest, reply: FastifyReply) => {
    const items = await this.listReports.execute();
    return reply.send({ items });
  };

  create = async (req: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) => {
    const b = req.body;
    const created = await this.createReport.execute({
      title: b.title,
      description: b.description,
      category: b.category,
      latitude: b.latitude,
      longitude: b.longitude,
    });
    return reply.code(201).send(created);
  };
}
