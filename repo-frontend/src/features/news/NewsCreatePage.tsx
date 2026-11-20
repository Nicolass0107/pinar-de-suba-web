import { ArrowLeft, PenSquare, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newsService } from "../../services/newsService";
import { Card } from "../../shared/components/Card";
import { PageHeader } from "../../shared/components/PageHeader";
import { TextField } from "../../shared/components/TextField";

export function NewsCreatePage() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    try { const created = await newsService.create({ title, summary, content }); nav(`/noticias/${created.id}`); }
    catch (err) { setError(err instanceof Error ? err.message : "No se pudo publicar"); }
    finally { setSaving(false); }
  }

  return (
    <section>
      <Link to="/noticias" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline"><ArrowLeft size={16} />Volver</Link>
      <PageHeader title="Publicar noticia" subtitle="Comparte novedades con la comunidad de Pinar de Suba." />
      <Card className="max-w-2xl">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-800"><PenSquare size={16} />Nueva publicación</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <TextField label="Título" value={title} onChange={setTitle} required />
          <TextField label="Resumen" value={summary} onChange={setSummary} required />
          <TextField label="Contenido" value={content} onChange={setContent} required textarea />
          {error && <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
          <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60">
            <Send size={16} />{saving ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </Card>
    </section>
  );
}
