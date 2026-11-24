// Which routes have Bengali content. Bengali is a worker section, not a full copy of the site:
// employer pages (about, blog, employer guides, countries index) stay English-only and links to
// them open the English page. Home, FAQ, worker guide, plus a worker-oriented page for every
// destination country and every service/trade.
import { COUNTRIES_BN, SERVICES_BN } from '../../content/bn/workerTopics.js';

export const BN_TRANSLATED = [
  'page:home', 'page:faq', 'page:worker-guide',
  ...Object.keys(COUNTRIES_BN).map((s) => `country:${s}`),
  ...Object.keys(SERVICES_BN).map((s) => `service:${s}`),
];
