// Single source of truth for the "next step" links shown after a successful
// form submission — read by both the thank-you pages (components/ThankYou.js)
// and the guest confirmation email (app/api/submit-form/route.js), so the two
// surfaces never drift apart.
//
// Deliberately curated per form type rather than one generic list: Nusa Dua
// is dine-in only (no Cooking/Bar Class or Dance — those are Main Restaurant
// exclusives, see src/lib/outletsFaqs.js), "Reserve a Table" always points to
// Main Restaurant since that's where every class/event/enquiry branch
// resolves to (see BRANCH_LOCATION_ID in route.js), and no page links to
// itself.
export const THANK_YOU_LINKS = {
  "reservation-main": [
    { label: "View Food Menu", path: "/menu/food" },
    { label: "Balinese Cooking Class", path: "/cooking-class" },
    { label: "Balinese Bar Class", path: "/bar-class" },
    { label: "Balinese Dance", path: "/dance" },
  ],
  "reservation-nusadua": [
    { label: "View Food Menu", path: "/menu/food" },
    { label: "View Beverage Menu", path: "/menu/beverage" },
    { label: "Contact Us", path: "/contact" },
  ],
  "cooking-class": [
    { label: "Reserve a Table", path: "/reservation-main" },
    { label: "Balinese Bar Class", path: "/bar-class" },
    { label: "Balinese Dance", path: "/dance" },
    { label: "View Food Menu", path: "/menu/food" },
  ],
  "bar-class": [
    { label: "Reserve a Table", path: "/reservation-main" },
    { label: "Balinese Cooking Class", path: "/cooking-class" },
    { label: "Balinese Dance", path: "/dance" },
    { label: "View Food Menu", path: "/menu/food" },
  ],
  "group-reservation": [
    { label: "Reserve a Table", path: "/reservation-main" },
    { label: "Private Events", path: "/private-events" },
    { label: "View Food Menu", path: "/menu/food" },
    { label: "Contact Us", path: "/contact" },
  ],
  "private-events": [
    { label: "Group Reservation", path: "/group-reservation" },
    { label: "Reserve a Table", path: "/reservation-main" },
    { label: "View Food Menu", path: "/menu/food" },
    { label: "Contact Us", path: "/contact" },
  ],
  contact: [
    { label: "Reserve a Table", path: "/reservation-main" },
    { label: "View Food Menu", path: "/menu/food" },
    { label: "Balinese Cooking Class", path: "/cooking-class" },
  ],
};
