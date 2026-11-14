// Translated content with per-key English fallback.
// Each fallback is recorded (see ./fallbacks.js) and listed at the end of the build.

import { recordFallback } from './fallbacks.js';
import plCountries from './pl/countries.js';
import plNames from './pl/names.js';

// Polish content is small and always loaded. Arabic is large: it registers itself through
// registerContent() from src/i18n/ar-bundle.js, which is loaded on demand in the browser.
const COUNTRY_CONTENT = { pl: plCountries };
const COUNTRY_NAMES = { pl: plNames };
const ENTITY_CONTENT = {};

export function registerContent(lang, { countries, names, service, post, guide }) {
  COUNTRY_CONTENT[lang] = countries;
  COUNTRY_NAMES[lang] = names;
  ENTITY_CONTENT[lang] = { service, post, guide };
}

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


const SERVICE_KEYS = ['name', 'shortDesc', 'overview', 'roles', 'countries', 'process'];
export function localizeService(base, lang) {
  if (!base || lang === 'en') return base;
  const tr = ENTITY_CONTENT[lang]?.service?.find((x) => x.slug === base.slug);
  if (!tr) { recordFallback('service', lang, base.slug); return base; }
  const out = { ...base };
  for (const key of SERVICE_KEYS) {
    if (tr[key] !== undefined) out[key] = tr[key];
    else recordFallback('service', lang, `${base.slug}.${key}`);
  }
  return out;
}

export function localizePost(base, lang) {
  if (!base || lang === 'en') return base;
  const tr = ENTITY_CONTENT[lang]?.post?.find((x) => x.slug === base.slug);
  if (!tr) { recordFallback('post', lang, base.slug); return base; }
  return { ...base, ...tr };
}

export function localizeGuide(base, lang) {
  if (!base || lang === 'en') return base;
  const tr = ENTITY_CONTENT[lang]?.guide?.[base.country === 'Saudi Arabia' ? 'saudi-arabia' : base.country === 'UAE' ? 'uae' : 'poland'];
  if (!tr) { recordFallback('guide', lang, base.country); return base; }
  return tr;
}
