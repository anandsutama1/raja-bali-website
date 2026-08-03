import Image from "next/image";

const rows = [
  {
    title: (
      <>
        The Flavors of <span className="text-raja-red">Bali</span>
      </>
    ),
    desc: "Every authentic Balinese dish begins with carefully selected local ingredients. Throughout the experience, you'll discover the vibrant herbs, fragrant spices, fresh vegetables, and tropical flavors that have shaped Bali's culinary identity for generations.",
    image: "/images/cooking-class/CookingClass1.jpg",
    alt: "Preparing fresh ingredients for a Balinese dish",
    imageLeft: true,
  },
  {
    title: "Create Memories Beyond the Kitchen",
    desc: "More than mastering traditional recipes, this experience is about creating lasting memories. Share stories around the table, enjoy the dishes you've prepared, and immerse yourself in the genuine warmth of Balinese hospitality.",
    image: "/images/cooking-class/CookingClass2.jpg",
    alt: "Guests enjoying the Balinese cooking class experience",
    imageLeft: false,
  },
];

export default function FeatureRows() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-6 space-y-16 border-t border-gray-200">
      {rows.map((row, index) => {
        const media = (
          <div className="relative w-full md:w-1/2 h-64 overflow-hidden">
            <Image
              src={row.image}
              alt={row.alt}
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
