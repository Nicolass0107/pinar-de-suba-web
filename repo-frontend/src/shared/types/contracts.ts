export interface Geometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: unknown[];
}

export interface NeighborhoodInfo {
  name: string;
  locality: string;
  city: string;
  sectorCatastralId: string;
  areaM2: number;
  perimeterM: number;
  geometry: Geometry;
  source: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
}

export interface NewsDetail extends NewsItem {
  content: string;
}

export interface CreateNewsInput {
  title: string;
  summary: string;
  content: string;
  publishedAt?: string;
}

export interface Poi {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  imageUrl?: string | null;
  latitude: number;
  longitude: number;
}

export interface CreateReportInput {
  title: string;
  description: string;
  category: string;
  latitude?: number;
  longitude?: number;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  latitude?: number | null;
  longitude?: number | null;
  status: string;
  createdAt: string;
}
