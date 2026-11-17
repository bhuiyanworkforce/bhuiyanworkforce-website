// Greek content stays out of the main client bundle and is loaded on /el routes.
import elLocale from './locales/el.js';
import elUi from './locales/el.ui.js';
import { EL_TRANSLATED } from './locales/el.translated.js';
import elPages from '../content/el/pages.js';
import elCountries from '../content/el/countries.js';
import elNames from '../content/el/names.js';
import elServices from '../content/el/services.js';
import elPosts from '../content/el/posts.js';
import elGuides from '../content/el/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerExtra } from './extra.js';
import elExtraPages from './el-static-page-translations.js';
import { registerStaticPageTranslations } from './staticPageText.js';

// Keep the developer-maintained route manifest as the single source of route availability.
registerLocale('el', { ...elLocale, translated: EL_TRANSLATED });
registerUi('el', elUi);
registerPageContent('el', elPages);
registerContent('el', {
  // Some locales ship countries as an array of records, others as an object keyed by slug.
  countries: Array.isArray(elCountries) ? Object.fromEntries(elCountries.map((c) => [c.slug, c])) : elCountries,
  names: elNames,
  service: elServices,
  post: elPosts,
  guide: elGuides,
});
registerStaticPageTranslations('el', elExtraPages);
// <Tx> strings are keyed by their English source. Prefer the worker-form wording
// where the same category also appears in the contact-form service list; that
// list is localized contextually by StaticPageLocalizer instead.
const elExtra = {};
const prioritizedExtraPages = [...elExtraPages].sort((a, b) => {
  const rank = (row) => row.file === 'src/pages/WorkerApplicationPage.jsx' ? 0 : 1;
  return rank(a) - rank(b);
});
for (const row of prioritizedExtraPages) {
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (elExtra[key] === undefined) elExtra[key] = row.el;
}
// Blog empty-state wording ("No articles found for ... in ...").
elExtra.for = 'για';
elExtra.in = 'σε';
// Strings the page components render through <Tx> that the delivered extra-pages file did not cover.
// Added by the integration; only used where the delivered table has no entry for the same English text.
const SUPPLEMENT = {
  "Search articles… e.g. Saudi visa, construction, BMET": "Αναζήτηση άρθρων… π.χ. βίζα Σαουδικής Αραβίας, κατασκευές, BMET",
  "Insights & Resources": "Αναλύσεις και πηγές",
  "Practical guidance for employers recruiting overseas workers, and for Bangladeshi workers navigating international employment.": "Πρακτικές οδηγίες για εργοδότες που προσλαμβάνουν εργαζομένους από το εξωτερικό και για εργαζομένους από το Μπανγκλαντές που κινούνται στον χώρο της διεθνούς απασχόλησης.",
  "Latest Articles": "Τελευταία άρθρα",
  "From the Bhuiyan Workforce Ltd. Blog": "Από το ιστολόγιο της Bhuiyan Workforce Ltd.",
  "Industry news, compliance updates, and practical guides for employers and workers.": "Ειδήσεις του κλάδου, ενημερώσεις συμμόρφωσης και πρακτικοί οδηγοί για εργοδότες και εργαζομένους.",
  "Read article →": "Διαβάστε το άρθρο →",
  "Stay Up to Date": "Μείνετε ενημερωμένοι",
  "Follow us on LinkedIn or WhatsApp for the latest recruitment news, compliance updates, and destination guides.": "Ακολουθήστε μας στο LinkedIn ή στο WhatsApp για τα τελευταία νέα στρατολόγησης προσωπικού, ενημερώσεις συμμόρφωσης και οδηγούς χωρών προορισμού.",
  "Follow on LinkedIn": "Ακολουθήστε μας στο LinkedIn",
  "WhatsApp Updates": "Ενημερώσεις στο WhatsApp",
  "BHUIYAN WORKFORCE LTD.": "BHUIYAN WORKFORCE LTD.",
  "Middle East (7)": "Μέση Ανατολή (7)",
  "Asia Pacific (3)": "Ασία-Ειρηνικός (3)",
  "Europe (19)": "Ευρώπη (19)",
  "Caucasus (2)": "Καύκασος (2)",
  "Armenia · Georgia": "Αρμενία · Γεωργία",
  "Indian Ocean (2)": "Ινδικός Ωκεανός (2)",
  "Kawtoli, Brahmanbaria, Bangladesh 3400": "Kawtoli, Brahmanbaria, Bangladesh 3400",
};
for (const [k, v] of Object.entries(SUPPLEMENT)) if (elExtra[k] === undefined) elExtra[k] = v;
registerExtra('el', elExtra);
markLangLoaded('el');
