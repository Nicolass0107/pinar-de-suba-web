import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { newsService } from "../../services/newsService";
import { Card } from "../../shared/components/Card";
import { ErrorMessage, Loading } from "../../shared/components/StateMessage";
import type { NewsDetail } from "../../shared/types/contracts";
import { categoryStyles, detectCategory } from "./newsCategory";

export function NewsDetailPage() {
  const { id = "" } = useParams();
  const [item, setItem] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { newsService.getById(id).then(setItem).catch((e) => setError(e instanceof Error ? e.message : "No se pudo cargar")).finally(() => setLoading(false)); }, [id]);
  if (loading) return <Loading text="Cargando noticia..." />;
  if (error || !item) return <ErrorMessage message={error || "Noticia no encontrada"} />;
  const category = detectCategory(`${item.title} ${item.summary}`);

  return (
    <section>
      <Link to="/noticias" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline"><ArrowLeft size={16} />Volver a noticias</Link>
      <Card className="max-w-3xl">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[category]}`}><Tag size={12} />{category}</span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{item.title}</h1>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><CalendarDays size={14} />{new Date(item.publishedAt).toLocaleString("es-CO", { dateStyle: "long" })}</p>
        <p className="mt-5 rounded-xl bg-slate-50 p-4 font-medium text-slate-700">{item.summary}</p>
        <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-700">{item.content}</p>
      </Card>
    </section>
  );
}
