// Everything Polish that is too big for the main bundle, in one place.
//
// Importing this file registers the Polish locale, UI strings, page content and entity content,
// then marks Polish as loaded. It is plain JS (no JSX) so Node scripts can import it too.
// It works exactly like ar-bundle.js, and is loaded the same way:
//
//   browser   src/main.jsx:             await import('./i18n/pl-bundle.js') when the URL is under /pl
//   SSR       src/entry-server.jsx:     static import (the static pages are rendered with it loaded)
//   scripts   generate-pages, verify-pages, test-seo: static import
//
// Never import this from a component: that would pull Polish back into the main bundle.

import plLocale from './locales/pl.js';
import plUi from './locales/pl.ui.js';
import plPages from '../content/pl/pages.js';
import plCountries from '../content/pl/countries.js';
import plNames from '../content/pl/names.js';
import plServices from '../content/pl/services.js';
import plPosts from '../content/pl/posts.js';
import plGuides from '../content/pl/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';
import { registerStaticPageTranslations } from './staticPageText.js';
import plExtraPages from './pl-static-page-translations.js';

registerLocale('pl', plLocale);
registerUi('pl', plUi);
registerPageContent('pl', plPages);
registerContent('pl', {
  // plCountries is an array of records; the content layer looks them up by slug.
  countries: Object.fromEntries(plCountries.map((c) => [c.slug, c])),
  names: plNames,
  service: plServices,
  post: plPosts,
  guide: plGuides,
});
// Hard-coded page strings (currently the Founder page) are matched by English text; see pl-extra-pages.json.
registerStaticPageTranslations('pl', plExtraPages);
markLangLoaded('pl');
