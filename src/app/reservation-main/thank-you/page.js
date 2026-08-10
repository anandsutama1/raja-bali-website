import Link from "next/link";

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
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="mb-4 font-serif text-4xl">{title}</h1>
      <p className="max-w-md text-gray-600">
        Thank you for your reservation request at Raja Bali Main Restaurant. We&apos;ll be in touch shortly to confirm your reservation.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="bg-raja-black px-8 py-3 text-sm tracking-widest text-white transition hover:bg-raja-red"
        >
          Back to Raja Bali
        </Link>
        <Link
          href="/reservation-main"
          className="border border-raja-black px-8 py-3 text-sm tracking-widest transition hover:border-raja-red hover:text-raja-red"
        >
          Make Another Reservation
        </Link>
      </div>
    </main>
  );
}
