export default function MenuSection({ title, note, items }) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-serif text-raja-red mb-1 border-b border-gray-200 pb-2">{title}</h2>
      {note && <p className="text-sm text-gray-500 mb-4">{note}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mt-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between gap-4">
            <div>
              <p className="font-semibold">{item.name}</p>
              {item.desc && <p className="text-sm text-gray-600">{item.desc}</p>}
            </div>
            {item.price && <p className="font-semibold whitespace-nowrap">{item.price}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}