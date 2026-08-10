import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful reservation-main form
// submission (see components/reservation-main/ReservationForm.js) — this is
// the intended Google Ads conversion destination URL. Deliberately not
// wired into PageSchema/sitemap/navigation: it's a transient per-guest
// confirmation, not indexable marketing content.
const title = "Reservation Request Received";
const description =
  "Thank you for your reservation request at Raja Bali Main Restaurant.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/reservation-main/thank-you" },
  // Confirmation page only — must never be indexed or followed for link
  // equity, so it can't compete in search or leak crawl budget.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <ThankYou
      heading={title}
      body="Thank you for your reservation request at Raja Bali Main Restaurant. We'll be in touch shortly to confirm your reservation."
      links={THANK_YOU_LINKS["reservation-main"]}
    />
  );
}
