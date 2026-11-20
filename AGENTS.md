# AGENTS.md - Portal Barrio Pinar de Suba (Bogotá)
Arquitectura en 3 repos TypeScript. SOLID estricto (interfaces para repositorios y fuentes externas). Máx 100 líneas/archivo.

## Estructura de carpetas
### repo-backend (Node.js + Fastify + PostgreSQL/Prisma + Datos Abiertos)
```text
repo-backend/
  prisma/schema.prisma
  src/
    domain/entities/{News,Poi,Report,NeighborhoodInfo}.ts
    domain/repositories/{INewsRepository,IPoiRepository,IReportRepository,INeighborhoodSource}.ts
    application/usecases/{GetNeighborhoodInfo,ListNews,GetNewsDetail,CreateNews,ListPois,CreateReport}.ts
    infrastructure/db/{PrismaClient,PrismaNewsRepository,PrismaPoiRepository,PrismaReportRepository}.ts
    infrastructure/external/BogotaOpenDataAdapter.ts
    infrastructure/http/{server,routes,controllers/*Controller}.ts
    main.ts
  package.json tsconfig.json
```
### repo-api (Node.js + Fastify + Zod, gateway REST)
```text
repo-api/
  src/
    contracts/{neighborhood,news,poi,report}.schema.ts
    application/ports/IBackendClient.ts
    application/services/{NeighborhoodService,NewsService,PoiService,ReportService}.ts
    infrastructure/http/{BackendHttpClient,routes,controllers/*Controller,server}.ts
    main.ts
  package.json tsconfig.json
```
### repo-frontend (React + Vite + Tailwind + Leaflet)
```text
repo-frontend/
  src/
    app/{App,router}.tsx
    features/neighborhood/{NeighborhoodPage,NeighborhoodMap,useNeighborhood}.ts(x)
    features/news/{NewsListPage,NewsDetailPage,NewsForm,useNews}.ts(x)
    features/poi/{PoiPage,usePois}.ts(x)
    features/reports/{ReportFormPage,useReports}.ts(x)
    shared/{api/httpClient.ts,components/*,types/contracts.ts}
    main.tsx index.css
  index.html package.json tsconfig.json vite.config.ts tailwind.config.ts
```

## Esquema Prisma (PostgreSQL) - repo-backend/prisma/schema.prisma
```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

model News {
  id          String   @id @default(uuid())
  title       String
  summary     String
  content     String
  publishedAt DateTime @default(now())
  createdAt   DateTime @default(now())
}
model PointOfInterest {
  id          String   @id @default(uuid())
  name        String
  category    String
  description String?
  latitude    Float
  longitude   Float
  createdAt   DateTime @default(now())
}
model Report {
  id          String   @id @default(uuid())
  title       String
  description String
  category    String
  latitude    Float?
  longitude   Float?
  status      String   @default("OPEN")
  createdAt   DateTime @default(now())
}
```

## Contratos JSON entre capas
`repo-frontend <-> repo-api` (REST público, validado con Zod en repo-api). `repo-api <-> repo-backend` (HTTP interno, mismos recursos).
```json
{
  "CU-01 GET /neighborhood/info": {
    "200": { "name": "Pinar de Suba", "locality": "Suba", "city": "Bogotá",
      "sectorCatastralId": "string", "areaM2": 0, "perimeterM": 0,
      "geometry": { "type": "Polygon|MultiPolygon", "coordinates": [] }, "source": "Datos Abiertos Bogotá" }
  },
  "CU-02 GET /news": { "200": { "items": [{ "id":"uuid","title":"","summary":"","publishedAt":"ISO8601" }] } },
  "CU-03 GET /news/:id": { "200": { "id":"uuid","title":"","summary":"","content":"","publishedAt":"ISO8601" }, "404": { "error":"NEWS_NOT_FOUND" } },
  "CU-04 POST /news": {
    "req": { "title":"string","summary":"string","content":"string","publishedAt?":"ISO8601" },
    "201": { "id":"uuid","title":"","summary":"","content":"","publishedAt":"ISO8601" }
  },
  "CU-05 GET /pois": { "200": { "items": [{ "id":"uuid","name":"","category":"","description?":"","latitude":0,"longitude":0 }] } },
  "CU-06 POST /reports": {
    "req": { "title":"string","description":"string","category":"string","latitude?":0,"longitude?":0 },
    "201": { "id":"uuid","title":"","description":"","category":"","status":"OPEN","createdAt":"ISO8601" }
  },
  "errors": { "400": { "error":"VALIDATION_ERROR","details":[] }, "502": { "error":"UPSTREAM_ERROR" } }
}
```