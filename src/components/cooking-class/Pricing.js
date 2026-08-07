// USD figures are an approximate equivalent for travelers pricing in
// dollars (e.g. against third-party resellers who list in USD), not the
// actual charged currency — guests are always billed in IDR. Keep in sync
// with components/cooking-class/StructuredData.js's priceSpecification.
const plans = [
  { title: "Shared Experience", price: "IDR 550,000 / person", usd: "Approx. USD 31 estimated", note: "Minimum 2 guests", tag: "Best Value", highlight: "BEST SELLER" },
  { title: "Individual Experience", price: "IDR 600,000 / person", usd: "Approx. USD 34 estimated", note: "Perfect for solo travelers", tag: "All Inclusive" },
];

export default function Pricing() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">Pricing</h2>
      <p className="text-center text-raja-red mb-14">Choose Your Culinary Experience</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
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
      <p className="text-center text-xs text-gray-500 mt-4">Prices are subject to an 11% government tax. USD figures are an estimated equivalent; you are billed in IDR.</p>
    </section>
  );
}
