import { CalendarDays, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { newsService } from "../../services/newsService";
import type { NewsDetail } from "../../shared/types/contracts";
import { categoryStyles, detectCategory } from "./newsCategory";

export function NewsDetailModal({ id, onClose }: { id: string; onClose: () => void }) {
  const [item, setItem] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { newsService.getById(id).then(setItem).finally(() => setLoading(false)); }, [id]);
  const category = item ? detectCategory(`${item.title} ${item.summary}`) : "Comunidad";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-3 sm:items-center" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>{item && <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[category]}`}><Tag size={12} />{category}</span>}</div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"><X size={18} /></button>
        </div>
        {loading && <p className="text-sm text-slate-500">Cargando detalle...</p>}
        {item && (
          <>
            <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><CalendarDays size={14} />{new Date(item.publishedAt).toLocaleString("es-CO", { dateStyle: "long" })}</p>
            <p className="mt-4 font-medium text-slate-700">{item.summary}</p>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">{item.content}</p>
            <Link to={`/noticias/${item.id}`} className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">Abrir página de detalle</Link>
          </>
        )}
      </div>
    </div>
  );
}
