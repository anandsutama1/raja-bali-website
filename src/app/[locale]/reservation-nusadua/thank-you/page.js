import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

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
const description = "Your table reservation at Raja Bali Nusa Dua (Dine-in Restaurant) is confirmed.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content-thank-you");
  return {
    title: content.reservationNusadua.heading,
    description,
    alternates: localeAlternates(locale, "/reservation-nusadua/thank-you"),
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({ params }) {
  const { locale } = await params;
  const [content, common] = await Promise.all([
    getDictionary(locale, "content-thank-you"),
    getDictionary(locale, "common"),
  ]);

  return (
    <ThankYou
      heading={content.reservationNusadua.heading}
      body={content.reservationNusadua.body}
      links={getThankYouLinks(common.thankYouLinks)["reservation-nusadua"]}
      mayAlsoLikeLabel={common.thankYouMayAlsoLike}
    />
  );
}
