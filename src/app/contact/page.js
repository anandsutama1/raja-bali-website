import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/Hero";
import GetInTouch from "@/components/contact/GetInTouch";
import MessageForm from "@/components/contact/MessageForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Raja Bali Main Restaurant (Tanjung Benoa) or Raja Bali Nusa Dua — reservations, enquiries, and directions for both locations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <GetInTouch />
      <MessageForm />
      <Footer />
    </main>
  );
}