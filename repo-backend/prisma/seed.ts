import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { newsSeed } from "./seeds/news.seed.js";
import { poisSeed } from "./seeds/pois.seed.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.neighborhoodCache.upsert({
    where: { id: "pinar-de-suba" },
    update: {},
    create: {
      id: "pinar-de-suba",
      name: "Pinar de Suba",
      locality: "Suba",
      city: "Bogotá",
      sectorCatastralId: process.env.PINAR_SUBA_SECTOR_ID || "001324",
      areaM2: 216003.1950632638,
      perimeterM: 2636.348918586246,
      geometry: { type: "Polygon", coordinates: [[[-74.0849, 4.5341], [-74.0914, 4.5391], [-74.0849, 4.5328], [-74.0849, 4.5341]]] },
      source: "IDECA / Datos Abiertos Bogotá - Sector Catastral",
    },
  });

  await prisma.report.deleteMany();
  await prisma.pointOfInterest.deleteMany();
  await prisma.news.deleteMany();

  await prisma.news.createMany({ data: newsSeed });
  await prisma.pointOfInterest.createMany({ data: poisSeed });
  await prisma.report.create({
    data: { title: "Iluminación en vía principal", description: "Reporte de luminaria intermitente en acceso al barrio.", category: "Iluminación", status: "OPEN" },
  });
}

main()
  .then(async () => { await prisma.$disconnect(); console.log("Seed completed"); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
