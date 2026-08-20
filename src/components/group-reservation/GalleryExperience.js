import LocalizedLink from "@/components/LocalizedLink";
import GalleryGrid from "@/components/GalleryGrid";

const images = Array.from({ length: 8 }, (_, i) => `/images/group-reservation/gallery-${i + 1}.jpg`);

function Parts({ parts }) {
  return parts.map((part, i) =>
    part.link ? (
      <LocalizedLink key={i} href={part.link} className="font-semibold text-raja-red u-link">
        {part.text}
      </LocalizedLink>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

export default function GalleryExperience({ content }) {
  return (
    <section className="py-24 px-6 border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">
        {content.headingPrefix}<span className="text-raja-red">{content.headingAccent}</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        {content.body}
      </p>
      <div className="max-w-5xl mx-auto">
        <GalleryGrid images={images} altPrefix="Corporate and group dining experience at Raja Bali" />
      </div>
      <p className="text-center text-gray-600 mt-14 max-w-xl mx-auto">
        <Parts parts={content.footerParts} />
      </p>
    </section>
  );
}
