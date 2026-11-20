export function Loading({ text = "Cargando..." }: { text?: string }) {
  return <p className="text-sm text-slate-500 animate-pulse">{text}</p>;
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {message}
    </div>
  );
}
