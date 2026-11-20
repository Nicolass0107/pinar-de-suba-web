import type { CreateNewsInput } from "../../contracts/news.schema.js";
import type { IBackendClient } from "../ports/IBackendClient.js";

export class NewsService {
  constructor(private readonly backend: IBackendClient) {}

  list() { return this.backend.listNews(); }
  getById(id: string) { return this.backend.getNewsById(id); }
  create(input: CreateNewsInput) { return this.backend.createNews(input); }
}
