import { MapPin } from "lucide-react";
import type { Poi } from "../../shared/types/contracts";
import { PoiMiniMap } from "./PoiMiniMap";
import { poiIcon } from "./poiUtils";

export function PoiCard({ poi, onSelect, selected }: { poi: Poi; index?: number; onSelect: (p: Poi) => void; selected?: boolean }) {
  return (
    <article onClick={() => onSelect(poi)} className={`cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg ${selected ? "border-emerald-500 ring-2 ring-emerald-200" : "border-slate-200"}`}>
      <div className="h-36 w-full bg-slate-100">
        <PoiMiniMap poi={poi} />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">{poiIcon(poi.category)}</span>
          <div>
            <h3 className="text-base font-semibold leading-tight text-slate-900">{poi.name}</h3>
            <span className="mt-0.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{poi.category}</span>
          </div>
        </div>
        {poi.description && <p className="text-sm text-slate-600">{poi.description}</p>}
        <p className="mt-3 flex items-center gap-1 text-xs text-slate-500"><MapPin size={13} />{poi.address || `${poi.latitude.toFixed(4)}, ${poi.longitude.toFixed(4)}`}</p>
      </div>
    </article>
  );
}
