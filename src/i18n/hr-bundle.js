// Croatian content stays out of the main client bundle and is loaded on /hr routes.
import hrLocale from './locales/hr.js';
import hrUi from './locales/hr.ui.js';
import { HR_TRANSLATED } from './locales/hr.translated.js';
import hrPages from '../content/hr/pages.js';
import hrCountries from '../content/hr/countries.js';
import hrNames from '../content/hr/names.js';
import hrServices from '../content/hr/services.js';
import hrPosts from '../content/hr/posts.js';
import hrGuides from '../content/hr/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import hrExtraPages from './hr-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('hr', { ...hrLocale, translated: HR_TRANSLATED });
registerUi('hr', hrUi);
registerPageContent('hr', hrPages);
registerContent('hr', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(hrCountries) ? Object.fromEntries(hrCountries.map((c) => [c.slug, c])) : hrCountries,
  names: hrNames,
  service: hrServices,
  post: hrPosts,
  guide: hrGuides,
});
registerStaticPageTranslations('hr', hrExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const hrExtra = {};
const prioritizedExtraPages = [...hrExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (hrExtra[key] === undefined) hrExtra[key] = row.hr;
}
// Blog empty-state wording ("No articles found for ... in ...").
hrExtra.for = 'za';
hrExtra.in = 'u';
registerExtra('hr', hrExtra);
markLangLoaded('hr');
