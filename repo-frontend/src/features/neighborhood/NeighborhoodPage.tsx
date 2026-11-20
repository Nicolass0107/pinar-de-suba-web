import { ErrorMessage, Loading } from "../../shared/components/StateMessage";
import { HeroBanner } from "./HeroBanner";
import { NeighborhoodMap } from "./NeighborhoodMap";
import { NeighborhoodStats } from "./NeighborhoodStats";
import { useNeighborhood } from "./useNeighborhood";

export function NeighborhoodPage() {
  const { data, loading, error } = useNeighborhood();

  return (
    <section className="space-y-6">
      <HeroBanner />
      {loading && <Loading text="Cargando información oficial del barrio..." />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="grid gap-5 lg:grid-cols-2">
          <NeighborhoodStats info={data} />
          <NeighborhoodMap geometry={data.geometry} />
        </div>
      )}
    </section>
  );
}
