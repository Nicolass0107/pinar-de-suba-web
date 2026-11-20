import { useEffect, useState } from "react";
import { neighborhoodService } from "../../services/neighborhoodService";
import type { NeighborhoodInfo } from "../../shared/types/contracts";

export function useNeighborhood() {
  const [data, setData] = useState<NeighborhoodInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    neighborhoodService
      .getInfo()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Error al cargar"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
