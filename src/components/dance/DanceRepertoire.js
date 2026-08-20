export default function DanceRepertoire({ content }) {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">{content.heading}</h2>
      <p className="text-center text-raja-red mb-2">{content.subheading}</p>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        {content.intro}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {content.dances.map((dance, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold mb-2">{dance.name}</h3>
            <p className="text-sm text-gray-600">{dance.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
