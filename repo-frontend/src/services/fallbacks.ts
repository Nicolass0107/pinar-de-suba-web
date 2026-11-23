import type { NeighborhoodInfo, NewsItem, Poi } from "../shared/types/contracts";

const neighborhood: NeighborhoodInfo = {
  name: "Pinar de Suba", locality: "Suba", city: "Bogotá",
  sectorCatastralId: "009412070030901", areaM2: 216003.1950632638, perimeterM: 2636.348918586246,
  geometry: { type: "Polygon", coordinates: [[[-74.0912,4.7528],[-74.0845,4.7528],[-74.0845,4.7478],[-74.0912,4.7478],[-74.0912,4.7528]]] },
  source: "Respaldo local - Pinar de Suba",
};

const news: { items: NewsItem[] } = { items: [
  { id: "fb-n1", title: "Jornada ambiental en el Humedal Tibabuyes", summary: "Vecinos participaron en limpieza y sensibilización en el humedal Juan Amarillo.", publishedAt: "2026-11-10T12:00:00.000Z" },
  { id: "fb-n2", title: "Frente de seguridad vecinal fortalece la prevención en Pinar de Suba", summary: "Encuentros comunitarios y articulación con cuadrantes para mejorar la convivencia.", publishedAt: "2026-11-08T12:00:00.000Z" },
  { id: "fb-n3", title: "Ajustes de movilidad en la Av. Suba y Calle 145", summary: "Autoridades coordinan medidas para mejorar flujos en el cruce de Av. Suba con Calle 145.", publishedAt: "2026-11-05T12:00:00.000Z" },
  { id: "fb-n4", title: "Agenda cultural en el salón comunal del barrio", summary: "Talleres artísticos y actividades familiares para todas las edades.", publishedAt: "2026-11-01T12:00:00.000Z" },
  { id: "fb-n5", title: "Mejoras en iluminación y espacio público del sector El Pinar", summary: "Priorización comunitaria de puntos para mantenimiento y embellecimiento.", publishedAt: "2026-10-28T12:00:00.000Z" },
  { id: "fb-n6", title: "Intervenciones de malla vial en calles internas del sector", summary: "Mantenimiento de andenes y calzadas para mejorar la movilidad local.", publishedAt: "2026-10-25T12:00:00.000Z" },
  { id: "fb-n7", title: "Encuentro comunitario de vecinos en Pinar de Suba", summary: "Jornada de integración y participación vecinal para fortalecer la comunidad del barrio.", publishedAt: "2026-10-22T12:00:00.000Z" },
]};

const pois: { items: Poi[] } = { items: [
  { id: "fb-p1", name: "Parque Vecinal El Pinar de Suba", category: "Parque", description: "Parque vecinal con zonas verdes, juegos y espacios para recreación y encuentro comunitario.", address: "Kr. 94 # 150-20, El Pinar de Suba, Suba, Bogotá", latitude: 4.7498, longitude: -74.0882 },
  { id: "fb-p2", name: "Colegio Distrital El Pinar de Suba (IED)", category: "Educación", description: "Institución educativa distrital que atiende a niños y jóvenes del barrio con formación básica y media.", address: "Cl. 151C # 92-35, El Pinar de Suba, Suba, Bogotá", latitude: 4.7506, longitude: -74.0870 },
  { id: "fb-p3", name: "Salón Comunal JAC El Pinar de Suba", category: "Comunidad", description: "Espacio comunitario para reuniones vecinales, actividades sociales y gestión de la JAC del barrio.", address: "Kr. 95 # 150-45, El Pinar de Suba, Suba, Bogotá", latitude: 4.7495, longitude: -74.0892 },
  { id: "fb-p4", name: "Eje Comercial Calle 151 - Pinar de Suba", category: "Comercio", description: "Tramo comercial del barrio con tiendas de barrio, servicios y dinámica local sobre la Calle 151.", address: "Cl. 151 con Kr. 95, El Pinar de Suba, Suba, Bogotá", latitude: 4.7503, longitude: -74.0895 },
  { id: "fb-p5", name: "Paradero Alimentador 11-4 Pinar de Suba", category: "Transporte", description: "Punto de conexión con rutas alimentadoras del sistema TransMilenio/SITP para el barrio.", address: "Kr. 92 con Cl. 151, El Pinar de Suba, Suba, Bogotá", latitude: 4.7492, longitude: -74.0865 },
  { id: "fb-p6", name: "Parque Lineal y Zona Verde Calle 148", category: "Parque", description: "Franja verde y sendero peatonal para caminatas, descanso y actividad física en el barrio.", address: "Cl. 148 con Kr. 96, El Pinar de Suba, Suba, Bogotá", latitude: 4.7482, longitude: -74.0905 },
]};

export function fallbackFor<T>(path: string): T | undefined {
  if (path === "/api/neighborhood/info") return neighborhood as T;
  if (path === "/api/news") return news as T;
  if (path === "/api/pois") return pois as T;
  if (path === "/api/reports") return { items: [] } as T;
  return undefined;
}
