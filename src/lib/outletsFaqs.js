// Single source of truth for the /outlets FAQ — read by both the visible
// Accordion (components/outlets/FAQ.js) and its FAQPage structured data
// (components/outlets/FAQStructuredData.js). This page is the entity hub
// distinguishing the two locations, so the FAQ focuses on exactly that:
// which location has which experience, and where each one actually is.
// Both outlets are positioned under "Nusa Dua" — they're differentiated by
// name and by which experiences each one offers, not by neighborhood.
export const outletsFaqs = [
  {
    q: "Where is Raja Bali Main Restaurant located?",
    a: "Raja Bali Main Restaurant is located in Nusa Dua, Bali.",
  },
  {
    q: "Where is Raja Bali Nusa Dua located?",
    a: "Raja Bali Nusa Dua is located directly within Nusa Dua, on Bali's southern peninsula.",
  },
  {
    q: "Does Raja Bali Nusa Dua offer the Cooking Class, Bar Class, or Balinese Dance?",
    a: "No. The Balinese Cooking Class, Balinese Bar Class, and Balinese Dance Performance are only available at Raja Bali Main Restaurant.",
  },
  {
    q: "Where can I watch the Balinese Dance Performance?",
    a: "The Balinese Dance Performance is held every Thursday evening, complimentary for dining guests, exclusively at Raja Bali Main Restaurant.",
  },
];
