import LocalizedLink from "@/components/LocalizedLink";

export default function WhatsIncluded({ content }) {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-14">{content.heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {content.items.map((item, index) => (
          <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-10">
        <LocalizedLink href="#reservation" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">{content.reserveNow}</LocalizedLink>
        <LocalizedLink href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">{content.contactUs}</LocalizedLink>
      </div>
    </section>
  );
}
