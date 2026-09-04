import SmartImage from "@/components/SmartImage";

// Photo not shot yet — SmartImage's built-in placeholder fallback means
// this ships now and upgrades automatically once a real photo lands at
// /images/venue-rental/private-room.jpg. Capacity/amenities below are
// placeholder figures pending real specs from the business.
export default function PrivateRoom({ content }) {
  return (
    <section id="private-room" className="scroll-mt-24 border-t border-gray-200 py-24 px-6 max-w-5xl mx-auto bg-raja-cream">
      <div className="flex flex-col md:flex-row-reverse gap-10 items-start">
        <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-lg md:h-80 md:w-1/2">
          <SmartImage src="/images/venue-rental/private-room.jpg" alt={content.imageAlt} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-serif mb-1">{content.heading}</h2>
          <p className="text-raja-red mb-4">{content.subheading}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{content.body}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{content.capacityLabel}</h3>
              <p className="text-sm text-gray-700">{content.capacity}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{content.amenitiesLabel}</h3>
              <p className="text-sm text-gray-700">{content.amenities.join(" · ")}</p>
            </div>
          </div>

          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">{content.useCasesHeading}</h3>
          <div className="flex flex-wrap gap-2">
            {content.useCases.map((u, index) => (
              <span key={index} className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-raja-black">
                {u.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
