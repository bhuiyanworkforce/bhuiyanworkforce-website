// sitemap.xml builder. Pure. Input is listPages() from ../routes.js.
//
// lastmod, changefreq and priority are deliberately omitted: the old values
// were hand-typed dates and Google ignores changefreq/priority. Add lastmod
// later only if it can be driven by real content dates.

import { SITE_URL, LOCALES } from '../i18n/config.js';
import { getAlternates } from '../routes.js';
import { esc } from './headHtml.js';

function loc(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function buildSitemap(pages, { langs } = {}) {
  const items = pages.filter((p) => p.indexable && (!langs || langs.includes(p.lang)));
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];
  for (const p of items) {
    lines.push('  <url>');
    lines.push(`    <loc>${esc(loc(p.path))}</loc>`);
    const alts = getAlternates(p.route).filter((a) => a.hreflang === 'x-default' || !langs || langs.some((l) => LOCALES[l].hreflang === a.hreflang));
    // With a language filter a page can be left with no real alternates.
    if (alts.filter((a) => a.hreflang !== 'x-default').length > 1) {
      for (const a of alts) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`);
      }
    }
    lines.push('  </url>');
  }
  lines.push('</urlset>', '');
  return lines.join('\n');
}
