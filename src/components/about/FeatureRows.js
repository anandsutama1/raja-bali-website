import Image from "next/image";

const rows = [
  {
    title: "Inspired by Tradition, Crafted with Passion",
    desc: "At Raja Bali, we believe authentic cuisine begins with respect: for tradition, for ingredients, and for every guest who dines with us. We're committed to preserving Bali's rich culinary heritage while presenting every dish with care, quality, and a modern touch.",
    imageLeft: true,
    image: "/images/about/about1.jpg",
  },
  {
    title: "Fresh Ingredients, Authentic Flavors",
    desc: "Every memorable Balinese dish begins with exceptional ingredients. We carefully source fresh local produce, aromatic herbs, traditional spices, and premium ingredients from trusted local suppliers.",
    imageLeft: false,
    image: "/images/about/about2.jpg",
  },
  {
    title: "The Heart of Balinese Hospitality",
    desc: "Hospitality is at the heart of everything we do. From the moment you arrive until your final farewell, our team is dedicated to making every guest feel genuinely welcomed.",
    imageLeft: true,
    image: "/images/about/about3.jpg",
  },
];

export default function FeatureRows() {
  return (
    <section className="max-w-5xl mx-auto border-t border-gray-200 py-10 px-6 space-y-16">
      {rows.map((row, index) => {
        const media = (
          <div className="relative w-full md:w-1/2 h-64 rounded overflow-hidden">
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
          <div key={index} className="flex flex-col md:flex-row items-center gap-10">
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