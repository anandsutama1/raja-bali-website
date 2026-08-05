import Image from "next/image";

const rows = [
  {
    title: "The Spirit of Bali",
    desc: "Every exceptional cocktail begins with quality ingredients and the perfect balance of technique. Throughout the experience, you'll explore tropical fruits, premium mixers, authentic Balinese Arak, and professional bartending methods.",
    image: "/images/bar-class/barclass1.jpg",
    imageLeft: true,
  },
  {
    title: "Create Memories Behind the Bar",
    desc: "This class is about more than mixing drinks. It's about creativity, connection, and the moments you'll remember, from your first shake to your final sip.",
    image: "/images/bar-class/barclass2.jpg",
    imageLeft: false,
  },
];

export default function FeatureRows() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-6 space-y-16 border-t border-gray-200">
      {rows.map((row) => {
        const media = (
          <div className="relative w-full md:w-1/2 h-64 overflow-hidden">
            <Image
              src={row.image}
              alt={row.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        );

        return (
          <div key={row.title} className="flex flex-col md:flex-row items-center gap-10">
            {row.imageLeft && media}
            <div className="w-full md:w-1/2 border-l-4 border-raja-red pl-6">
              <h3 className="text-2xl font-serif mb-4">{row.title}</h3>
              <p className="text-gray-600">{row.desc}</p>
            </div>
            {!row.imageLeft && media}
          </div>
        );
      })}
    </section>
  );
}