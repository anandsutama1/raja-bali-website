import Marquee from "@/components/motion/Marquee";

// Confirmed, defensible claims only — no invented superlatives. Dance is
// scoped to "(Main Restaurant)" since it's exclusive to that outlet, not
// Nusa Dua — see Schedule.js. `items` comes from content-home.json's
// promoTicker array for the current locale.
export default function PromoTicker({ items, className = "" }) {
  return (
    <div className={`border-y border-gray-200 bg-white py-5 ${className}`}>
      <Marquee speed={28} gap={56} fadeClassName="from-white">
        {items.map((text) => (
          <span
            key={text}
            className="flex items-center gap-4 whitespace-nowrap px-2 text-sm uppercase tracking-[0.3em] text-gray-500"
          >
            {text}
            <span className="text-raja-red">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
