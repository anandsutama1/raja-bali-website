import Image from "next/image";
import Link from "next/link";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";

const menus = [
  { title: "Beverage Menu", href: "/menu/beverage", image: "/images/home/Beverage-Menu.jpg" },
  { title: "Food Menu", href: "/menu/food", image: "/images/home/Food-Menu.jpg" },
  { title: "Group Menu", href: "/group-reservation", image: "/images/home/Group-Menu.jpg" },
];

export default function Menus() {
  return (
    <section className="border-t border-gray-200 px-6 py-20 md:py-24">
      <Reveal as="h2" className="mb-12 text-center font-serif text-3xl">
        Explore the menus.
      </Reveal>

      <Stagger
        step={110}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        itemClassName="h-full"
      >
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="group u-lift flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="u-zoom absolute inset-0">
                <Image
                  src={menu.image}
                  alt={menu.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <span className="flex flex-1 items-center justify-center gap-2 p-5 font-serif text-lg tracking-wide transition-colors duration-500 ease-expo group-hover:text-raja-red">
              {menu.title}
              <span className="u-nudge inline-block text-raja-red opacity-0 transition-opacity duration-500 ease-expo group-hover:opacity-100">
                →
              </span>
            </span>
          </Link>
        ))}
      </Stagger>
    </section>
  );
}
