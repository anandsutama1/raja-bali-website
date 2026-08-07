import ContactHero from "@/components/contact/Hero";
import GetInTouch from "@/components/contact/GetInTouch";
import MessageForm from "@/components/contact/MessageForm";
import PageSchema from "@/components/PageSchema";
import { SITE_URL } from "@/lib/site";

const title = "Contact Us";
const description =
  "Get in touch with Raja Bali Main Restaurant (Tanjung Benoa) or Raja Bali Nusa Dua for reservations, enquiries, and directions to both locations.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageSchema
        path="/contact"
        name={title}
        description={description}
        type="ContactPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us" }]}
        mainEntityId={`${SITE_URL}/#organization`}
      />
      <ContactHero />
      <GetInTouch />
      <MessageForm />
    </main>
  );
}