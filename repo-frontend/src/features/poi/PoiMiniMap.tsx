import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Poi } from "../../shared/types/contracts";

const pin = L.divIcon({
  className: "poi-pin",
  html: `<svg width="28" height="36" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C6.48 1 2 5.48 2 11c0 7.5 10 20 10 20s10-12.5 10-20c0-5.52-4.48-10-10-10z" fill="#059669" stroke="#065f46" stroke-width="1.5"/><circle cx="12" cy="11" r="4.2" fill="white"/></svg>`,
  iconSize: [28, 36], iconAnchor: [14, 36],
});

export function PoiMiniMap({ poi }: { poi: Poi }) {
  return (
    <MapContainer center={[poi.latitude, poi.longitude]} zoom={16} dragging={false} scrollWheelZoom={false} doubleClickZoom={false} touchZoom={false} boxZoom={false} keyboard={false} zoomControl={false} attributionControl={false} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[poi.latitude, poi.longitude]} icon={pin} interactive={false} />
    </MapContainer>
  );
}
