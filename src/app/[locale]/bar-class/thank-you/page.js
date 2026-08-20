import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful Bar Class form
// submission (see components/bar-class/ReservationForm.js). Deliberately
// not wired into PageSchema/sitemap/navigation — transient per-guest
// confirmation, not indexable marketing content.
const title = "Your Cocktail Class Booking Has Been Received";
const description =
  "Thank you for booking a place in our Balinese Cocktail Class at Raja Bali.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/bar-class/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <ThankYou
      heading={title}
      body="Thank you for booking a place in our Balinese Cocktail Class. We've received your request, and our team will get back to you shortly to confirm your session."
      links={THANK_YOU_LINKS["bar-class"]}
    />
  );
}
