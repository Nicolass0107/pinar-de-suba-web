import { Bus, GraduationCap, HeartPulse, Landmark, MapPin, ShoppingBag, Trees } from "lucide-react";

export function poiIcon(category: string) {
  const c = category.toLowerCase();
  if (c.includes("parque") || c.includes("humedal")) return <Trees size={18} />;
  if (c.includes("transporte") || c.includes("sitp") || c.includes("portal")) return <Bus size={18} />;
  if (c.includes("coleg") || c.includes("educ")) return <GraduationCap size={18} />;
  if (c.includes("comerc")) return <ShoppingBag size={18} />;
  if (c.includes("salud")) return <HeartPulse size={18} />;
  if (c.includes("serv")) return <Landmark size={18} />;
  return <MapPin size={18} />;
}

export function poiCategoryLabel(category: string) {
  const c = category.toLowerCase();
  if (c.includes("parque") || c.includes("humedal")) return "Parque / espacio verde";
  if (c.includes("coleg") || c.includes("educ")) return "Institución educativa";
  if (c.includes("transporte")) return "Punto de transporte";
  if (c.includes("comerc")) return "Comercio local";
  if (c.includes("salud")) return "Servicio de salud";
  return "Servicio comunitario";
}

export function poiPhotoSrc(poi: { id: string; imageUrl?: string | null }, index: number) {
  const base = import.meta.env.BASE_URL || "/";
  const local = `${base}lugares/lugar-${(index % 6) + 1}.jpg`;
  const raw = poi.imageUrl?.trim();
  if (!raw) return local;
  if (raw.startsWith("http")) return raw;
  return `${base}${raw.replace(/^\/+/, "")}`;
}

export function poiEsriFallback(lat: number, lng: number) {
  const d = 0.0035;
  const box = [lng - d, lat - d, lng + d, lat + d].map((n) => n.toFixed(6)).join(",");
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${box}&bboxSR=4326&imageSR=4326&size=900,600&format=jpg&f=image`;
}

export const POI_FILTERS = [
  { label: "Todos", key: "Todos" },
  { label: "Parques", key: "parque" },
  { label: "Colegios", key: "coleg" },
  { label: "Transporte", key: "transporte" },
  { label: "Comercio", key: "comerc" },
  { label: "Salud/Servicios", key: "salud-serv" },
] as const;
