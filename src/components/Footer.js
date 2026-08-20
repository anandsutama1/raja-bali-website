import Image from "next/image";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";
import LocalizedLink from "./LocalizedLink";

export default function Footer({ dict }) {
  const f = dict.footer;
  const columns = [
    {
      heading: f.exploreHeading,
      links: [
        { href: "/", label: f.home },
        { href: "/about", label: f.about },
        { href: "/menu/food", label: f.menu },
        { href: "/outlets", label: f.outlets },
      ],
    },
    {
      heading: f.experiencesHeading,
      links: [
        { href: "/cooking-class", label: dict.nav.cookingClass },
        { href: "/bar-class", label: dict.nav.barClass },
        { href: "/dance", label: dict.nav.dance },
        { href: "/private-events", label: dict.nav.privateEvents },
        { href: "/group-reservation", label: dict.nav.groupReservation },
      ],
    },
  ];

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
          <p className="mb-6 text-sm leading-relaxed text-gray-400">{f.tagline}</p>
          <LocalizedLink
            href="/contact"
            className="u-press inline-block bg-white px-6 py-2.5 text-sm tracking-widest text-raja-black hover:bg-raja-red hover:text-white"
          >
            {f.contactUs}
          </LocalizedLink>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="mb-3 font-semibold">{column.heading}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {column.links.map((link) => (
                <li key={link.href}>
                  <LocalizedLink
                    href={link.href}
                    className="u-link transition-colors duration-500 ease-expo hover:text-raja-red"
                  >
                    {link.label}
                  </LocalizedLink>
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
        <p>{f.copyright}</p>
        <p>{f.hours}</p>
      </Reveal>
    </footer>
  );
}
