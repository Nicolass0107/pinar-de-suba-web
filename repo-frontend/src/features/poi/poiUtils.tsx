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

export function poiFallbackImage(category: string) {
  const c = category.toLowerCase();
  if (c.includes("parque") || c.includes("humedal")) return "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=900&q=80&auto=format&fit=crop";
  if (c.includes("coleg") || c.includes("educ")) return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80&auto=format&fit=crop";
  if (c.includes("transporte")) return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80&auto=format&fit=crop";
  if (c.includes("comerc")) return "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=80&auto=format&fit=crop";
  if (c.includes("salud")) return "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop";
}

export const POI_FILTERS = [
  { label: "Todos", key: "Todos" },
  { label: "Parques", key: "parque" },
  { label: "Colegios", key: "coleg" },
  { label: "Transporte", key: "transporte" },
  { label: "Comercio", key: "comerc" },
  { label: "Salud/Servicios", key: "salud-serv" },
] as const;
