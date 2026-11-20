import { Home, MapPin, Megaphone, Newspaper } from "lucide-react";
import { NavLink } from "react-router-dom";

const base = "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition";
const cls = ({ isActive }: { isActive: boolean }) =>
  `${base} ${isActive ? "bg-brand-100 text-brand-800" : "text-slate-700 hover:bg-brand-50"}`;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white">
            <MapPin size={18} />
          </div>
          <div>
            <p className="font-bold leading-tight text-emerald-900">Pinar de Suba</p>
            <p className="text-xs text-slate-500">Portal vecinal comunitario</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-1">
          <NavLink to="/" className={cls} end><Home size={16} />Inicio</NavLink>
          <NavLink to="/noticias" className={cls}><Newspaper size={16} />Noticias</NavLink>
          <NavLink to="/puntos" className={cls}><MapPin size={16} />Puntos</NavLink>
          <NavLink to="/reportes" className={cls}><Megaphone size={16} />Reportes</NavLink>
        </nav>
      </div>
    </header>
  );
}
