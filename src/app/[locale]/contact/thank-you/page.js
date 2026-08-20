import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful Contact Us form
// submission (see components/contact/MessageForm.js). Deliberately not
// wired into PageSchema/sitemap/navigation — transient per-guest
// confirmation, not indexable marketing content.
const title = "Thank You for Writing to Us";
const description = "Your message to Raja Bali has been sent.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/contact/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <ThankYou
      heading={title}
      body="Your message has reached us safely, and a member of our team will respond to you personally very soon."
      links={THANK_YOU_LINKS.contact}
    />
  );
}
