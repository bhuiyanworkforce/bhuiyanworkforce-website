// Hungarian content stays out of the main client bundle and is loaded on /hu routes.
import huLocale from './locales/hu.js';
import huUi from './locales/hu.ui.js';
import { HU_TRANSLATED } from './locales/hu.translated.js';
import huPages from '../content/hu/pages.js';
import huCountries from '../content/hu/countries.js';
import huNames from '../content/hu/names.js';
import huServices from '../content/hu/services.js';
import huGuides from '../content/hu/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import huExtraPages from './hu-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('hu', { ...huLocale, translated: HU_TRANSLATED });
registerUi('hu', huUi);
registerPageContent('hu', huPages);
registerContent('hu', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(huCountries) ? Object.fromEntries(huCountries.map((c) => [c.slug, c])) : huCountries,
  names: huNames,
  service: huServices,
  post: [],
  guide: huGuides,
});
registerStaticPageTranslations('hu', huExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const huExtra = {};
const prioritizedExtraPages = [...huExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (huExtra[key] === undefined) huExtra[key] = row.hu;
}
// Blog empty-state wording ("No articles found for ... in ...").
huExtra.for = 'részére';
huExtra.in = 'itt';
registerExtra('hu', huExtra);
markLangLoaded('hu');
