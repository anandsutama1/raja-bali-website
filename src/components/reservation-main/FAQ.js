import Accordion from "@/components/Accordion";
import FAQStructuredData from "./FAQStructuredData";
import { mainRestaurantFaqs } from "@/lib/mainRestaurantFaqs";

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl border-t border-gray-200 px-6 py-20">
      <FAQStructuredData />
      <h2 className="mb-2 text-center font-serif text-3xl">Frequently Asked Questions</h2>
      <p className="mb-10 text-center text-gray-600">Everything You Need to Know</p>
      <Accordion items={mainRestaurantFaqs} />
    </section>
  );
}
