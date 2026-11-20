import { useEffect, useState } from "react";
import { newsService } from "../../services/newsService";
import type { NewsItem } from "../../shared/types/contracts";

export function useNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    newsService
      .list()
      .then((res) => setItems(res.items ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : "Error al cargar noticias"))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
}
