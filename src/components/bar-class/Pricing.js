export default function Pricing({ content }) {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">{content.heading}</h2>
      <p className="text-center text-raja-red mb-14">{content.subheading}</p>
      <div className="bg-white p-6 relative border border-gray-200 rounded-lg">
        <span className="absolute top-4 right-4 text-xs bg-raja-red text-white px-2 py-1">
          {content.badge}
        </span>
        <h3 className="font-semibold text-lg mb-2">{content.planTitle}</h3>
        <p className="text-2xl font-serif mb-1">{content.price}</p>
        <p className="text-xs text-gray-400 mb-1">{content.usd}</p>
        <p className="text-sm text-gray-600 mb-4">{content.note}</p>
        <p className="text-sm font-semibold mb-2">{content.includedLabel}</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {content.included.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">{content.footnote}</p>
    </section>
  );
}
