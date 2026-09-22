// USD figures are an approximate equivalent for travelers pricing in
// dollars (e.g. against third-party resellers who list in USD), not the
// actual charged currency — guests are always billed in IDR. Keep in sync
// with components/cooking-class/StructuredData.js's priceSpecification.
export default function Pricing({ content }) {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">{content.heading}</h2>
      <p className="text-center text-raja-red mb-14">{content.subheading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {content.plans.map((plan, index) => (
          <div key={index} className="bg-white p-6 relative border border-gray-200 rounded-lg">
            {plan.highlight && (
              <span className="absolute top-4 right-4 text-xs bg-raja-red text-white px-2 py-1">
                {plan.highlight}
              </span>
            )}
            <h3 className="font-semibold text-lg mb-2">{plan.title}</h3>
            <p className="text-2xl font-serif mb-1">{plan.price}</p>
            <p className="text-xs text-gray-400 mb-2">{plan.usd}</p>
            <p className="text-sm text-gray-600 mb-2">{plan.note}</p>
            <span className="text-xs text-gray-500">{plan.tag}</span>
          </div>
        ))}
      </div>
      {content.childPricing && (
        // Not a third plan choice (children aren't an alternative to
        // Shared/Individual, they come on top of whichever plan the adults
        // are on), so this is a distinct note below the plan grid rather
        // than a third card inside it.
        <div className="mt-6 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 rounded-lg border border-gray-200 bg-raja-cream/40 px-6 py-4 text-center">
          <span className="font-semibold">{content.childPricing.label}:</span>
          <span className="font-serif text-lg">{content.childPricing.price}</span>
          <span className="text-xs text-gray-400">{content.childPricing.usd}</span>
          <span className="w-full text-sm text-gray-600">{content.childPricing.note}</span>
        </div>
      )}
      <p className="text-center text-xs text-gray-500 mt-4">{content.footnote}</p>
    </section>
  );
}
