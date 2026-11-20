import { AlertCircle, CheckCircle2, Megaphone, Send } from "lucide-react";
import { Card } from "../../shared/components/Card";
import { PageHeader } from "../../shared/components/PageHeader";
import { TextField } from "../../shared/components/TextField";
import { ReportInfo } from "./ReportInfo";
import { useReportForm } from "./useReports";

const CATEGORIES = ["Seguridad", "Iluminación", "Vías", "Aseo", "Ruido", "Otro"];

export function ReportFormPage() {
  const f = useReportForm();
  return (
    <section>
      <PageHeader title="Reportes vecinales" subtitle="Informa situaciones del barrio para seguimiento comunitario." />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-800"><Megaphone size={16} />Nuevo reporte</p>
          <form onSubmit={f.submit} className="space-y-4">
            <TextField label="Título" value={f.title} onChange={f.setTitle} required />
            <label className="block text-sm font-medium text-slate-700">Categoría
              <select value={f.category} onChange={(e) => f.setCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <TextField label="Descripción" value={f.description} onChange={f.setDescription} required textarea />
            {f.sent && <p className="flex items-center gap-2 rounded-lg bg-green-50 p-2 text-sm text-green-700"><CheckCircle2 size={16} />Reporte enviado correctamente. ¡Gracias por participar!</p>}
            {f.error && <p className="flex items-center gap-2 rounded-lg bg-red-50 p-2 text-sm text-red-700"><AlertCircle size={16} />{f.error}</p>}
            <button disabled={f.saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"><Send size={16} />{f.saving ? "Enviando..." : "Enviar reporte"}</button>
          </form>
        </Card>
        <ReportInfo />
      </div>
    </section>
  );
}
