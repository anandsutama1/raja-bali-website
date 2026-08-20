export default function OurStory({ content }) {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">{content.heading}</h2>
      <p className="text-gray-600 leading-relaxed">
        {content.body}
      </p>
    </section>
  );
}
