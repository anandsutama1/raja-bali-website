import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import AvatarWithFallback from "@/components/AvatarWithFallback";
import { LOCATIONS } from "@/lib/site";

// Real Google reviews for the cooking class, quoted verbatim (only stray
// whitespace around punctuation cleaned up). Client-supplied on
// 2026-09-22, sourced from the Main Restaurant's Google Business listing,
// which sits at 4.9/5 from 100+ reviews (see content-cooking-class.json's
// reviews.subheading). `title` is only set for the two reviews that
// actually opened with a title-like line, never invented for the rest.
//
// `avatar` is the exact filename to drop into
// public/images/cooking-class/reviews/, named after the reviewer, all
// lowercase with hyphens, .jpg or .png. Until a file exists at that path,
// AvatarWithFallback shows the reviewer's initials instead of a broken
// image, so it's safe to drag files in one at a time.
const reviews = [
  { name: "Lizza Padriquela", avatar: "lizza-padriquela.jpg", title: "Such a wonderful and memorable Balinese cooking experience!", text: "We absolutely loved our cooking class at Raja Bali! We were so lucky that it ended up being just the two of us for the whole class, so the experience felt incredibly personal and almost like having our own private cooking class." },
  { name: "Ma Ho", avatar: "ma-ho.jpg", title: "Excellent and Fun Cooking Class!", text: "The staff was super friendly, and the chef was very professional and spoke good English. The class was well-organized, hands-on, and a lot of fun." },
  { name: "Mary Bee", avatar: "mary-bee.jpg", text: "The chefs and all the staff were so nice, cooking instructions were clear. We had so much fun. After cooking we sat down in the garden at sunset and ate the delicious food we cooked." },
  { name: "Sean and Rina Smith", avatar: "sean-and-rina-smith.jpg", text: "Staff, atmosphere & food was 5 star!! We did this class with our 2 children (11 & 9) who absolutely loved it!! They have free shuttle service to Nusa Dua hotels." },
  { name: "Dana Forte", avatar: "dana-forte.jpg", text: "We just finished the best cooking class in Bali. We have allergies so chose the vegan menu. The chef was prepared, kind, helpful and the meal was plentiful." },
  { name: "Laura Jago", avatar: "laura-jago.jpg", text: "The food was incredible. Lots of amazing flavours. I would highly recommend this cooking class to others!" },
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
      <AvatarWithFallback
        src={`/images/cooking-class/reviews/${review.avatar}`}
        alt={review.name}
        initials={initials(review.name)}
      />
      <p className="mb-1 font-serif text-lg">{review.name}</p>
      <p className="mb-1 text-sm tracking-[0.3em] text-emerald-600">★★★★★</p>
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
