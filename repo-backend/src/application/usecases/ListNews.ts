import type { News } from "../../domain/entities/News.js";
import type { INewsRepository } from "../../domain/repositories/INewsRepository.js";

export class ListNews {
  constructor(private readonly repository: INewsRepository) {}

  async execute(): Promise<News[]> {
    return this.repository.list();
  }
}
