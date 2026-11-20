import { Map as MapIcon } from "lucide-react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { Card } from "../../shared/components/Card";
import type { Geometry } from "../../shared/types/contracts";

function toGeoJson(geometry: Geometry) {
  return { type: "Feature", properties: {}, geometry } as any;
}

export function NeighborhoodMap({ geometry }: { geometry: Geometry }) {
  const feature = toGeoJson(geometry);
  const hasCoords = Array.isArray(geometry.coordinates) && geometry.coordinates.length > 0;
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><MapIcon size={18} className="text-emerald-700" />Mapa catastral</h2>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">Polígono oficial</span>
      </div>
      <div className="h-[320px] p-3 sm:h-[380px]">
        <div className="h-full overflow-hidden rounded-2xl border border-emerald-100 shadow-inner">
          {hasCoords ? (
            <MapContainer center={[4.536, -74.088]} zoom={15} scrollWheelZoom className="h-full w-full">
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <GeoJSON data={feature} pathOptions={{ color: "#047857", weight: 3, fillColor: "#34d399", fillOpacity: 0.25 }} />
            </MapContainer>
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">Geometría no disponible.</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-slate-200 px-5 py-3 text-xs text-slate-600">
        <span className="inline-block h-3 w-3 rounded-sm border-2 border-emerald-700 bg-emerald-400/40" /> Límite catastral de Pinar de Suba (IDECA)
      </div>
    </Card>
  );
}
