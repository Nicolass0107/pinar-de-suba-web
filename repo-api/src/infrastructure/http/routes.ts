import type { FastifyInstance } from "fastify";
import type { NeighborhoodController } from "./controllers/NeighborhoodController.js";
import type { NewsController } from "./controllers/NewsController.js";
import type { PoiController } from "./controllers/PoiController.js";
import type { ReportController } from "./controllers/ReportController.js";

export interface Controllers {
  neighborhood: NeighborhoodController;
  news: NewsController;
  poi: PoiController;
  report: ReportController;
}

export async function registerRoutes(app: FastifyInstance, c: Controllers) {
  app.get("/api/neighborhood/info", { config: { rateLimit: false } }, c.neighborhood.getInfo);
  app.get("/api/news", c.news.list);
  app.get("/api/news/:id", c.news.getById);
  app.post("/api/news", c.news.create);
  app.get("/api/pois", c.poi.list);
  app.post("/api/pois", c.poi.create);
  app.post("/api/reports", c.report.create);
}
