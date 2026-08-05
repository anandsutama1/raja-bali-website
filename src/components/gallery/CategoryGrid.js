import GalleryGrid from "@/components/GalleryGrid";

export default function CategoryGrid({ title, images }) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-serif mb-6 border-b border-gray-200 pb-2">{title}</h3>
      <GalleryGrid images={images} altPrefix={`${title} gallery photo`} />
    </div>
  );
}
