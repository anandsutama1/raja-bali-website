/**
 * FAQPage markup for /dance's own FAQ section (see FAQ.js, which renders
 * the same `faqs` array visibly directly above this) — separate from the
 * Event markup in components/dance/StructuredData.js, which already
 * carries the same facts (startDate/endDate, location) in Event form. This
 * gives Google/AI answer engines a direct Q&A to cite for "when"/"is it
 * free"/"where" queries specifically. `faqs` comes from the page's own
 * getDictionary(locale, "faqs") call.
 *
 * Same caveat as the other FAQPage instances on this site: since August
 * 2023 Google limits the classic expandable FAQ rich result to a small set
 * of authoritative government/health sites, so this markup is unlikely to
 * win that specific rich result. Still valid, still accurate, still useful
 * for Google/AI answer engines to cite directly.
 */
export default function FAQStructuredData({ faqs }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a ?? `${faq.aPrefix}${faq.aLinkLabel}${faq.aSuffix}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config (dictionaries/*/faqs.json), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
