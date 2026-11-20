import { Filter } from "lucide-react";

export const CATEGORIES = ["Todas", "Movilidad", "Ambiente", "Seguridad", "Cultura", "Malla vial", "Comunidad"] as const;

type Props = { value: string; onChange: (v: string) => void };

export function NewsFilters({ value, onChange }: Props) {
  return (
    <div className="mb-5">
      <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"><Filter size={16} />Filtrar por categoría</p>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button key={cat} type="button" onClick={() => onChange(cat)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${value === cat ? "bg-emerald-700 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
