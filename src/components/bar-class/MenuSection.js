export default function MenuSection() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">The Drinks You'll Create</h2>
      <p className="text-center text-raja-red mb-14">Signature Drinks You'll Master</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <h3 className="font-semibold text-lg mb-4">Local Selection</h3>
          <div className="mb-4">
            <p className="font-semibold">Local Cocktail</p>
            <p className="text-sm text-raja-red mb-1">Arak Madu or Arak Oleng</p>
            <p className="text-sm text-gray-600">Discover the rich character of authentic Balinese Arak through two signature local cocktails.</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Mocktail</p>
            <p className="text-sm text-raja-red mb-1">Melon Fantasi</p>
            <p className="text-sm text-gray-600">A vibrant alcohol-free creation bursting with tropical fruit flavors.</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">International Selection</h3>
          <div className="mb-4">
            <p className="font-semibold">International Cocktail</p>
            <p className="text-sm text-raja-red mb-1">Long Island Iced Tea or Tequila Sunrise</p>
            <p className="text-sm text-gray-600">Master one of the world's most beloved cocktails under expert guidance.</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Healthy Drink</p>
            <p className="text-sm text-raja-red mb-1">Jamu Sinom or Green Detox</p>
            <p className="text-sm text-gray-600">Discover Bali's wellness traditions through naturally refreshing beverages.</p>
          </div>
        </div>
      </div>
    </section>
  );
}