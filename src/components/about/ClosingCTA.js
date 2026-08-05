import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section className="py-24 px-6 text-center max-w-2xl mx-auto border-t border-gray-200 bg-white">
      <h2 className="text-3xl font-serif mb-4">Experience the True Taste of Bali</h2>
      <p className="text-gray-600 mb-8">
        Come taste real Balinese cooking and experience the hospitality that keeps our guests coming back.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/outlets" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">Reserve Table</Link>
        <Link href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">Contact Us</Link>
      </div>
    </section>
  );
}