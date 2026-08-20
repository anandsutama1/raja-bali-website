/**
 * FAQPage markup for the homepage's "Plan Your Visit" accordion (see
 * FAQ.js, which renders the same `faqs` array visibly directly above this).
 * `faqs` is passed down from the page's own getDictionary(locale, "faqs")
 * call, so the visible accordion and this structured data are always
 * reading the same (already-localized) array.
 *
 * Note for the SEO audit: since August 2023 Google limits the classic
 * expandable FAQ rich result (blue link + Q&A dropdown) to a small set of
 * authoritative government/health sites, so this markup is unlikely to
 * produce that specific rich result for a restaurant site. It's still
 * accurate, still valid per Rich Results Test, and still useful — it gives
 * Google and AI answer engines (AI Overviews, ChatGPT/Gemini/Perplexity
 * browsing) a clean, structured Q&A to cite directly.
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
        // Entries with a link split (aPrefix/aLinkLabel/aSuffix) concatenate
        // back to the same plain-text answer FAQ.js renders with a
        // hyperlink spliced in — same words either way.
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
