// Country-specific employer guides
// Accessed at /employer-guide/:slug
//
// One guide per destination country (all 33). Each guide is published in the language it was
// written in (`lang`, `dir`), with a short English summary (`summary`, `status`) shown beside it.
// The text lives in guidesData.js. Add or change a guide there, then keep GUIDE_SLUGS in
// src/routes.js in step (it mirrors COUNTRY_SLUGS).
import { useEffect, useSyncExternalStore } from 'react';
import GUIDES from './guidesSource.js';

// In the browser build GUIDES is an empty stub and the real text (about 436 kB) is loaded on demand, only
// for visitors who open a country or guide page. Node scripts, tests and the static build get it up front.
export const COUNTRY_GUIDES = { ...GUIDES };

let loaded = Object.keys(COUNTRY_GUIDES).length > 0;
let pending = null;
const listeners = new Set();

export function guidesLoaded() { return loaded; }

export function ensureGuides() {
  if (loaded) return Promise.resolve();
  if (!pending) {
    pending = import('./guidesData.js').then((m) => {
      Object.assign(COUNTRY_GUIDES, m.default);
      loaded = true;
      listeners.forEach((fn) => fn());
    }).catch(() => { pending = null; }); // a failed fetch can be retried on the next visit to a guide page
  }
  return pending;
}

// True once the guide text is available; starts loading it if it is not (and `needed` is true). The server always
// reports true. Pass needed=false on pages that do not use the guides so they never trigger the download.
export function useGuidesReady(needed = true) {
  const ready = useSyncExternalStore(
    (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    () => loaded,
    () => true,
  );
  useEffect(() => { if (needed && !ready) ensureGuides(); }, [needed, ready]);
  return ready;
}

export function getCountryGuide(slug) {
  return COUNTRY_GUIDES[slug] || null;
}
