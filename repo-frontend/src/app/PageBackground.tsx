import { useLocation } from "react-router-dom";

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1600`;

const backgrounds: Record<string, string> = {
  "/": commons("Av. Suba Btá .jpg"),
  "/noticias": commons("Barrio Sta Helena de Bogotá abr 2018 - 1.jpg"),
  "/puntos": commons("Parque infantil San José Suba Btá.jpg"),
  "/reportes": commons("Portal Suba de Bogotá, Cund - Colombia.jpg"),
};

function pick(pathname: string) {
  if (pathname.startsWith("/noticias")) return backgrounds["/noticias"];
  if (pathname.startsWith("/puntos")) return backgrounds["/puntos"];
  if (pathname.startsWith("/reportes")) return backgrounds["/reportes"];
  return backgrounds["/"];
}

export function PageBackground() {
  const { pathname } = useLocation();
  const bg = pick(pathname);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${bg})` }} />
      <div className="absolute inset-0 bg-slate-50/85 backdrop-blur-[1px]" />
    </div>
  );
}
