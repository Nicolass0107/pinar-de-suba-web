import { Map, Ruler, SquareDashedBottom, Trees } from "lucide-react";
import { Card } from "../../shared/components/Card";
import type { NeighborhoodInfo } from "../../shared/types/contracts";

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-emerald-800">
        {icon}{label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function NeighborhoodStats({ info }: { info: NeighborhoodInfo }) {
  const hectares = info.areaM2 / 10000;
  return (
    <Card className="h-full">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
        <Map size={18} className="text-emerald-700" /> Datos oficiales
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Stat label="Área (m²)" value={info.areaM2.toLocaleString("es-CO")} icon={<SquareDashedBottom size={14} />} />
        <Stat label="Hectáreas" value={hectares.toLocaleString("es-CO", { maximumFractionDigits: 2 })} icon={<Trees size={14} />} />
        <Stat label="Perímetro (m)" value={info.perimeterM.toLocaleString("es-CO")} icon={<Ruler size={14} />} />
        <Stat label="Localidad" value={`${info.locality} • ${info.city}`} icon={<Map size={14} />} />
      </div>
      <p className="mt-3 text-xs text-slate-500">Fuente: {info.source} • Sector: {info.sectorCatastralId || "N/D"}</p>
    </Card>
  );
}
