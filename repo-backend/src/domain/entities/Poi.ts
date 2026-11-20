export interface Poi {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface CreatePoiInput {
  name: string;
  category: string;
  description?: string;
  latitude: number;
  longitude: number;
}
