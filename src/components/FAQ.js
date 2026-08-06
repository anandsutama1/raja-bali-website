import Accordion from "./Accordion";
import Reveal from "./motion/Reveal";

const faqs = [
  { q: "Do you offer complimentary hotel pick-up and drop-off?", a: "Yes. We provide complimentary return transfers for guests staying in selected areas around Nusa Dua." },
  { q: "Where can I watch the Balinese Dance Performance?", a: "The Balinese Dance Performance is complimentary for dining guests and held exclusively at Raja Bali Main Restaurant in Tanjung Benoa, every Thursday evening. It isn't held at our second outlet, Raja Bali Nusa Dua, even though both are in the same general area." },
  { q: "Do I need to make a reservation?", a: "Reservations are recommended, especially during dinner hours and peak holiday seasons." },
  { q: "Do you accept credit cards?", a: "Yes. We accept major credit and debit cards, as well as cash payments." },
  { q: "Do you serve halal food?", a: "Yes. We offer a variety of halal-friendly dishes." },
  { q: "Do you offer vegetarian options?", a: "Yes. We have vegetarian selections." },
  { q: "Is the restaurant wheelchair accessible?", a: "Absolutely. Raja Bali Restaurant welcomes all guests and offers wheelchair-accessible access." },
  { q: "Do you have a children's menu?", a: "Yes. We offer child-friendly menu options." },
  { q: "Can you accommodate large groups or private events?", a: "Certainly. Please contact us in advance so we can arrange the best dining experience." },
  { q: "Is parking available?", a: "Yes. Raja Bali Main Restaurant in Tanjung Benoa offers a large on-site parking area for guests." },
];

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl border-t border-gray-200 px-6 py-20">
      <Reveal as="h2" className="mb-2 text-center font-serif text-3xl">
        Plan Your Visit
      </Reveal>
      <Reveal as="p" delay={90} className="mb-10 text-center text-gray-600">
        Everything You Need to Know
      </Reveal>

      <Reveal delay={150}>
        <Accordion items={faqs} />
      </Reveal>
    </section>
  );
}
