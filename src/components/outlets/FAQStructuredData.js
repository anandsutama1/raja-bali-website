import { outletsFaqs } from "@/lib/outletsFaqs";

/**
 * FAQPage markup for /outlets' own FAQ section (see FAQ.js, which renders
 * the same `outletsFaqs` array visibly directly above this) — this page is
 * the entity hub distinguishing Main Restaurant from Nusa Dua, so this is
 * the clearest single place for Google/AI answer engines to resolve
 * "which location has the cooking/bar class and dance" queries.
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
    mainEntity: outletsFaqs.map((faq) => ({
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
      // Data is our own static config (src/lib/outletsFaqs.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
