import type { CreatePoiInput, Poi } from "../../domain/entities/Poi.js";
import type { IPoiRepository } from "../../domain/repositories/IPoiRepository.js";

export class CreatePoi {
  constructor(private readonly repository: IPoiRepository) {}

  async execute(input: CreatePoiInput): Promise<Poi> {
    return this.repository.create(input);
  }
}
