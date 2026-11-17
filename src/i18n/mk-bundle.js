// Macedonian content stays out of the main client bundle and is loaded on /mk routes.
import mkLocale from './locales/mk.js';
import mkUi from './locales/mk.ui.js';
import { MK_TRANSLATED } from './locales/mk.translated.js';
import mkPages from '../content/mk/pages.js';
import mkCountries from '../content/mk/countries.js';
import mkNames from '../content/mk/names.js';
import mkServices from '../content/mk/services.js';
import mkPosts from '../content/mk/posts.js';
import mkGuides from '../content/mk/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import mkExtraPages from './mk-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('mk', { ...mkLocale, translated: MK_TRANSLATED });
registerUi('mk', mkUi);
registerPageContent('mk', mkPages);
registerContent('mk', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(mkCountries) ? Object.fromEntries(mkCountries.map((c) => [c.slug, c])) : mkCountries,
  names: mkNames,
  service: mkServices,
  post: mkPosts,
  guide: mkGuides,
});
registerStaticPageTranslations('mk', mkExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const mkExtra = {};
const prioritizedExtraPages = [...mkExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (mkExtra[key] === undefined) mkExtra[key] = row.mk;
}
// Blog empty-state wording ("No articles found for ... in ...").
mkExtra.for = 'за';
mkExtra.in = 'во';
registerExtra('mk', mkExtra);
markLangLoaded('mk');
