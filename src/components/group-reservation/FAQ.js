import Link from "next/link";
import dynamic from "next/dynamic";
import FAQStructuredData from "./FAQStructuredData";
import { groupReservationFaqs } from "@/lib/groupReservationFaqs";

// Below the fold on every page that uses it — its open/close JS ships in
// its own chunk instead of the initial bundle.
const Accordion = dynamic(() => import("@/components/Accordion"));

// The Accordion renders `a` directly, so this swaps in a JSX answer (with
// links to related pages) for just these two items, while
// FAQStructuredData still reads the plain-text version straight from
// groupReservationFaqs — same words either way, just a hyperlink on top
// (see groupReservationFaqs.js for the plain-text equivalent).
const displayFaqs = groupReservationFaqs.map((faq) => {
  if (faq.q === "Is Raja Bali suitable for corporate events?") {
    return {
      ...faq,
      a: (
        <>
          Yes. Raja Bali hosts a range of corporate occasions, including business dinners, team gatherings, and corporate celebrations, alongside its regular group dining service. Our{" "}
          <Link href="/private-events" className="font-semibold text-raja-red u-link">
            Private Events page
          </Link>{" "}
          has more detail on planning an event with us.
        </>
      ),
    };
  }
  if (faq.q === "Can I arrange a group dinner in Bali?") {
    return {
      ...faq,
      a: (
        <>
          Yes. Raja Bali offers group dining in the Nusa Dua area of Bali, across{" "}
          <Link href="/outlets" className="font-semibold text-raja-red u-link">
            our two locations
          </Link>
          , with buffet packages suited to groups of every size.
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
