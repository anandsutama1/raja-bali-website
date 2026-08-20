export default function WhatsIncluded({ content }) {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">{content.heading}</h2>
      <p className="text-center text-raja-red mb-14">{content.subheading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {content.items.map((item, index) => (
          <div key={index} className="text-center p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
