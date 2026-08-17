import Marquee from "@/components/motion/Marquee";

// Confirmed, defensible claims only — no invented superlatives. Dance is
// scoped to "(Main Restaurant)" since it's exclusive to that outlet, not
// Nusa Dua — see Schedule.js.
const TICKER_ITEMS = [
  "5x Tripadvisor Travelers' Choice Award",
  "Free Balinese Dance Every Thursday (Main Restaurant)",
  "Complimentary Hotel Transfer",
  "Ctrip Gourmet List Certificate",
];

export default function PromoTicker({ className = "" }) {
  return (
    <div className={`border-y border-gray-200 bg-white py-5 ${className}`}>
      <Marquee speed={28} gap={56} fadeClassName="from-white">
        {TICKER_ITEMS.map((text) => (
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
