// One capabilities sheet (A4 PDF) per language. English stays at the original
// /capabilities.pdf URL so existing links and shared copies keep working; every other
// language lives at /capabilities-<code>.pdf in public/. A language without a sheet
// falls back to the English one.

import { DEFAULT_LOCALE } from './config.js';

export const SHEET_LANGS = ['ar', 'pl', 'bg', 'ro', 'el', 'hr', 'sr', 'bs', 'mk', 'it'];

export function capabilitiesPdf(lang) {
  return SHEET_LANGS.includes(lang) ? `/capabilities-${lang}.pdf` : '/capabilities.pdf';
}

export function capabilitiesPdfName(lang) {
  return SHEET_LANGS.includes(lang)
    ? `Bhuiyan_Workforce_Capabilities_${lang.toUpperCase()}.pdf`
    : `Bhuiyan_Workforce_Capabilities.pdf`;
}

export { DEFAULT_LOCALE };
