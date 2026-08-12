import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful reservation-main form
// submission (see components/reservation-main/ReservationForm.js) — this is
// the intended Google Ads conversion destination URL. Deliberately not
// wired into PageSchema/sitemap/navigation: it's a transient per-guest
// confirmation, not indexable marketing content.
//
// Table reservations at both outlets are auto-confirmed on submit (see the
// TABLE_RESERVATION_TYPES comment in app/api/submit-form/route.js — seating
// isn't capacity-constrained the way a class session or private event is),
// so this says "confirmed", matching the guest email's BOOKING_COPY exactly
// — unlike every other form type below, which is still pending a human
// reply and says so.
const title = "Your Table Is Confirmed";
const description =
  "Your table reservation at Raja Bali Nusa Dua (Main Restaurant) is confirmed.";

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
      body="Thank you for reserving a table with Raja Bali Nusa Dua (Main Restaurant). Your reservation is confirmed, and we're looking forward to welcoming you."
      links={THANK_YOU_LINKS["reservation-main"]}
    />
  );
}
