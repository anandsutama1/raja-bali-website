import { barClassFaqs } from "@/lib/barClassFaqs";

/**
 * FAQPage markup for /bar-class's own FAQ section (see FAQ.js, which
 * renders the same `barClassFaqs` array visibly directly above this) —
 * this is currently the weakest-ranked experience page, so a direct Q&A
 * covering where/when/price/Nusa-Dua-disambiguation gives Google/AI
 * answer engines a clean target for exactly those queries.
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
    mainEntity: barClassFaqs.map((faq) => ({
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
      // Data is our own static config (src/lib/barClassFaqs.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
