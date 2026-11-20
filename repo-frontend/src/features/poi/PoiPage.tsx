import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "../../shared/components/PageHeader";
import { ErrorMessage, Loading } from "../../shared/components/StateMessage";
import { PoiCard } from "./PoiCard";
import { POI_FILTERS } from "./poiUtils";
import { usePois } from "./usePois";

function matches(poiCat: string, key: string) {
  const c = poiCat.toLowerCase();
  if (key === "Todos") return true;
  if (key === "salud-serv") return c.includes("salud") || c.includes("serv");
  return c.includes(key);
}

export function PoiPage() {
  const { items, loading, error } = usePois();
  const [filter, setFilter] = useState("Todos");
  const filtered = useMemo(() => items.filter((p) => matches(p.category, filter)), [items, filter]);

  return (
    <section>
      <PageHeader title="Puntos de interés" subtitle="Parques, transporte, educación, comercio y servicios de Pinar de Suba y su entorno." />
      <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"><SlidersHorizontal size={16} />Filtrar por tipo</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {POI_FILTERS.map((f) => (
          <button key={f.key} type="button" onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${filter === f.key ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            {f.label}
          </button>
        ))}
      </div>
      {loading && <Loading text="Cargando puntos de interés..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <PoiCard key={p.id} poi={p} />)}
          {filtered.length === 0 && <p className="text-sm text-slate-500">No hay puntos en esta categoría.</p>}
        </div>
      )}
    </section>
  );
}
