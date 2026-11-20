import type { CreatePoiInput, Poi } from "../entities/Poi.js";

export interface IPoiRepository {
  list(): Promise<Poi[]>;
  create(input: CreatePoiInput): Promise<Poi>;
}
