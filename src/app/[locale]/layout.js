import { Ibarra_Real_Nova } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/i18n/config";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

const ibarra = Ibarra_Real_Nova({
  subsets: ["latin"],
  variable: "--font-ibarra",
  display: "swap",
});

// Prerenders both "en" and "zh" variants of every route at build time.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Site-wide fallback metadata — real per-page metadata (set by each
// page.js) overrides this via the title template below. Sourced from the
// "metadata" dictionary domain so title/description/OG/Twitter are all
// locale-correct, matching the canonical/hreflang alternates below.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { home } = await getDictionary(locale, "metadata");
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: home.titleDefault,
      template: `%s | ${SITE_NAME}`,
    },
    description: home.description,
    keywords: [
      "Raja Bali",
      "best restaurant in Bali",
      "top rated restaurant Bali",
      "Balinese restaurant Nusa Dua",
      "authentic Balinese cuisine",
      "Tripadvisor Travelers Choice Award Bali",
      "Balinese cooking class",
      "Balinese dance performance Bali",
      "Balinese cocktail class",
    ],
    alternates: localeAlternates(locale, "/"),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: home.titleOg,
      description: home.description,
      images: [{ url: "/images/shared/og-dance.jpg", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: home.titleOg,
      description: home.description,
      images: ["/images/shared/og-dance.jpg"],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141414",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const common = await getDictionary(locale, "common");

  return (
    <html lang={locale} className="no-js" suppressHydrationWarning>
      <body className={`${ibarra.variable} font-serif bg-white text-raja-black`}>
        {/* beforeInteractive runs before hydration, so reveal elements never
            flash their hidden state and never get stuck hidden without JS. */}
        <Script id="no-js" strategy="beforeInteractive">
          {`document.documentElement.classList.remove('no-js')`}
        </Script>
        {/* Deliberately still English-only regardless of locale — the
            site-wide JSON-LD business entity (address, hours, reviews)
            stays a single canonical schema.org node rather than being
            duplicated per language. */}
        <StructuredData />
        <Navbar dict={common} />
        {children}
        <Footer dict={common} />
        <SpeedInsights />
      </body>
    </html>
  );
}
