// Languages whose bulky content is loaded on demand instead of shipping in the main bundle.
// Arabic is the big one (countries, services, posts, guides, UI strings, head strings).
// src/i18n/ar-bundle.js holds all of it and calls markLangLoaded('ar') when it has registered.
//
// - Browser: src/main.jsx loads the bundle before rendering when the URL is under /ar.
// - Static build and tests: entry-server.jsx and the scripts import it directly.

export const LAZY_LANGS = ['ar'];

const loaded = new Set();

export function markLangLoaded(code) {
  loaded.add(code);
}

export function isLangLoaded(code) {
  return !LAZY_LANGS.includes(code) || loaded.has(code);
}
