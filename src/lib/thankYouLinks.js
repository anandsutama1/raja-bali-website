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
// `label` is a key into common.json's `thankYouLinks` slice (and `badge`
// into the same object) rather than hardcoded English — getThankYouLinks
// resolves both against the caller's own locale dictionary, so the visible
// ThankYou cards and the guest email never disagree on wording either.
//
// `image` reuses the same product photography already live on the homepage
// (Activities.js/Menus.js) and each experience's own Hero, so nothing new was
// shot or uploaded.
const LINK_META = {
  "reservation-main": [
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { labelKey: "cookingClass", path: "/cooking-class", image: "/images/cooking-class/CookingClass-Card.jpg", badgeKey: "mostPopular" },
    { labelKey: "barClass", path: "/bar-class", image: "/images/home/cocktail-class.png", badgeKey: "limitedSlot" },
    { labelKey: "dance", path: "/dance", image: "/images/dance/Hero.jpg", badgeKey: "freeEveryThursday" },
  ],
  "reservation-nusadua": [
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { labelKey: "viewBeverageMenu", path: "/menu/beverage", image: "/images/home/Beverage-Menu.jpg" },
    { labelKey: "contactUs", path: "/contact", image: "/images/contact/Hero.jpg" },
  ],
  "cooking-class": [
    { labelKey: "reserveTable", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { labelKey: "barClass", path: "/bar-class", image: "/images/home/cocktail-class.png", badgeKey: "limitedSlot" },
    { labelKey: "dance", path: "/dance", image: "/images/dance/Hero.jpg", badgeKey: "freeEveryThursday" },
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
  ],
  "bar-class": [
    { labelKey: "reserveTable", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { labelKey: "cookingClass", path: "/cooking-class", image: "/images/cooking-class/CookingClass-Card.jpg", badgeKey: "mostPopular" },
    { labelKey: "dance", path: "/dance", image: "/images/dance/Hero.jpg", badgeKey: "freeEveryThursday" },
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
  ],
  "group-reservation": [
    { labelKey: "reserveTable", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { labelKey: "privateEvents", path: "/private-events", image: "/images/private-events/Hero.jpg" },
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { labelKey: "contactUs", path: "/contact", image: "/images/contact/Hero.jpg" },
  ],
  "private-events": [
    { labelKey: "groupReservation", path: "/group-reservation", image: "/images/home/Group-Menu.jpg" },
    { labelKey: "reserveTable", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { labelKey: "contactUs", path: "/contact", image: "/images/contact/Hero.jpg" },
  ],
  contact: [
    { labelKey: "reserveTable", path: "/reservation-main", image: "/images/reservation-main/Hero.jpg" },
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
    { labelKey: "cookingClass", path: "/cooking-class", image: "/images/cooking-class/CookingClass-Card.jpg", badgeKey: "mostPopular" },
  ],
  "venue-rental": [
    { labelKey: "contactUs", path: "/contact", image: "/images/contact/Hero.jpg" },
    { labelKey: "privateEvents", path: "/private-events", image: "/images/private-events/Hero.jpg" },
    { labelKey: "viewFoodMenu", path: "/menu/food", image: "/images/home/Food-Menu.jpg" },
  ],
};

// `labels` is common.json's `thankYouLinks` slice for the caller's locale.
export function getThankYouLinks(labels) {
  return Object.fromEntries(
    Object.entries(LINK_META).map(([formType, links]) => [
      formType,
      links.map(({ labelKey, path, image, badgeKey }) => ({
        label: labels[labelKey],
        path,
        image,
        ...(badgeKey ? { badge: labels[badgeKey] } : {}),
      })),
    ])
  );
}
