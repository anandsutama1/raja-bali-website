export default function MenuSection({ content }) {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">{content.heading}</h2>
      <p className="text-center text-raja-red mb-14">{content.subheading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <h3 className="font-semibold text-lg mb-4">{content.localHeading}</h3>
          {content.local.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-raja-red mb-1">{item.sub}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">{content.intlHeading}</h3>
          {content.international.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-raja-red mb-1">{item.sub}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
