import type { CreatePoiInput, Poi } from "../entities/Poi.js";

export interface IPoiService {
  list(): Promise<Poi[]>;
  create(input: CreatePoiInput): Promise<Poi>;
}
