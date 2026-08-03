import Link from "next/link";

export default function Intro() {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">
        A Spirited <span className="text-raja-red">Balinese Experience</span>
      </h2>
      <p className="text-gray-600 leading-relaxed mb-10">
        More than a cocktail-making class, this is an invitation to discover the creativity, craftsmanship, and tropical flavors that define Bali's vibrant bar culture. Learn the stories behind local ingredients while enjoying a fun and interactive experience suitable for beginners and cocktail enthusiasts alike.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="#reservation" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">Reserve Now</Link>
        <Link href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">Contact Us</Link>
      </div>
    </section>
  );
}