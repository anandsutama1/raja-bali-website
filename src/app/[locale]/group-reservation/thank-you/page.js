import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful group-reservation form
// submission (see components/group-reservation/ReservationForm.js).
// Deliberately not wired into PageSchema/sitemap/navigation — transient
// per-guest confirmation, not indexable marketing content.
const title = "Your Group Reservation Request Has Been Received";
const description =
  "Thank you for your group reservation request at Raja Bali.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/group-reservation/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <ThankYou
      heading={title}
      body="Thank you for your group reservation request. We've received your details, and our team will get back to you shortly to confirm availability and your buffet package."
      links={THANK_YOU_LINKS["group-reservation"]}
    />
  );
}
