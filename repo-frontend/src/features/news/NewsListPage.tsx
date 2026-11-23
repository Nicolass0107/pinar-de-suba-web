import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../shared/components/PageHeader";
import { ErrorMessage, Loading } from "../../shared/components/StateMessage";
import { NewsCard } from "./NewsCard";
import { NewsDetailModal } from "./NewsDetailModal";
import { NewsFilters } from "./NewsFilters";
import { detectCategory } from "./newsCategory";
import { useNews } from "./useNews";

export function NewsListPage() {
  const { items, loading, error } = useNews();
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = useMemo(
    () => items.filter((i) => category === "Todas" || detectCategory(`${i.title} ${i.summary}`) === category),
    [items, category],
  );

  return (
    <section>
      <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
        <PageHeader title="Noticias recientes" subtitle="Novedades y comunicados para la comunidad de Pinar de Suba." />
        <Link to="/noticias/nueva" className="mb-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"><PlusCircle size={16} />Publicar noticia</Link>
      </div>
      <NewsFilters value={category} onChange={setCategory} />
      {loading && <Loading text="Cargando información de Pinar de Suba..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n) => <NewsCard key={n.id} item={n} onOpen={setSelected} />)}
          {filtered.length === 0 && <p className="text-sm text-slate-500">No hay noticias en esta categoría.</p>}
        </div>
      )}
      {selected && <NewsDetailModal id={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
