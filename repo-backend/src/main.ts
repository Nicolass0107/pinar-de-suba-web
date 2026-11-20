import "dotenv/config";
import { CreateNews } from "./application/usecases/CreateNews.js";
import { CreatePoi } from "./application/usecases/CreatePoi.js";
import { CreateReport } from "./application/usecases/CreateReport.js";
import { GetNeighborhoodInfo } from "./application/usecases/GetNeighborhoodInfo.js";
import { GetNewsDetail } from "./application/usecases/GetNewsDetail.js";
import { ListNews } from "./application/usecases/ListNews.js";
import { ListPois } from "./application/usecases/ListPois.js";
import { BogotaOpenDataAdapter } from "./infrastructure/external/BogotaOpenDataAdapter.js";
import { NeighborhoodController } from "./infrastructure/http/controllers/NeighborhoodController.js";
import { NewsController } from "./infrastructure/http/controllers/NewsController.js";
import { PoiController } from "./infrastructure/http/controllers/PoiController.js";
import { ReportController } from "./infrastructure/http/controllers/ReportController.js";
import { buildServer } from "./infrastructure/http/server.js";
import { PrismaNeighborhoodCacheRepository } from "./infrastructure/persistence/PrismaNeighborhoodCacheRepository.js";
import { PrismaNewsRepository } from "./infrastructure/persistence/PrismaNewsRepository.js";
import { PrismaPoiRepository } from "./infrastructure/persistence/PrismaPoiRepository.js";
import { PrismaReportRepository } from "./infrastructure/persistence/PrismaReportRepository.js";

async function main() {
  const newsRepo = new PrismaNewsRepository();
  const poiRepo = new PrismaPoiRepository();
  const reportRepo = new PrismaReportRepository();
  const cacheRepo = new PrismaNeighborhoodCacheRepository();
  const source = new BogotaOpenDataAdapter();

  const controllers = {
    neighborhood: new NeighborhoodController(new GetNeighborhoodInfo(source, cacheRepo)),
    news: new NewsController(new ListNews(newsRepo), new GetNewsDetail(newsRepo), new CreateNews(newsRepo)),
    poi: new PoiController(new ListPois(poiRepo), new CreatePoi(poiRepo)),
    report: new ReportController(new CreateReport(reportRepo)),
  };

  const app = await buildServer(controllers);
  const port = Number(process.env.PORT) || 3001;
  const host = "0.0.0.0";
  await app.listen({ port, host });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
