// German content stays out of the main client bundle and is loaded on /de routes.
import deLocale from './locales/de.js';
import deUi from './locales/de.ui.js';
import { DE_TRANSLATED } from './locales/de.translated.js';
import dePages from '../content/de/pages.js';
import deCountries from '../content/de/countries.js';
import deNames from '../content/de/names.js';
import deServices from '../content/de/services.js';
import deGuides from '../content/de/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import deExtraPages from './de-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('de', { ...deLocale, translated: DE_TRANSLATED });
registerUi('de', deUi);
registerPageContent('de', dePages);
registerContent('de', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(deCountries) ? Object.fromEntries(deCountries.map((c) => [c.slug, c])) : deCountries,
  names: deNames,
  service: deServices,
  post: [],
  guide: deGuides,
});
registerStaticPageTranslations('de', deExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const deExtra = {};
const prioritizedExtraPages = [...deExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (deExtra[key] === undefined) deExtra[key] = row.de;
}
// Blog empty-state wording ("No articles found for ... in ...").
deExtra.for = 'für';
deExtra.in = 'in';
registerExtra('de', deExtra);
markLangLoaded('de');
