import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "../../shared/components/PageHeader";
import { ErrorMessage, Loading } from "../../shared/components/StateMessage";
import type { Poi } from "../../shared/types/contracts";
import { PoiCard } from "./PoiCard";
import { PoiDetailMap } from "./PoiDetailMap";
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
  const [selected, setSelected] = useState<Poi | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const filtered = useMemo(() => items.filter((p) => matches(p.category, filter)), [items, filter]);

  useEffect(() => { if (selected) mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [selected]);

  return (
    <section>
      <PageHeader title="Puntos de interés" subtitle="Parques, colegios, transporte, comercio y servicios de Pinar de Suba y su entorno." />
      <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"><SlidersHorizontal size={16} />Filtrar por tipo</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {POI_FILTERS.map((f) => (
          <button key={f.key} type="button" onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${filter === f.key ? "bg-emerald-700 text-white" : "bg-white/80 text-slate-700 hover:bg-slate-100"}`}>
            {f.label}
          </button>
        ))}
      </div>
      {loading && <Loading text="Cargando información de Pinar de Suba..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => <PoiCard key={p.id} poi={p} index={i} onSelect={setSelected} selected={selected?.id === p.id} />)}
            {filtered.length === 0 && <p className="text-sm text-slate-500">No hay puntos en esta categoría.</p>}
          </div>
          {selected && <div ref={mapRef} className="mt-6 scroll-mt-24"><PoiDetailMap poi={selected} index={filtered.findIndex((p) => p.id === selected.id)} /></div>}
        </>
      )}
    </section>
  );
}
