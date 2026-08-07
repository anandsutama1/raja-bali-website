import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import ProductBadge from "@/components/ProductBadge";

// Short previews only, deliberately — the full details for each live on
// its own dedicated page (linked via href below), so this section
// introduces and routes to them instead of duplicating their content.
const experiences = [
  {
    badge: "Most Popular",
    badgeVariant: "popular",
    title: "Balinese Cooking Class",
    desc: "Learn traditional recipes hands-on with our local chefs, from spice garden to table.",
    cta: "Explore Experience",
    href: "/cooking-class",
    image: "/images/cooking-class/CookingClass-Card.jpg",
  },
  {
    badge: "Free",
    badgeVariant: "free",
    title: "Balinese Dance Dinner",
    desc: "A complimentary traditional dance performance every Thursday evening, exclusively here.",
    cta: "Explore Experience",
    href: "/dance",
    image: "/images/dance/Hero.jpg",
  },
  {
    badge: "Limited Slot",
    badgeVariant: "limited",
    title: "Balinese Bar Class",
    desc: "Step behind the bar and craft your own signature cocktail with authentic Balinese Arak.",
    cta: "Explore Experience",
    href: "/bar-class",
    image: "/images/bar-class/Bar-Card.jpg",
  },
];

export default function Experiences() {
  return (
    <section className="border-t border-gray-200 bg-white px-6 py-20 md:py-24">
      <Reveal as="h2" className="mb-2 text-center font-serif text-3xl">
        Every Experience, <span className="text-raja-red">One Address</span>
      </Reveal>
      <Reveal as="p" delay={90} className="mx-auto mb-14 max-w-2xl text-center text-gray-600">
        From dining to dancing to hands-on classes, every experience at Raja Bali Main Restaurant takes place at this one Nusa Dua location.
      </Reveal>

      <Stagger
        step={90}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        itemClassName="h-full"
      >
        {experiences.map((item) => (
          <article
            key={item.title}
            className="group u-lift flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_2px_18px_-12px_rgb(20_20_20/0.5)]"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="u-zoom object-cover"
              />
              <ProductBadge label={item.badge} variant={item.badgeVariant} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-lg font-semibold transition-colors duration-500 ease-expo group-hover:text-raja-red">
                {item.title}
              </h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              <Link
                href={item.href}
                className="u-press inline-flex w-fit items-center gap-2 border border-raja-black px-4 py-2 text-sm hover:bg-raja-black hover:text-white"
              >
                {item.cta}
                <span className="u-nudge">→</span>
              </Link>
            </div>
          </article>
        ))}
      </Stagger>
    </section>
  );
}
