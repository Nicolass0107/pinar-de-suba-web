type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
};

export function TextField({ label, value, onChange, type = "text", required, textarea }: Props) {
  const cls = "mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {textarea ? (
        <textarea className={cls} rows={4} value={value} required={required} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
