// Bosnian content stays out of the main client bundle and is loaded on /bs routes.
import bsLocale from './locales/bs.js';
import bsUi from './locales/bs.ui.js';
import { BS_TRANSLATED } from './locales/bs.translated.js';
import bsPages from '../content/bs/pages.js';
import bsCountries from '../content/bs/countries.js';
import bsNames from '../content/bs/names.js';
import bsServices from '../content/bs/services.js';
import bsPosts from '../content/bs/posts.js';
import bsGuides from '../content/bs/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import bsExtraPages from './bs-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('bs', { ...bsLocale, translated: BS_TRANSLATED });
registerUi('bs', bsUi);
registerPageContent('bs', bsPages);
registerContent('bs', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(bsCountries) ? Object.fromEntries(bsCountries.map((c) => [c.slug, c])) : bsCountries,
  names: bsNames,
  service: bsServices,
  post: bsPosts,
  guide: bsGuides,
});
registerStaticPageTranslations('bs', bsExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const bsExtra = {};
const prioritizedExtraPages = [...bsExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (bsExtra[key] === undefined) bsExtra[key] = row.bs;
}
// Blog empty-state wording ("No articles found for ... in ...").
bsExtra.for = 'za';
bsExtra.in = 'u';
// Strings the page components render through <Tx> that the delivered extra-pages file did not cover.
// Added by the integration; only used where the delivered table has no entry for the same English text.
const SUPPLEMENT = {
  "Bhuiyan Workforce Ltd.": "Bhuiyan Workforce Ltd.",
  "across the Middle East, Europe, Asia & Africa.": "širom Bliskog istoka, Evrope, Azije i Afrike.",
  "Bhuiyan Workforce Ltd. is a Bangladesh-based manpower recruitment and export company founded by MD Rezaul Kabir Bhuiyan. We specialise in sourcing, rigorously screening, and deploying skilled, semi-skilled, and general workers to international employers across the Middle East, Europe, Asia, and Africa.": "Bhuiyan Workforce Ltd. je kompanija za regrutaciju i izvoz radne snage iz Bangladeša, koju je osnovao MD Rezaul Kabir Bhuiyan. Specijalizirani smo za pronalaženje, temeljitu provjeru i slanje kvalifikovanih, polukvalifikovanih i opštih radnika međunarodnim poslodavcima širom Bliskog istoka, Evrope, Azije i Afrike.",
  "Europe (19)": "Evropa (19)",
  "Italy · Serbia · Portugal · Greece · Slovakia · Slovenia · Latvia · Cyprus · Estonia · Lithuania · Poland · Czech Republic · Bulgaria · Bosnia and Herzegovina · Hungary · Croatia · Romania · Montenegro · North Macedonia": "Italija · Srbija · Portugal · Grčka · Slovačka · Slovenija · Latvija · Kipar · Estonija · Litvanija · Poljska · Češka · Bugarska · Bosna i Hercegovina · Mađarska · Hrvatska · Rumunija · Crna Gora · Sjeverna Makedonija",
  "Caucasus (2)": "Kavkaz (2)",
  "Armenia · Georgia": "Armenija · Gruzija",
  "Indian Ocean (2)": "Indijski okean (2)",
  "Seychelles · Mauritius": "Sejšeli · Mauricijus",
  "Active deployment coverage across 25+ countries spanning the Middle East, Europe, Asia, and Africa.": "Aktivna pokrivenost slanja radnika u 25+ zemalja na Bliskom istoku, u Evropi, Aziji i Africi.",
  "Visa timelines, fees, and documentation requirements for the Middle East, Europe, Asia, and Africa at a glance.": "Rokovi za vize, naknade i zahtjevi u pogledu dokumentacije za Bliski istok, Evropu, Aziju i Afriku na jednom mjestu.",
};
for (const [k, v] of Object.entries(SUPPLEMENT)) if (bsExtra[k] === undefined) bsExtra[k] = v;
registerExtra('bs', bsExtra);
markLangLoaded('bs');
