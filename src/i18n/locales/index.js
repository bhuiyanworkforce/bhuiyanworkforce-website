// Registry of locale content modules for real (non-overlay) languages.
import en from './en.js';
import pl from './pl.js';
import { AR_TRANSLATED } from './ar.translated.js';

// Arabic starts as just its route list. The full locale (head/SEO strings) replaces it through
// registerLocale() from src/i18n/ar-bundle.js, which is loaded on demand in the browser.
export const LOCALE_DATA = { en, ar: { code: 'ar', translated: AR_TRANSLATED }, pl };

export function registerLocale(code, data) {
  LOCALE_DATA[code] = data;
}
