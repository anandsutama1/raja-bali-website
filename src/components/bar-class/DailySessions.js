import Link from "next/link";

export default function DailySessions() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">Session Schedule</h2>
      <p className="text-center text-raja-red mb-14">
        Available Thursdays only, at{" "}
        <Link href="/reservation-main" className="u-link">
          Raja Bali Nusa Dua (Main Restaurant)
        </Link>
      </p>
      <div className="max-w-sm mx-auto border border-gray-200 border-t-2 border-t-raja-red rounded-lg bg-raja-cream p-8 text-center">
        <h3 className="font-semibold mb-2">Thursday Session</h3>
        <p className="text-2xl font-serif mb-3">3:00 PM</p>
        <p className="text-sm text-gray-600">
          An interactive afternoon of Balinese-inspired mixology, finishing with your own handcrafted cocktail.
        </p>
        <p className="mt-4 border-t border-raja-red/20 pt-4 text-sm font-semibold text-raja-red">
          It's a package: stay on and enjoy the complimentary{" "}
          <Link href="/dance" className="u-link">
            Balinese dance performance
          </Link>{" "}
          from 7 PM, free for dining guests, same Thursday visit.
        </p>
      </div>
    </section>
  );
}
