"use client";

import { useState } from "react";

/**
 * Round avatar photo that falls back to an initials badge if the file
 * hasn't been dropped in yet (or fails to load) — unlike
 * ImageWithFallback (which just hides itself), this swaps to a visible
 * placeholder, since a review card without something in the avatar slot
 * looks broken rather than merely quieter.
 */
export default function AvatarWithFallback({ src, alt, initials }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-raja-red/10 font-serif text-lg text-raja-red">
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- a small,
    // non-LCP avatar in a card row; next/image needs a known remote/local
    // manifest ahead of time, whereas these files get dropped in later by
    // the client one at a time.
    <img
      src={src}
      alt={alt}
      className="mx-auto mb-4 h-16 w-16 rounded-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
