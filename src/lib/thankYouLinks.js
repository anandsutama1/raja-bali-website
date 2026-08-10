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
//
// `image` reuses the same product photography already live on the homepage
// (Activities.js/Menus.js) and each experience's own Hero, so nothing new was
// shot or uploaded. `badge` mirrors the exact same badge text Activities.js
// already uses on the homepage — Cooking Class/Bar Class/Dance are the only
// three with one there, so that's preserved here too.
export const THANK_YOU_LINKS = {
  "reservation-main": [
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { label: "Balinese Cooking Class", path: "/cooking-class", image: "/images/cooking-class/CookingClass-Card.jpg", badge: "Most Popular" },
    { label: "Balinese Bar Class", path: "/bar-class", image: "/images/home/cocktail-class.png", badge: "Limited Slot" },
    { label: "Balinese Dance", path: "/dance", image: "/images/dance/Hero.jpg", badge: "Free Every Thursday" },
  ],
  "reservation-nusadua": [
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { label: "View Beverage Menu", path: "/menu/beverage", image: "/images/home/Beverage-Menu.jpg" },
    { label: "Contact Us", path: "/contact", image: "/images/contact/Hero.jpg" },
  ],
  "cooking-class": [
    { label: "Reserve a Table", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { label: "Balinese Bar Class", path: "/bar-class", image: "/images/home/cocktail-class.png", badge: "Limited Slot" },
    { label: "Balinese Dance", path: "/dance", image: "/images/dance/Hero.jpg", badge: "Free Every Thursday" },
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
  ],
  "bar-class": [
    { label: "Reserve a Table", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { label: "Balinese Cooking Class", path: "/cooking-class", image: "/images/cooking-class/CookingClass-Card.jpg", badge: "Most Popular" },
    { label: "Balinese Dance", path: "/dance", image: "/images/dance/Hero.jpg", badge: "Free Every Thursday" },
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
  ],
  "group-reservation": [
    { label: "Reserve a Table", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { label: "Private Events", path: "/private-events", image: "/images/private-events/Hero.jpg" },
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { label: "Contact Us", path: "/contact", image: "/images/contact/Hero.jpg" },
  ],
  "private-events": [
    { label: "Group Reservation", path: "/group-reservation", image: "/images/home/Group-Menu.jpg" },
    { label: "Reserve a Table", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { label: "Contact Us", path: "/contact", image: "/images/contact/Hero.jpg" },
  ],
  contact: [
    { label: "Reserve a Table", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { label: "Balinese Cooking Class", path: "/cooking-class", image: "/images/cooking-class/CookingClass-Card.jpg", badge: "Most Popular" },
  ],
};
