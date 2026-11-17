// One slug map for every page type and every real locale.
//
// Route shape used everywhere: { type, id }
//   type 'page'    id: home | about | faq | blog | countries | capabilities |
//                      employer-guide | privacy | terms | apply
//   type 'country' id: country slug in English (canonical id)
//   type 'service' id: service slug in English
//   type 'post'    id: post slug in English
//   type 'guide'   id: country slug in English
//
// Arabic, Bulgarian, Greek, Croatian, Serbian, Bosnian, Macedonian, Spanish and Malay use the English slugs, so they have no entries here:
// anything missing from a locale falls back to the English slug. Polish, Romanian and Italian have translated
// Latin slugs. A locale only needs entries for what it translates differently.
//
// This file contains no page lists and no availability information; see
// ../routes.js for which pages exist in which language.

import { LOCALES, DEFAULT_LOCALE, isRealLocale } from './config.js';

// Path segment placed before an entity slug.
export const SEGMENTS = {
  en: { country: 'countries', service: 'services', post: 'blog', guide: 'employer-guide' },
  ar: {},
  bg: {},
  el: {},
  hr: {},
  sr: {},
  bs: {},
  mk: {},
  es: {},
  ms: {},
  pl: { country: 'kraje', service: 'uslugi', post: 'blog', guide: 'przewodnik-dla-pracodawcow' },
  ro: { country: 'tari', service: 'servicii', post: 'blog', guide: 'ghid-pentru-angajatori' },
  it: { country: 'paesi', service: 'servizi', post: 'blog', guide: 'guida-per-i-datori-di-lavoro' },
};

// Slugs of static pages (home is always the empty path).
export const PAGE_SLUGS = {
  en: {
    about: 'about', faq: 'faq', blog: 'blog', countries: 'countries',
    capabilities: 'capabilities', 'employer-guide': 'employer-guide',
    privacy: 'privacy', terms: 'terms', apply: 'apply',
  },
  ar: {},
  bg: {},
  el: {},
  hr: {},
  sr: {},
  bs: {},
  mk: {},
  es: {},
  ms: {},
  pl: {
    about: 'o-nas', faq: 'faq', blog: 'blog', countries: 'kraje',
    capabilities: 'mozliwosci', 'employer-guide': 'przewodnik-dla-pracodawcow',
    privacy: 'polityka-prywatnosci', terms: 'regulamin', apply: 'aplikuj',
  },
  ro: {
    about: 'despre-noi', faq: 'intrebari-frecvente', blog: 'blog', countries: 'tari',
    capabilities: 'capabilitati', 'employer-guide': 'ghid-pentru-angajatori',
    privacy: 'politica-de-confidentialitate', terms: 'termeni-si-conditii', apply: 'aplica',
  },
  it: {
    about: 'chi-siamo', faq: 'domande-frequenti', blog: 'blog', countries: 'paesi',
    capabilities: 'competenze', 'employer-guide': 'guida-per-i-datori-di-lavoro',
    privacy: 'informativa-sulla-privacy', terms: 'termini-e-condizioni', apply: 'candidati',
  },
};

// Entity slugs per locale. Keys are the English slugs.
export const ENTITY_SLUGS = {
  ar: {},
  bg: {},
  el: {},
  hr: {},
  sr: {},
  bs: {},
  mk: {},
  es: {},
  ms: {},
  pl: {
    country: {
      'saudi-arabia': 'arabia-saudyjska',
      uae: 'zjednoczone-emiraty-arabskie',
      qatar: 'katar',
      kuwait: 'kuwejt',
      oman: 'oman',
      bahrain: 'bahrajn',
      jordan: 'jordania',
      malaysia: 'malezja',
      singapore: 'singapur',
      maldives: 'malediwy',
      serbia: 'serbia',
      portugal: 'portugalia',
      greece: 'grecja',
      romania: 'rumunia',
      poland: 'polska',
      hungary: 'wegry',
      croatia: 'chorwacja',
      'czech-republic': 'czechy',
      lithuania: 'litwa',
      latvia: 'lotwa',
      estonia: 'estonia',
      bulgaria: 'bulgaria',
      cyprus: 'cypr',
      slovakia: 'slowacja',
      'bosnia-herzegovina': 'bosnia-i-hercegowina',
      armenia: 'armenia',
      montenegro: 'czarnogora',
      georgia: 'gruzja',
      slovenia: 'slowenia',
      'north-macedonia': 'macedonia-polnocna',
      italy: 'wlochy',
      seychelles: 'seszele',
      mauritius: 'mauritius',
    },
    service: {
      construction: 'budownictwo',
      drivers: 'kierowcy',
      hospitality: 'gastronomia-hotelarstwo',
      'farm-garden': 'rolnictwo-ogrodnictwo',
      warehouse: 'magazyn-logistyka',
      factory: 'produkcja-fabryki',
      'oil-gas': 'ropa-i-gaz',
      security: 'ochrona',
      cleaning: 'sprzatanie',
      retail: 'handel-detaliczny',
      'painting-finishing': 'malowanie-i-wykonczenia',
      'steel-fixing': 'zbrojarze',
      'scaffolding-formwork': 'rusztowania-i-szalunki',
      'landscaping-groundskeeping': 'utrzymanie-terenow-zielonych',
      'masonry-bricklaying': 'murarze',
      'electrical-helpers': 'pomocnicy-elektrykow',
      'laundry-linen': 'pralnia-i-bielizna',
      'food-processing': 'przetworstwo-spozywcze',
      'fishery-aquaculture': 'rybolowstwo-i-akwakultura',
      caregiving: 'opieka',
      'welding-fabrication': 'spawanie-i-konstrukcje-stalowe',
      'plumbing-hvac': 'hydraulika-i-hvac',
      'heavy-equipment': 'maszyny-budowlane',
      'marine-fabrication': 'konstrukcje-morskie',
      'domestic-household': 'pomoc-domowa',
    },
    post: {},
    guide: {
      'saudi-arabia': 'arabia-saudyjska',
      uae: 'zjednoczone-emiraty-arabskie',
      poland: 'polska',
    },
  },
  ro: {
    country: {
      'saudi-arabia': 'arabia-saudita',
      uae: 'emiratele-arabe-unite',
      qatar: 'qatar',
      kuwait: 'kuweit',
      oman: 'oman',
      bahrain: 'bahrain',
      jordan: 'iordania',
      malaysia: 'malaezia',
      singapore: 'singapore',
      maldives: 'maldive',
      serbia: 'serbia',
      portugal: 'portugalia',
      greece: 'grecia',
      romania: 'romania',
      poland: 'polonia',
      hungary: 'ungaria',
      croatia: 'croatia',
      'czech-republic': 'republica-ceha',
      lithuania: 'lituania',
      latvia: 'letonia',
      estonia: 'estonia',
      bulgaria: 'bulgaria',
      cyprus: 'cipru',
      slovakia: 'slovacia',
      'bosnia-herzegovina': 'bosnia-si-hertegovina',
      armenia: 'armenia',
      montenegro: 'muntenegru',
      georgia: 'georgia',
      slovenia: 'slovenia',
      'north-macedonia': 'macedonia-de-nord',
      italy: 'italia',
      seychelles: 'seychelles',
      mauritius: 'mauritius',
    },
    service: {
      construction: 'constructii',
      drivers: 'soferi',
      hospitality: 'ospitalitate',
      'farm-garden': 'agricultura-si-gradinarit',
      warehouse: 'depozit-si-logistica',
      factory: 'productie-si-fabrici',
      'oil-gas': 'petrol-si-gaze',
      security: 'securitate',
      cleaning: 'curatenie',
      retail: 'comert-cu-amanuntul',
      'painting-finishing': 'zugraveli-si-finisaje',
      'steel-fixing': 'fierari-betonisti',
      'scaffolding-formwork': 'schele-si-cofraje',
      'landscaping-groundskeeping': 'amenajare-si-intretinere-spatii-verzi',
      'masonry-bricklaying': 'zidari',
      'electrical-helpers': 'ajutori-electricieni',
      'laundry-linen': 'spalatorie-si-lenjerie',
      'food-processing': 'procesare-alimentara',
      'fishery-aquaculture': 'pescuit-si-acvacultura',
      caregiving: 'ingrijire',
      'welding-fabrication': 'sudura-si-constructii-metalice',
      'plumbing-hvac': 'instalatii-si-hvac',
      'heavy-equipment': 'utilaje-grele',
      'marine-fabrication': 'constructii-navale',
      'domestic-household': 'personal-casnic',
    },
    post: {},
    guide: {
      'saudi-arabia': 'arabia-saudita',
      uae: 'emiratele-arabe-unite',
      poland: 'polonia',
    },
  },
  it: {
    country: {
      'saudi-arabia': 'arabia-saudita',
      uae: 'emirati-arabi-uniti',
      qatar: 'qatar',
      kuwait: 'kuwait',
      oman: 'oman',
      bahrain: 'bahrein',
      jordan: 'giordania',
      malaysia: 'malesia',
      singapore: 'singapore',
      maldives: 'maldive',
      serbia: 'serbia',
      portugal: 'portogallo',
      greece: 'grecia',
      romania: 'romania',
      poland: 'polonia',
      hungary: 'ungheria',
      croatia: 'croazia',
      'czech-republic': 'repubblica-ceca',
      lithuania: 'lituania',
      latvia: 'lettonia',
      estonia: 'estonia',
      bulgaria: 'bulgaria',
      cyprus: 'cipro',
      slovakia: 'slovacchia',
      'bosnia-herzegovina': 'bosnia-erzegovina',
      armenia: 'armenia',
      montenegro: 'montenegro',
      georgia: 'georgia',
      slovenia: 'slovenia',
      'north-macedonia': 'macedonia-del-nord',
      italy: 'italia',
      seychelles: 'seychelles',
      mauritius: 'mauritius',
    },
    service: {
      construction: 'edilizia-e-ingegneria',
      drivers: 'autisti-e-trasporti',
      hospitality: 'cuochi-e-ospitalita',
      'farm-garden': 'agricoltura-e-giardinaggio',
      warehouse: 'logistica-e-magazzino',
      factory: 'fabbriche-e-produzione',
      'oil-gas': 'petrolio-e-gas',
      security: 'addetti-alla-sicurezza',
      cleaning: 'pulizie-e-housekeeping',
      retail: 'personale-per-negozi',
      'painting-finishing': 'pittura-e-finiture',
      'steel-fixing': 'armature-e-posa-del-ferro',
      'scaffolding-formwork': 'ponteggi-e-casseforme',
      'landscaping-groundskeeping': 'manutenzione-del-verde',
      'masonry-bricklaying': 'muratura-e-posa-di-mattoni',
      'electrical-helpers': 'aiutanti-elettricisti',
      'laundry-linen': 'lavanderia-e-biancheria',
      'food-processing': 'lavorazione-alimentare',
      'fishery-aquaculture': 'pesca-e-acquacoltura',
      caregiving: 'assistenza-agli-anziani',
      'welding-fabrication': 'saldatura-e-lavorazione-metalli',
      'plumbing-hvac': 'idraulica-e-hvac',
      'heavy-equipment': 'mezzi-pesanti',
      'marine-fabrication': 'costruzione-navale',
      'domestic-household': 'lavoratori-domestici',
    },
    post: {},
    guide: {
      'saudi-arabia': 'arabia-saudita',
      uae: 'emirati-arabi-uniti',
      poland: 'polonia',
    },
  },
};

const PAGE_IDS_WITH_PATH = Object.keys(PAGE_SLUGS.en);
const ENTITY_TYPES = ['country', 'service', 'post', 'guide'];

export function localePrefix(lang) {
  return LOCALES[lang]?.prefix ?? '';
}

function segmentFor(lang, type) {
  return SEGMENTS[lang]?.[type] ?? SEGMENTS[DEFAULT_LOCALE][type];
}

function pageSlugFor(lang, id) {
  return PAGE_SLUGS[lang]?.[id] ?? PAGE_SLUGS[DEFAULT_LOCALE][id];
}

export function entitySlugFor(lang, type, id) {
  return ENTITY_SLUGS[lang]?.[type]?.[id] ?? id;
}

/**
 * Route + language -> path. No trailing slash. Home is '/' in English and
 * '/ar', '/pl' in the others.
 */
export function buildPath(lang, route) {
  if (!isRealLocale(lang)) throw new Error(`buildPath: "${lang}" is not a real locale`);
  const prefix = localePrefix(lang);
  if (route.type === 'page') {
    if (route.id === 'home') return prefix || '/';
    const slug = pageSlugFor(lang, route.id);
    if (!slug) throw new Error(`buildPath: unknown page "${route.id}"`);
    return `${prefix}/${slug}`;
  }
  if (!ENTITY_TYPES.includes(route.type)) throw new Error(`buildPath: unknown route type "${route.type}"`);
  return `${prefix}/${segmentFor(lang, route.type)}/${entitySlugFor(lang, route.type, route.id)}`;
}

// Reverse lookup tables, built once from the maps above.
const PAGE_REVERSE = {};
const SEGMENT_REVERSE = {};
const ENTITY_REVERSE = {};

for (const lang of Object.keys(LOCALES)) {
  if (!isRealLocale(lang)) continue;
  PAGE_REVERSE[lang] = {};
  for (const id of PAGE_IDS_WITH_PATH) PAGE_REVERSE[lang][pageSlugFor(lang, id)] = id;
  SEGMENT_REVERSE[lang] = {};
  ENTITY_REVERSE[lang] = {};
  for (const type of ENTITY_TYPES) {
    SEGMENT_REVERSE[lang][segmentFor(lang, type)] = type;
    ENTITY_REVERSE[lang][type] = {};
    for (const [enSlug, local] of Object.entries(ENTITY_SLUGS[lang]?.[type] ?? {})) {
      ENTITY_REVERSE[lang][type][local] = enSlug;
    }
  }
}

function detectLang(segments) {
  for (const code of Object.keys(LOCALES)) {
    const l = LOCALES[code];
    if (l.overlay || !l.prefix) continue;
    if (segments[0] === l.prefix.slice(1)) return { lang: code, rest: segments.slice(1) };
  }
  return { lang: DEFAULT_LOCALE, rest: segments };
}

/**
 * Path -> { lang, route } or { lang, route: null } when the path matches no
 * known page shape. Tolerates a trailing slash, query string and hash, but the
 * canonical form never has a trailing slash.
 *
 * It does NOT check that the page exists in that language or that an entity
 * slug is real: use resolvePath() in ../routes.js for that.
 */
export function parsePath(pathname) {
  const clean = String(pathname || '/').split('#')[0].split('?')[0];
  const segments = clean.split('/').filter(Boolean);
  const { lang, rest } = detectLang(segments);

  if (rest.length === 0) return { lang, route: { type: 'page', id: 'home' } };

  if (rest.length === 1) {
    const id = PAGE_REVERSE[lang][rest[0]];
    if (id) return { lang, route: { type: 'page', id } };
    return { lang, route: null };
  }

  if (rest.length === 2) {
    const type = SEGMENT_REVERSE[lang][rest[0]];
    if (!type) return { lang, route: null };
    const hasMap = Object.keys(ENTITY_REVERSE[lang][type]).length > 0;
    const id = hasMap ? ENTITY_REVERSE[lang][type][rest[1]] ?? (lang === DEFAULT_LOCALE ? rest[1] : undefined) : rest[1];
    if (!id) return { lang, route: null };
    return { lang, route: { type, id } };
  }

  return { lang, route: null };
}

/** True when the path is the canonical form (no trailing slash, lower case). */
export function isCanonicalPath(pathname) {
  if (pathname === '/') return true;
  return !pathname.endsWith('/') && pathname === pathname.toLowerCase();
}
