export default function ProductBadge({ label }) {
  if (!label) return null;

  return (
    <span className="absolute left-3 top-3 z-10 rounded-full bg-raja-red px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
      {label}
    </span>
  );
}
