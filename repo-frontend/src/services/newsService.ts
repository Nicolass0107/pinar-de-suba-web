import { httpClient } from "./httpClient";
import type { CreateNewsInput, NewsDetail, NewsItem } from "../shared/types/contracts";

export const newsService = {
  list(): Promise<{ items: NewsItem[] }> {
    return httpClient.get("/api/news");
  },
  getById(id: string): Promise<NewsDetail> {
    return httpClient.get(`/api/news/${encodeURIComponent(id)}`);
  },
  create(input: CreateNewsInput): Promise<NewsDetail> {
    return httpClient.post("/api/news", input);
  },
};
