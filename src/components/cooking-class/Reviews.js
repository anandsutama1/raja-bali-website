import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import { LOCATIONS } from "@/lib/site";

// Real Google reviews for the cooking class, quoted verbatim (only stray
// whitespace around punctuation cleaned up). Client-supplied on
// 2026-09-22, sourced from the Main Restaurant's Google Business listing,
// which sits at 4.9/5. No avatar photos are available for these reviewers
// (unlike components/Testimonials.js's Tripadvisor set, which has real
// photos on file), so ReviewCard shows an initials badge instead of a
// fabricated headshot. `title` is only set for the two reviews that
// actually opened with a title-like line, never invented for the rest.
const reviews = [
  { name: "Lizza Padriquela", title: "Such a wonderful and memorable Balinese cooking experience!", text: "We absolutely loved our cooking class at Raja Bali! We were so lucky that it ended up being just the two of us for the whole class, so the experience felt incredibly personal and almost like having our own private cooking class." },
  { name: "Ma Ho", title: "Excellent and Fun Cooking Class!", text: "The staff was super friendly, and the chef was very professional and spoke good English. The class was well-organized, hands-on, and a lot of fun." },
  { name: "Mary Bee", text: "The chefs and all the staff were so nice, cooking instructions were clear. We had so much fun. After cooking we sat down in the garden at sunset and ate the delicious food we cooked." },
  { name: "Sean and Rina Smith", text: "Staff, atmosphere & food was 5 star!! We did this class with our 2 children (11 & 9) who absolutely loved it!! They have free shuttle service to Nusa Dua hotels." },
  { name: "Dana Forte", text: "We just finished the best cooking class in Bali. We have allergies so chose the vegan menu. The chef was prepared, kind, helpful and the meal was plentiful." },
  { name: "Laura Jago", text: "The food was incredible. Lots of amazing flavours. I would highly recommend this cooking class to others!" },
];

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ review, googleLabel }) {
  return (
    <blockquote className="u-lift w-64 shrink-0 rounded-lg border border-gray-200 bg-white px-6 py-8 text-center sm:w-72 md:w-80">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-raja-red/10 font-serif text-lg text-raja-red">
        {initials(review.name)}
      </div>
      <p className="mb-1 font-serif text-lg">{review.name}</p>
      <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">{googleLabel}</p>
      {review.title && (
        <p className="mb-2 text-sm font-semibold underline decoration-raja-red/40 underline-offset-4">
          {review.title}
        </p>
      )}
      <p className="text-xs italic leading-relaxed text-gray-500">{review.text}</p>
    </blockquote>
  );
}

export default function Reviews({ content }) {
  const googleReviewUrl = LOCATIONS[0].hasMap;

  return (
    <section className="overflow-hidden border-t border-gray-200 py-20 md:py-24">
      <Reveal as="h2" className="mb-2 px-6 text-center font-serif text-3xl">
        {content.heading}
      </Reveal>
      <Reveal as="p" delay={90} className="mb-12 px-6 text-center text-raja-red">
        {content.subheading}
      </Reveal>

      <Marquee speed={50} gap={20} direction="right" fadeClassName="from-white" className="mb-8">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} googleLabel={content.googleReviewLabel} />
        ))}
      </Marquee>

      {googleReviewUrl && (
        <Reveal as="p" delay={100} className="px-6 text-center">
          <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="u-link text-sm text-raja-red">
            {content.viewOnGoogle}
          </a>
        </Reveal>
      )}
    </section>
  );
}
