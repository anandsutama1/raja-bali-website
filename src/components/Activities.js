import Image from "next/image";
import Link from "next/link";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";
import ProductBadge from "./ProductBadge";

const activities = [
  {
    badge: "Most Popular",
    badgeVariant: "popular",
    title: "Balinese Cooking Class",
    desc: "Learn authentic Balinese cooking hands-on with our experienced local chefs, from the spices we use every day to recipes passed down through generations.",
    cta: "Book Now",
    href: "/cooking-class",
    image: "/images/cooking-class/CookingClass-Card.jpg",
  },
  {
    badge: "Free",
    badgeVariant: "free",
    title: "Balinese Dance Performance",
    desc: "Watch a complimentary traditional Balinese dance performance every Thursday evening at our Main Restaurant, a beautiful mix of music, movement, and centuries-old tradition.",
    cta: "View Details",
    href: "/dance",
    image: "/images/dance/Hero.jpg",
  },
  {
    badge: "Limited Slot",
    badgeVariant: "limited",
    title: "Balinese Cocktail Class",
    desc: "Step behind the bar with our bartenders and learn to mix cocktails using fresh tropical ingredients, from island classics to our own signature creations.",
    cta: "Book Now",
    href: "/bar-class",
    image: "/images/home/cocktail-class.png",
  },
];

export default function Activities() {
  return (
    <section className="border-t border-gray-200 bg-white px-6 py-20 md:py-24">
      <Reveal as="h2" className="mb-10 text-center font-serif text-3xl">
        Our <span className="text-raja-red">Activities</span>
      </Reveal>

      <Stagger
        step={110}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        itemClassName="h-full"
      >
        {activities.map((item) => (
          <article
            key={item.href}
            className="group u-lift flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_2px_18px_-12px_rgb(20_20_20/0.5)]"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="u-zoom object-cover"
              />
              <ProductBadge label={item.badge} variant={item.badgeVariant} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-lg font-semibold transition-colors duration-500 ease-expo group-hover:text-raja-red">
                {item.title}
              </h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                {item.desc}
              </p>
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
