import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

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
// — unlike every other form type, which is still pending a human reply and
// says so.
const description = "Your table reservation at Raja Bali Nusa Dua (Main Restaurant) is confirmed.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content-thank-you");
  return {
    title: content.reservationMain.heading,
    description,
    alternates: localeAlternates(locale, "/reservation-main/thank-you"),
    // Confirmation page only — must never be indexed or followed for link
    // equity, so it can't compete in search or leak crawl budget.
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
      heading={content.reservationMain.heading}
      body={content.reservationMain.body}
      links={getThankYouLinks(common.thankYouLinks)["reservation-main"]}
      mayAlsoLikeLabel={common.thankYouMayAlsoLike}
    />
  );
}
