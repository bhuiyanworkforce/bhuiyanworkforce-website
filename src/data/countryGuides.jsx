// Country-specific employer guides
// Accessed at /employer-guide/:slug
//
// One guide per destination country (all 33). Each guide is published in the language it was
// written in (`lang`, `dir`), with a short English summary (`summary`, `status`) shown beside it.
// The text lives in guidesData.js. Add or change a guide there, then keep GUIDE_SLUGS in
// src/routes.js in step (it mirrors COUNTRY_SLUGS).
import GUIDES from './guidesData.js';

export const COUNTRY_GUIDES = GUIDES;

export function getCountryGuide(slug) {
  return COUNTRY_GUIDES[slug] || null;
}
