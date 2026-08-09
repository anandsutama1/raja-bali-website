import { groupReservationFaqs } from "@/lib/groupReservationFaqs";

/**
 * FAQPage markup for this page's own FAQ section (see FAQ.js, which
 * renders the same `groupReservationFaqs` array visibly directly above
 * this) — page-specific, separate from the homepage's FAQPage in
 * components/FAQStructuredData.js.
 *
 * Same caveat as the homepage's: since August 2023 Google limits the
 * classic expandable FAQ rich result to a small set of authoritative
 * government/health sites, so this is unlikely to win that specific rich
 * result. Still valid, still accurate, still useful for Google/AI answer
 * engines to cite directly.
 */
export default function FAQStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groupReservationFaqs.map((faq) => ({
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
      // Data is our own static config (src/lib/groupReservationFaqs.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
