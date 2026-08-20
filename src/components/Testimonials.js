import Image from "next/image";
import Reveal from "./motion/Reveal";
import Marquee from "./motion/Marquee";
import LocalizedLink from "./LocalizedLink";
import { LOCATIONS } from "@/lib/site";

// Real guest reviews, quoted verbatim — kept in their original English
// regardless of site locale (translating someone's direct quote would
// misrepresent what they actually wrote).
const reviews = [
  { name: "Trix39", title: "Don't miss this dining experience", text: "We had a fabulous meal at Raja's Bali. The food was honest to goodness Balinese food. Fresh, delicious.", avatar: "/images/home/Review1.png" },
  { name: "E B", title: "Delicious and interactive", text: "We participated in a Balinese cooking class in this restaurant. We loved the teaching, the accompaniment, and the final tasting.", avatar: "/images/home/Review2.png" },
  { name: "March H", title: "Excellent Balinese Dining Experience", text: "During my stay in Nusa Dua, I visited Raja Bali Restaurant based on a recommendation, and it exceeded all expectations.", avatar: "/images/home/Review3.png" },
  { name: "Makushkin_AS", title: "Delicious, soulful, positive", text: "We really enjoyed the restaurant. Everything is clean, delicious, many dishes are Bali cuisine.", avatar: "/images/home/Review4.png" },
  { name: "Easy l", title: "Overall great experience!", text: "We were here as a guest and it felt for us like a big family. It was an overall perfect experience.", avatar: "/images/home/Review5.png" },
];

function ReviewCard({ review }) {
  return (
    <blockquote className="u-lift w-64 shrink-0 rounded-lg border border-gray-200 bg-white px-6 py-8 text-center sm:w-72 md:w-80">
      <div className="relative mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full">
        <Image src={review.avatar} alt={review.name} fill sizes="64px" className="object-cover" />
      </div>
      <p className="mb-1 font-serif text-lg">{review.name}</p>
      <p className="mb-3 text-sm tracking-[0.3em] text-emerald-600">★★★★★</p>
      <p className="mb-2 text-sm font-semibold underline decoration-raja-red/40 underline-offset-4">
        {review.title}
      </p>
      <p className="text-xs italic leading-relaxed text-gray-500">
        {review.text}
      </p>
    </blockquote>
  );
}

export default function Testimonials({ content }) {
  // Google Business Profile share link, provided directly by the business
  // (LOCATIONS[0] = Main Restaurant) — see src/lib/site.js for the source note.
  const googleReviewUrl = LOCATIONS[0].hasMap;

  return (
    <section className="overflow-hidden border-t border-gray-200 py-20 md:py-24">
      <Reveal as="h2" className="mb-2 px-6 text-center font-serif text-3xl">
        {content.heading}
      </Reveal>
      <Reveal as="p" delay={90} className="mb-6 px-6 text-center text-raja-red">
        {content.subheading}
      </Reveal>

      <div className="px-6">
        <Reveal
          as="p"
          delay={130}
          className="mx-auto mb-12 max-w-2xl border-l-4 border-raja-red pl-6 text-left text-sm leading-relaxed text-gray-600"
        >
          {content.intro}
        </Reveal>
      </div>

      <Marquee
        speed={50}
        gap={20}
        direction="right"
        fadeClassName="from-raja-cream"
        className="mb-14"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </Marquee>

      {googleReviewUrl && (
        <Reveal as="p" delay={100} className="mb-6 px-6 text-center">
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-sm text-raja-red"
          >
            {content.leaveGoogleReview}
          </a>
        </Reveal>
      )}

      <Reveal
        delay={120}
        className="flex flex-col justify-center gap-3 px-6 sm:flex-row sm:gap-4"
      >
        <LocalizedLink
          href="/outlets"
          className="u-press bg-raja-black px-8 py-3 text-center text-sm tracking-widest text-white hover:bg-raja-red"
        >
          {content.reserveTable}
        </LocalizedLink>
        <LocalizedLink
          href="/private-events"
          className="u-press border border-raja-black px-8 py-3 text-center text-sm tracking-widest hover:border-raja-red hover:text-raja-red"
        >
          {content.planEvent}
        </LocalizedLink>
      </Reveal>
    </section>
  );
}
