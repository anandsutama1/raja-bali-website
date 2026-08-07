import { nusaDuaFaqs } from "@/lib/nusaDuaFaqs";

/**
 * FAQPage markup for this page's own FAQ section (see FAQ.js, which
 * renders the same `nusaDuaFaqs` array visibly directly above this) —
 * page-specific, separate from the homepage's and Main Restaurant's.
 *
 * Same caveat as those: since August 2023 Google limits the classic
 * expandable FAQ rich result to a small set of authoritative
 * government/health sites, so this is unlikely to win that specific rich
 * result. Still valid, still accurate, still useful for Google/AI answer
 * engines to cite directly.
 */
export default function FAQStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: nusaDuaFaqs.map((faq) => ({
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
      // Data is our own static config (src/lib/nusaDuaFaqs.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
