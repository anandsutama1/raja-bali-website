import LocalizedLink from "@/components/LocalizedLink";

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

export default function BuffetPackages({ content }) {
  return (
    <section className="border-t border-gray-200 py-10 px-6 max-w-4xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-3">{content.heading}</h2>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        <Parts parts={content.introParts} />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {content.packages.map((pkg, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-1">{pkg.title}</h3>
            <p className="text-raja-red mb-3">{pkg.price}</p>
            <p className="text-sm text-gray-600 mb-6">{pkg.desc}</p>
            <LocalizedLink href={pkg.href} className="bg-raja-black text-white px-5 py-3 w-full block text-center hover:bg-raja-red transition text-sm tracking-widest">
              {content.viewMenu}
            </LocalizedLink>
          </div>
        ))}
      </div>
    </section>
  );
}
