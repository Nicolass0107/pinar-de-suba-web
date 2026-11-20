import type { CreateNewsInput, News } from "../entities/News.js";

export interface INewsService {
  list(): Promise<News[]>;
  getById(id: string): Promise<News | null>;
  create(input: CreateNewsInput): Promise<News>;
}
