import { MapPinned, ShieldCheck } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-700 to-green-500 p-6 text-white shadow-soft sm:p-10">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 left-10 h-32 w-32 rounded-full bg-emerald-300/20 blur-2xl" />
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide">
          <ShieldCheck size={14} /> Localidad 11 • Suba • Bogotá D.C.
        </span>
        <h1 className="mt-4 flex items-center gap-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          <MapPinned className="hidden sm:block" /> Barrio Pinar de Suba
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-emerald-50/90 sm:text-base">
          Consulta datos oficiales, límites catastrales, noticias, puntos de interés y canales de reporte para fortalecer la comunidad.
        </p>
      </div>
    </section>
  );
}
