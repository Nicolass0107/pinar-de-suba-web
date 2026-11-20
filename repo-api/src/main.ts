import "dotenv/config";
import { NeighborhoodService } from "./application/services/NeighborhoodService.js";
import { NewsService } from "./application/services/NewsService.js";
import { PoiService } from "./application/services/PoiService.js";
import { ReportService } from "./application/services/ReportService.js";
import { BackendHttpClient } from "./infrastructure/clients/BackendHttpClient.js";
import { NeighborhoodController } from "./infrastructure/http/controllers/NeighborhoodController.js";
import { NewsController } from "./infrastructure/http/controllers/NewsController.js";
import { PoiController } from "./infrastructure/http/controllers/PoiController.js";
import { ReportController } from "./infrastructure/http/controllers/ReportController.js";
import { buildServer } from "./infrastructure/http/server.js";

async function main() {
  const backend = new BackendHttpClient();
  const controllers = {
    neighborhood: new NeighborhoodController(new NeighborhoodService(backend)),
    news: new NewsController(new NewsService(backend)),
    poi: new PoiController(new PoiService(backend)),
    report: new ReportController(new ReportService(backend)),
  };

  const app = await buildServer(controllers);
  const port = Number(process.env.PORT) || 4001;
  const host = "0.0.0.0";
  await app.listen({ port, host });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
