const sessions = [
  { name: "Session 1", tag: "Midday", time: "11:00 AM – 1:00 PM", desc: "A relaxed midday mixology session, perfect before an afternoon exploring Bali." },
  { name: "Session 2", tag: "Afternoon", time: "2:00 PM – 4:00 PM", desc: "Shake up your afternoon with hands-on cocktail crafting and tropical flavors." },
  { name: "Session 3", tag: "Evening", time: "5:00 PM – 7:00 PM", desc: "Wind down as the evening unfolds, finishing with your own handcrafted drink." },
];

export default function DailySessions() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">Daily Sessions</h2>
      <p className="text-center text-raja-red mb-14">Available Thursdays only — choose your preferred session</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {sessions.map((s, index) => (
          <div key={index} className="border border-gray-200 border-t-2 border-t-raja-red rounded-lg bg-raja-cream p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{s.name}</h3>
              <span className="text-xs bg-white px-2 py-1">{s.tag}</span>
            </div>
            <p className="text-sm font-semibold mb-2">{s.time}</p>
            <p className="text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
