import Link from "next/link";
import dynamic from "next/dynamic";
import FAQStructuredData from "./FAQStructuredData";
import { mainRestaurantFaqs } from "@/lib/mainRestaurantFaqs";

// Below the fold on every page that uses it — its open/close JS ships in
// its own chunk instead of the initial bundle.
const Accordion = dynamic(() => import("@/components/Accordion"));

// The Accordion renders `a` directly, so this swaps in a JSX answer (with
// a link to the Cooking Class page) for just that one item, while
// FAQStructuredData still reads the plain-text version straight from
// mainRestaurantFaqs — same words either way, just a hyperlink on top
// (see mainRestaurantFaqs.js for the plain-text equivalent).
const displayFaqs = mainRestaurantFaqs.map((faq) => {
  if (faq.q === "Can I join the Balinese Cooking Class?") {
    return {
      ...faq,
      a: (
        <>
          Yes. Our hands-on Balinese Cooking Class runs in three daily sessions at this location, learning authentic recipes from local chefs before enjoying what you cook. Reservations are required in advance. Visit our{" "}
          <Link href="/cooking-class" className="font-semibold text-raja-red u-link">
            Cooking Class page
          </Link>{" "}
          to book.
        </>
      ),
    };
  }
  if (faq.q === "Do you accept group reservations?") {
    return {
      ...faq,
      a: (
        <>
          Yes. We offer curated buffet packages for group celebrations of every size at this location. Visit our{" "}
          <Link href="/group-reservation" className="font-semibold text-raja-red u-link">
            Group Reservation page
          </Link>{" "}
          to view packages and book.
        </>
      ),
    };
  }
  return faq;
});

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
