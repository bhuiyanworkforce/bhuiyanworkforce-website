// Registry of locale content modules for real (non-overlay) languages.
import en from './en.js';
import { AR_TRANSLATED } from './ar.translated.js';
import { PL_TRANSLATED } from './pl.translated.js';
import { RO_TRANSLATED } from './ro.translated.js';

// Arabic and Polish start as just their route lists. The full locale (head/SEO strings) replaces them
// through registerLocale() from src/i18n/ar-bundle.js / pl-bundle.js, loaded on demand in the browser.
export const LOCALE_DATA = {
  en,
  ar: { code: 'ar', translated: AR_TRANSLATED },
  pl: { code: 'pl', translated: PL_TRANSLATED },
  ro: { code: 'ro', translated: RO_TRANSLATED },
};

export function registerLocale(code, data) {
  LOCALE_DATA[code] = data;
}
