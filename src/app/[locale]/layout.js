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

const description =
  "Raja Bali is one of the best restaurants in Bali, a Tripadvisor Travelers' Choice Award winner for five consecutive years, offering authentic Balinese cuisine in Nusa Dua, cultural dance performances, and hands-on cooking and cocktail classes.";

// Prerenders both "en" and "zh" variants of every route at build time.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Site-wide fallback metadata — real per-page metadata (set by each
// page.js) overrides this via the title template below. Still English-only
// content for now (see the i18n migration plan; translated per-locale
// metadata comes from the "metadata" dictionary domain in a later phase) —
// only the canonical/hreflang alternates are locale-correct at this stage.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | One of the Best Restaurants in Bali`,
      template: `%s | ${SITE_NAME}`,
    },
    description,
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
      title: `${SITE_NAME} | Authentic Balinese Restaurant`,
      description,
      images: [{ url: "/images/shared/og-dance.jpg", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} | Authentic Balinese Restaurant`,
      description,
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
