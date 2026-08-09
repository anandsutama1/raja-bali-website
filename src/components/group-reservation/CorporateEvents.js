import Link from "next/link";

export default function CorporateEvents() {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">Corporate Events &amp; Company Gatherings</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Raja Bali can accommodate dining occasions ranging from individual reservations to corporate and larger group experiences. Business dinners, team gatherings, and corporate celebrations are all part of our regular group dining and private events service, alongside the indoor dining, garden, and group seating settings across our event spaces.
      </p>
      <p className="text-gray-600 leading-relaxed">
        Whether you&apos;re planning a company dinner, a team celebration, or a corporate gathering, our events team can help tailor the details — from buffet selection to dietary requirements — around your occasion, at either of{" "}
        <Link href="/outlets" className="font-semibold text-raja-red u-link">
          our Nusa Dua-area locations
        </Link>
        . Visit our{" "}
        <Link href="/private-events" className="font-semibold text-raja-red u-link">
          Private Events page
        </Link>{" "}
        for more on event planning at Raja Bali, or use the group reservation form below to check availability.
      </p>
    </section>
  );
}
