import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-24 px-6 text-center max-w-2xl mx-auto border-t border-gray-200 bg-white">
      <h2 className="text-3xl font-serif mb-4">Need Something More Personalized?</h2>
      <p className="text-gray-600 mb-8">
        If you'd like to customize your buffet selection, dietary requirements, or discuss special requests for a corporate dinner or event, our events team will be delighted to assist you.
      </p>
      <Link href="/contact" className="bg-raja-black text-white px-8 py-3 text-sm tracking-widest hover:bg-raja-red transition">
        Contact Us About Your Event
      </Link>
    </section>
  );
}