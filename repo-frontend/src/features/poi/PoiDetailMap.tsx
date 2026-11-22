import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Card } from "../../shared/components/Card";
import type { Poi } from "../../shared/types/contracts";
import { poiFallbackImage } from "./poiUtils";

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo([lat, lng], 17, { duration: 1.2 }); }, [lat, lng, map]);
  return null;
}

export function PoiDetailMap({ poi }: { poi: Poi }) {
  const fallback = poiFallbackImage(poi.category);
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid md:grid-cols-2">
        <div className="h-64 bg-slate-100 md:h-auto">
          <img src={poi.imageUrl || fallback} alt={poi.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }} />
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{poi.category}</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">{poi.name}</h3>
          {poi.description && <p className="mt-2 text-sm text-slate-700">{poi.description}</p>}
          <p className="mt-2 text-sm text-slate-600"><span className="font-medium">Coordenadas:</span> {poi.latitude.toFixed(5)}, {poi.longitude.toFixed(5)}</p>
          <div className="mt-3 h-56 overflow-hidden rounded-xl border border-slate-200">
            <MapContainer center={[poi.latitude, poi.longitude]} zoom={17} scrollWheelZoom className="h-full w-full">
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[poi.latitude, poi.longitude]}><Popup>{poi.name}</Popup></Marker>
              <FlyTo lat={poi.latitude} lng={poi.longitude} />
            </MapContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}
