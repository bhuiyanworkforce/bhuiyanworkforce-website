// Shared route module. Used by the router (client + SSR), the language
// switcher, getPageHead, the sitemap and the static page generator, so they
// can never disagree about which pages exist.
//
// Pure ES module, no JSX, no imports from React or Vite: Node can import it
// directly. Keep the explicit ".js" extensions on relative imports.
//
// The slug lists below mirror src/data/*.jsx. scripts/verify-pages.mjs and
// scripts/test-seo.mjs fail the build if they drift from the data files.

import { LOCALES, REAL_LOCALE_CODES, DEFAULT_LOCALE, SITE_URL, isRealLocale } from './i18n/config.js';
import { buildPath, parsePath } from './i18n/slugs.js';
import { LOCALE_DATA } from './i18n/locales/index.js';

export const PAGE_IDS = [
  'home', 'about', 'faq', 'blog', 'countries', 'capabilities',
  'employer-guide', 'privacy', 'terms', 'apply',
];

// Pages that must not be indexed (served, but noindex and left out of the sitemap).
export const NOINDEX_PAGE_IDS = ['apply'];

export const SERVICE_SLUGS = [
  'construction', 'drivers', 'hospitality', 'farm-garden', 'warehouse', 'factory', 'oil-gas',
  'security', 'cleaning', 'retail', 'painting-finishing', 'steel-fixing', 'scaffolding-formwork',
  'landscaping-groundskeeping', 'masonry-bricklaying', 'electrical-helpers', 'laundry-linen',
  'food-processing', 'fishery-aquaculture', 'caregiving', 'welding-fabrication', 'plumbing-hvac',
  'heavy-equipment', 'marine-fabrication', 'domestic-household',
];

export const COUNTRY_SLUGS = [
  'saudi-arabia', 'uae', 'qatar', 'kuwait', 'oman', 'bahrain', 'jordan', 'malaysia', 'singapore',
  'maldives', 'serbia', 'portugal', 'greece', 'romania', 'poland', 'hungary', 'croatia',
  'czech-republic', 'lithuania', 'latvia', 'estonia', 'bulgaria', 'cyprus', 'slovakia',
  'bosnia-herzegovina', 'armenia', 'montenegro', 'georgia', 'slovenia', 'north-macedonia', 'italy',
  'seychelles', 'mauritius',
];

export const POST_SLUGS = [
  'poland-new-work-permit-system-2026', 'saudi-arabia-visa-quotas-compliance-2026',
  'uae-wage-emiratisation-rules-2026', 'malaysia-bangladesh-recruitment-reopens-2026',
  'czech-republic-employee-card-rules-2026',
  'romania-work-visa-2026-changes', 'armenia-georgia-opportunity', 'georgia-work-permit-law-explained',
  'montenegro-construction-hospitality-opportunity', 'certified-welders-gulf-construction',
  'hvac-ac-technician-gulf-demand', 'gamca-wafid-medical-guide', 'gulf-construction-bangladesh',
  'bmet-smart-card-explained', 'malaysia-vs-gulf-comparison', 'spot-legitimate-recruitment-agency',
  'eastern-europe-factory-workers', 'remittance-economy-bangladesh',
];

// Only these three guides have content in the data file.
export const GUIDE_SLUGS = ['saudi-arabia', 'uae', 'poland'];

const LISTS = {
  page: PAGE_IDS,
  service: SERVICE_SLUGS,
  country: COUNTRY_SLUGS,
  post: POST_SLUGS,
  guide: GUIDE_SLUGS,
};

/** 'page:home', 'country:saudi-arabia', ... */
export function routeKey(route) {
  return `${route.type}:${route.id}`;
}

/** Every route that exists in the default language. */
export function listAllRoutes() {
  const out = [];
  for (const [type, ids] of Object.entries(LISTS)) {
    for (const id of ids) out.push({ type, id });
  }
  return out;
}

/** Does this route exist at all (is the slug real)? */
export function routeExists(route) {
  return Boolean(route) && (LISTS[route.type] || []).includes(route.id);
}

/** Is there a real translation of this route in this language? */
export function isAvailable(route, lang) {
  if (!isRealLocale(lang) || !routeExists(route)) return false;
  const translated = LOCALE_DATA[lang]?.translated;
  if (translated === 'all') return true;
  return Array.isArray(translated) && translated.includes(routeKey(route));
}

export function isNoindex(route) {
  return route.type === 'page' && NOINDEX_PAGE_IDS.includes(route.id);
}

/** Languages in which this route exists, in config order. */
export function availableLanguages(route) {
  return REAL_LOCALE_CODES.filter((lang) => isAvailable(route, lang));
}

/**
 * Pathname -> { lang, route, status }. status 'ok' only when the page exists in
 * that language; otherwise 'notfound' (route may still be set, for diagnostics).
 */
export function resolvePath(pathname) {
  const { lang, route } = parsePath(pathname);
  if (!route) return { lang, route: null, status: 'notfound' };
  return { lang, route, status: isAvailable(route, lang) ? 'ok' : 'notfound' };
}

export function absoluteUrl(lang, route) {
  const p = buildPath(lang, route);
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}

/**
 * hreflang alternates for a route: one per language the page exists in, plus
 * x-default pointing at English. Pages that exist in a single language get no
 * alternates at all (a lone self-referencing hreflang adds nothing).
 */
export function getAlternates(route) {
  const langs = availableLanguages(route);
  if (langs.length < 2) return [];
  const alts = langs.map((lang) => ({ hreflang: LOCALES[lang].hreflang, href: absoluteUrl(lang, route) }));
  alts.push({ hreflang: 'x-default', href: absoluteUrl(DEFAULT_LOCALE, route) });
  return alts;
}

/**
 * Links for the language switcher. One entry per real language. Where the page
 * has no translation the link falls back to that language's homepage and is
 * flagged (fallback: true) so the UI can tell the visitor.
 */
export function getLanguageLinks(route, currentLang) {
  return REAL_LOCALE_CODES.map((lang) => {
    const available = route ? isAvailable(route, lang) : false;
    const target = available ? route : { type: 'page', id: 'home' };
    return {
      code: lang,
      label: LOCALES[lang].label,
      hreflang: LOCALES[lang].hreflang,
      dir: LOCALES[lang].dir,
      href: buildPath(lang, target),
      current: lang === currentLang,
      fallback: !available,
    };
  });
}

/**
 * Every page to generate as static HTML: [{ route, lang, path, indexable }].
 * Each route appears once per language in which it exists.
 */
export function listPages() {
  const pages = [];
  for (const route of listAllRoutes()) {
    for (const lang of availableLanguages(route)) {
      pages.push({ route, lang, path: buildPath(lang, route), indexable: !isNoindex(route) });
    }
  }
  return pages;
}
