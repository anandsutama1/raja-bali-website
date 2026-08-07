import { faqs } from "@/lib/faqs";

/**
 * FAQPage markup for the homepage's "Plan Your Visit" accordion (see
 * FAQ.js, which renders the same `faqs` array visibly directly above this).
 *
 * Note for the SEO audit: since August 2023 Google limits the classic
 * expandable FAQ rich result (blue link + Q&A dropdown) to a small set of
 * authoritative government/health sites, so this markup is unlikely to
 * produce that specific rich result for a restaurant site. It's still
 * accurate, still valid per Rich Results Test, and still useful — it gives
 * Google and AI answer engines (AI Overviews, ChatGPT/Gemini/Perplexity
 * browsing) a clean, structured Q&A to cite directly.
 */
export default function FAQStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
      // Data is our own static config (src/lib/faqs.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
