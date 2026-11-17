// Everything Romanian that is too big for the main bundle, in one place.
//
// Importing this file registers the Romanian locale, UI strings, page content and entity content,
// then marks Romanian as loaded. It is plain JS (no JSX) so Node scripts can import it too.
// It works exactly like ar-bundle.js, and is loaded the same way:
//
//   browser   src/main.jsx:             await import('./i18n/ro-bundle.js') when the URL is under /ro
//   SSR       src/entry-server.jsx:     static import (the static pages are rendered with it loaded)
//   scripts   generate-pages, verify-pages, test-seo: static import
//
// Never import this from a component: that would pull Romanian back into the main bundle.

import roLocale from './locales/ro.js';
import roUi from './locales/ro.ui.js';
import roPages from '../content/ro/pages.js';
import roCountries from '../content/ro/countries.js';
import roNames from '../content/ro/names.js';
import roServices from '../content/ro/services.js';
import roPosts from '../content/ro/posts.js';
import roGuides from '../content/ro/guides.js';
import roExtra from '../content/ro/extra.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { registerExtra } from './extra.js';
import { registerStaticPageTranslations } from './staticPageText.js';
import roStaticPages from './ro-static-page-translations.js';
import { markLangLoaded } from './lazyLangs.js';

registerLocale('ro', roLocale);
registerUi('ro', roUi);
registerPageContent('ro', roPages);
// Raw JSX text on the legal, guide, capabilities and form pages is translated by the static localizer.
// ContactForm rows are left out: its service names are translated through <Tx> (extra.js).
registerStaticPageTranslations('ro', roStaticPages, { skipFiles: ['src/components/ContactForm.jsx'] });
// Fill gaps in the <Tx> table from the delivered JSON (same English text, whitespace-normalised) so that
// entries split differently in extra.js (leading dash, trailing space) still resolve.
const roExtraFull = { ...roExtra };
for (const row of roStaticPages) {
  if (row.file === 'src/components/ContactForm.jsx') continue;
  const key = row.en.replace(/\s+/g, ' ').trim();
  if (key && roExtraFull[key] === undefined) roExtraFull[key] = row.ro.trim();
}
registerExtra('ro', roExtraFull);
registerContent('ro', {
  // Romanian countries ship as an object keyed by slug (Polish ships an array of records).
  countries: Array.isArray(roCountries) ? Object.fromEntries(roCountries.map((c) => [c.slug, c])) : roCountries,
  names: roNames,
  service: roServices,
  post: roPosts,
  guide: roGuides,
});
markLangLoaded('ro');
