import LocalizedLink from "@/components/LocalizedLink";

export default function Intro({ content }) {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">
        {content.headingPrefix}<span className="text-raja-red">{content.headingAccent}</span>
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        {content.body}
      </p>
      <p className="text-sm font-semibold text-raja-red mb-10">
        {content.notePrefix}
        <LocalizedLink href="/outlets" className="u-link">
          {content.noteLinkLabel}
        </LocalizedLink>
        .
      </p>
      <div className="flex gap-4 justify-center">
        <LocalizedLink href="/reservation-main" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">{content.reserveTable}</LocalizedLink>
        <LocalizedLink href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">{content.contactUs}</LocalizedLink>
      </div>
    </section>
  );
}
