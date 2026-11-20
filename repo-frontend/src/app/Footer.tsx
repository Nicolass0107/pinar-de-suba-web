import { Database, Landmark, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-emerald-900/20 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-semibold"><Landmark size={16} />Pinar de Suba</p>
          <p className="mt-2 text-sm text-emerald-100/80">Portal comunitario para información, participación y reporte vecinal en la Localidad 11 de Suba.</p>
        </div>
        <div>
          <p className="flex items-center gap-2 font-semibold"><Database size={16} />Datos abiertos</p>
          <p className="mt-2 text-sm text-emerald-100/80">
            Integración con <strong>Datos Abiertos Bogotá (IDECA)</strong> para información catastral y geográfica oficial del sector.
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 font-semibold"><Mail size={16} />Participación</p>
          <p className="mt-2 text-sm text-emerald-100/80">Consulta noticias, puntos de interés y envía reportes para fortalecer el bienestar del barrio.</p>
        </div>
      </div>
      <div className="border-t border-emerald-800 px-4 py-4 text-center text-xs text-emerald-200/80">
        © {new Date().getFullYear()} Portal Barrio Pinar de Suba • Bogotá D.C.
      </div>
    </footer>
  );
}
