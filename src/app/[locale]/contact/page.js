import ContactHero from "@/components/contact/Hero";
import GetInTouch from "@/components/contact/GetInTouch";
import PageSchema from "@/components/PageSchema";
import dynamic from "next/dynamic";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const MessageForm = dynamic(() => import("@/components/contact/MessageForm"));

const title = "Contact Us";
const description =
  "Get in touch with Raja Bali Nusa Dua (Main Restaurant) or Raja Bali Nusa Dua (Dine-in Restaurant) for reservations, enquiries, and directions to both locations in Nusa Dua.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title,
    description,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const forms = await getDictionary(locale, "forms");

  return (
    <main>
      <PageSchema
        path="/contact"
        locale={locale}
        name={title}
        description={description}
        type="ContactPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us" }]}
        mainEntityId={`${SITE_URL}/#organization`}
      />
      <ContactHero />
      <GetInTouch />
      <MessageForm dict={forms.contact} common={forms.common} />
    </main>
  );
}