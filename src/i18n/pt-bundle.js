// Portuguese content stays out of the main client bundle and is loaded on /pt routes.
import ptLocale from './locales/pt.js';
import ptUi from './locales/pt.ui.js';
import { PT_TRANSLATED } from './locales/pt.translated.js';
import ptPages from '../content/pt/pages.js';
import ptCountries from '../content/pt/countries.js';
import ptNames from '../content/pt/names.js';
import ptServices from '../content/pt/services.js';
import ptGuides from '../content/pt/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import ptExtraPages from './pt-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('pt', { ...ptLocale, translated: PT_TRANSLATED });
registerUi('pt', ptUi);
registerPageContent('pt', ptPages);
registerContent('pt', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(ptCountries) ? Object.fromEntries(ptCountries.map((c) => [c.slug, c])) : ptCountries,
  names: ptNames,
  service: ptServices,
  post: [],
  guide: ptGuides,
});
registerStaticPageTranslations('pt', ptExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const ptExtra = {};
const prioritizedExtraPages = [...ptExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (ptExtra[key] === undefined) ptExtra[key] = row.pt;
}
// Blog empty-state wording ("No articles found for ... in ...").
ptExtra.for = 'para';
ptExtra.in = 'em';
registerExtra('pt', ptExtra);
markLangLoaded('pt');
