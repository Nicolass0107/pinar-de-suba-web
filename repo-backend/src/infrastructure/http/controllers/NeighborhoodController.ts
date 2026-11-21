import type { FastifyReply, FastifyRequest } from "fastify";
import { GetNeighborhoodInfo } from "../../../application/usecases/GetNeighborhoodInfo.js";
import { getFallbackInfo } from "../../external/sectorCatastralMapper.js";

export class NeighborhoodController {
  constructor(private readonly getInfo: GetNeighborhoodInfo) {}

  info = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await this.getInfo.execute();
      return reply.code(200).send(data);
    } catch {
      return reply.code(200).send(getFallbackInfo(process.env.PINAR_SUBA_SECTOR_ID));
    }
  };
}
