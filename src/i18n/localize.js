// Language-aware internal links. Pure.
//
// Components keep writing English paths ("/countries/qatar", "/#contact"). This
// turns them into the visitor's language when that page exists in it, and
// leaves them alone otherwise (so an Arabic visitor clicking a page with no
// Arabic version lands on the real English page, never on a machine-copied one).

import { parsePath, buildPath } from './slugs.js';
import { isAvailable } from '../routes.js';
import { isRealLocale, DEFAULT_LOCALE } from './config.js';

export function localizeTo(to, lang) {
  if (typeof to !== 'string' || !to.startsWith('/')) return to;
  if (!isRealLocale(lang) || lang === DEFAULT_LOCALE) return to;
  const m = to.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const pathPart = m[1] || '/';
  const parsed = parsePath(pathPart);
  if (parsed.lang !== DEFAULT_LOCALE) return to; // already language-prefixed
  if (!parsed.route) return to;
  if (!isAvailable(parsed.route, lang)) return to;
  return buildPath(lang, parsed.route) + (m[2] || '') + (m[3] || '');
}
