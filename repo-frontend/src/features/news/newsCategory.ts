export type NewsCategory = "Movilidad" | "Ambiente" | "Seguridad" | "Cultura" | "Malla vial" | "Comunidad";

export function detectCategory(text: string): NewsCategory {
  const t = text.toLowerCase();
  if (/(movilidad|av\.? suba|calle 145|transmilenio|sitp|paradero|tr[aá]nsito)/.test(t)) return "Movilidad";
  if (/(humedal|ambient|ecol[oó]gic|limpieza|biodiversidad|sostenible)/.test(t)) return "Ambiente";
  if (/(seguridad|convivencia|cuadrante|iluminaci[oó]n)/.test(t)) return "Seguridad";
  if (/(cultur|taller|m[uú]sica|danza|lectura|arte)/.test(t)) return "Cultura";
  if (/(malla vial|anden|calzada|parcheo|se[ñn]alizaci[oó]n|v[ií]as)/.test(t)) return "Malla vial";
  return "Comunidad";
}

export const categoryStyles: Record<NewsCategory, string> = {
  Movilidad: "bg-sky-100 text-sky-800",
  Ambiente: "bg-emerald-100 text-emerald-800",
  Seguridad: "bg-amber-100 text-amber-800",
  Cultura: "bg-fuchsia-100 text-fuchsia-800",
  "Malla vial": "bg-orange-100 text-orange-800",
  Comunidad: "bg-slate-100 text-slate-800",
};
