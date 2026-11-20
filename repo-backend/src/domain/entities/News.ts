export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: Date;
  createdAt: Date;
}

export interface CreateNewsInput {
  title: string;
  summary: string;
  content: string;
  publishedAt?: Date;
}
