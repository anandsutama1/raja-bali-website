import Link from "next/link";

const items = [
  { title: "Welcome Refreshment", desc: "Begin your culinary journey with a refreshing welcome drink inspired by the tropical flavors of Bali." },
  { title: "Nursery Tour", desc: "Stroll through our herb and spice garden to discover the ingredients behind Bali's most treasured recipes." },
  { title: "Personalized Name Tag", desc: "A personalized welcome designed to make your experience feel truly special from the very beginning." },
  { title: "Certificate of Completion", desc: "Receive a beautifully presented certificate as a keepsake of your Balinese culinary adventure." },
  { title: "Recipe Booklet", desc: "Take home our exclusive recipe booklet and recreate authentic Balinese flavors wherever you are." },
  { title: "Dining Experience", desc: "Conclude your journey by enjoying the traditional dishes you've lovingly prepared in a warm and welcoming setting." },
];

export default function WhatsIncluded() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-14">What's Included</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-10">
        <Link href="#reservation" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">Reserve Now</Link>
        <Link href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">Contact Us</Link>
      </div>
    </section>
  );
}