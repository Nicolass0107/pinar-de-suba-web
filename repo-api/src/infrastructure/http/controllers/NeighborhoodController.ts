import type { FastifyReply, FastifyRequest } from "fastify";
import type { NeighborhoodService } from "../../../application/services/NeighborhoodService.js";

const FALLBACK = {
  name: "El Pinar de Suba",
  locality: "Suba",
  city: "Bogotá",
  sectorCatastralId: "001324",
  areaM2: 216003.195,
  perimeterM: 2636.349,
  geometry: {
    type: "Polygon",
    coordinates: [[[-74.0945, 4.7458], [-74.0945, 4.7535], [-74.0805, 4.7535], [-74.0805, 4.7458], [-74.0945, 4.7458]]],
  },
  source: "IDECA / Datos Abiertos Bogotá - Sector Catastral (respaldo)",
};

export class NeighborhoodController {
  constructor(private readonly service: NeighborhoodService) {}

  getInfo = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await this.service.getInfo();
      if (result.status < 400 && result.data && (result.data as any).geometry) {
        return reply.code(200).send(result.data);
      }
    } catch { /* ignore */ }
    return reply.code(200).send(FALLBACK);
  };
}
