import { danceFaqs } from "@/lib/danceFaqs";

/**
 * FAQPage markup for /dance's own FAQ section (see FAQ.js, which renders
 * the same `danceFaqs` array visibly directly above this) — separate from
 * the Event markup in components/dance/StructuredData.js, which already
 * carries the same facts (startDate/endDate, location) in Event form. This
 * gives Google/AI answer engines a direct Q&A to cite for "when"/"is it
 * free"/"where" queries specifically.
 *
 * Same caveat as the other FAQPage instances on this site: since August
 * 2023 Google limits the classic expandable FAQ rich result to a small set
 * of authoritative government/health sites, so this markup is unlikely to
 * win that specific rich result. Still valid, still accurate, still useful
 * for Google/AI answer engines to cite directly.
 */
export default function FAQStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: danceFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config (src/lib/danceFaqs.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
