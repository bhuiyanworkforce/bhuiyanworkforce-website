// Everything Arabic that is too big for the main bundle, in one place.
//
// Importing this file registers the Arabic locale, UI strings, page content and entity content,
// then marks Arabic as loaded. It is plain JS (no JSX) so Node scripts can import it too.
//
//   browser   src/main.jsx:             await import('./i18n/ar-bundle.js') when the URL is under /ar
//   SSR       src/entry-server.jsx:     static import (the static pages are rendered with it loaded)
//   scripts   generate-pages, verify-pages, test-seo: static import
//
// Never import this from a component: that would pull Arabic back into the main bundle.

import arLocale from './locales/ar.js';
import arUi from './locales/ar.ui.js';
import arPages from '../content/ar/pages.js';
import arCountries from '../content/ar/countries.js';
import arNames from '../content/ar/names.js';
import arServices from '../content/ar/services.js';
import arPosts from '../content/ar/posts.js';
import arGuides from '../content/ar/guides.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';

registerLocale('ar', arLocale);
registerUi('ar', arUi);
registerPageContent('ar', arPages);
registerContent('ar', {
  countries: arCountries,
  names: arNames,
  service: arServices,
  post: arPosts,
  guide: arGuides,
});
markLangLoaded('ar');
