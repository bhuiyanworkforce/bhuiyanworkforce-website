// Turns a getPageHead() result into HTML strings. Pure.

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// JSON inside <script>: "<" must not be able to close the tag.
export function jsonForScript(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

export function headToHtml(h) {
  const L = [];
  L.push(`<title>${esc(h.title)}</title>`);
  L.push(`<meta name="description" content="${esc(h.description)}" />`);
  if (h.keywords) L.push(`<meta name="keywords" content="${esc(h.keywords)}" />`);
  L.push(`<meta name="robots" content="${esc(h.robots)}" />`);
  if (h.canonical) L.push(`<link rel="canonical" href="${esc(h.canonical)}" />`);
  for (const a of h.alternates) {
    L.push(`<link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`);
  }
  const og = h.og;
  L.push(`<meta property="og:type" content="${esc(og.type)}" />`);
  L.push(`<meta property="og:site_name" content="${esc(og.siteName)}" />`);
  L.push(`<meta property="og:title" content="${esc(og.title)}" />`);
  L.push(`<meta property="og:description" content="${esc(og.description)}" />`);
  if (og.url) L.push(`<meta property="og:url" content="${esc(og.url)}" />`);
  L.push(`<meta property="og:image" content="${esc(og.image)}" />`);
  L.push(`<meta property="og:image:alt" content="${esc(og.imageAlt)}" />`);
  L.push(`<meta property="og:locale" content="${esc(og.locale)}" />`);
  for (const l of og.localeAlternates) L.push(`<meta property="og:locale:alternate" content="${esc(l)}" />`);
  const tw = h.twitter;
  L.push(`<meta name="twitter:card" content="${esc(tw.card)}" />`);
  L.push(`<meta name="twitter:title" content="${esc(tw.title)}" />`);
  L.push(`<meta name="twitter:description" content="${esc(tw.description)}" />`);
  L.push(`<meta name="twitter:image" content="${esc(tw.image)}" />`);
  for (const link of h.links) L.push(`<link rel="${esc(link.rel)}" href="${esc(link.href)}" />`);
  for (const obj of h.jsonld) L.push(`<script type="application/ld+json">${jsonForScript(obj)}</script>`);
  return L.map((l) => `    ${l}`).join('\n');
}
