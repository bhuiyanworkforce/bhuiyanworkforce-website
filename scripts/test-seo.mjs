#!/usr/bin/env node
// Offline checks for the pure SEO/i18n modules. No dependencies, no build needed.
// Entity content (data files) is bundled with esbuild when available so the
// slug lists in src/routes.js can be checked against src/data/*.jsx.
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { buildPath, parsePath, ENTITY_SLUGS, PAGE_SLUGS, SEGMENTS } from '../src/i18n/slugs.js';
import { LOCALES, REAL_LOCALE_CODES } from '../src/i18n/config.js';
import {
  listPages, listAllRoutes, getAlternates, getLanguageLinks, resolvePath, isAvailable,
  SERVICE_SLUGS, COUNTRY_SLUGS, POST_SLUGS, GUIDE_SLUGS, routeKey,
} from '../src/routes.js';
import { getPageHead } from '../src/seo/getPageHead.js';
import { headToHtml } from '../src/seo/headHtml.js';
import { buildSitemap } from '../src/seo/sitemap.js';
import { localizeTo } from '../src/i18n/localize.js';
import { headTags } from '../src/seo/headHtml.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
function test(name, fn) {
  try { fn(); passed += 1; console.log(`  ok   ${name}`); }
  catch (e) { console.error(`  FAIL ${name}\n       ${e.message}`); process.exitCode = 1; }
}

// ---- data (optional) -------------------------------------------------------
let data = null;
try {
  const { build } = await import('esbuild');
  const entry = ['countries', 'services', 'posts', 'countryGuides']
    .map((f) => `export * from ${JSON.stringify(path.join(ROOT, 'src/data', f + '.jsx'))};`).join('\n');
  const out = await build({ stdin: { contents: entry, resolveDir: ROOT, loader: 'js' }, bundle: true, format: 'esm', write: false, loader: { '.jsx': 'jsx' } });
  const m = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
  data = { country: m.getCountry, service: m.getService, post: m.getPost, guide: m.getCountryGuide, raw: m };
} catch { console.log('  (esbuild not available: data-dependent checks skipped)'); }

console.log('slugs');
test('English paths', () => {
  assert.equal(buildPath('en', { type: 'page', id: 'home' }), '/');
  assert.equal(buildPath('en', { type: 'country', id: 'saudi-arabia' }), '/countries/saudi-arabia');
  assert.equal(buildPath('en', { type: 'post', id: 'x' }), '/blog/x');
});
test('Arabic uses English slugs under /ar', () => {
  assert.equal(buildPath('ar', { type: 'page', id: 'home' }), '/ar');
  assert.equal(buildPath('ar', { type: 'country', id: 'saudi-arabia' }), '/ar/countries/saudi-arabia');
});
test('Polish translated slugs', () => {
  assert.equal(buildPath('pl', { type: 'page', id: 'home' }), '/pl');
  assert.equal(buildPath('pl', { type: 'country', id: 'saudi-arabia' }), '/pl/kraje/arabia-saudyjska');
  assert.equal(buildPath('pl', { type: 'page', id: 'about' }), '/pl/o-nas');
});
test('parsePath round-trips every page in every language', () => {
  for (const p of listPages()) {
    const r = parsePath(p.path);
    assert.equal(r.lang, p.lang, p.path);
    assert.deepEqual(r.route, p.route, p.path);
  }
});
test('parsePath round-trips all Polish slugs (even untranslated pages)', () => {
  for (const r of listAllRoutes()) {
    const back = parsePath(buildPath('pl', r));
    assert.deepEqual(back.route, r, routeKey(r));
  }
});
test('parsePath tolerates trailing slash, query, hash; rejects junk', () => {
  assert.deepEqual(parsePath('/pl/kraje/arabia-saudyjska/?x=1#y').route, { type: 'country', id: 'saudi-arabia' });
  assert.equal(parsePath('/pl/nope').route, null);
  assert.equal(parsePath('/a/b/c').route, null);
  assert.equal(parsePath('/pl/kraje/arabia-saudyjska-zly').route, null);
});
test('every country and service has a Polish slug; slugs are unique', () => {
  for (const [type, list] of [['country', COUNTRY_SLUGS], ['service', SERVICE_SLUGS], ['guide', GUIDE_SLUGS]]) {
    const map = ENTITY_SLUGS.pl[type];
    for (const s of list) assert.ok(map[s], `pl ${type} slug missing for ${s}`);
    assert.equal(new Set(Object.values(map)).size, Object.values(map).length, `duplicate pl ${type} slugs`);
    for (const s of Object.keys(map)) assert.ok(list.includes(s), `pl ${type} map has unknown key ${s}`);
  }
});
test('list-page slugs equal their path segment', () => {
  for (const lang of ['en', 'pl']) {
    assert.equal(PAGE_SLUGS[lang].countries, SEGMENTS[lang].country);
    assert.equal(PAGE_SLUGS[lang]['employer-guide'], SEGMENTS[lang].guide);
  }
});

console.log('routes');
test('page counts', () => {
  const pages = listPages();
  const by = (l) => pages.filter((p) => p.lang === l).length;
  assert.equal(by('en'), 10 + 25 + 28 + 18 + 3);
  assert.equal(by('ar'), 3 + 25 + 28 + 18 + 3);
  assert.equal(by('pl'), 2);
});
test('availability and 404 resolution', () => {
  assert.equal(resolvePath('/ar/countries/saudi-arabia').status, 'ok');
  assert.equal(resolvePath('/ar/about').status, 'ok');
  assert.equal(resolvePath('/ar/privacy').status, 'notfound');
  assert.equal(resolvePath('/pl/o-nas').status, 'notfound');
  assert.equal(resolvePath('/countries/atlantis').status, 'notfound');
  assert.equal(resolvePath('/').status, 'ok');
});
test('hreflang: self, x-default, only real translations', () => {
  const alts = getAlternates({ type: 'country', id: 'saudi-arabia' });
  assert.deepEqual(alts.map((a) => a.hreflang), ['en', 'ar', 'pl', 'x-default']);
  assert.equal(alts.find((a) => a.hreflang === 'x-default').href, 'https://bhuiyanworkforce.com/countries/saudi-arabia');
  assert.deepEqual(getAlternates({ type: 'page', id: 'privacy' }), []);
  assert.deepEqual(getAlternates({ type: 'page', id: 'about' }).map((a) => a.hreflang), ['en', 'ar', 'x-default']);
});
test('language switcher links', () => {
  const links = getLanguageLinks({ type: 'page', id: 'privacy' }, 'en');
  assert.equal(links.find((l) => l.code === 'ar').href, '/ar');
  assert.equal(links.find((l) => l.code === 'ar').fallback, true);
  const ok = getLanguageLinks({ type: 'country', id: 'saudi-arabia' }, 'en');
  assert.equal(ok.find((l) => l.code === 'pl').href, '/pl/kraje/arabia-saudyjska');
  assert.equal(ok.find((l) => l.code === 'pl').fallback, false);
});

console.log('slug lists vs data files');
test('routes.js lists match src/data', () => {
  if (!data) return;
  const same = (a, b, what) => assert.deepEqual([...a].sort(), [...b].sort(), what);
  same(COUNTRY_SLUGS, data.raw.COUNTRIES.map((c) => c.slug), 'countries');
  same(SERVICE_SLUGS, data.raw.SERVICES.map((c) => c.slug), 'services');
  same(POST_SLUGS, data.raw.POSTS.map((c) => c.slug), 'posts');
  same(GUIDE_SLUGS, Object.keys(data.raw.COUNTRY_GUIDES), 'guides');
});

console.log('head');
const homeEn = getPageHead({ type: 'page', id: 'home' }, 'en', data || {});
test('English homepage matches existing index.html wording', () => {
  assert.equal(homeEn.title, 'Bhuiyan Workforce Ltd. — Ethical Global Recruitment from Bangladesh');
  assert.equal(homeEn.canonical, 'https://bhuiyanworkforce.com/');
  assert.equal(homeEn.og.locale, 'en_GB');
  assert.equal(homeEn.jsonld.length, 2);
});
test('Arabic homepage: rtl, own canonical, og:locale, alternates', () => {
  const h = getPageHead({ type: 'page', id: 'home' }, 'ar', {});
  assert.equal(h.dir, 'rtl');
  assert.equal(h.canonical, 'https://bhuiyanworkforce.com/ar');
  assert.equal(h.og.locale, 'ar_AR');
  assert.ok(h.alternates.some((a) => a.hreflang === 'x-default' && a.href === 'https://bhuiyanworkforce.com/'));
  assert.ok(h.links.some((l) => /Noto\+Sans\+Arabic/.test(l.href)));
  assert.equal(h.jsonld.find((j) => j['@type'].includes?.('Organization')).hasOfferCatalog, undefined);
});
test('Polish country page', () => {
  const h = getPageHead({ type: 'country', id: 'saudi-arabia' }, 'pl', {});
  assert.equal(h.canonical, 'https://bhuiyanworkforce.com/pl/kraje/arabia-saudyjska');
  assert.equal(h.jsonld[1].itemListElement[1].item, 'https://bhuiyanworkforce.com/pl/kraje');
});
test('untranslated page throws instead of emitting wrong-language head', () => {
  assert.throws(() => getPageHead({ type: 'page', id: 'privacy' }, 'ar', {}));
});
test('/apply is noindex and excluded from sitemap; 404 has no canonical', () => {
  assert.match(getPageHead({ type: 'page', id: 'apply' }, 'en', {}).robots, /^noindex/);
  assert.ok(!buildSitemap(listPages()).includes('/apply'));
  const nf = getPageHead({ type: 'notfound' }, 'en', {});
  assert.equal(nf.canonical, null);
  assert.match(nf.robots, /^noindex/);
});
test('every English page produces a complete head (needs data)', () => {
  if (!data) return;
  for (const p of listPages().filter((x) => x.lang === 'en')) {
    const h = getPageHead(p.route, 'en', data);
    assert.ok(h.title && h.description, p.path);
    assert.ok(h.title.length <= 140, `${p.path} title too long`);
    assert.equal(h.canonical, p.path === '/' ? 'https://bhuiyanworkforce.com/' : `https://bhuiyanworkforce.com${p.path}`);
    for (const j of h.jsonld) JSON.parse(JSON.stringify(j));
  }
});
test('titles are unique per language', () => {
  if (!data) return;
  for (const lang of REAL_LOCALE_CODES) {
    const seen = new Map();
    for (const p of listPages().filter((x) => x.lang === lang)) {
      const t = getPageHead(p.route, lang, data).title;
      assert.ok(!seen.has(t), `duplicate title "${t}": ${seen.get(t)} and ${p.path}`);
      seen.set(t, p.path);
    }
  }
});
test('headToHtml escapes and keeps JSON-LD script-safe', () => {
  const html = headToHtml({ ...homeEn, title: 'A & "B" <c>', jsonld: [{ x: '</script><b>' }] });
  assert.ok(html.includes('A &amp; &quot;B&quot; &lt;c&gt;'));
  assert.ok(!html.includes('</script><b>'));
});


console.log('links');
test('localizeTo keeps visitors in their language when the page exists there', () => {
  assert.equal(localizeTo('/', 'ar'), '/ar');
  assert.equal(localizeTo('/#contact', 'ar'), '/ar#contact');
  assert.equal(localizeTo('/countries/saudi-arabia', 'pl'), '/pl/kraje/arabia-saudyjska');
  assert.equal(localizeTo('/countries/saudi-arabia', 'en'), '/countries/saudi-arabia');
});
test('localizeTo falls back to the real English page when there is no translation', () => {
  assert.equal(localizeTo('/privacy', 'ar'), '/privacy');
  assert.equal(localizeTo('/countries/qatar', 'pl'), '/countries/qatar');
  assert.equal(localizeTo('/capabilities.pdf', 'ar'), '/capabilities.pdf');
  assert.equal(localizeTo('/ar/privacy', 'pl'), '/ar/privacy'); // already prefixed
  assert.equal(localizeTo('mailto:a@b.c', 'ar'), 'mailto:a@b.c');
});
test('headTags and headToHtml agree (static HTML and client sync use the same tags)', () => {
  const tags = headTags(homeEn);
  assert.equal(tags.filter((t) => t.tag === 'title').length, 1);
  assert.equal(tags.filter((t) => t.tag === 'link' && t.attrs.rel === 'canonical').length, 1);
  assert.equal(headToHtml(homeEn).split('\n').length, tags.length);
});

console.log('sitemap');
test('sitemap lists each indexable page once, with reciprocal alternates', () => {
  const xml = buildSitemap(listPages());
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(new Set(locs).size, locs.length);
  assert.equal(locs.length, listPages().filter((p) => p.indexable).length);
  assert.ok(xml.includes('hreflang="pl" href="https://bhuiyanworkforce.com/pl/kraje/arabia-saudyjska"'));
});

console.log(`\n${passed} passed${process.exitCode ? ', with failures' : ''}`);
