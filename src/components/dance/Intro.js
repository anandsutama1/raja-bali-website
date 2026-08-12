import Link from "next/link";

export default function Intro() {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-4xl font-serif mb-6">
        The Living Art of <span className="text-raja-red">Balinese Dance Performance</span>
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        For generations, Balinese dance has served as a sacred bridge between the island's spiritual heritage and the stories of everyday life. Every gesture, every gaze, and every intricate movement carries meaning passed down through centuries of tradition. At Raja Bali, we invite you to witness this living art form performed with grace, precision, and heartfelt devotion, an experience that lingers long after the final note fades.
      </p>
      <p className="text-sm font-semibold text-raja-red mb-10">
        Complimentary for dining guests, every Thursday, exclusively at{" "}
        <Link href="/outlets" className="u-link">
          Raja Bali Nusa Dua (Main Restaurant)
        </Link>
        .
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/reservation-main" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">Reserve Table</Link>
        <Link href="/contact" className="border border-raja-black px-8 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red transition">Contact Us</Link>
      </div>
    </section>
  );
}