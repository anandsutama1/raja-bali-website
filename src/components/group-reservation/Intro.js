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

export default function Intro({ content }) {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">{content.heading}</h2>
      <p className="text-gray-600 leading-relaxed">
        <Parts parts={content.descParts} />
      </p>
    </section>
  );
}
