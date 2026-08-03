import Image from "next/image";
import Link from "next/link";
import Reveal from "./motion/Reveal";
import Parallax from "./motion/Parallax";

export default function HotelTransfer() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 border-t border-gray-200 px-6 py-16 md:flex-row md:py-20">
      <Reveal x={-36} y={12} className="group w-full md:w-1/2">
        <div className="h-64 overflow-hidden rounded md:h-72">
          <Parallax speed={0.06} scale={1.08} className="relative h-full w-full">
            <Image
              src="/images/home/Hotel-Transfer.jpg"
              alt="Complimentary hotel transfer vehicle"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
      </Reveal>

      <Reveal x={36} y={12} delay={120} className="w-full border-l-4 border-raja-red pl-6 md:w-1/2">
        <h2 className="mb-4 font-serif text-2xl md:text-3xl">
          Complimentary Hotel Transfer
        </h2>
        <p className="mb-6 leading-relaxed text-gray-600">
          Begin your Raja Bali experience the moment you leave your hotel. We
          are delighted to offer complimentary round-trip transfers for guests
          staying within the Nusa Dua area.
        </p>
        <Link
          href="/contact"
          className="u-press group inline-flex items-center gap-2 rounded bg-raja-black px-6 py-3 text-sm tracking-widest text-white hover:bg-raja-red"
        >
          RESERVE NOW
          <span className="u-nudge">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
