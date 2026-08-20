import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";

export default function CookingClassHero({ content }) {
  return (
    <section className="relative h-[70vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <Image
        src="/images/cooking-class/CookingClass-Hero.jpg"
        alt="Balinese cooking class at Raja Bali"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-10">
        <h1 className="text-5xl font-serif mb-4">{content.title}</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          {content.bodyPrefix}
          <LocalizedLink href="/outlets" className="u-link text-white">
            {content.bodyLinkLabel}
          </LocalizedLink>
          {content.bodySuffix}
        </p>
      </div>
    </section>
  );
}
