import Link from "next/link";

export default function Intro() {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">A Venue Designed for Every Occasion</h2>
      <p className="text-gray-600 leading-relaxed mb-10">
        Whether you're planning a birthday celebration, corporate dinner, family reunion, anniversary, wedding reception, or private gathering, Raja Bali provides a beautiful setting where authentic Balinese hospitality meets exceptional cuisine.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="#reservation" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">Reserve Now</Link>
        <Link href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">Contact Us</Link>
      </div>
    </section>
  );
}