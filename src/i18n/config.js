// Single source of truth for languages.
//
// Real languages (overlay: false) get their own URL prefix, static HTML, hreflang
// and sitemap entries. Overlay languages (bn, it) only swap UI strings in place
// on the English URL after hydration: no URL change, no hreflang, no canonical.
//
// Adding a real language later needs: one entry here, one locale file in
// ./locales/, one entry per map in ./slugs.js and one line in ./locales/index.js.

export const SITE_URL = 'https://bhuiyanworkforce.com';

export const DEFAULT_LOCALE = 'en';

export const LOCALES = {
  en: {
    code: 'en',
    dir: 'ltr',
    hreflang: 'en',
    ogLocale: 'en_GB',
    label: 'English',
    prefix: '',
    overlay: false,
  },
  ar: {
    code: 'ar',
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
    dir: 'ltr',
    hreflang: 'pl',
    ogLocale: 'pl_PL',
    label: 'Polski',
    prefix: '/pl',
    overlay: false,
  },
  bn: {
    code: 'bn',
    dir: 'ltr',
    hreflang: 'bn',
    ogLocale: 'bn_BD',
    label: 'বাংলা',
    prefix: '',
    overlay: true,
  },
  it: {
    code: 'it',
    dir: 'ltr',
    hreflang: 'it',
    ogLocale: 'it_IT',
    label: 'Italiano',
    prefix: '',
    overlay: true,
  },
};

export const REAL_LOCALE_CODES = Object.values(LOCALES)
  .filter((l) => !l.overlay)
  .map((l) => l.code);

export const OVERLAY_LOCALE_CODES = Object.values(LOCALES)
  .filter((l) => l.overlay)
  .map((l) => l.code);

export function isRealLocale(code) {
  return Boolean(LOCALES[code]) && !LOCALES[code].overlay;
}
