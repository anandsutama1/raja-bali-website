import Accordion from "./Accordion";
import Reveal from "./motion/Reveal";
import FAQStructuredData from "./FAQStructuredData";
import { faqs } from "@/lib/faqs";

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl border-t border-gray-200 px-6 py-20">
      <FAQStructuredData />
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
