// Single source of truth for languages.
//
// Real languages (overlay: false) get their own URL prefix, static HTML, hreflang
// and sitemap entries. Overlay languages only swap UI strings in place on the English URL
// after hydration: no URL change, no hreflang, no canonical. There are none at the moment
// (Bengali became a real language under /bn, like Italian before it).
//
// Adding a real language later needs: one entry here, one locale file in
// ./locales/, one entry per map in ./slugs.js and one line in ./locales/index.js.

export const SITE_URL = 'https://bhuiyanworkforce.com';

export const DEFAULT_LOCALE = 'en';

export const LOCALES = {
  en: {
    code: 'en',
    flag: '🇬🇧',
    dir: 'ltr',
    hreflang: 'en',
    ogLocale: 'en_GB',
    label: 'English',
    prefix: '',
    overlay: false,
  },
  ar: {
    code: 'ar',
    flag: '🇸🇦',
    dir: 'rtl',
    hreflang: 'ar',
    ogLocale: 'ar_AR',
    label: 'العربية',
    prefix: '/ar',
    overlay: false,
    // Loaded via <link> in the generated head. fonts.googleapis.com and
    // fonts.gstatic.com are already allowed by the CSP in public/_headers.
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap',
  },
  pl: {
    code: 'pl',
    flag: '🇵🇱',
    dir: 'ltr',
    hreflang: 'pl',
    ogLocale: 'pl_PL',
    label: 'Polski',
    prefix: '/pl',
    overlay: false,
  },
  bg: {
    code: 'bg',
    flag: '🇧🇬',
    dir: 'ltr',
    hreflang: 'bg',
    ogLocale: 'bg_BG',
    label: 'Български',
    prefix: '/bg',
    overlay: false,
  },
  ro: {
    code: 'ro',
    flag: '🇷🇴',
    dir: 'ltr',
    hreflang: 'ro',
    ogLocale: 'ro_RO',
    label: 'Română',
    prefix: '/ro',
    overlay: false,
  },
  el: {
    code: 'el',
    flag: '🇬🇷',
    dir: 'ltr',
    hreflang: 'el',
    ogLocale: 'el_GR',
    label: 'Ελληνικά',
    prefix: '/el',
    overlay: false,
  },
  hr: {
    code: 'hr',
    flag: '🇭🇷',
    dir: 'ltr',
    hreflang: 'hr',
    ogLocale: 'hr_HR',
    label: 'Hrvatski',
    prefix: '/hr',
    overlay: false,
  },
  sr: {
    code: 'sr',
    flag: '🇷🇸',
    dir: 'ltr',
    hreflang: 'sr-Latn',
    ogLocale: 'sr_RS',
    label: 'Srpski',
    prefix: '/sr',
    overlay: false,
  },
  bs: {
    code: 'bs',
    flag: '🇧🇦',
    dir: 'ltr',
    hreflang: 'bs',
    ogLocale: 'bs_BA',
    label: 'Bosanski',
    prefix: '/bs',
    overlay: false,
  },
  mk: {
    code: 'mk',
    flag: '🇲🇰',
    dir: 'ltr',
    hreflang: 'mk',
    ogLocale: 'mk_MK',
    label: 'Македонски',
    prefix: '/mk',
    overlay: false,
  },
  it: {
    code: 'it',
    flag: '🇮🇹',
    dir: 'ltr',
    hreflang: 'it',
    ogLocale: 'it_IT',
    label: 'Italiano',
    prefix: '/it',
    overlay: false,
  },
  es: {
    code: 'es',
    flag: '🇪🇸',
    dir: 'ltr',
    hreflang: 'es',
    ogLocale: 'es_ES',
    label: 'Español',
    prefix: '/es',
    overlay: false,
  },
  ms: {
    code: 'ms',
    flag: '🇲🇾',
    dir: 'ltr',
    hreflang: 'ms',
    ogLocale: 'ms_MY',
    label: 'Bahasa Melayu',
    prefix: '/ms',
    overlay: false,
  },
  de: {
    code: 'de',
    flag: '🇩🇪',
    dir: 'ltr',
    hreflang: 'de',
    ogLocale: 'de_DE',
    label: 'Deutsch',
    prefix: '/de',
    overlay: false,
  },
  hu: {
    code: 'hu',
    flag: '🇭🇺',
    dir: 'ltr',
    hreflang: 'hu',
    ogLocale: 'hu_HU',
    label: 'Magyar',
    prefix: '/hu',
    overlay: false,
  },
  pt: {
    code: 'pt',
    flag: '🇵🇹',
    dir: 'ltr',
    hreflang: 'pt',
    ogLocale: 'pt_PT',
    label: 'Português',
    prefix: '/pt',
    overlay: false,
  },
  bn: {
    code: 'bn',
    flag: '🇧🇩',
    dir: 'ltr',
    hreflang: 'bn',
    ogLocale: 'bn_BD',
    label: 'বাংলা',
    prefix: '/bn',
    overlay: false,
    // Worker-facing section only (home, FAQ, worker guide). Fonts load like Arabic: fonts.googleapis.com
    // and fonts.gstatic.com are already allowed by the CSP in public/_headers.
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap',
  },
};

export const REAL_LOCALE_CODES = Object.values(LOCALES)
  .filter((l) => !l.overlay)
  .map((l) => l.code);

// Order of the language dropdown (display only). REAL_LOCALE_CODES above keeps its own order, which
// the hreflang alternates and the sitemap use. A language missing from this list goes last.
export const SWITCHER_ORDER = [
  'en', 'bn', 'ar', 'pl', 'el', 'ro', 'es', 'it', 'sr', 'bs', 'pt', 'hr', 'bg', 'de', 'mk', 'hu', 'ms',
];

export const OVERLAY_LOCALE_CODES = Object.values(LOCALES)
  .filter((l) => l.overlay)
  .map((l) => l.code);

export function isRealLocale(code) {
  return Boolean(LOCALES[code]) && !LOCALES[code].overlay;
}
