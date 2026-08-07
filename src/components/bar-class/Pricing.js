const included = [
  "1 Hour Hands-on Bartender Class",
  "Professional Bartender Guidance",
  "Traditional Balinese Refreshment (Jajan Bali)",
  "Authentic Balinese Arak Tasting",
  "Premium Ingredients & Equipment",
  "Certificate of Completion",
  "Your Handcrafted Signature Drink",
];

export default function Pricing() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">Pricing</h2>
      <p className="text-center text-raja-red mb-14">One Simple Price, Everything Included</p>
      <div className="bg-white p-6 relative border border-gray-200 rounded-lg">
        <span className="absolute top-4 right-4 text-xs bg-raja-red text-white px-2 py-1">
          LIMITED SLOT
        </span>
        <h3 className="font-semibold text-lg mb-2">Bartender Class</h3>
        <p className="text-2xl font-serif mb-1">IDR 250,000 / person</p>
        <p className="text-xs text-gray-400 mb-1">Approx. USD 14 estimated</p>
        <p className="text-sm text-gray-600 mb-4">Minimum 2 guests</p>
        <p className="text-sm font-semibold mb-2">Included in Your Experience:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {included.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">Prices are subject to an 11% government tax. USD figure is an estimated equivalent; you are billed in IDR.</p>
    </section>
  );
}