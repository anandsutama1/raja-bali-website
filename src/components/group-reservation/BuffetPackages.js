import Link from "next/link";

const packages = [
  { title: "Authentic Balinese Buffet", price: "From IDR 300,000++ per Guest", desc: "Experience traditional Balinese flavors prepared using authentic recipes and locally sourced ingredients.", href: "/menu/balinese-buffet" },
  { title: "Western & Asian Buffet", price: "From IDR 350,000++ per Guest", desc: "A diverse selection of international favorites perfect for groups with different preferences.", href: "/menu/western-asian-buffet" },
];

export default function BuffetPackages() {
  return (
    <section className="border-t border-gray-200 py-10 px-6 max-w-4xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-3">Group Dining Packages</h2>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        Two buffet packages built for group dining, priced per guest. You can also{" "}
        <Link href="/menu/food" className="font-semibold text-raja-red u-link">
          explore our menu
        </Link>{" "}
        for a la carte options.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {packages.map((pkg, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-1">{pkg.title}</h3>
            <p className="text-raja-red mb-3">{pkg.price}</p>
            <p className="text-sm text-gray-600 mb-6">{pkg.desc}</p>
            <Link href={pkg.href} className="bg-raja-black text-white px-5 py-3 w-full block text-center hover:bg-raja-red transition text-sm tracking-widest">
              View Menu
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}