import dynamic from "next/dynamic";
import FAQStructuredData from "./FAQStructuredData";
import LocalizedLink from "@/components/LocalizedLink";

// Below the fold on every page that uses it — its open/close JS ships in
// its own chunk instead of the initial bundle.
const Accordion = dynamic(() => import("@/components/Accordion"));

// Entries with `aLinkLabel` (rather than a plain `a`) render an inline link
// spliced into the answer (e.g. "Our Private Events page has more
// detail...") while FAQStructuredData reads the plain-text concatenation
// of the same fields — same words either way, just a hyperlink on top.
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
      <h2 className="mb-2 text-center font-serif text-3xl">{heading}</h2>
      <p className="mb-10 text-center text-gray-600">{subheading}</p>
      <Accordion items={withLinks(faqs)} />
    </section>
  );
}
