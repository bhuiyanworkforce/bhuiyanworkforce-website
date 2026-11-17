// Everything Italian that is too big for the main bundle, in one place.
//
// Importing this file registers the Italian locale, UI strings, page content and entity content,
// then marks Italian as loaded. It is plain JS (no JSX) so Node scripts can import it too.
// It works exactly like ar-bundle.js, and is loaded the same way:
//
//   browser   src/main.jsx:             await import('./i18n/it-bundle.js') when the URL is under /it
//   SSR       src/entry-server.jsx:     static import (the static pages are rendered with it loaded)
//   scripts   generate-pages, verify-pages, test-seo: static import
//
// Never import this from a component: that would pull Italian back into the main bundle.

import itLocale from './locales/it.js';
import itUi from './locales/it.ui.js';
import itPages from '../content/it/pages.js';
import itCountries from '../content/it/countries.js';
import itNames from '../content/it/names.js';
import itServices from '../content/it/services.js';
import itPosts from '../content/it/posts.js';
import itGuides from '../content/it/guides.js';
import itExtra from '../content/it/extra.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { registerExtra } from './extra.js';
import { registerStaticPageTranslations } from './staticPageText.js';
import itStaticPages from './it-static-page-translations.js';
import { markLangLoaded } from './lazyLangs.js';

registerLocale('it', itLocale);
registerUi('it', itUi);
registerPageContent('it', itPages);
// Raw JSX text on the legal, guide, capabilities and form pages is translated by the static localizer.
// ContactForm rows are left out: its service names are translated through <Tx> (extra.js).
registerStaticPageTranslations('it', itStaticPages, { skipFiles: ['src/components/ContactForm.jsx'] });
// Strings the page components render through <Tx> that the delivered extra-pages file did not cover.
const SUPPLEMENT = {
  "From the Bhuiyan Workforce Ltd. Blog": "Dal blog di Bhuiyan Workforce Ltd.",
  "Connecting Bangladesh's skilled workforce to the world —": "Colleghiamo la manodopera qualificata del Bangladesh con il mondo —",
  "across the Middle East, Europe, Asia & Africa.": "in Medio Oriente, Europa, Asia e Africa.",
};
// Fill gaps in the <Tx> table from the delivered JSON (same English text, whitespace-normalised) so that
// entries split differently in extra.js (leading dash, trailing space) still resolve.
const itExtraFull = { ...itExtra };
for (const row of itStaticPages) {
  if (row.file === 'src/components/ContactForm.jsx') continue;
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (key && itExtraFull[key] === undefined) itExtraFull[key] = row.it.trim();
}
registerExtra('it', { ...SUPPLEMENT, ...itExtraFull });
registerContent('it', {
  // Italian countries ship as an object keyed by slug (Polish ships an array of records).
  countries: Array.isArray(itCountries) ? Object.fromEntries(itCountries.map((c) => [c.slug, c])) : itCountries,
  names: itNames,
  service: itServices,
  post: itPosts,
  guide: itGuides,
});
markLangLoaded('it');
