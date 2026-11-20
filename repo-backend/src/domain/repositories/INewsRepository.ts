import type { CreateNewsInput, News } from "../entities/News.js";

export interface INewsRepository {
  list(): Promise<News[]>;
  findById(id: string): Promise<News | null>;
  create(input: CreateNewsInput): Promise<News>;
}
