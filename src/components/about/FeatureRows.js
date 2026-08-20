import Image from "next/image";

const IMAGES = ["/images/about/about1.jpg", "/images/about/about2.jpg", "/images/about/about3.jpg"];
const IMAGE_LEFT = [true, false, true];

export default function FeatureRows({ content }) {
  return (
    <section className="max-w-5xl mx-auto border-t border-gray-200 py-10 px-6 space-y-16">
      {content.map((row, index) => {
        const media = (
          <div className="relative w-full md:w-1/2 h-64 rounded overflow-hidden">
            <Image
              src={IMAGES[index]}
              alt={row.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        );

        return (
          <div key={index} className="flex flex-col md:flex-row items-center gap-10">
            {IMAGE_LEFT[index] && media}
            <div className="w-full md:w-1/2 border-l-4 border-raja-red pl-6">
              <h3 className="text-2xl font-serif mb-4">{row.title}</h3>
              <p className="text-gray-600">{row.desc}</p>
            </div>
            {!IMAGE_LEFT[index] && media}
          </div>
        );
      })}
    </section>
  );
}
