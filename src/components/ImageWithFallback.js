"use client";

/**
 * Plain <img> that hides itself on load failure instead of showing a
 * broken-image icon (e.g. a badge file that hasn't been dropped in yet).
 * Its own tiny client component (not inlined) because an onError handler
 * can't be passed as a prop from a Server Component straight to a raw
 * <img> — this is the boundary that makes it legal from Footer.js and any
 * other Server Component that wants the same behavior.
 */
export default function ImageWithFallback({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
