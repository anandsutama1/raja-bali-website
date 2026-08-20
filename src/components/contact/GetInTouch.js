import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";
import { LOCATIONS } from "@/lib/site";

const IMAGES = {
  "main-restaurant": "/images/contact/Main-Restaurant.jpg",
  "nusa-dua": "/images/contact/Nusadua-Restaurant.jpg",
};
const INSTAGRAM = {
  "main-restaurant": "@rajabalinusaduamainrestaurant",
  "nusa-dua": "@rajabalinusadua",
};
const RESERVE_HREF = {
  "main-restaurant": "/reservation-main",
  "nusa-dua": "/reservation-nusadua",
};

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.4l.6-3H13v-1.2c0-.5.3-.8.9-.8z" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function GetInTouch({ content }) {
  // Per-location display copy (desc/facebookLabel) comes from the dict, so
  // it's locale-aware — telephone/coords/Instagram URL stay sourced from
  // the shared LOCATIONS config (factual, not translatable).
  const locations = LOCATIONS.map((loc) => ({ ...loc, ...content.locations[loc.id] }));

  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-4xl font-serif text-center mb-6">{content.heading}</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        {content.intro}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {locations.map((loc) => {
          const whatsappDigits = loc.telephone.replace(/\D/g, "");
          const mapsHref = `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;

          return (
            <div key={loc.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={IMAGES[loc.id]}
                  alt={loc.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{loc.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{loc.desc}</p>
                <div className="text-sm space-y-2 text-gray-700">
                  <a
                    href={loc.sameAs[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-raja-red"
                  >
                    <InstagramIcon className="h-4 w-4 shrink-0" />
                    <span className="u-link">{INSTAGRAM[loc.id]}</span>
                  </a>
                  <a
                    href={loc.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-raja-red"
                  >
                    <FacebookIcon className="h-4 w-4 shrink-0" />
                    <span className="u-link">{loc.facebookLabel}</span>
                  </a>
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-raja-red"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0" />
                    <span className="u-link">{loc.telephone}</span>
                  </a>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-raja-red"
                  >
                    <MapPinIcon className="h-4 w-4 shrink-0" />
                    <span className="u-link">{content.viewOnGoogleMaps}</span>
                  </a>
                </div>
                <LocalizedLink
                  href={RESERVE_HREF[loc.id]}
                  className="u-press mt-5 inline-flex w-full items-center justify-center bg-raja-black px-6 py-3 text-sm tracking-widest text-white hover:bg-raja-red"
                >
                  {content.reserveTable}
                </LocalizedLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
