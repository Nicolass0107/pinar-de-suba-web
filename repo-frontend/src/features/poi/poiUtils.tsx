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

export const POI_FILTERS = [
  { label: "Todos", key: "Todos" },
  { label: "Parques", key: "parque" },
  { label: "Transporte", key: "transporte" },
  { label: "Educación", key: "educ" },
  { label: "Comercio", key: "comerc" },
  { label: "Salud/Servicios", key: "salud-serv" },
] as const;
