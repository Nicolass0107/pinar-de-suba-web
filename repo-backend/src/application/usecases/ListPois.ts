import type { Poi } from "../../domain/entities/Poi.js";
import type { IPoiRepository } from "../../domain/repositories/IPoiRepository.js";

export class ListPois {
  constructor(private readonly repository: IPoiRepository) {}

  async execute(): Promise<Poi[]> {
    return this.repository.list();
  }
}
