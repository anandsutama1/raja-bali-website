import dynamic from "next/dynamic";
import Reveal from "./motion/Reveal";
import FAQStructuredData from "./FAQStructuredData";
import LocalizedLink from "./LocalizedLink";

// Below the fold on every page that uses it — its open/close JS ships in
// its own chunk instead of the initial bundle.
const Accordion = dynamic(() => import("./Accordion"));

// Entries with `aLinkLabel` (rather than a plain `a`) render an inline link
// spliced into the answer — FAQStructuredData reads the plain-text
// concatenation of the same fields, so the two surfaces never disagree.
function withLinks(faqs) {
  return faqs.map((faq) =>
    faq.aLinkLabel
      ? {
          ...faq,
          a: (
            <>
              {faq.aPrefix}
              <LocalizedLink href={faq.aLinkHref} className="font-semibold text-raja-red u-link">
                {faq.aLinkLabel}
              </LocalizedLink>
              {faq.aSuffix}
            </>
          ),
        }
      : faq
  );
}

export default function FAQ({ faqs, heading, subheading }) {
  return (
    <section className="mx-auto max-w-3xl border-t border-gray-200 px-6 py-20">
      <FAQStructuredData faqs={faqs} />
      <Reveal as="h2" className="mb-2 text-center font-serif text-3xl">
        {heading}
      </Reveal>
      <Reveal as="p" delay={90} className="mb-10 text-center text-gray-600">
        {subheading}
      </Reveal>

      <Reveal delay={150}>
        <Accordion items={withLinks(faqs)} />
      </Reveal>
    </section>
  );
}
