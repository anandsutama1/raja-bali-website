import Link from "next/link";
import Accordion from "@/components/Accordion";
import FAQStructuredData from "./FAQStructuredData";
import { mainRestaurantFaqs } from "@/lib/mainRestaurantFaqs";

// The Accordion renders `a` directly, so this swaps in a JSX answer (with
// a link to the Cooking Class page) for just that one item, while
// FAQStructuredData still reads the plain-text version straight from
// mainRestaurantFaqs — same words either way, just a hyperlink on top.
const displayFaqs = mainRestaurantFaqs.map((faq) =>
  faq.q === "Can I join the Balinese Cooking Class?"
    ? {
        ...faq,
        a: (
          <>
            Yes. Our hands-on Balinese Cooking Class runs in three daily sessions at this location, learning authentic recipes from local chefs before enjoying what you cook. Reservations are required in advance — visit our{" "}
            <Link href="/cooking-class" className="font-semibold text-raja-red u-link">
              Cooking Class page
            </Link>{" "}
            to book.
          </>
        ),
      }
    : faq
);

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl border-t border-gray-200 px-6 py-20">
      <FAQStructuredData />
      <h2 className="mb-2 text-center font-serif text-3xl">Frequently Asked Questions</h2>
      <p className="mb-10 text-center text-gray-600">Everything You Need to Know</p>
      <Accordion items={displayFaqs} />
    </section>
  );
}
