import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    tag: "Flagship Cultural Destination",
    name: "Raja Bali Main Restaurant",
    // Names all three Main Restaurant-exclusive experiences with links, so
    // /outlets works as the entity hub connecting this location to each.
    desc: (
      <>
        Our flagship destination in Nusa Dua, home to the{" "}
        <Link href="/cooking-class" className="u-link text-raja-red">
          Balinese Cooking Class
        </Link>
        , Balinese{" "}
        <Link href="/bar-class" className="u-link text-raja-red">
          Bar Class
        </Link>
        , and a complimentary Thursday{" "}
        <Link href="/dance" className="u-link text-raja-red">
          Balinese Dance Performance
        </Link>
        .
      </>
    ),
    features: "Restaurant · Culture · Experiences",
    href: "/reservation-main",
    image: "/images/outlets/Main-Restaurant.jpg",
  },
  {
    tag: "Signature Dining Destination",
    name: "Raja Bali Nusa Dua",
    desc: "Enjoy authentic Balinese cuisine in a refined setting, perfect for romantic dinners, family gatherings, and memorable evenings in Nusa Dua.",
    features: "Lunch • Dinner • Events",
    href: "/reservation-nusadua",
    image: "/images/outlets/Nusadua-Restaurant.jpg",
  },
];

export default function Destinations() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-4xl font-serif text-center mb-6">
        Two Destinations, One Balinese Hospitality
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        From cultural performances and interactive experiences to elegant dining in the heart of Nusa Dua, every Raja Bali destination is thoughtfully designed to showcase Bali in its own unique way.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {destinations.map((d, index) => (
          <div key={index} className="flex h-full flex-col border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={d.image}
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
              <p className="text-sm text-gray-600 mb-4">{d.desc}</p>
              <span className="text-xs bg-raja-cream px-3 py-1 mb-4 inline-block w-fit">
                {d.features}
              </span>
              <Link href={d.href} className="mt-auto bg-raja-black text-white px-5 py-3 hover:bg-raja-red transition block w-full text-center text-sm tracking-widest">
                Book Now →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}