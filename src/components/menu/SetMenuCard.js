import SmartImage from "@/components/SmartImage";

export default function SetMenuCard({ id, name, price, description, image, imageAlt, sections }) {
  return (
    <div id={id} className="scroll-mt-24 mb-10 overflow-hidden rounded-lg border border-gray-200 bg-raja-cream">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-64 w-full shrink-0 md:h-auto md:w-2/5">
          <SmartImage src={image} alt={imageAlt || name} sizes="(min-width: 768px) 40vw, 100vw" />
        </div>

        <div className="flex-1 p-8">
          <h3 className="text-2xl font-serif text-raja-red mb-1">{name}</h3>
          <p className="font-semibold mb-4">{price}</p>
          {description && (
            <p className="mb-6 text-sm leading-relaxed text-gray-600">{description}</p>
          )}
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
      </div>
    </div>
  );
}
