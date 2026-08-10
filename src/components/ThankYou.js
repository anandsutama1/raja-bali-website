import Link from "next/link";

/**
 * Shared confirmation-page shell for every successful form submission (see
 * src/lib/thankYouLinks.js for the per-form "next step" links, and each
 * app/**\/thank-you/page.js for how this is wired up). Deliberately plain —
 * no PageSchema/JSON-LD, no gallery, no marketing copy — this is a
 * transient per-guest confirmation, not a page meant to be found or lingered
 * on. Home navigation is already covered by the Navbar logo, so there's no
 * separate "back to homepage" link here.
 */
export default function ThankYou({ heading, body, links = [] }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="mb-4 font-serif text-4xl">{heading}</h1>
      <p className="max-w-md text-gray-600">{body}</p>
      {links.length > 0 && (
        <div className="mt-12 w-full max-w-md">
          <p className="mb-4 text-xs font-semibold tracking-widest text-raja-red uppercase">You May Also Like</p>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="border border-raja-black px-5 py-2.5 text-sm tracking-widest transition hover:border-raja-red hover:text-raja-red"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
