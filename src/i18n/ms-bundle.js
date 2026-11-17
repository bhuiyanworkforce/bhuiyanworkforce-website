// Malay content stays out of the main client bundle and is loaded on /ms routes.
import msLocale from './locales/ms.js';
import msUi from './locales/ms.ui.js';
import { MS_TRANSLATED } from './locales/ms.translated.js';
import msPages from '../content/ms/pages.js';
import msCountries from '../content/ms/countries.js';
import msNames from '../content/ms/names.js';
import msServices from '../content/ms/services.js';
import msGuides from '../content/ms/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import msExtraPages from './ms-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('ms', { ...msLocale, translated: MS_TRANSLATED });
registerUi('ms', msUi);
registerPageContent('ms', msPages);
registerContent('ms', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(msCountries) ? Object.fromEntries(msCountries.map((c) => [c.slug, c])) : msCountries,
  names: msNames,
  service: msServices,
  post: [],
  guide: msGuides,
});
registerStaticPageTranslations('ms', msExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const msExtra = {};
const prioritizedExtraPages = [...msExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (msExtra[key] === undefined) msExtra[key] = row.ms;
}
// Blog empty-state wording ("No articles found for ... in ...").
msExtra.for = 'untuk';
msExtra.in = 'di';
registerExtra('ms', msExtra);
markLangLoaded('ms');
