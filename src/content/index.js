// Translated content with per-key English fallback.
// Each fallback is recorded (see ./fallbacks.js) and listed at the end of the build.

import { recordFallback } from './fallbacks.js';
import arCountries from './ar/countries.js';
import plCountries from './pl/countries.js';
import arNames from './ar/names.js';
import plNames from './pl/names.js';

const COUNTRY_CONTENT = { ar: arCountries, pl: plCountries };
const COUNTRY_NAMES = { ar: arNames, pl: plNames };

const COUNTRY_KEYS = [
  'name', 'region', 'capital', 'currency', 'overview', 'topSectors', 'visaType', 'visaFee',
  'processingTime', 'process', 'documents', 'salaryRange', 'notes', 'flag_detail',
];

/**
 * English record + translated fields for `lang`. For English the record is returned
 * unchanged. h1 and ctaTitle are optional extras (grammar differs per language, so
 * they are written out instead of built from a template).
 */
export function localizeCountry(base, lang) {
  if (!base || lang === 'en') return base;
  const tr = COUNTRY_CONTENT[lang]?.[base.slug];
  const out = { ...base, h1: tr?.h1, ctaTitle: tr?.ctaTitle };
  for (const key of COUNTRY_KEYS) {
    if (tr && tr[key] !== undefined) out[key] = tr[key];
    else if (base[key] !== undefined) recordFallback('country', lang, `${base.slug}.${key}`);
  }
  return out;
}

/** Country name in `lang`; the English name when the language has none (Bengali/Italian overlay, or a gap). */
export function countryName(lang, slug, englishName) {
  const names = COUNTRY_NAMES[lang];
  if (!names) return englishName;
  if (names[slug]) return names[slug];
  recordFallback('country-name', lang, slug);
  return englishName;
}
