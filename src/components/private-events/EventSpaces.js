import Link from "next/link";

const spaces = [
  { title: "Indoor Dining", desc: "Elegant indoor space with authentic Balinese interiors." },
  { title: "Garden Area", desc: "A tropical outdoor setting perfect for relaxed celebrations." },
  { title: "Group Dining", desc: "Comfortable seating arrangements for larger parties." },
  { title: "Private Event Setup", desc: "Customized layouts tailored to your occasion." },
];

export default function EventSpaces() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <div className="flex items-start gap-10 mb-10">
        <div className="border-l-2 border-raja-red pl-4">
          <h2 className="text-4xl font-serif">Event Spaces</h2>
          <p className="text-raja-red">Discover Our Event Spaces</p>
        </div>
        <p className="text-gray-600 flex-1">
          Thoughtfully designed for every occasion, our event spaces combine authentic Balinese charm, warm hospitality, and exceptional cuisine.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {spaces.map((space, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">{space.title}</h3>
            <p className="text-sm text-gray-600">{space.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <h3 className="text-2xl font-serif mb-4">Event Planning</h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          From seating arrangements and menu selections to special decorations and entertainment, our team is here to help personalize your event and ensure a smooth, enjoyable experience from beginning to end.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="#reservation" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">Reserve Now</Link>
          <Link href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}