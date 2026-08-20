/**
 * FAQPage markup for the Main Restaurant page's own FAQ section (see
 * FAQ.js, which renders the same `faqs` array visibly directly above
 * this). `faqs` comes from the page's own getDictionary(locale, "faqs")
 * call.
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
