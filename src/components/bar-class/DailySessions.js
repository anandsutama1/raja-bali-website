import LocalizedLink from "@/components/LocalizedLink";

export default function DailySessions({ content }) {
  return (
    <section className="border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">{content.heading}</h2>
      <p className="text-center text-raja-red mb-14">
        {content.subheadingPrefix}
        <LocalizedLink href="/reservation-main" className="u-link">
          {content.subheadingLinkLabel}
        </LocalizedLink>
      </p>
      <div className="max-w-sm mx-auto border border-gray-200 border-t-2 border-t-raja-red rounded-lg bg-raja-cream p-8 text-center">
        <h3 className="font-semibold mb-2">{content.sessionName}</h3>
        <p className="text-2xl font-serif mb-3">{content.time}</p>
        <p className="text-sm text-gray-600">
          {content.body}
        </p>
        <p className="mt-4 border-t border-raja-red/20 pt-4 text-sm font-semibold text-raja-red">
          {content.notePrefix}
          <LocalizedLink href="/dance" className="u-link">
            {content.noteLinkLabel}
          </LocalizedLink>
          {content.noteSuffix}
        </p>
      </div>
    </section>
  );
}
