import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Card } from "../../shared/components/Card";
import type { Poi } from "../../shared/types/contracts";
import { poiCategoryLabel, poiIcon } from "./poiUtils";

const pinIcon = L.divIcon({
  className: "poi-pin",
  html: `<svg width="34" height="44" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C6.48 1 2 5.48 2 11c0 7.5 10 20 10 20s10-12.5 10-20c0-5.52-4.48-10-10-10z" fill="#059669" stroke="#065f46" stroke-width="1.5"/><circle cx="12" cy="11" r="4.2" fill="white"/></svg>`,
  iconSize: [34, 44], iconAnchor: [17, 44], popupAnchor: [0, -40],
});

function MapSync({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { const t = setTimeout(() => { map.invalidateSize(); map.flyTo([lat, lng], 16, { duration: 1.2 }); }, 50); return () => clearTimeout(t); }, [lat, lng, map]);
  return null;
}

export function PoiDetailMap({ poi }: { poi: Poi }) {
  const [imgErr, setImgErr] = useState(false);
  useEffect(() => setImgErr(false), [poi.id]);
  const showImg = Boolean(poi.imageUrl) && !imgErr;
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid md:grid-cols-2">
        <div className="h-64 bg-emerald-50 md:h-auto">
          {showImg ? <img src={poi.imageUrl!} alt={poi.name} className="h-full w-full object-cover" onError={() => setImgErr(true)} /> : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">{poiIcon(poi.category)}</div>
              <p className="text-sm font-semibold text-emerald-900">{poiCategoryLabel(poi.category)}</p>
              <p className="mt-2 text-sm text-slate-600">{poi.address || "Pinar de Suba, Suba, Bogotá"}</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{poi.category}</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">{poi.name}</h3>
          {poi.description && <p className="mt-2 text-sm text-slate-700">{poi.description}</p>}
          <p className="mt-2 text-sm text-slate-600"><span className="font-medium">Dirección:</span> {poi.address || "Suba, Bogotá"}</p>
          <p className="mt-1 text-sm text-slate-600"><span className="font-medium">Coordenadas:</span> {poi.latitude.toFixed(5)}, {poi.longitude.toFixed(5)}</p>
          <div className="mt-3 h-56 overflow-hidden rounded-xl border border-slate-200">
            <MapContainer center={[poi.latitude, poi.longitude]} zoom={16} scrollWheelZoom className="h-full w-full">
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[poi.latitude, poi.longitude]} icon={pinIcon}><Popup>{poi.name}</Popup></Marker>
              <MapSync lat={poi.latitude} lng={poi.longitude} />
            </MapContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}
