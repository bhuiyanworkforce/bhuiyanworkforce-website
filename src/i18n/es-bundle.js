// Spanish content stays out of the main client bundle and is loaded on /es routes.
import esLocale from './locales/es.js';
import esUi from './locales/es.ui.js';
import { ES_TRANSLATED } from './locales/es.translated.js';
import esPages from '../content/es/pages.js';
import esCountries from '../content/es/countries.js';
import esNames from '../content/es/names.js';
import esServices from '../content/es/services.js';
import esPosts from '../content/es/posts.js';
import esGuides from '../content/es/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import esExtraPages from './es-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('es', { ...esLocale, translated: ES_TRANSLATED });
registerUi('es', esUi);
registerPageContent('es', esPages);
registerContent('es', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(esCountries) ? Object.fromEntries(esCountries.map((c) => [c.slug, c])) : esCountries,
  names: esNames,
  service: esServices,
  post: esPosts,
  guide: esGuides,
});
registerStaticPageTranslations('es', esExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const esExtra = {};
const prioritizedExtraPages = [...esExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (esExtra[key] === undefined) esExtra[key] = row.es;
}
// Blog empty-state wording ("No articles found for ... in ...").
esExtra.for = 'para';
esExtra.in = 'en';
registerExtra('es', esExtra);
markLangLoaded('es');
