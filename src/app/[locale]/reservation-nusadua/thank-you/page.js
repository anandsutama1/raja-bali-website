import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

// Confirmation page reached only after a successful reservation-nusadua
// form submission (see components/reservation-nusadua/ReservationForm.js).
// Deliberately not wired into PageSchema/sitemap/navigation — transient
// per-guest confirmation, not indexable marketing content.
//
// Table reservations at both outlets are auto-confirmed on submit (see the
// TABLE_RESERVATION_TYPES comment in app/api/submit-form/route.js — seating
// isn't capacity-constrained the way a class session or private event is),
// so this says "confirmed", matching the guest email's BOOKING_COPY exactly
// — unlike every other form type below, which is still pending a human
// reply and says so.
const title = "Your Table Is Confirmed";
const description =
  "Your table reservation at Raja Bali Nusa Dua (Dine-in Restaurant) is confirmed.";

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
      body="Thank you for reserving a table with Raja Bali Nusa Dua (Dine-in Restaurant). Your reservation is confirmed, and we're looking forward to welcoming you."
      links={THANK_YOU_LINKS["reservation-nusadua"]}
    />
  );
}
