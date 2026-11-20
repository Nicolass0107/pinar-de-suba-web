import { CalendarDays, ChevronRight } from "lucide-react";
import type { NewsItem } from "../../shared/types/contracts";
import { categoryStyles, detectCategory } from "./newsCategory";

export function NewsCard({ item, onOpen }: { item: NewsItem; onOpen: (id: string) => void }) {
  const date = new Date(item.publishedAt).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
  const category = detectCategory(`${item.title} ${item.summary}`);

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[category]}`}>{category}</span>
        <p className="flex items-center gap-1 text-xs text-slate-500"><CalendarDays size={14} />{date}</p>
      </div>
      <h3 className="text-lg font-bold leading-snug text-slate-900">{item.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.summary}</p>
      <button type="button" onClick={() => onOpen(item.id)} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
        Leer detalle <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}
