import { MapPin } from "lucide-react";
import { useState } from "react";
import type { Poi } from "../../shared/types/contracts";
import { poiCategoryLabel, poiIcon } from "./poiUtils";

export function PoiCard({ poi, onSelect, selected }: { poi: Poi; onSelect: (p: Poi) => void; selected?: boolean }) {
  const [imgErr, setImgErr] = useState(false);
  const showImg = Boolean(poi.imageUrl) && !imgErr;
  return (
    <article onClick={() => onSelect(poi)} className={`cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg ${selected ? "border-emerald-500 ring-2 ring-emerald-200" : "border-slate-200"}`}>
      <div className="flex h-36 w-full items-center justify-center bg-emerald-50">
        {showImg ? (
          <img src={poi.imageUrl!} alt={poi.name} className="h-full w-full object-cover" loading="lazy" onError={() => setImgErr(true)} />
        ) : (
          <div className="px-4 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">{poiIcon(poi.category)}</div>
            <p className="text-xs font-medium text-emerald-900">{poiCategoryLabel(poi.category)}</p>
            <p className="mt-1 text-[11px] text-slate-600">{poi.address || "Pinar de Suba, Suba, Bogotá"}</p>
          </div>
        )}
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
