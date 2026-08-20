import Image from "next/image";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";
import ProductBadge from "./ProductBadge";
import LocalizedLink from "./LocalizedLink";

const IMAGES = {
  "/cooking-class": "/images/cooking-class/CookingClass-Card.jpg",
  "/dance": "/images/dance/Hero.jpg",
  "/bar-class": "/images/home/cocktail-class.png",
};

export default function Activities({ content }) {
  return (
    <section className="border-t border-gray-200 bg-white px-6 py-20 md:py-24">
      <Reveal as="h2" className="mb-10 text-center font-serif text-3xl">
        {content.headingPrefix}<span className="text-raja-red">{content.headingAccent}</span>
      </Reveal>

      <Stagger
        step={110}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        itemClassName="h-full"
      >
        {content.items.map((item) => (
          <article
            key={item.href}
            className="group u-lift flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_2px_18px_-12px_rgb(20_20_20/0.5)]"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={IMAGES[item.href]}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="u-zoom object-cover"
              />
              <ProductBadge label={item.badge} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-lg font-semibold transition-colors duration-500 ease-expo group-hover:text-raja-red">
                {item.title}
              </h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                {item.desc}
              </p>
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
