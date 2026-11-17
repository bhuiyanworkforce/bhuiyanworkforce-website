// Serbian content stays out of the main client bundle and is loaded on /sr routes.
import srLocale from './locales/sr.js';
import srUi from './locales/sr.ui.js';
import { SR_TRANSLATED } from './locales/sr.translated.js';
import srPages from '../content/sr/pages.js';
import srCountries from '../content/sr/countries.js';
import srNames from '../content/sr/names.js';
import srServices from '../content/sr/services.js';
import srPosts from '../content/sr/posts.js';
import srGuides from '../content/sr/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import srExtraPages from './sr-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('sr', { ...srLocale, translated: SR_TRANSLATED });
registerUi('sr', srUi);
registerPageContent('sr', srPages);
registerContent('sr', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(srCountries) ? Object.fromEntries(srCountries.map((c) => [c.slug, c])) : srCountries,
  names: srNames,
  service: srServices,
  post: srPosts,
  guide: srGuides,
});
registerStaticPageTranslations('sr', srExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const srExtra = {};
const prioritizedExtraPages = [...srExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (srExtra[key] === undefined) srExtra[key] = row.sr;
}
// Blog empty-state wording ("No articles found for ... in ...").
srExtra.for = 'za';
srExtra.in = 'u';
// Strings the page components render through <Tx> that the delivered extra-pages file did not cover.
// Added by the integration; only used where the delivered table has no entry for the same English text.
const SUPPLEMENT = {
  "Deployment": "Slanje radnika",
  "Office": "Kancelarija",
  "Partnerships": "Partnerstva",
  "Website": "Veb-sajt",
  "Gulf": "Zaliv",
  "UAE": "UAE",
  "Qatar": "Katar",
  "Kuwait": "Kuvajt",
  "Oman": "Oman",
  "Bahrain": "Bahrein",
  "Europe": "Evropa",
  "Poland": "Poljska",
  "Romania": "Rumunija",
  "Portugal": "Portugalija",
  "Serbia": "Srbija",
  "Germany": "Nemačka",
  "Malaysia": "Malezija",
  "Singapore": "Singapur",
  "Maldives": "Maldivi",
  "Send Me the Free Guide →": "Pošaljite mi besplatni vodič →",
};
for (const [k, v] of Object.entries(SUPPLEMENT)) if (srExtra[k] === undefined) srExtra[k] = v;
registerExtra('sr', srExtra);
markLangLoaded('sr');
