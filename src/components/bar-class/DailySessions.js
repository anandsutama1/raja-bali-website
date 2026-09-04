import LocalizedLink from "@/components/LocalizedLink";

export default function DailySessions({ content }) {
  return (
    <section className="border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">{content.heading}</h2>
      <p className="text-center text-raja-red mb-14">{content.subheading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {content.sessions.map((s, index) => (
          <div key={index} className="border border-gray-200 border-t-2 border-t-raja-red rounded-lg bg-raja-cream p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{s.name}</h3>
              <span className="text-xs bg-white px-2 py-1">{s.tag}</span>
            </div>
            <p className="text-sm font-semibold mb-2">{s.time}</p>
            <p className="text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-sm border-t border-raja-red/20 pt-6 text-center text-sm font-semibold text-raja-red">
        {content.notePrefix}
        <LocalizedLink href="/dance" className="u-link">
          {content.noteLinkLabel}
        </LocalizedLink>
        {content.noteSuffix}
      </p>
    </section>
  );
}
