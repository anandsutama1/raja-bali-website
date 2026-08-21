import Reveal from "./motion/Reveal";
import Parallax from "./motion/Parallax";
import SmartImage from "./SmartImage";
import ProductBadge from "./ProductBadge";
import LocalizedLink from "./LocalizedLink";

// Our top-tier set menu, featured on the homepage the same way a signature
// dish gets front-page billing on the sister site (Mr Bob Bar and Grill).
// Links straight to its own card on /menu/food via the id set on
// SetMenuCard.js — read from the same "raja-yasa" dictionary entry as the
// full menu, so the two surfaces can't drift apart on name/price.
// Photo not shot yet — SmartImage's built-in placeholder fallback means
// this ships now and upgrades automatically the moment the real photo lands
// at /images/home/Raja-Yasa.jpg.
export default function SignatureDish({ content }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 border-t border-gray-200 px-6 py-16 md:flex-row md:py-20">
      <Reveal x={-36} y={12} className="order-2 w-full md:order-1 md:w-1/2">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-raja-red">
          {content.eyebrow}
        </p>
        <h2 className="mb-1 font-serif text-3xl md:text-4xl">{content.heading}</h2>
        <p className="mb-5 font-serif text-lg italic text-gray-500">{content.tagline}</p>

        <p className="mb-4 leading-relaxed text-gray-600">{content.story}</p>
        <p className="mb-6 leading-relaxed text-gray-600">{content.description}</p>

        <p className="mb-6 text-sm font-semibold tracking-wide text-raja-black">{content.price}</p>

        <LocalizedLink
          href="/menu/food#raja-yasa"
          className="u-press group inline-flex items-center gap-2 rounded bg-raja-black px-6 py-3 text-sm tracking-widest text-white hover:bg-raja-red"
        >
          {content.cta}
          <span className="u-nudge">→</span>
        </LocalizedLink>
      </Reveal>

      <Reveal x={36} y={12} delay={120} className="order-1 w-full md:order-2 md:w-1/2">
        <div className="relative h-72 overflow-hidden rounded md:h-80">
          <Parallax speed={0.06} scale={1.08} className="relative h-full w-full">
            <SmartImage
              src="/images/home/Raja-Yasa.jpg"
              alt="Raja Yasa, Raja Bali's signature seafood set menu"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Parallax>
          <ProductBadge label={content.eyebrow} />
        </div>
      </Reveal>
    </section>
  );
}
