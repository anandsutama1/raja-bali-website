"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Full-screen image viewer with prev/next — keyboard arrows, on-screen
 * chevrons, and swipe on touch devices all drive the same `onNavigate`.
 * Rendered by GalleryGrid, which owns which index (if any) is open.
 */
export default function Lightbox({ images, index, altPrefix = "Photo", onClose, onNavigate }) {
  const touchStartX = useRef(null);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, goPrev, goNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-fade-in"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 p-2 text-3xl leading-none text-white/80 hover:text-white sm:right-6 sm:top-6"
      >
        &times;
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
        className="absolute left-1 top-1/2 z-10 -translate-y-1/2 p-3 text-4xl leading-none text-white/70 hover:text-white sm:left-4 sm:text-5xl"
      >
        &lsaquo;
      </button>

      <div
        className="relative h-[75vh] w-[88vw] sm:h-[80vh] sm:w-[85vw] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${altPrefix} ${index + 1}`}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
        className="absolute right-1 top-1/2 z-10 -translate-y-1/2 p-3 text-4xl leading-none text-white/70 hover:text-white sm:right-4 sm:text-5xl"
      >
        &rsaquo;
      </button>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60 sm:bottom-6">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}
