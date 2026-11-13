#!/usr/bin/env node
// Post-build verification of the generated static HTML in dist/.
// Fails (exit 1) if any page's head, structured data, content or the sitemap
// is wrong. Reads the real files, so it checks what Cloudflare will serve.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { listPages, getLanguageLinks, SERVICE_SLUGS, COUNTRY_SLUGS, POST_SLUGS, GUIDE_SLUGS } from '../src/routes.js';
import { getPageHead } from '../src/seo/getPageHead.js';
import { esc } from '../src/seo/headHtml.js';
import { SITE_URL } from '../src/i18n/config.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = process.env.DIST_DIR ? path.resolve(process.env.DIST_DIR) : path.join(ROOT, 'dist');
const SSR_ENTRY = process.env.SSR_ENTRY ? path.resolve(process.env.SSR_ENTRY) : path.join(ROOT, 'dist-ssr', 'entry-server.js');
const MIN_TEXT = Number(process.env.MIN_TEXT || 300);

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const all = (re, s) => [...s.matchAll(re)].map((m) => m[1]);
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
const unesc = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

const { data } = await import(pathToFileURL(SSR_ENTRY).href);

// Slug lists must match the data files the app actually renders from.
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
for (const [name, list, getter] of [
  ['country', COUNTRY_SLUGS, data.country], ['service', SERVICE_SLUGS, data.service],
  ['post', POST_SLUGS, data.post], ['guide', GUIDE_SLUGS, data.guide],
]) {
  for (const s of list) if (!getter(s)) fail('routes.js', `${name} slug "${s}" has no data`);
}
if (data.slugs) {
  if (!sameSet(data.slugs.countries, COUNTRY_SLUGS)) fail('routes.js', 'COUNTRY_SLUGS differs from src/data/countries');
  if (!sameSet(data.slugs.services, SERVICE_SLUGS)) fail('routes.js', 'SERVICE_SLUGS differs from src/data/services');
  if (!sameSet(data.slugs.posts, POST_SLUGS)) fail('routes.js', 'POST_SLUGS differs from src/data/posts');
  if (!sameSet(data.slugs.guides, GUIDE_SLUGS)) fail('routes.js', 'GUIDE_SLUGS differs from src/data/countryGuides');
}

const pages = listPages();
const fileFor = (p) => (p === '/' ? path.join(DIST, 'index.html') : path.join(DIST, p.slice(1), 'index.html'));
const seenTitles = new Map();

for (const page of pages) {
  const where = page.path;
  const file = fileFor(page.path);
  if (!fs.existsSync(file)) { fail(where, `missing file ${path.relative(DIST, file)}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const head = getPageHead(page.route, page.lang, data);
  const headPart = html.slice(0, html.indexOf('</head>'));

  const htmlTag = html.match(/<html[^>]*>/)?.[0] || '';
  if (attr(htmlTag, 'lang') !== head.lang) fail(where, `<html lang> is "${attr(htmlTag, 'lang')}", expected "${head.lang}"`);
  if (attr(htmlTag, 'dir') !== head.dir) fail(where, `<html dir> is "${attr(htmlTag, 'dir')}", expected "${head.dir}"`);

  const titles = all(/<title>([\s\S]*?)<\/title>/g, headPart);
  if (titles.length !== 1) fail(where, `${titles.length} <title> tags`);
  else if (unesc(titles[0]) !== head.title) fail(where, 'title does not match getPageHead');
  const key = `${page.lang}|${head.title}`;
  if (seenTitles.has(key)) fail(where, `duplicate title also on ${seenTitles.get(key)}`);
  seenTitles.set(key, where);

  const descs = all(/<meta name="description" content="([^"]*)"/g, headPart);
  if (descs.length !== 1 || unesc(descs[0]) !== head.description) fail(where, 'meta description missing, duplicated or wrong');

  const robots = all(/<meta name="robots" content="([^"]*)"/g, headPart);
  if (robots.length !== 1 || robots[0] !== head.robots) fail(where, `robots meta wrong: ${robots.join(' | ')}`);

  const canon = all(/<link rel="canonical" href="([^"]*)"/g, headPart);
  if (canon.length !== 1) fail(where, `${canon.length} canonical tags`);
  else if (unesc(canon[0]) !== head.canonical) fail(where, `canonical is ${canon[0]}, expected ${head.canonical}`);

  const hl = [...headPart.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)].map((m) => `${m[1]} ${m[2]}`).sort();
  const hlWant = head.alternates.map((a) => `${a.hreflang} ${a.href}`).sort();
  if (JSON.stringify(hl) !== JSON.stringify(hlWant)) fail(where, `hreflang set wrong: got [${hl.join(', ')}]`);

  for (const p of ['og:title', 'og:description', 'og:url', 'og:locale', 'og:image']) {
    const n = (headPart.match(new RegExp(`<meta property="${p}"`, 'g')) || []).length;
    if (n !== 1) fail(where, `${n} ${p} tags`);
  }
  const ogUrl = all(/<meta property="og:url" content="([^"]*)"/g, headPart)[0];
  if (ogUrl && unesc(ogUrl) !== head.canonical) fail(where, 'og:url differs from canonical');
  const ogLoc = all(/<meta property="og:locale" content="([^"]*)"/g, headPart)[0];
  if (ogLoc !== head.og.locale) fail(where, `og:locale ${ogLoc}, expected ${head.og.locale}`);

  const ld = all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, headPart);
  if (ld.length !== head.jsonld.length) fail(where, `${ld.length} JSON-LD blocks, expected ${head.jsonld.length}`);
  ld.forEach((raw, i) => {
    try {
      const got = JSON.parse(raw);
      if (JSON.stringify(got) !== JSON.stringify(head.jsonld[i])) fail(where, `JSON-LD block ${i} differs from getPageHead`);
    } catch { fail(where, `JSON-LD block ${i} is not valid JSON`); }
  });

  // Body content.
  const rootStart = html.indexOf('<div id="root"');
  const body = rootStart === -1 ? '' : html.slice(rootStart);
  if (rootStart === -1) fail(where, 'no #root');
  const text = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < MIN_TEXT) fail(where, `only ${text.length} characters of visible text in the static HTML`);
  if ((body.match(/<h1[\s>]/g) || []).length < 1) fail(where, 'no <h1> in the static HTML');
  if (/>\s*(Loading|Loading…|Loading\.\.\.)\s*</.test(body)) fail(where, 'static HTML contains a loading placeholder');
  if (!body.includes(`data-ssr-path="${page.path}"`)) fail(where, 'data-ssr-path attribute missing or wrong');

  // Switcher: every real language must be reachable with a real <a href>.
  for (const l of getLanguageLinks(page.route, page.lang)) {
    if (l.current) continue;
    if (!new RegExp(`<a[^>]*href="${l.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`).test(body)) {
      fail(where, `no <a href="${l.href}"> for the ${l.code} language link`);
    }
  }

  // RTL: phone numbers and e-mail addresses must sit in a dir="ltr" element.
  if (head.dir === 'rtl') {
    // Only visible text counts: blank out tags first so href="tel:+880..." is not matched.
    const visible = body.replace(/<[^>]*>/g, (tag) => ' '.repeat(tag.length));
    for (const m of visible.matchAll(/\+880[\d\s-]{6,}/g)) {
      const lastOpen = body.lastIndexOf('<', m.index);
      if (!/dir="ltr"/.test(body.slice(lastOpen, body.indexOf('>', lastOpen) + 1))) {
        fail(where, `phone number "${m[0].trim()}" is not inside a dir="ltr" element`);
      }
    }
    for (const m of visible.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)) {
      const lastOpen = body.lastIndexOf('<', m.index);
      if (!/dir="ltr"/.test(body.slice(lastOpen, body.indexOf('>', lastOpen) + 1))) {
        fail(where, `e-mail "${m[0]}" is not inside a dir="ltr" element`);
      }
    }
  }
}

// 404.html
const f404 = path.join(DIST, '404.html');
if (!fs.existsSync(f404)) fail('404.html', 'missing (without it Cloudflare serves index.html with 200 for unknown URLs)');
else {
  const h = fs.readFileSync(f404, 'utf8');
  if (!/<meta name="robots" content="noindex/.test(h)) fail('404.html', 'not noindex');
  if (/<link rel="canonical"/.test(h)) fail('404.html', 'has a canonical tag');
}

// Sitemap.
const smFile = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(smFile)) fail('sitemap.xml', 'missing');
else {
  const xml = fs.readFileSync(smFile, 'utf8');
  const locs = all(/<loc>([^<]+)<\/loc>/g, xml).map(unesc);
  const want = pages.filter((p) => p.indexable).map((p) => (p.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${p.path}`));
  if (!sameSet([...new Set(locs)], want) || locs.length !== want.length) {
    const missing = want.filter((u) => !locs.includes(u));
    const extra = locs.filter((u) => !want.includes(u));
    fail('sitemap.xml', `does not match the page list (missing ${missing.length}, unexpected ${extra.length}) ${extra.slice(0, 3).join(' ')}`);
  }
  if (locs.some((u) => u.endsWith('/apply'))) fail('sitemap.xml', 'lists /apply');
  for (const u of locs) {
    const p = pages.find((x) => (x.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${x.path}`) === u);
    if (!p) continue;
    const alts = getPageHead(p.route, p.lang, data).alternates;
    if (alts.length && !xml.includes(`<loc>${esc(u)}</loc>\n${alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`).join('\n')}`)) {
      fail('sitemap.xml', `alternates for ${u} missing or different from the page's hreflang`);
    }
  }
}

if (errors.length) {
  console.error(`verify-pages: ${errors.length} problem(s)\n`);
  for (const e of errors.slice(0, 60)) console.error('  ' + e);
  if (errors.length > 60) console.error(`  ... and ${errors.length - 60} more`);
  process.exit(1);
}
console.log(`verify-pages: OK — ${pages.length} pages, 404.html and sitemap.xml checked`);
