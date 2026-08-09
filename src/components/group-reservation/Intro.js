import Link from "next/link";

export default function Intro() {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">Corporate Dining in Bali</h2>
      <p className="text-gray-600 leading-relaxed">
        From team dinners and company gatherings to large corporate events, Raja Bali welcomes group dining with a carefully curated selection of authentic Balinese, Western, and Asian cuisine. Corporate dinners are also part of our wider{" "}
        <Link href="/private-events" className="font-semibold text-raja-red u-link">
          private events
        </Link>{" "}
        service, alongside weddings and other celebrations.
      </p>
    </section>
  );
}