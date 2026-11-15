// Page-level strings that are hard-coded in English inside page components
// (Blog, Countries, Employer Guide, Capabilities, Apply, Privacy, Terms, contact-form options).
//
// Lookup is keyed by the English source string. A language registers its table with
// registerExtra() from its bundle (see ro-bundle.js). English, and any string a language
// has not translated, falls back to the English source and is recorded for the build report.
// Plain JS (no JSX) so Node scripts can import it.

import { recordFallback } from '../content/fallbacks.js';

const TABLES = {};

export function registerExtra(lang, table) {
  TABLES[lang] = table;
}

const norm = (s) => String(s).replace(/\s+/g, ' ').trim();

export function tx(lang, en) {
  if (lang === 'en' || typeof en !== 'string') return en;
  if (!/[A-Za-z]{2}/.test(en) || /@|^https?:/.test(en)) return en; // emails, phones, URLs stay as written
  const table = TABLES[lang];
  if (!table) return en;
  const hit = table[en] ?? table[norm(en)];
  if (hit !== undefined) return hit;
  recordFallback('extra', lang, norm(en).slice(0, 80));
  return en;
}
