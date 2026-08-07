// Builds schema.org Menu/MenuSection/MenuItem JSON-LD directly from the
// same {name, desc, price} arrays each menu page already renders from —
// single source of truth, so the structured data can never drift from what
// guests actually see on the page.

function parsePriceToIDR(raw) {
  if (!raw) return null;
  const match = String(raw).match(/(\d+(?:\.\d+)?)\s*K/i);
  if (!match) return null;
  return String(Math.round(parseFloat(match[1]) * 1000));
}

export function buildMenuItem({ name, desc, price }) {
  const amount = parsePriceToIDR(price);
  return {
    "@type": "MenuItem",
    name,
    ...(desc ? { description: desc } : {}),
    ...(amount
      ? { offers: { "@type": "Offer", price: amount, priceCurrency: "IDR" } }
      : {}),
  };
}

export function buildMenuSection({ title, note, items }) {
  return {
    "@type": "MenuSection",
    name: title,
    ...(note ? { description: note } : {}),
    hasMenuItem: items.map((item) => buildMenuItem(item)),
  };
}

export function buildMenuJsonLd({ url, name, description, sections }) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${url}#menu`,
    name,
    ...(description ? { description } : {}),
    url,
    hasMenuSection: sections.map((section) => buildMenuSection(section)),
  };
}
