import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful reservation-nusadua
// form submission (see components/reservation-nusadua/ReservationForm.js).
// Deliberately not wired into PageSchema/sitemap/navigation — transient
// per-guest confirmation, not indexable marketing content.
const title = "Thank You for Your Reservation!";
const description =
  "Thank you for your reservation request at Raja Bali Nusa Dua.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/reservation-nusadua/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <ThankYou
      heading={title}
      body="We look forward to welcoming you to Raja Bali Nusa Dua."
      links={THANK_YOU_LINKS["reservation-nusadua"]}
    />
  );
}
