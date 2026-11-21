import { CalendarDays, MapPin, Tag } from "lucide-react";
import { Card } from "../../shared/components/Card";
import type { Report } from "../../shared/types/contracts";

export function ReportList({ items, loading }: { items: Report[]; loading: boolean }) {
  return (
    <Card className="mt-5">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Reportes de la comunidad</h2>
      {loading && <p className="text-sm text-slate-500">Cargando reportes...</p>}
      {!loading && items.length === 0 && <p className="text-sm text-slate-500">Aún no hay reportes registrados.</p>}
      <div className="space-y-3">
        {items.map((r) => (
          <article key={r.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-900">{r.title}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800"><Tag size={12} />{r.category}</span>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">{r.status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-700">{r.description}</p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1"><CalendarDays size={13} />{new Date(r.createdAt).toLocaleString("es-CO")}</span>
              {(r.latitude != null && r.longitude != null) && <span className="inline-flex items-center gap-1"><MapPin size={13} />{r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}</span>}
            </p>
          </article>
        ))}
      </div>
    </Card>
  );
}
