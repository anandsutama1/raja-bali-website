import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful private-events form
// submission (see components/private-events/ReservationForm.js).
// Deliberately not wired into PageSchema/sitemap/navigation — transient
// per-guest confirmation, not indexable marketing content.
const title = "Your Private Event Enquiry Has Been Received";
const description =
  "Thank you for your private event enquiry at Raja Bali.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/private-events/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <ThankYou
      heading={title}
      body="Thank you for reaching out about hosting your event with us. We've received your enquiry, and our events team will get back to you shortly to discuss the details."
      links={THANK_YOU_LINKS["private-events"]}
    />
  );
}
