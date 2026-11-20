import type { News } from "../../domain/entities/News.js";
import type { INewsRepository } from "../../domain/repositories/INewsRepository.js";

export class GetNewsDetail {
  constructor(private readonly repository: INewsRepository) {}

  async execute(id: string): Promise<News | null> {
    return this.repository.findById(id);
  }
}
