import Image from "next/image";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";
import LocalizedLink from "./LocalizedLink";
import ImageWithFallback from "./ImageWithFallback";

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
        { href: "/venue-rental", label: dict.nav.venueRental },
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
        delay={160}
        className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-6 border-t border-white/15 pt-8 sm:flex-row sm:justify-between"
      >
        {/* Award badges (same Ctrip/Tripadvisor logos as the homepage's
            Recognition section), wrapped in a white pill since both logos
            are drawn for a light background, not the footer's dark one. */}
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white p-1.5">
            <Image src="/images/home/TripAdvisor.png" alt="Tripadvisor" width={40} height={40} className="h-full w-full object-contain" />
          </span>
          <span className="flex h-10 items-center rounded-md bg-white px-2">
            <Image src="/images/home/CTRIP.png" alt="Ctrip Gourmet List" width={72} height={32} className="h-7 w-auto object-contain" />
          </span>
        </div>

        {/* Card-brand strip, moved here from the reservation forms so it is
            shown once, site-wide, instead of repeated on every payment
            step. ImageWithFallback hides it entirely if the file is
            missing rather than showing a broken-image icon. */}
        <span className="flex h-10 items-center rounded-md bg-white px-3">
          <ImageWithFallback src="/images/shared/payment-methods.png" alt={f.paymentMethodsAlt} className="h-5 w-auto" />
        </span>
      </Reveal>

      <Reveal
        delay={200}
        className="mx-auto mt-6 flex max-w-5xl flex-col gap-3 border-t border-white/15 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>{f.copyright}</p>
        <p>{f.hours}</p>
      </Reveal>
    </footer>
  );
}
