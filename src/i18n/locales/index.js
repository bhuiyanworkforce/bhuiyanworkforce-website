// Registry of locale content modules for real (non-overlay) languages.
import en from './en.js';
import { AR_TRANSLATED } from './ar.translated.js';
import { PL_TRANSLATED } from './pl.translated.js';
import { RO_TRANSLATED } from './ro.translated.js';
import { EL_TRANSLATED } from './el.translated.js';
import { HR_TRANSLATED } from './hr.translated.js';
import { SR_TRANSLATED } from './sr.translated.js';
import { BS_TRANSLATED } from './bs.translated.js';
import { MK_TRANSLATED } from './mk.translated.js';
import { IT_TRANSLATED } from './it.translated.js';
import { ES_TRANSLATED } from './es.translated.js';
import { MS_TRANSLATED } from './ms.translated.js';
import { DE_TRANSLATED } from './de.translated.js';
import { HU_TRANSLATED } from './hu.translated.js';
import { PT_TRANSLATED } from './pt.translated.js';
import { BG_TRANSLATED } from './bg.translated.js';
import { BN_TRANSLATED } from './bn.translated.js';

// Arabic, Polish and Bulgarian start as just their route lists. The full locale (head/SEO strings) replaces them
// through registerLocale() from src/i18n/ar-bundle.js / pl-bundle.js, loaded on demand in the browser.
export const LOCALE_DATA = {
  en,
  ar: { code: 'ar', translated: AR_TRANSLATED },
  pl: { code: 'pl', translated: PL_TRANSLATED },
  bg: { code: 'bg', translated: BG_TRANSLATED },
  ro: { code: 'ro', translated: RO_TRANSLATED },
  el: { code: 'el', translated: EL_TRANSLATED },
  hr: { code: 'hr', translated: HR_TRANSLATED },
  sr: { code: 'sr', translated: SR_TRANSLATED },
  bs: { code: 'bs', translated: BS_TRANSLATED },
  mk: { code: 'mk', translated: MK_TRANSLATED },
  it: { code: 'it', translated: IT_TRANSLATED },
  es: { code: 'es', translated: ES_TRANSLATED },
  ms: { code: 'ms', translated: MS_TRANSLATED },
  de: { code: 'de', translated: DE_TRANSLATED },
  hu: { code: 'hu', translated: HU_TRANSLATED },
  pt: { code: 'pt', translated: PT_TRANSLATED },
  bn: { code: 'bn', translated: BN_TRANSLATED },
};

export function registerLocale(code, data) {
  LOCALE_DATA[code] = data;
}
