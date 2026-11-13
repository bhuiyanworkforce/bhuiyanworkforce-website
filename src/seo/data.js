// Entity lookups shared by the client head sync and the static generator.
import { getCountry } from '../data/countries.jsx';
import { getService } from '../data/services.jsx';
import { getPost } from '../data/posts.jsx';
import { getCountryGuide } from '../data/countryGuides.jsx';
import { COUNTRIES } from '../data/countries.jsx';
import { SERVICES } from '../data/services.jsx';
import { POSTS } from '../data/posts.jsx';
import { COUNTRY_GUIDES } from '../data/countryGuides.jsx';

export const contentData = {
  country: getCountry,
  service: getService,
  post: getPost,
  guide: getCountryGuide,
  // Used by scripts/verify-pages.mjs to check src/routes.js against the data files.
  slugs: {
    countries: COUNTRIES.map((c) => c.slug),
    services: SERVICES.map((s) => s.slug),
    posts: POSTS.map((p) => p.slug),
    guides: Object.keys(COUNTRY_GUIDES),
  },
};
