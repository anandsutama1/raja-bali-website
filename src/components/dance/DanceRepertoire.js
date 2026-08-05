const dances = [
  { name: "Tari Joged Bumbung", desc: "Our signature performance, gracing the stage every Thursday without fail. A playful, communal dance celebrated for its warmth and spontaneous charm." },
  { name: "Puspanjali", desc: "A graceful welcome dance offering flowers of gratitude to honor and greet our guests." },
  { name: "Sekar Jagat", desc: "A dance of the world's flowers, celebrating beauty and harmony through delicate, flowing movement." },
  { name: "Sekar Jepun", desc: "Inspired by the frangipani blossom, a gentle expression of elegance and femininity." },
  { name: "Margapati", desc: "A powerful, dynamic dance portraying the spirit of the hunt, performed with striking intensity." },
  { name: "Condong", desc: "A refined court dance depicting the devoted attendant of a Balinese princess." },
  { name: "Panyembrahma", desc: "A ceremonial welcome dance, scattering flower petals as a gesture of blessing and hospitality." },
  { name: "Tari Baris", desc: "A noble warrior's dance, embodying discipline, strength, and ancestral pride." },
  { name: "Tari Cendrawasih", desc: "Inspired by the Bird of Paradise, a mesmerizing duet celebrating courtship and beauty in motion." },
];

export default function DanceRepertoire() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">The Repertoire</h2>
      <p className="text-center text-raja-red mb-2">Four Sacred Stories, Chosen Anew Each Week</p>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        Each Thursday, four performances are thoughtfully selected from our repertoire to unfold before you, with Tari Joged Bumbung, our beloved signature dance, gracing every evening.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {dances.map((dance, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold mb-2">{dance.name}</h3>
            <p className="text-sm text-gray-600">{dance.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}