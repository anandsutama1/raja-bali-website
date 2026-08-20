export default function Schedule({ content }) {
  return (
    <section className="py-24 px-6 border-t border-gray-200">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-2">{content.heading}</h2>
        <p className="text-raja-red mb-14">{content.subheading}</p>
        <div className="border-t-2 border-raja-red bg-white p-8 max-w-md mx-auto">
          <p className="text-2xl font-serif mb-2">{content.time}</p>
          <p className="text-sm text-gray-600">
            {content.body}
          </p>
          <p className="mt-4 text-sm font-semibold text-raja-red">
            {content.note}
          </p>
        </div>
      </div>
    </section>
  );
}
