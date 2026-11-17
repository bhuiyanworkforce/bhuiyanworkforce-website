// Languages whose bulky content is loaded on demand instead of shipping in the main bundle.
// Every real language except English (countries, services, posts, guides, UI strings, head strings).
// src/i18n/<lang>-bundle.js holds all of it and calls markLangLoaded('<lang>') when it has registered.
//
// - Browser: src/main.jsx loads the bundle before rendering when the URL is under /ar.
// - Static build and tests: entry-server.jsx and the scripts import it directly.

export const LAZY_LANGS = ['ar', 'pl', 'bg', 'ro', 'el', 'hr', 'sr', 'bs', 'mk', 'it', 'es', 'ms', 'de', 'hu', 'pt'];

const loaded = new Set();

export function markLangLoaded(code) {
  loaded.add(code);
}

export function isLangLoaded(code) {
  return !LAZY_LANGS.includes(code) || loaded.has(code);
}
