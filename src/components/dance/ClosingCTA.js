import LocalizedLink from "@/components/LocalizedLink";

export default function ClosingCTA({ content }) {
  return (
    <section className="py-24 px-6 text-center max-w-2xl mx-auto border-t border-gray-200 bg-white">
      <h2 className="text-3xl font-serif mb-4">{content.heading}</h2>
      <p className="text-gray-600 mb-2">
        {content.body}
      </p>
      <p className="text-sm font-semibold text-raja-red mb-8">
        {content.note}
      </p>
      <div className="flex gap-4 justify-center">
        <LocalizedLink href="/reservation-main" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">{content.reserveTable}</LocalizedLink>
        <LocalizedLink href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">{content.contactUs}</LocalizedLink>
      </div>
    </section>
  );
}
