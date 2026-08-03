const items = [
  { title: "Birthday Celebrations", desc: "Celebrate another memorable year with family and friends in a warm Balinese setting." },
  { title: "Wedding & Engagement", desc: "Create unforgettable moments surrounded by authentic Balinese charm and exceptional hospitality." },
  { title: "Family Gatherings", desc: "Reconnect over authentic Balinese cuisine in a welcoming atmosphere." },
  { title: "Corporate Events", desc: "Host business dinners, team gatherings, and corporate celebrations with confidence." },
  { title: "Tour Groups", desc: "Comfortable group dining with authentic Balinese cuisine and attentive service." },
  { title: "Private Celebrations", desc: "From anniversaries to reunions, every occasion deserves a memorable setting." },
];

export default function WhatsIncluded() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">What's Included</h2>
      <p className="text-center text-raja-red mb-14">Every detail has been thoughtfully prepared to ensure an enjoyable and memorable experience.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="text-center p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}