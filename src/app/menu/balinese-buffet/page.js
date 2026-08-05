import SmartImage from "@/components/SmartImage";
import BuffetCategory from "@/components/menu/BuffetCategory";

export const metadata = {
  title: "Balinese Buffet Menu",
  description:
    "Raja Bali's group dinner buffet menu featuring authentic Balinese dishes, starting from IDR 300K per person, ideal for group celebrations.",
  alternates: { canonical: "/menu/balinese-buffet" },
};

export default function BalineseBuffetPage() {
  return (
    <main>
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
  <SmartImage src="/images/menu/balinese-buffet-hero.jpg" alt="Raja Bali" priority sizes="100vw" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
  <div className="relative z-10 max-w-2xl mx-auto">
    <h1 className="text-5xl font-serif mb-2">Group Dinner Buffet Menu</h1>
    <p className="text-sm text-gray-300">Balinese Buffet | Start from IDR 300K/pax</p>
  </div>
</section>

      <div className="max-w-3xl mx-auto border-t border-gray-200 py-16 px-6">
        <BuffetCategory
          title="Appetizers"
          instruction="Please select 2 menus below:"
          options={[
            "Lawar Bungkak (Balinese young coconut salad)",
            "Urab Pakis (Balinese fern salad)",
            "Urab Sayur (Mixed vegetables with grated coconut dressing)",
            "Ayam Pelalah (Shredded chicken breast with chili sambal)",
            "Lawar Kacang Panjang (Long bean and minced chicken salad)",
            "Plecing Gonda",
          ]}
        />
        <BuffetCategory
          title="Soup"
          instruction="Please select 1 menu below:"
          options={["Cramcam Ayam (Minced Balinese chicken soup)", "Soup Kacang Merah (Red bean soup)"]}
        />

        <h2 className="text-2xl font-serif text-red-700 mb-6 border-b pb-2">Main Courses</h2>

        <BuffetCategory
          title="Seafood"
          instruction="Please select 1 menu below:"
          options={[
            "Seafood Bumbu Merah (Stir fried prawns, squid and fish with Balinese tomato chili sauce)",
            "Ikan Sambal Matah (Grilled mahi-mahi fillet with sambal matah)",
            "Sate Lilit Ikan",
          ]}
        />
        <BuffetCategory
          title="Chicken"
          instruction="Please select 2 menus below:"
          options={[
            "Ayam Bakar Bumbu Kuning (Grilled chicken leg boneless with Balinese spicy)",
            "Ayam Betutu",
            "Serosob Ayam (Braised chicken leg boneless with coconut cream)",
            "Sate Lilit Ayam",
            "Sate Tusuk Ayam",
          ]}
        />
        <BuffetCategory
          title="Vegetables and Noodles"
          instruction="Please select 1 menu below:"
          options={["Vegetables Curry", "Mie Goreng Sayur", "Bihun Goreng"]}
        />
        <BuffetCategory
          title="Rice"
          instruction="Please select 1 menu below:"
          options={[
            "Nasi Goreng Raja Bali (Fried rice with chicken and vegetables)",
            "Nasi Goreng Ayam (Fried rice with chicken and vegetables)",
            "Nasi Putih (Steamed rice)",
            "Nasi Kuning (Fragrant yellow rice)",
          ]}
        />
        <BuffetCategory
          title="Dessert"
          instruction="Please select 2 menus below:"
          options={[
            "Aneka Jajan Pasar (Mixed Balinese cake)",
            "Sliced Fruit (Watermelon and papaya)",
            "Es Buah",
            "Pisang Goreng",
            "Chocolate Pudding",
          ]}
        />
        <BuffetCategory title="Drinks" options={["Infused Water", "Ice Tea"]} />
      </div>

    </main>
  );
}