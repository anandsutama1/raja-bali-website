import { Ibarra_Real_Nova } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const ibarra = Ibarra_Real_Nova({
  subsets: ["latin"],
  variable: "--font-ibarra",
  display: "swap",
});

const description =
  "Raja Bali is one of the best restaurants in Bali, a Tripadvisor Travelers' Choice Award winner for five consecutive years, offering authentic Balinese cuisine in Nusa Dua and Tanjung Benoa, cultural dance performances, and hands-on cooking and cocktail classes.";

export const metadata = {
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
    "Balinese restaurant Tanjung Benoa",
    "authentic Balinese cuisine",
    "Tripadvisor Travelers Choice Award Bali",
    "Balinese cooking class",
    "Balinese dance performance Bali",
    "Balinese cocktail class",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Authentic Balinese Restaurant`,
    description,
    images: [{ url: "/images/shared/og-cover-dance.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Authentic Balinese Restaurant`,
    description,
    images: ["/images/shared/og-cover-dance.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141414",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <body className={`${ibarra.variable} font-serif bg-white text-raja-black`}>
        {/* beforeInteractive runs before hydration, so reveal elements never
            flash their hidden state and never get stuck hidden without JS. */}
        <Script id="no-js" strategy="beforeInteractive">
          {`document.documentElement.classList.remove('no-js')`}
        </Script>
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
