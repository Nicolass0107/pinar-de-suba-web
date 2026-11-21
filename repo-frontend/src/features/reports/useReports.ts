import { FormEvent, useCallback, useEffect, useState } from "react";
import { reportService } from "../../services/reportService";
import type { Report } from "../../shared/types/contracts";

export function useReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Seguridad");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try { const res = await reportService.list(); setReports(res.items ?? []); }
    catch { /* keep existing list */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null); setSent(false);
    try {
      await reportService.create({ title, description, category });
      setSent(true); setTitle(""); setDescription("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el reporte");
    } finally { setSaving(false); }
  }

  return { title, setTitle, description, setDescription, category, setCategory, sent, error, saving, submit, reports, loading };
}
