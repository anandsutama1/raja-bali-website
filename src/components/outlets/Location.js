const locations = [
  {
    title: "Raja Bali Main Restaurant Tanjung Benoa",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.121043258482!2d115.22276810000001!3d-8.7746812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2433df57093b1%3A0x2e389415504432e6!2sRaja%20Bali%20Nusa%20Dua%20(Main%20Restaurant)!5e0!3m2!1sen!2sid!4v1785641257250!5m2!1sen!2sid",
  },
  {
    title: "Raja Bali Nusa Dua",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.8741116720403!2d115.2246172!3d-8.7978961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24324cce516bb%3A0xf62b0522dc77c43f!2sRaja%20Bali%20-%20Authentic%20Balinese%20Restaurant%20Nusa%20Dua!5e0!3m2!1sen!2sid!4v1785641446921!5m2!1sen!2sid",
  },
];

export default function Location() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto border-t border-gray-200">
      <div className="flex items-start gap-10 mb-10">
        <div className="border-l-2 border-raja-red pl-4">
          <h2 className="text-4xl font-serif">Location</h2>
          <p className="text-raja-red">Find Your Nearest Raja Bali</p>
        </div>
        <p className="text-gray-600 flex-1">
          Both destinations are easy to reach, from Tanjung Benoa&apos;s cultural charm to Nusa Dua&apos;s vibrant atmosphere.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {locations.map((loc) => (
          <div key={loc.title}>
            <h3 className="font-semibold mb-3">{loc.title}</h3>
            <div className="h-64 overflow-hidden">
              <iframe
                src={loc.mapSrc}
                title={loc.title}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
