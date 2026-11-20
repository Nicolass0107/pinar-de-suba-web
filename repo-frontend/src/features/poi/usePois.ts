import { useEffect, useState } from "react";
import { poiService } from "../../services/poiService";
import type { Poi } from "../../shared/types/contracts";

export function usePois() {
  const [items, setItems] = useState<Poi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    poiService
      .list()
      .then((res) => setItems(res.items ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : "Error al cargar puntos"))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
}
