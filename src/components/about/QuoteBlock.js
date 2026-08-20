export default function QuoteBlock({ content }) {
  return (
    <section className="bg-raja-black text-white py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-5xl text-raja-red mb-4">"</p>
        <p className="mb-4">{content.line1}</p>
        <p className="text-gray-300 mb-4">
          {content.line2}
        </p>
        <p className="text-gray-300 mb-4">
          {content.line3}
        </p>
        <p className="font-semibold">{content.signature}</p>
      </div>
    </section>
  );
}
