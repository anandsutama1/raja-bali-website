const traditional = [
  { name: "Sate Lilit Ayam", sub: "Minced Chicken Satay", desc: "Traditional Balinese minced chicken satay seasoned with aromatic spices and grilled to perfection." },
  { name: "Sate Lilit Ikan", sub: "Minced Fish Satay", desc: "Fresh fish blended with authentic Balinese herbs and wrapped around lemongrass." },
  { name: "Serosob Ayam", sub: "Balinese Chicken Stew", desc: "Tender chicken simmered in a rich coconut cream sauce infused with traditional Balinese spices." },
  { name: "Dadar Gulung Unti", sub: "Traditional Balinese Coconut Crepes", desc: "Soft pandan crepes filled with sweet coconut and palm sugar." },
];

const vegetarian = [
  { name: "Sate Lilit Vegetarian", sub: "Balinese Vegetarian Satay", desc: "A plant-based interpretation of Bali's iconic satay, crafted with fresh vegetables." },
  { name: "Vegetable Curry", sub: "Balinese Vegetable Curry", desc: "Seasonal vegetables gently cooked in a fragrant coconut curry." },
  { name: "Dadar Gulung Unti", sub: "Traditional Balinese Coconut Crepes", desc: "Soft pandan crepes filled with sweet coconut and palm sugar, prepared following a traditional Balinese recipe." },
];

export default function MenuSection() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">The Menu</h2>
      <p className="text-center text-raja-red mb-14">The Dishes You'll Master</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <h3 className="font-semibold text-lg mb-4">Traditional Selection</h3>
          {traditional.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-raja-red mb-1">{item.sub}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Vegetarian Selection</h3>
          {vegetarian.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-raja-red mb-1">{item.sub}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-4">
            DIETARY NOTE: Our vegetarian menu contains eggs. Please let us know in advance if you have any dietary restrictions or food allergies.
          </p>
        </div>
      </div>
    </section>
  );
}