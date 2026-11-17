// Bulgarian content stays out of the main client bundle and is loaded on /bg routes.
import bgLocale from './locales/bg.js';
import bgUi from './locales/bg.ui.js';
import { BG_TRANSLATED } from './locales/bg.translated.js';
import bgPages from '../content/bg/pages.js';
import bgCountries from '../content/bg/countries.js';
import bgNames from '../content/bg/names.js';
import bgServices from '../content/bg/services.js';
import bgPosts from '../content/bg/posts.js';
import bgGuides from '../content/bg/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import bgExtraPages from './bg-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('bg', { ...bgLocale, translated: BG_TRANSLATED });
registerUi('bg', bgUi);
registerPageContent('bg', bgPages);
registerContent('bg', {
  countries: bgCountries,
  names: bgNames,
  service: bgServices,
  post: bgPosts,
  guide: bgGuides,
});
registerStaticPageTranslations('bg', bgExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const bgExtra = {};
const prioritizedExtraPages = [...bgExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (bgExtra[key] === undefined) bgExtra[key] = row.bg;
}
bgExtra.for = 'за';
bgExtra.in = 'в';
registerExtra('bg', bgExtra);
markLangLoaded('bg');
