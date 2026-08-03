import SmartImage from "@/components/SmartImage";

export default function CategoryGrid({ title, images }) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-serif mb-6 border-b border-gray-200 pb-2">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {images.map((src, index) => (
          <div key={src} className="relative h-40">
            <SmartImage
              src={src}
              alt={`${title} gallery photo ${index + 1}`}
              sizes="(min-width: 640px) 25vw, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
