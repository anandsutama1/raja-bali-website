import SmartImage from "@/components/SmartImage";
import MenuSection from "@/components/menu/MenuSection";
import WineTable from "@/components/menu/WineTable";

export const metadata = {
  title: "Beverage Menu",
  description:
    "Raja Bali's beverage menu features signature cocktails, wine, and refreshments crafted with tropical, island-inspired flavors.",
  alternates: { canonical: "/menu/beverage" },
};

const signatureCocktails = [
  { name: "Green Tokyo", desc: "Vodka, rum, tequila, gin, melon liqueur, top with sprite" },
  { name: "Pink Flaminggo", desc: "Gold rum, pineapple juice, grenadine, lime juice" },
  { name: "Sky Purple", desc: "Gin, blue curacao, lemon juice, grenadine, sprite" },
  { name: "Bailey's Comet", desc: "Vodka, coffee liqueur, baileys, banana, whipped cream" },
  { name: "Strawberry Smash", desc: "Gin, orange liqueur, lemon juice, strawberry, simple syrup" },
  { name: "Melon Illusion", desc: "Vodka, melon liqueur, orange liqueur, lemon juice, pineapple juice" },
  { name: "Spicy Basil", desc: "Gold rum, ginger syrup, honey, basil leaf" },
  { name: "Sangria Raja", desc: "Spiced arak, red or white wine, tropical fruits" },
];

const balineseCocktails = [
  { name: "Arak Madu", desc: "Arak, honey, fresh lime" },
  { name: "Arak Pelung", desc: "Arak, blue curacao, lemon juice, grenadine, top with sprite" },
  { name: "Arak Lagoon", desc: "Arak, blue curacao, sprite" },
  { name: "Arak Oleng", desc: "Arak, pineapple liqueur, pineapple juice" },
  { name: "Arak Berry", desc: "Arak, strawberry, orange liqueur, mint leaf, tonic water" },
  { name: "Arak Purnama", desc: "Arak, orange juice, grenadine" },
];

const classicCocktails = [
  { name: "Margarita", desc: "Tequila, orange liqueur, fresh lime" },
  { name: "Mojito's", desc: "Rum, orange liqueur, mint leaf" },
  { name: "Daiquiry's", desc: "Rum, orange liqueur, fresh lime" },
  { name: "Espresso Martini", desc: "Vodka, coffee liqueur, espresso" },
  { name: "Lychee Martini", desc: "Vodka, lychee liqueur, lychee fruit" },
  { name: "Caipirinha & Caproska", desc: "Rum/Vodka, fresh lime, sweetener" },
  { name: "Lemon Drop", desc: "Vodka, orange liqueur, lemon juice, simple syrup" },
  { name: "Long Island Ice Tea", desc: "Vodka, rum, gin, tequila, orange liqueur, coke" },
  { name: "Pinacolada", desc: "Rum, pineapple juice, coconut milk, coconut liqueur" },
  { name: "Whiskey Sour", desc: "Whiskey, lime juice, sugar" },
  { name: "Japanese Slipper", desc: "Vodka, lime juice, triple sec, melon liqueur" },
  { name: "Pink/Blue/White Lady", desc: "Gin, orange liqueur, lime juice, grenadine" },
  { name: "Tequila Sunrise", desc: "Tequila, orange juice, grenadine" },
];

const refreshing = [
  { name: "Calipso", desc: "Mango juice, pineapple juice, passion syrup", price: "60K" },
  { name: "Basil Spritzer", desc: "Basil leaf, lemon grass juice, fresh lime, soda water", price: "60K" },
  { name: "Shirley Temple", desc: "Strawberry, mint leaf, fresh lime, tonic water, cherry water", price: "60K" },
  { name: "Lemon Nana", desc: "Lemon juice, mint leaf, mint green syrup, soda water", price: "60K" },
  { name: "Melon Fantasy", desc: "Diced fresh fruit, orange juice, melon syrup, fanta red", price: "60K" },
  { name: "Virgin Mojito", desc: "Mint leaf, fresh lime, soda water", price: "60K" },
  { name: "Virgin Colada", desc: "Pineapple juice, coconut cream, simple syrup", price: "60K" },
  { name: "Queencheer's", desc: "Fresh lemon juice, lemonade and refresh drink w/ your own favorite fruit puree: strawberry/mango", price: "55K" },
  { name: "Lemon Up", desc: "Fresh lemon juice, lemonade and pink/blue/yellow", price: "55K" },
  { name: "Squash", desc: "Lemon/lime/orange", price: "35K" },
];

const wellness = [
  { name: "Green Detox", desc: "Caisim, pineapple, lime juice, honey", price: "65K" },
  { name: "Red Booster", desc: "Tomato, orange juice, lime juice, honey", price: "65K" },
  { name: "Yellow Antioxidant", desc: "Cucumber, orange juice, pineapple juice, lime juice, honey", price: "65K" },
  { name: "Healthy Orange", desc: "Carrot juice, orange juice, lime juice, honey", price: "65K" },
  { name: "Jamu Sinom", desc: "Turmeric, brown sugar, tamarind", price: "65K" },
];

const juice = [
  { name: "Watermelon", price: "50K" },
  { name: "Pineapple", price: "50K" },
  { name: "Banana", price: "50K" },
  { name: "Papaya", price: "50K" },
  { name: "Orange", price: "50K" },
  { name: "Mixed Juice", price: "50K" },
];

const beers = [
  { name: "Singaraja", price: "30K" },
  { name: "Prost Pilsner", price: "35K" },
  { name: "Prost Lager", price: "35K" },
  { name: "Albens Apple Cider", price: "60K" },
  { name: "Large Bintang", price: "65K" },
  { name: "Small Bintang", price: "40K" },
  { name: "Large Heineken", price: "70K" },
  { name: "Small Heineken", price: "45K" },
  { name: "Tower Bintang", price: "195K" },
  { name: "Tower Heineken", price: "210K" },
];

const teaCoffee = [
  { name: "Balinese Coffee", price: "25K" },
  { name: "Hot/Ice Tea", price: "25K" },
  { name: "Lychee Tea", price: "35K" },
  { name: "Passion Tea", price: "35K" },
  { name: "Lemon Grass Tea", price: "35K" },
  { name: "Mint Ginger Tea", price: "30K" },
];

const softDrinks = [
  { name: "Coke", price: "20K" },
  { name: "Coke Zero", price: "20K" },
  { name: "Sprite", price: "20K" },
  { name: "Fanta", price: "20K" },
  { name: "Tonic Water", price: "20K" },
  { name: "Soda Water", price: "20K" },
  { name: "Natural Water", price: "25K" },
  { name: "Sparkling Water", price: "35K" },
];

const milkshakes = [
  { name: "Vanilla", price: "55K" },
  { name: "Chocolate", price: "55K" },
  { name: "Strawberry", price: "55K" },
  { name: "Banana", price: "55K" },
];

const premiumSpirit = [
  { name: "Gin", desc: "Gordon London Dry Gin" },
  { name: "Vodka", desc: "Smirnoff" },
  { name: "Rum", desc: "Bacardi, Saint James White" },
  { name: "Tequila", desc: "Jose Quervo" },
];

const localSpirit = [
  { name: "Spiced Arak", desc: "Sajeng Patala", price: "70K" },
  { name: "Spiced Premium Arak", desc: "Arak Bumbung", price: "80K" },
  { name: "Arak Dewi", price: "50K" },
];

const whiskeyPremium = [
  { name: "Scotch Whiskey", desc: "Red Label, Label 5" },
  { name: "American Whiskey", desc: "Jack Daniel, Jim Beam" },
  { name: "Irish Whiskey" },
];

const whiskeyLocal = [
  { name: "Gilbeys Whiskey" },
  { name: "Omrach Whiskey" },
  { name: "Vibe Whiskey" },
];

const localWhiteWine = [
  { name: "Hatten Aga White", glass: "65K", bottle: "240K" },
  { name: "Two Island Sauvignon Blanc", glass: "85K", bottle: "350K" },
  { name: "Two Island Chardonnay", glass: "85K", bottle: "350K" },
  { name: "Two Island Pinot Grigio", glass: "85K", bottle: "350K" },
  { name: "Plaga Sauvignon Blanc", glass: "80K", bottle: "330K" },
  { name: "Sababay White Velvet", glass: "75K", bottle: "270K" },
  { name: "Cape Discovery Sauvignon Blanc", glass: "65K", bottle: "270K" },
];

const localRedWine = [
  { name: "Hatten Aga Red", glass: "75K", bottle: "240K" },
  { name: "Two Island Cabernet Merlot", glass: "85K", bottle: "350K" },
  { name: "Two Island Shiraz", glass: "85K", bottle: "350K" },
  { name: "Plaga Cabernet Merlot", glass: "80K", bottle: "330K" },
  { name: "Plaga Cabernet Sauvignon", glass: "80K", bottle: "330K" },
  { name: "Sababay Black Velvet", glass: "75K", bottle: "270K" },
  { name: "Cape Discovery Shiraz/Cabernet Merlot", glass: "75K", bottle: "270K" },
];

const localRoseWine = [
  { name: "Hatten Aga Rose", glass: "65K", bottle: "240K" },
  { name: "Two Island Rose", glass: "85K", bottle: "350K" },
  { name: "Plaga Rose", glass: "80K", bottle: "330K" },
  { name: "Sababay Pink Blossom", glass: "75K", bottle: "270K" },
  { name: "Cape Discovery Rose", glass: "65K", bottle: "270K" },
];

const localSparklingWine = [
  { name: "Hatten Tunjung", bottle: "350K" },
  { name: "Two Island Pinot Noir Chardonnay", bottle: "490K" },
  { name: "Cape Discovery Cuvee Bruth", bottle: "450K" },
];

const importedWhiteWine = [
  { name: "Tall Horse (South Africa)", bottle: "385K" },
  { name: "Douglas Green (South Africa)", bottle: "415K" },
  { name: "Conosur (Chile)", bottle: "385K" },
  { name: "McPherson (Australia)", bottle: "450K" },
  { name: "Milton Park (Australia)", bottle: "405K" },
  { name: "Mi Terruno (Argentina)", bottle: "435K" },
  { name: "Estimulo (Argentina)", bottle: "400K" },
  { name: "Il Fumo (Italy)", bottle: "490K" },
];

const importedRedWine = [
  { name: "Tall Horse (South Africa)", bottle: "385K" },
  { name: "Douglas Green (South Africa)", bottle: "415K" },
  { name: "Conosur (Chile)", bottle: "385K" },
  { name: "McPherson (Australia)", bottle: "450K" },
  { name: "Milton Park (Australia)", bottle: "405K" },
  { name: "McGuigan (Australia)", bottle: "425K" },
  { name: "Mi Terruno (Argentina)", bottle: "435K" },
  { name: "Estimulo (Argentina)", bottle: "400K" },
  { name: "Il Fumo (Italy)", bottle: "490K" },
];

const importedRoseWine = [
  { name: "Tall Horse (South Africa)", bottle: "385K" },
  { name: "La La Land Rose (Australia)", bottle: "450K" },
  { name: "Mi Terruno Rose (Argentina)", bottle: "435K" },
];

const importedSparklingWine = [
  { name: "Batasiolo (Italy)", bottle: "550K" },
  { name: "Corte Giara (Italy)", bottle: "505K" },
];

export default function BeverageMenuPage() {
  return (
    <main>
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
  <SmartImage src="/images/menu/beverage-hero.jpg" alt="Raja Bali" priority sizes="100vw" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
  <div className="relative z-10 max-w-2xl mx-auto">
    <h1 className="text-5xl font-serif mb-2">Beverage Menu</h1>
    <p className="text-sm text-gray-300">Prices are quoted in IDR and subject to 11% government tax.</p>
  </div>
</section>

      <div className="max-w-5xl mx-auto border-t border-gray-200 py-16 px-6">
        <h2 className="text-3xl font-serif text-center mb-10">Special Cocktails</h2>
        <MenuSection title="Signature" note="Premium Spirit 130K / Local Spirit 95K" items={signatureCocktails} />
        <MenuSection title="Balinese Cocktail" note="All price 80K" items={balineseCocktails} />

        <h2 className="text-3xl font-serif text-center mb-10 mt-10">Classic Cocktail</h2>
        <MenuSection title="Classic Cocktail" note="Premium Spirit 130K / Local Spirit 95K" items={classicCocktails} />

        <MenuSection title="Raja Bali's Refreshing" items={refreshing} />
        <MenuSection title="Wellness Drink" items={wellness} />
        <MenuSection title="Juice" items={juice} />
        <MenuSection title="Beer's" items={beers} />
        <MenuSection title="Tea's & Coffee" items={teaCoffee} />
        <MenuSection title="Soft Drink's & Water" items={softDrinks} />
        <MenuSection title="Milkshake & Smoothies" items={milkshakes} />

        <h2 className="text-3xl font-serif text-center mb-10 mt-10">Spirits</h2>
        <MenuSection title="Premium Spirit" note="100K, by shot (45ml)" items={premiumSpirit} />
        <MenuSection title="Local Spirit" note="By shot (45ml)" items={localSpirit} />
        <MenuSection title="Whiskey Premium" note="125K, by shot (45ml)" items={whiskeyPremium} />
        <MenuSection title="Whiskey Local" note="80K, by shot (45ml)" items={whiskeyLocal} />

        <h2 className="text-3xl font-serif text-center mb-10 mt-10">Wine List</h2>
        <h3 className="text-xl font-serif text-red-700 mb-6">Local House Wine</h3>
        <WineTable title="White Wine" items={localWhiteWine} glassBottle />
        <WineTable title="Red Wine" items={localRedWine} glassBottle />
        <WineTable title="Rose Wine" items={localRoseWine} glassBottle />
        <WineTable title="Sparkling Wine" items={localSparklingWine} />

        <h3 className="text-xl font-serif text-red-700 mb-6 mt-10">Imported Wine</h3>
        <WineTable title="White Wine" items={importedWhiteWine} />
        <WineTable title="Red Wine" items={importedRedWine} />
        <WineTable title="Rose Wine" items={importedRoseWine} />
        <WineTable title="Sparkling Wine" items={importedSparklingWine} />
      </div>

    </main>
  );
}