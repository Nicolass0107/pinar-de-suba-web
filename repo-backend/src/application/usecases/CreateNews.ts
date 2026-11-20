import type { CreateNewsInput, News } from "../../domain/entities/News.js";
import type { INewsRepository } from "../../domain/repositories/INewsRepository.js";

export class CreateNews {
  constructor(private readonly repository: INewsRepository) {}

  async execute(input: CreateNewsInput): Promise<News> {
    return this.repository.create(input);
  }
}
