import LocalizedLink from "@/components/LocalizedLink";

export default function EventSpaces({ content }) {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <div className="flex items-start gap-10 mb-10">
        <div className="border-l-2 border-raja-red pl-4">
          <h2 className="text-4xl font-serif">{content.heading}</h2>
          <p className="text-raja-red">{content.subheading}</p>
        </div>
        <p className="text-gray-600 flex-1">
          {content.intro}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {content.spaces.map((space, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">{space.title}</h3>
            <p className="text-sm text-gray-600">{space.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <h3 className="text-2xl font-serif mb-4">{content.eventPlanningHeading}</h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          {content.eventPlanningBody}
        </p>
        <div className="flex gap-4 justify-center">
          <LocalizedLink href="#reservation" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">{content.reserveNow}</LocalizedLink>
          <LocalizedLink href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">{content.contactUs}</LocalizedLink>
        </div>
      </div>
    </section>
  );
}
