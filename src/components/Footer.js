import Image from "next/image";
import Link from "next/link";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/menu/food", label: "Menu" },
      { href: "/outlets", label: "Outlets" },
    ],
  },
  {
    heading: "Experiences",
    links: [
      { href: "/cooking-class", label: "Balinese Cooking Class" },
      { href: "/bar-class", label: "Balinese Bar Class" },
      { href: "/dance", label: "Balinese Dance Performance" },
      { href: "/private-events", label: "Private Events" },
      { href: "/group-reservation", label: "Group Reservation" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-raja-black px-6 py-16 text-white">
      <Stagger
        step={110}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3"
      >
        <div>
          <Image
            src="/images/RajaBali_Footer.png"
            alt="Raja Bali, an authentic Balinese restaurant"
            width={704}
            height={354}
            className="mb-4 h-16 w-auto"
          />
          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            Experience the authentic flavors, rich traditions, and warm
            hospitality of Bali.
          </p>
          <Link
            href="/contact"
            className="u-press inline-block bg-white px-6 py-2.5 text-sm tracking-widest text-raja-black hover:bg-raja-red hover:text-white"
          >
            CONTACT US
          </Link>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="mb-3 font-semibold">{column.heading}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="u-link transition-colors duration-500 ease-expo hover:text-raja-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Stagger>

      <Reveal
        delay={200}
        className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 border-t border-white/15 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; 2026 Raja Bali. All rights reserved.</p>
        <p>
          Mon - Fri: 12.00 PM - 9.00 PM &nbsp;|&nbsp; Sat - Sun: 12.00 PM -
          9.00 PM &nbsp;|&nbsp; Holiday: 12.00 PM - 9.00 PM
        </p>
      </Reveal>
    </footer>
  );
}
