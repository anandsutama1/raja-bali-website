export default function SetMenuCard({ name, price, sections }) {
  return (
    <div className="border border-gray-200 rounded-lg p-8 mb-10 bg-raja-cream">
      <h3 className="text-2xl font-serif text-raja-red mb-1">{name}</h3>
      <p className="font-semibold mb-6">{price}</p>
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm font-semibold uppercase text-gray-500 mb-1">{section.label}</p>
          <ul className="text-sm text-gray-700 space-y-1">
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}