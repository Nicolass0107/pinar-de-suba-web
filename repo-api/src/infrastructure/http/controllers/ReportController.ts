import type { FastifyReply, FastifyRequest } from "fastify";
import { createReportSchema } from "../../../contracts/report.schema.js";
import type { ReportService } from "../../../application/services/ReportService.js";
import { parseOrReply } from "../validate.js";

export class ReportController {
  constructor(private readonly service: ReportService) {}

  create = async (req: FastifyRequest, reply: FastifyReply) => {
    const body = parseOrReply(createReportSchema, req.body, reply);
    if (!body) return;
    const result = await this.service.create(body);
    return reply.code(result.status).send(result.data);
  };
}
