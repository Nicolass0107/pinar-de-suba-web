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
  app.get("/neighborhood/info", c.neighborhood.info);
  app.get("/news", c.news.list);
  app.get("/news/:id", c.news.getById);
  app.post("/news", c.news.create);
  app.get("/pois", c.poi.list);
  app.post("/pois", c.poi.create);
  app.get("/reports", c.report.list);
  app.post("/reports", c.report.create);
}
