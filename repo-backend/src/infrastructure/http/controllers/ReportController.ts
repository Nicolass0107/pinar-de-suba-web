import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateReport } from "../../../application/usecases/CreateReport.js";

type CreateBody = {
  title: string;
  description: string;
  category: string;
  latitude?: number;
  longitude?: number;
};

export class ReportController {
  constructor(private readonly createReport: CreateReport) {}

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
