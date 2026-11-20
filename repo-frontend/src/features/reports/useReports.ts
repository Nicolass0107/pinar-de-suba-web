import { FormEvent, useState } from "react";
import { reportService } from "../../services/reportService";

export function useReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Seguridad");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSent(false);
    try {
      await reportService.create({ title, description, category });
      setSent(true);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el reporte");
    } finally {
      setSaving(false);
    }
  }

  return { title, setTitle, description, setDescription, category, setCategory, sent, error, saving, submit };
}
