import SmartImage from "./SmartImage";
import Reveal from "./motion/Reveal";
import { LOCATIONS } from "@/lib/site";

// Static grid of photos already shot for other pages, not a live embed —
// matches the sister site's (Mr Bob Bar and Grill) InstagramPreview.js
// pattern. The prior Elfsight embed was replaced: no third-party script to
// load/misbehave, and no dependency on the Instagram API staying connected.
const tiles = [
  { src: "/images/reservation-main/gallery-1.jpg", alt: "Dining at Raja Bali Nusa Dua (Main Restaurant)" },
  { src: "/images/cooking-class/Rectangle 12.jpg", alt: "Raja Bali's hands-on Balinese cooking class" },
  { src: "/images/bar-class/Rectangle 12.jpg", alt: "Raja Bali's Balinese cocktail class" },
  { src: "/images/dance/gallery-1.jpg", alt: "Balinese dance performance at Raja Bali" },
  { src: "/images/private-events/gallery-1.jpg", alt: "Private event hosted at Raja Bali" },
  { src: "/images/group-reservation/gallery-1.jpg", alt: "Group celebration at Raja Bali" },
];

export default function InstagramGrid({ content }) {
  const instagramHref = LOCATIONS[0].sameAs.find((url) => url.includes("instagram.com"));

  return (
    <section className="border-t border-gray-200 px-6 py-20">
      <Reveal as="p" className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-raja-red">
        {content.eyebrow}
      </Reveal>
      <Reveal as="h2" delay={90} className="mb-2 text-center font-serif text-3xl">
        {content.heading}
      </Reveal>
      <Reveal as="p" delay={130} className="mb-10 text-center text-sm text-gray-500">
        <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="hover:text-raja-red">
          @rajabalinusaduamainrestaurant
        </a>
      </Reveal>

      <Reveal delay={170} className="mx-auto grid max-w-3xl grid-cols-3 gap-2 sm:gap-3">
        {tiles.map((tile) => (
          <a
            key={tile.src}
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden"
          >
            <SmartImage
              src={tile.src}
              alt={tile.alt}
              sizes="(min-width: 640px) 30vw, 33vw"
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </a>
        ))}
      </Reveal>
    </section>
  );
}
