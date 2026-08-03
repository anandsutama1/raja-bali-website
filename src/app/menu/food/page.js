import SmartImage from "@/components/SmartImage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuSection from "@/components/menu/MenuSection";
import SetMenuCard from "@/components/menu/SetMenuCard";

export const metadata = {
  title: "Food Menu",
  description:
    "Explore Raja Bali's food menu — appetizers, soups, vegetarian dishes, rice & noodles, main courses, betutu, and Balinese set menus, all made with authentic recipes.",
  alternates: { canonical: "/menu/food" },
};

const appetizer = [
  { name: "Ayam Pelalah", desc: "Shredded Chicken with Spicy Sambal", price: "85K" },
  { name: "Tuna Sambal Matah", desc: "Tuna with Shallot and Lemongrass", price: "85K" },
  { name: "Seafood Salad", desc: "Prawn, Tuna, Fish and Squid with Shallot, Tomato and Lemongrass", price: "120K" },
  { name: "Sayur Pecel", desc: "Mixed steam Vegetables with Peanut Sauce, Tofu Bean Cake and Boiled Egg", price: "65K" },
  { name: "Satay Lilit Ayam", desc: "6 Pcs minced Chicken Satay served with Sweet Soya Sauce and Chili", price: "90K" },
  { name: "Satay Lilit Ikan", desc: "6 Pcs minced Fish Satay served with Sweet Soya Sauce and Chili", price: "100K" },
];

const soup = [
  { name: "Soup Ikan", desc: "Balinese Fish Soup", price: "75K" },
  { name: "Soup Ayam", desc: "Balinese Chicken Soup with Vegetables", price: "75K" },
];

const vegetarian = [
  { name: "Sayur Pecel", desc: "Mixed steam vegetables with peanut sauce, tofu and soya bean cake", price: "65K" },
  { name: "Kare Sayur", desc: "Braised mixed vegetables in curry sauce served with rice", price: "70K" },
  { name: "Mie Goreng", desc: "Fried noodles with vegetables served with tofu and soya bean cake", price: "70K" },
  { name: "Nasi Goreng", desc: "Fried rice with vegetables served with tofu and soya bean cake", price: "70K" },
  { name: "Kare Tahu Tempe", desc: "Braised tofu and soya bean cake in curry sauce served with rice", price: "70K" },
];

const riceNoodles = [
  { name: "Nasi Goreng Ayam Panggang", desc: "Fried rice with egg and grilled half baby chicken", price: "115K" },
  { name: "Mie Goreng Ayam Panggang", desc: "Fried noodles with egg and grilled half baby chicken", price: "115K" },
  { name: "Nasi Goreng Lamb Curry", desc: "Fried rice with egg and served with lamb curry", price: "140K" },
  { name: "Mie Goreng Lamb Curry", desc: "Fried noodles with egg and served with lamb curry", price: "140K" },
  { name: "Nasi Goreng Beef Rendang", desc: "Fried rice with egg and served with Balinese beef rendang", price: "140K" },
  { name: "Mie Goreng Beef Rendang", desc: "Fried noodles with egg and served with Balinese beef rendang", price: "140K" },
];

const mainCourse = [
  { name: "Balinese Beef Rendang", desc: "Braised beef with spicy served with daily Balinese vegetables, rice and condiments", price: "150K" },
  { name: "Ayam Panggang", desc: "Grilled marinated half baby chicken served with daily Balinese vegetables, rice and condiments", price: "115K" },
  { name: "Fish Fillet", desc: "200 gr grilled mahi-mahi fish served with daily Balinese vegetables, rice and condiments", price: "135K" },
  { name: "Seafood Kebab", desc: "Grilled fish, prawn, squid, and vegetables in skewers served with vegetables, rice and condiments", price: "200K" },
  { name: "Lamb Curry", desc: "Braised lamb with curry sauce served with daily Balinese vegetables, rice and condiments", price: "160K" },
  { name: "Udang Mesanten", desc: "Balinese prawn curry served with daily Balinese vegetables and rice", price: "180K" },
  { name: "Udang Panggang", desc: "Grilled king prawn with daily Balinese vegetables and rice", price: "180K" },
  { name: "Ikan Panggang", desc: "350 gr grilled whole white snapper with daily Balinese vegetables and rice", price: "160K" },
  { name: "Seafood Curry", desc: "Balinese seafood curry (prawn, squid & mahi-mahi fish) served with vegetables and rice", price: "190K" },
  { name: "Serosob Ayam", desc: "Balinese chicken curry served with daily vegetables and rice", price: "115K" },
  { name: "Satay Campur", desc: "9 pcs chicken, fish, and lamb satay served with vegetables, rice and condiments", price: "135K" },
  { name: "Ayam Betutu", desc: "Braised half baby chicken in betutu spice with vegetables, rice, and condiments", price: "135K" },
  { name: "Crispy Duck", desc: "Deep fried half duck served with daily Balinese vegetables, rice, and condiments", price: "135K" },
];

const betutu = [
  { name: "Ayam Betutu", desc: "Braised whole chicken in bumbu betutu, served with Balinese chicken soup, two kind of vegetables, yellow and white rice, Balinese dessert. (Request 2 days before)", price: "350K" },
  { name: "Bebek Betutu", desc: "Braised whole duck in bumbu betutu, served with Balinese chicken soup, two kind of vegetables, yellow and white rice, Balinese dessert. (Request 2 days before)", price: "400K" },
];

const kidsMenu = [
  { name: "Fish and Chip", desc: "Served with french fries and mayonnaise", price: "50K" },
  { name: "Chicken Nugget", desc: "Served with french fries and mayonnaise", price: "50K" },
  { name: "Nasi Goreng Sausage or Chicken", desc: "Fried rice with egg and chicken sausage or chicken satay", price: "70K" },
  { name: "Mie Goreng Sausage or Chicken", desc: "Fried noodles with egg and chicken sausage or chicken satay", price: "70K" },
  { name: "French Fries", desc: "", price: "40K" },
  { name: "Mini Burger", desc: "White bun, beef patty, egg, cheese, and lettuce", price: "70K" },
  { name: "Spaghetti Napolitana", desc: "Spaghetti with tomato sauce and parmesan cheese", price: "60K" },
  { name: "Spaghetti Aglio Olio", desc: "Sauteed spaghetti with olive oil and parmesan cheese", price: "60K" },
];

const dessert = [
  { name: "Buah-Buahan Segar", desc: "Mixed seasonal fruits", price: "50K" },
  { name: "Bubur Injin", desc: "Black rice pudding with coconut milk", price: "50K" },
  { name: "Ice Cream (one scoop)", desc: "Vanilla, Strawberry, or Chocolate", price: "20K" },
  { name: "Assorted Balinese Cake", desc: "", price: "50K" },
  { name: "Pisang Goreng", desc: "Fried banana with palm sugar sauce", price: "50K" },
  { name: "Banana Split", desc: "Banana with vanilla, chocolate and strawberry ice cream", price: "65K" },
];

const setMenus = [
  {
    name: "Balinese Rijsttafel",
    price: "IDR 550K (for two persons)",
    sections: [
      { label: "Appetizer", items: ["Sate Lilit Ayam (Minced Chicken Satay)", "Tuna Sambal Matah (Tuna with shallot and lemongrass)"] },
      { label: "Soup", items: ["Soup Ayam (Balinese chicken soup)"] },
      { label: "Main Dishes", items: ["Be Sampi Menyatnyat (Balinese beef rendang)", "Lamb Curry (Braised lamb with curry sauce)", "Serosob Ayam (Balinese chicken curry with coconut milk)", "Fish Fillet (Boneless grill mahi-mahi fish)", "Udang Panggang (Grill Prawn)", "Tum Ayam (Minced chicken with banana leaf)", "Lawar Ayam (Minced chicken with long bean and coconut)", "Daily Vegetables", "Two Kind of Rice (Yellow and white rice)"] },
      { label: "Dessert", items: ["Buah-Buahan (Fresh seasonal fruit)", "Bubur Injin (Black rice pudding with coconut milk)", "Assorted Balinese Cake"] },
    ],
  },
  {
    name: "Raja Yasa",
    price: "IDR 1,100K (for two persons)",
    sections: [
      { label: "Appetizer", items: ["Sate Lilit Ikan (Minced fish satay)", "Tuna Sambal Matah (Tuna with shallot and lemongrass)"] },
      { label: "Soup", items: ["Fish Soup (Clear fish soup with Balinese herb)"] },
      { label: "Main Course", items: ["Grill Lobster (Grill lobster with special sauce)", "Grill Mahi-Mahi Fillet", "Balinese Seafood Kebab (Prawn, mahi-mahi fish, squid, capsicum, onion, zucchini)", "Seafood Curry (Prawn, mahi-mahi fish, and squid in curry sauce)", "Stews (Lamb, beef, chicken and fish stew)", "Sayur Urab and Lawar Ayam (Mixed Balinese vegetables)", "Two Kind of Rice (Yellow and white rice)"] },
      { label: "Dessert", items: ["Assorted Balinese Cake and Mixed Fruits served with Vanilla Ice Cream"] },
    ],
  },
];

export default function FoodMenuPage() {
  return (
    <main>
      <Navbar />
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
  <SmartImage src="/images/menu/food-hero.jpg" alt="Raja Bali" priority sizes="100vw" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
  <div className="relative z-10 max-w-2xl mx-auto">
    <h1 className="text-5xl font-serif mb-2">Food Menu</h1>
    <p className="text-sm text-gray-300">Prices are quoted in IDR and subject to 11% government tax.</p>
  </div>
</section>

      <div className="max-w-5xl mx-auto border-t border-gray-200 py-16 px-6">
        <MenuSection title="Appetizer" items={appetizer} />
        <MenuSection title="Soup" items={soup} />
        <MenuSection title="Vegetarian" items={vegetarian} />
        <MenuSection title="Rice & Noodles" items={riceNoodles} />
        <MenuSection title="Main Course" items={mainCourse} />
        <MenuSection title="Betutu (Request 2 days before)" items={betutu} />
        <MenuSection title="Kids Menu" items={kidsMenu} />
        <MenuSection title="Dessert" items={dessert} />

        <h2 className="text-3xl font-serif text-center mb-10 mt-20">
          Our Signature <span className="text-raja-red">Set Menu</span> Experiences
        </h2>
        {setMenus.map((set, index) => (
          <SetMenuCard key={index} name={set.name} price={set.price} sections={set.sections} />
        ))}
      </div>

      <Footer />
    </main>
  );
}