import Image from "next/image";

const locations = [
  {
    name: "Raja Bali Main Restaurant",
    desc: "Experience the heart of Raja Bali, where authentic Balinese cuisine meets cultural performances, immersive cooking experiences, and warm island hospitality.",
    instagram: "@rajabalinusaduamainrestaurant",
    facebook: "Raja Bali - Nusa Dua Main Restaurant",
    whatsapp: "+62 812-3269-2747",
    image: "/images/contact/Main-Restaurant.jpg",
  },
  {
    name: "Raja Bali Nusa Dua",
    desc: "Enjoy authentic Balinese dining in an elegant and welcoming atmosphere, perfect for romantic dinners, family gatherings, and memorable celebrations.",
    instagram: "@rajabalinusadua",
    facebook: "Raja Bali Nusa Dua",
    whatsapp: "+62 812-3864-4766",
    image: "/images/contact/Nusadua-Restaurant.jpg",
  },
];

export default function GetInTouch() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-4xl font-serif text-center mb-6">Get in Touch</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        Have a question or need assistance with your reservation? Choose your preferred Raja Bali destination below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {locations.map((loc, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{loc.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{loc.desc}</p>
              <div className="text-sm space-y-2 text-gray-700">
                <p>📷 {loc.instagram}</p>
                <p>👤 {loc.facebook}</p>
                <p>📱 {loc.whatsapp}</p>
                <p className="text-raja-red">📍 View on Google Maps</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}