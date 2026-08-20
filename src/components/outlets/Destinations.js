import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";

const IMAGES = {
  "/reservation-main": "/images/outlets/Main-Restaurant.jpg",
  "/reservation-nusadua": "/images/outlets/Nusadua-Restaurant.jpg",
};

function Desc({ parts }) {
  return (
    <>
      {parts.map((part, i) =>
        part.link ? (
          <LocalizedLink key={i} href={part.link} className="u-link text-raja-red">
            {part.text}
          </LocalizedLink>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

export default function Destinations({ content }) {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-4xl font-serif text-center mb-6">
        {content.heading}
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        {content.intro}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {content.items.map((d, index) => (
          <div key={index} className="flex h-full flex-col border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={IMAGES[d.href]}
                alt={d.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 z-10 text-xs bg-raja-red text-white px-2 py-1">
                {d.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold mb-2">{d.name}</h3>
              <p className="text-sm text-gray-600 mb-4"><Desc parts={d.descParts} /></p>
              <span className="text-xs bg-raja-cream px-3 py-1 mb-4 inline-block w-fit">
                {d.features}
              </span>
              <LocalizedLink href={d.href} className="mt-auto bg-raja-black text-white px-5 py-3 hover:bg-raja-red transition block w-full text-center text-sm tracking-widest">
                {content.bookNow}
              </LocalizedLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
