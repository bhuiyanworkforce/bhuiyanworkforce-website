// Bengali content stays out of the main client bundle and is loaded on /bn routes.
// Bengali is a worker-facing section: home, FAQ and worker guide only (see locales/bn.translated.js).
import bnLocale from './locales/bn.js';
import bnUi from './locales/bn.ui.js';
import { BN_TRANSLATED } from './locales/bn.translated.js';
import bnPages from '../content/bn/pages.js';
import { registerLocale } from './locales/index.js';
import { registerUi } from './uiTables.js';
import { registerPageContent } from '../content/pages.js';
import { registerContent } from '../content/index.js';
import { markLangLoaded } from './lazyLangs.js';

registerLocale('bn', { ...bnLocale, translated: BN_TRANSLATED });
registerUi('bn', bnUi);
registerPageContent('bn', bnPages);
// No translated countries, services, posts or guides: those pages are English-only.
registerContent('bn', { countries: {}, names: {}, service: [], post: [], guide: {} });
markLangLoaded('bn');
