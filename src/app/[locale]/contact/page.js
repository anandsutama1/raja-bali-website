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

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { contact } = await getDictionary(locale, "metadata");
  return {
    title: contact.title,
    description: contact.description,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const [meta, forms, contact] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "forms"),
    getDictionary(locale, "content-contact"),
  ]);

  return (
    <main>
      <PageSchema
        path="/contact"
        locale={locale}
        name={meta.contact.title}
        description={meta.contact.description}
        type="ContactPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us" }]}
        mainEntityId={`${SITE_URL}/#organization`}
      />
      <ContactHero content={contact.hero} />
      <GetInTouch content={contact.getInTouch} />
      <MessageForm dict={forms.contact} common={forms.common} />
    </main>
  );
}