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
  if (c.includes("parque") || c.includes("humedal")) return "https://commons.wikimedia.org/wiki/Special:FilePath/Humedal_tibabuyes.jpg?width=900";
  if (c.includes("coleg") || c.includes("educ")) return "https://commons.wikimedia.org/wiki/Special:FilePath/Colegio_Mayor_de_San_Bartolom%C3%A9_-_Bogot%C3%A1.jpg?width=900";
  if (c.includes("transporte")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/TransMilenio_Portal_Suba.JPG/960px-TransMilenio_Portal_Suba.JPG";
  if (c.includes("comerc")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Calima_centro_comercial_en_Bogot%C3%A1.JPG/960px-Calima_centro_comercial_en_Bogot%C3%A1.JPG";
  if (c.includes("salud")) return "https://commons.wikimedia.org/wiki/Special:FilePath/Fundaci%C3%B3n_Santa_Fe_de_Bogot%C3%A1.jpg?width=900";
  return "https://commons.wikimedia.org/wiki/Special:FilePath/Biblioteca_Francisco_Jos%C3%A9_de_Caldas.jpg?width=900";
}

export const POI_FILTERS = [
  { label: "Todos", key: "Todos" },
  { label: "Parques", key: "parque" },
  { label: "Colegios", key: "coleg" },
  { label: "Transporte", key: "transporte" },
  { label: "Comercio", key: "comerc" },
  { label: "Salud/Servicios", key: "salud-serv" },
] as const;
