// getPageHead() result -> tag descriptors, HTML string, or DOM nodes. Pure (the DOM
// function only touches the document it is given).

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

/** [{ tag, attrs, text, key }] in output order. `key` marks the element kind for client replacement. */
export function headTags(h) {
  const T = [];
  const meta = (attrs) => T.push({ tag: 'meta', attrs });
  T.push({ tag: 'title', text: h.title });
  meta({ name: 'description', content: h.description });
  if (h.keywords) meta({ name: 'keywords', content: h.keywords });
  meta({ name: 'robots', content: h.robots });
  if (h.canonical) T.push({ tag: 'link', attrs: { rel: 'canonical', href: h.canonical } });
  for (const a of h.alternates) T.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: a.hreflang, href: a.href } });
  const og = h.og;
  meta({ property: 'og:type', content: og.type });
  meta({ property: 'og:site_name', content: og.siteName });
  meta({ property: 'og:title', content: og.title });
  meta({ property: 'og:description', content: og.description });
  if (og.url) meta({ property: 'og:url', content: og.url });
  meta({ property: 'og:image', content: og.image });
  meta({ property: 'og:image:alt', content: og.imageAlt });
  meta({ property: 'og:locale', content: og.locale });
  for (const l of og.localeAlternates) meta({ property: 'og:locale:alternate', content: l });
  const tw = h.twitter;
  meta({ name: 'twitter:card', content: tw.card });
  meta({ name: 'twitter:title', content: tw.title });
  meta({ name: 'twitter:description', content: tw.description });
  meta({ name: 'twitter:image', content: tw.image });
  for (const link of h.links) T.push({ tag: 'link', attrs: { rel: link.rel, href: link.href } });
  for (const obj of h.jsonld) T.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: jsonForScript(obj) });
  return T;
}

export function headToHtml(h) {
  return headTags(h)
    .map((t) => {
      if (t.tag === 'title') return `    <title>${esc(t.text)}</title>`;
      if (t.tag === 'script') return `    <script type="application/ld+json">${t.text}</script>`;
      const attrs = Object.entries(t.attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ');
      return `    <${t.tag} ${attrs} />`;
    })
    .join('\n');
}

// Elements the generated head owns; the client removes and re-adds exactly these on navigation.
const OWNED = [
  'meta[name="description"]', 'meta[name="keywords"]', 'meta[name="robots"]',
  'link[rel="canonical"]', 'link[rel="alternate"][hreflang]',
  'meta[property^="og:"]', 'meta[name^="twitter:"]', 'script[type="application/ld+json"]',
];

/** Client-side: make document.head and <html lang dir> match the page head. */
export function applyHeadToDocument(h, doc = document) {
  doc.title = h.title;
  doc.documentElement.setAttribute('lang', h.lang);
  doc.documentElement.setAttribute('dir', h.dir);
  for (const sel of OWNED) doc.head.querySelectorAll(sel).forEach((n) => n.remove());
  for (const t of headTags(h)) {
    if (t.tag === 'title') continue;
    if (t.tag === 'link' && t.attrs.rel === 'stylesheet' && doc.head.querySelector(`link[rel="stylesheet"][href="${t.attrs.href}"]`)) continue;
    const el = doc.createElement(t.tag);
    for (const [k, v] of Object.entries(t.attrs || {})) el.setAttribute(k, v);
    if (t.text !== undefined) el.textContent = t.text;
    doc.head.appendChild(el);
  }
}
