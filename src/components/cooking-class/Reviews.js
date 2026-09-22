import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";

// Real guest reviews, quoted verbatim (same source and photos as
// components/Testimonials.js's homepage marquee) — reordered here so the
// review that actually names the cooking class leads, instead of the
// homepage's general dining-first order. Translating a direct quote would
// misrepresent what the guest wrote, so these stay in their original
// English regardless of site locale, same as Testimonials.js.
const reviews = [
  { name: "E B", title: "Delicious and interactive", text: "We participated in a Balinese cooking class in this restaurant. We loved the teaching, the accompaniment, and the final tasting.", avatar: "/images/home/Review2.png" },
  { name: "Trix39", title: "Don't miss this dining experience", text: "We had a fabulous meal at Raja's Bali. The food was honest to goodness Balinese food. Fresh, delicious.", avatar: "/images/home/Review1.png" },
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
      <p className="text-xs italic leading-relaxed text-gray-500">{review.text}</p>
    </blockquote>
  );
}

export default function Reviews({ content }) {
  return (
    <section className="overflow-hidden border-t border-gray-200 py-20 md:py-24">
      <Reveal as="h2" className="mb-2 px-6 text-center font-serif text-3xl">
        {content.heading}
      </Reveal>
      <Reveal as="p" delay={90} className="mb-12 px-6 text-center text-raja-red">
        {content.subheading}
      </Reveal>

      <Marquee speed={50} gap={20} direction="right" fadeClassName="from-white">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </Marquee>
    </section>
  );
}
