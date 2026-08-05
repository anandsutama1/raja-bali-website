"use client";

import { useState } from "react";
import SmartImage from "@/components/SmartImage";
import Lightbox from "@/components/Lightbox";

/**
 * Clickable thumbnail grid + full-screen Lightbox viewer, shared by every
 * gallery section on the site (reservation pages, class pages, the main
 * gallery, etc.) so the interactive viewer only needs to be built once.
 */
export default function GalleryGrid({ images, altPrefix = "Gallery photo" }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`View ${altPrefix} ${index + 1} of ${images.length}`}
            className="u-lift relative block h-40 w-full cursor-zoom-in border-0 bg-transparent p-0"
          >
            <SmartImage src={src} alt={`${altPrefix} ${index + 1}`} sizes="(min-width: 640px) 25vw, 50vw" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          altPrefix={altPrefix}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
