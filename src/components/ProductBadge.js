const VARIANTS = {
  popular: "bg-raja-black text-white",
  free: "bg-emerald-600 text-white",
  limited: "bg-raja-red text-white",
};

export default function ProductBadge({ label, variant = "popular" }) {
  if (!label) return null;

  return (
    <span
      className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${VARIANTS[variant] || VARIANTS.popular}`}
    >
      {label}
    </span>
  );
}
