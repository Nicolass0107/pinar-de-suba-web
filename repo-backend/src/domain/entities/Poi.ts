export interface Poi {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  address?: string | null;
  imageUrl?: string | null;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface CreatePoiInput {
  name: string;
  category: string;
  description?: string;
  address?: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
}
