import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import ProductBadge from "@/components/ProductBadge";
import LocalizedLink from "@/components/LocalizedLink";

const IMAGES = {
  "/cooking-class": "/images/cooking-class/CookingClass-Card.jpg",
  "/dance": "/images/dance/Hero.jpg",
  "/bar-class": "/images/bar-class/Bar-Card.jpg",
};

// Short previews only, deliberately — the full details for each live on
// its own dedicated page (linked via href below), so this section
// introduces and routes to them instead of duplicating their content.
export default function Experiences({ content }) {
  return (
    <section className="border-t border-gray-200 bg-white px-6 py-20 md:py-24">
      <Reveal as="h2" className="mb-2 text-center font-serif text-3xl">
        {content.headingPrefix}<span className="text-raja-red">{content.headingAccent}</span>
      </Reveal>
      <Reveal as="p" delay={90} className="mx-auto mb-2 max-w-2xl text-center text-gray-600">
        {content.intro1}
      </Reveal>
      <Reveal as="p" delay={120} className="mx-auto mb-14 max-w-2xl text-center text-sm text-raja-red">
        {content.intro2}
      </Reveal>

      <Stagger
        step={90}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        itemClassName="h-full"
      >
        {content.items.map((item) => (
          <article
            key={item.title}
            className="group u-lift flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_2px_18px_-12px_rgb(20_20_20/0.5)]"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={IMAGES[item.href]}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="u-zoom object-cover"
              />
              <ProductBadge label={item.badge} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-lg font-semibold transition-colors duration-500 ease-expo group-hover:text-raja-red">
                {item.title}
              </h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              <LocalizedLink
                href={item.href}
                className="u-press inline-flex w-fit items-center gap-2 border border-raja-black px-4 py-2 text-sm hover:bg-raja-black hover:text-white"
              >
                {item.cta}
                <span className="u-nudge">→</span>
              </LocalizedLink>
            </div>
          </article>
        ))}
      </Stagger>
    </section>
  );
}
