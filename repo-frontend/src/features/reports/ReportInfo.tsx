import { Camera, Clock3, MapPin, ShieldCheck } from "lucide-react";

const tips = [
  { icon: <MapPin size={16} />, title: "Ubica el caso", text: "Indica calle, punto cercano o referencia del barrio." },
  { icon: <Camera size={16} />, title: "Describe con detalle", text: "Qué ocurre, desde cuándo y cómo afecta a la comunidad." },
  { icon: <Clock3 size={16} />, title: "Seguimiento", text: "Los reportes ayudan a priorizar acciones vecinales y locales." },
  { icon: <ShieldCheck size={16} />, title: "Convivencia", text: "Usa el canal para temas de seguridad, vías, aseo e iluminación." },
];

export function ReportInfo() {
  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">¿Qué puedes reportar?</h2>
        <p className="mt-1 text-sm text-slate-600">Este espacio recoge alertas comunitarias para visibilizar necesidades del barrio Pinar de Suba.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {tips.map((t) => (
            <div key={t.title} className="rounded-xl bg-emerald-50/70 p-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900">{t.icon}{t.title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
