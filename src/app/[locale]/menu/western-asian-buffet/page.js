import SmartImage from "@/components/SmartImage";
import BuffetCategory from "@/components/menu/BuffetCategory";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd } from "@/lib/menuSchema";
import { SITE_URL } from "@/lib/site";

const title = "Western & Asian Buffet Menu";
const description =
  "Raja Bali's group dinner buffet menu featuring Western & Asian favorites, starting from IDR 350K per person, ideal for groups with different preferences.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/menu/western-asian-buffet" },
};

// Single source for both the visible BuffetCategory list below and the
// structured data — each option maps to a MenuItem with no price of its
// own, since the whole spread is covered by the one per-person Offer.
const starters = [
  {
    title: "Appetizers",
    instruction: "Please select 2 menus below:",
    options: [
      "Garden Salad with vinaigrette dressing",
      "Thai Beef Salad",
      "Caesar Salad",
      "Classic Potato Salad",
      "Mixed Fruit Salad with Yoghurt",
    ],
  },
  {
    title: "Soup",
    instruction: "Please select 1 menu below:",
    options: [
      "Tom Yum Soup (Thailand spicy seafood soup)",
      "Chicken and Vegetables Soup",
      "Potato and Leek Soup",
      "Pumpkin Soup",
      "Red Bean Soup",
    ],
  },
];

const mainCourses = [
  {
    title: "Seafood",
    instruction: "Please select 1 menu below:",
    options: [
      "Seafood Curry (Stir fried prawn, squid, and fish with curry sauce)",
      "Grilled Fish Fillet with Chili Sauce",
      "Fried Fish Fillet with Sweet and Sour Sauce",
      "Pan Seared Mahi-Mahi Fillet with Sambal Matah",
    ],
  },
  {
    title: "Chicken",
    instruction: "Please select 1 menu below:",
    options: [
      "Grilled Chicken Leg Boneless with Honey Chili Sauce",
      "Serosob Ayam (Braised chicken leg boneless with Balinese style)",
      "Chicken Meatball with Tomato Basil Sauce",
    ],
  },
  {
    title: "Beef",
    instruction: "Please select 1 menu below:",
    options: ["Beef Rendang", "Beef Black Pepper", "Beef Meatball with Tomato Basil Sauce"],
  },
  {
    title: "Vegetables",
    instruction: "Please select 1 menu below:",
    options: [
      "Baby Bok-Choy Braised with Oyster Sauce",
      "Sauteed Mix Vegetables with Butter Garlic",
      "Terong Balado (Sauteed eggplant with chili sauce)",
      "Stir-Fried Assorted Vegetables with Oyster Sauce",
      "Tofu Cah Sayuran (Sauteed tofu in mix vegetables)",
    ],
  },
  {
    title: "Noodles & Pasta",
    instruction: "Please select 1 menu below:",
    options: [
      "Mie Goreng Seafood (Fried noodles with seafood and vegetables)",
      "Mie Goreng Sayur Vegetarian",
      "Bihun Goreng (Stir fried rice noodles with chicken and vegetables)",
      "Spaghetti Tomato Sauce",
    ],
  },
  {
    title: "Rice",
    instruction: "Please select 1 menu below:",
    options: ["Nasi Goreng (Fried rice with chicken and vegetables)", "Steamed Rice", "Fragrant Yellow Rice"],
  },
  {
    title: "Dessert",
    instruction: "Please select 2 menus below:",
    options: ["Assorted Balinese Cake", "Seasonal Fruit", "Chocolate Brownies"],
  },
  {
    title: "Drinks",
    instruction: "Please select 1 menu below:",
    options: ["Ice Kelapa Muda", "Infused Water", "Ice Tea", "Orange Juice"],
  },
];

const menuJsonLd = buildMenuJsonLd({
  url: `${SITE_URL}/menu/western-asian-buffet`,
  name: "Raja Bali Western & Asian Buffet Menu",
  description,
  offers: {
    "@type": "Offer",
    price: "350000",
    priceCurrency: "IDR",
    unitText: "per person",
  },
  sections: [...starters, ...mainCourses].map((category) => ({
    title: category.title,
    note: category.instruction,
    items: category.options.map((name) => ({ name })),
  })),
});

export default function WesternAsianBuffetPage() {
  return (
    <main>
      <PageSchema
        path="/menu/western-asian-buffet"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Western & Asian Buffet Menu" }]}
        mainEntityId={`${SITE_URL}/menu/western-asian-buffet#menu`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
  <SmartImage src="/images/menu/western-asian-buffet-hero.jpg" alt="Raja Bali Western and Asian group dinner buffet spread" priority sizes="100vw" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
  <div className="relative z-10 max-w-2xl mx-auto">
    <h1 className="text-5xl font-serif mb-2">Western &amp; Asian Group Dinner Buffet Menu</h1>
    <p className="text-sm text-gray-300">Western Asian | Start from IDR 350K/pax</p>
  </div>
</section>

      <div className="max-w-3xl mx-auto border-t border-gray-200 py-16 px-6">
        {starters.map((category) => (
          <BuffetCategory key={category.title} {...category} />
        ))}

        <h2 className="text-2xl font-serif text-red-700 mb-6 border-b pb-2">Main Courses</h2>

        {mainCourses.map((category) => (
          <BuffetCategory key={category.title} {...category} />
        ))}
      </div>

      <StickyReserveButton href="/group-reservation#reservation" label="RESERVE FOR GROUP" />
    </main>
  );
}
