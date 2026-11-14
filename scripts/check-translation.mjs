#!/usr/bin/env node
// Structural quality gate for a translated language.
//
//   node scripts/check-translation.mjs it        (also works for: ar, pl)
//
// Compares the translation files against the English source and the Arabic reference shapes:
// keys, placeholders, list lengths, markdown structure, numbers, contact details, brand name,
// SEO lengths and (for Italian) legally loaded terms. It cannot judge translation QUALITY;
// a human or a second reviewer still has to read the text. Exit code 1 if any ERROR.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lang = process.argv[2];
if (!lang || lang === 'en') { console.error('usage: node scripts/check-translation.mjs <lang code, e.g. it>'); process.exit(2); }

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const { build } = await import('esbuild');
async function bundle(entrySource) {
  const out = await build({ stdin: { contents: entrySource, resolveDir: ROOT, loader: 'js' }, bundle: true, format: 'esm', write: false, loader: { '.jsx': 'jsx' }, logLevel: 'silent' });
  return import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
}
const abs = (p) => JSON.stringify(path.join(ROOT, p));
const importFile = async (p) => {
  const file = path.join(ROOT, p);
  if (!fs.existsSync(file)) return null;
  try { return (await import(pathToFileURL(file).href + `?t=${Date.now()}`)).default; }
  catch (e) { err(p, `does not load as a JavaScript module: ${e.message}`); return null; }
};

const EN = await bundle(`
  export * from ${abs('src/data/countries.jsx')};
  export * from ${abs('src/data/services.jsx')};
  export * from ${abs('src/data/posts.jsx')};
  export * from ${abs('src/data/countryGuides.jsx')};
  export { T } from ${abs('src/i18n/translations.jsx')};
  export { PAGE_CONTENT } from ${abs('src/content/pages.js')};
`);
const enUi = (await import(pathToFileURL(path.join(ROOT, 'src/i18n/locales/en.ui.js')).href)).default;

// ---- helpers
const flat = (v) => JSON.stringify(v);
const numbers = (v) => new Set((flat(v).match(/(?<![A-Za-z\d])\d+/g) || []));
const placeholders = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
const contacts = (v) => new Set(flat(v).match(/[\w.+-]+@[\w-]+\.[\w.-]+|\+\d[\d ]{8,}\d|https?:\/\/[^\s"\\]+/g) || []);
const words = (s) => String(s).trim().split(/\s+/).length;
const isStr = (x) => typeof x === 'string' && x.trim() !== '';

function sameShape(where, en, tr) {
  if (Array.isArray(en)) {
    if (!Array.isArray(tr)) return err(where, 'expected a list');
    if (tr.length !== en.length) err(where, `list has ${tr.length} items, English has ${en.length}`);
    en.forEach((x, i) => { if (typeof x === 'object' && tr[i]) sameShape(`${where}[${i}]`, x, tr[i]); });
  } else if (en && typeof en === 'object') {
    for (const k of Object.keys(en)) if (tr?.[k] === undefined) err(where, `missing key "${k}"`);
  }
}
// Numbers the Arabic reference writes as words ("2 years" -> "عامين"), so the digit is legitimately absent.
const KNOWN_WORD_NUMBERS = new Set(['ar|country uae|2', 'ar|ui founding_title|10']);
function checkText(where, en, tr, { allowSame = false } = {}) {
  if (en === undefined) return;
  const enS = flat(en), trS = flat(tr);
  for (const n of numbers(en)) {
    if (numbers(tr).has(n) || KNOWN_WORD_NUMBERS.has(`${lang}|${where}|${n}`)) continue;
    const msg = `number "${n}" from English is missing (write numbers as digits, exactly as in English)`;
    if (where.startsWith('ui ') || where.startsWith('head')) warn(where, msg); else err(where, msg);
  }
  for (const c of contacts(en)) if (!trS.includes(c)) err(where, `contact detail "${c}" changed or missing`);
  if (/Bhuiyan Workforce/.test(enS) && !/Bhuiyan Workforce/.test(trS)) err(where, 'company name "Bhuiyan Workforce" is missing (must stay in Latin script)');
  if (!allowSame && typeof en === 'string' && typeof tr === 'string' && words(en) > 3 && en.trim() === tr.trim()) err(where, 'identical to English (untranslated?)');
}

// ---- 1. UI strings
const ref = await importFile('src/i18n/locales/ar.ui.js');           // authoritative key list
const ui = await importFile(`src/i18n/locales/${lang}.ui.js`);
if (!ui) err(`src/i18n/locales/${lang}.ui.js`, 'file missing');
else {
  for (const key of Object.keys(ref)) {
    const en = enUi[key] ?? EN.T[key]?.en;
    if (!isStr(ui[key])) { err(`ui ${key}`, 'missing or empty'); continue; }
    if (en === undefined) continue;
    if (placeholders(en) !== placeholders(ui[key])) err(`ui ${key}`, `placeholders differ: English {${placeholders(en)}} vs {${placeholders(ui[key])}}`);
    checkText(`ui ${key}`, en, ui[key]);
    const lead = (s) => (/^\s*[←→]/.test(s) ? 'lead' : /[←→]\s*$/.test(s) ? 'trail' : '');
    if (lang !== 'ar' && /[←→]/.test(en) && lead(en) !== lead(ui[key])) warn(`ui ${key}`, 'arrow position differs from English');
  }
  for (const key of Object.keys(ui)) if (!(key in ref)) warn(`ui ${key}`, 'extra key that Arabic does not have');
}

// ---- 2. country names + country content
const names = await importFile(`src/content/${lang}/names.js`);
const countries = await importFile(`src/content/${lang}/countries.js`);
const refCountries = await importFile('src/content/ar/countries.js');
for (const c of EN.COUNTRIES) {
  if (!names?.[c.slug] || !isStr(names[c.slug])) err(`names ${c.slug}`, 'missing');
  const tr = countries?.[c.slug];
  if (!tr) { err(`country ${c.slug}`, 'missing'); continue; }
  for (const k of Object.keys(refCountries[c.slug] || {})) {
    if (tr[k] === undefined) { err(`country ${c.slug}`, `missing field "${k}"`); continue; }
    if (Array.isArray(refCountries[c.slug][k]) && tr[k].length !== refCountries[c.slug][k].length) err(`country ${c.slug}.${k}`, `list has ${tr[k].length} items, expected ${refCountries[c.slug][k].length}`);
  }
  for (const k of ['topSectors', 'process', 'documents']) if (c[k] && tr[k] && tr[k].length !== c[k].length) err(`country ${c.slug}.${k}`, `list has ${tr[k].length} items, English has ${c[k].length}`);
  const pick = (o) => ({ v: o.visaFee, t: o.processingTime, s: o.salaryRange, o: o.overview, n: o.notes, p: o.process, d: o.documents, f: o.flag_detail });
  checkText(`country ${c.slug}`, pick(c), pick(tr), { allowSame: true });
  for (const k of ['overview', 'notes']) if (c[k] && tr[k] === c[k]) err(`country ${c.slug}.${k}`, 'identical to English');
}

// ---- 3. services
const services = await importFile(`src/content/${lang}/services.js`);
for (const e of EN.SERVICES) {
  const tr = Array.isArray(services) ? services.find((x) => x.slug === e.slug) : null;
  if (!tr) { err(`service ${e.slug}`, 'missing'); continue; }
  for (const k of ['name', 'shortDesc', 'overview']) if (!isStr(tr[k])) err(`service ${e.slug}`, `missing "${k}"`);
  for (const k of ['roles', 'countries', 'process']) if (!Array.isArray(tr[k]) || tr[k].length !== e[k].length) err(`service ${e.slug}.${k}`, `has ${tr[k]?.length} items, English has ${e[k].length}`);
  if ((tr.overview?.match(/\n\n/g) || []).length !== (e.overview.match(/\n\n/g) || []).length) err(`service ${e.slug}`, 'overview paragraph count differs');
  (tr.process || []).forEach((s, i) => { if (!isStr(s?.title) || !isStr(s?.desc)) err(`service ${e.slug}.process[${i}]`, 'title/desc missing'); });
  checkText(`service ${e.slug}`, { o: e.overview, r: e.roles, p: e.process, d: e.shortDesc }, { o: tr.overview, r: tr.roles, p: tr.process, d: tr.shortDesc });
}

// ---- 4. posts (markdown-ish content)
const posts = await importFile(`src/content/${lang}/posts.js`);
const md = (s) => ({
  h2: (s.match(/^## /gm) || []).length, h3: (s.match(/^### /gm) || []).length, bullets: (s.match(/^\s*- /gm) || []).length,
  numbered: (s.match(/^\s*\d+\. /gm) || []).length, bold: (s.match(/\*\*/g) || []).length, links: (s.match(/\]\(/g) || []).length,
  paragraphs: (s.match(/\n\n/g) || []).length, tables: (s.match(/^\|/gm) || []).length,
});
for (const e of EN.POSTS) {
  const tr = Array.isArray(posts) ? posts.find((x) => x.slug === e.slug) : null;
  if (!tr) { err(`post ${e.slug}`, 'missing'); continue; }
  for (const k of ['icon', 'tag', 'date', 'title', 'excerpt', 'content']) if (!isStr(tr[k])) err(`post ${e.slug}`, `missing "${k}"`);
  if (tr.icon !== e.icon) err(`post ${e.slug}`, 'icon changed');
  if (isStr(tr.content)) {
    const a = md(e.content), b = md(tr.content);
    for (const k of Object.keys(a)) if (a[k] !== b[k]) err(`post ${e.slug}`, `markdown "${k}" count: English ${a[k]}, translation ${b[k]} (keep ##, -, 1., ** syntax exactly)`);
  }
  checkText(`post ${e.slug}`, { t: e.title, x: e.excerpt, c: e.content }, { t: tr.title, x: tr.excerpt, c: tr.content });
  if (lang !== 'ar' && tr.date === e.date && /[A-Za-z]{3,} \d{4}/.test(e.date)) err(`post ${e.slug}`, `date "${e.date}" still in English`);
}

// ---- 5. guides
const guides = await importFile(`src/content/${lang}/guides.js`);
for (const slug of Object.keys(EN.COUNTRY_GUIDES)) {
  const e = EN.COUNTRY_GUIDES[slug], tr = guides?.[slug];
  if (!tr) { err(`guide ${slug}`, 'missing'); continue; }
  if (tr.flag !== e.flag) err(`guide ${slug}`, 'flag changed');
  if (!Array.isArray(tr.sections) || tr.sections.length !== e.sections.length) err(`guide ${slug}`, `sections: ${tr.sections?.length} vs ${e.sections.length}`);
  e.sections.forEach((s, i) => { const t = tr.sections?.[i]; if (t && (t.content.match(/\n/g) || []).length !== (s.content.match(/\n/g) || []).length) err(`guide ${slug}.sections[${i}]`, 'line-break count differs (content is split per line)'); });
  checkText(`guide ${slug}`, { i: e.intro, s: e.sections }, { i: tr.intro, s: tr.sections });
}

// ---- 6. About / FAQ page content
let pages = EN.PAGE_CONTENT[lang];
if (!pages) { const mod = await importFile(`src/content/${lang}/pages.js`); pages = mod; }
if (!pages) err(`src/content/${lang}/pages.js`, 'missing (About and FAQ content)');
else {
  sameShape('pages.about', EN.PAGE_CONTENT.en.about, pages.about);
  sameShape('pages.faq.ui', EN.PAGE_CONTENT.en.faq.ui, pages.faq?.ui);
  if (pages.faq?.categories?.length !== EN.PAGE_CONTENT.en.faq.categories.length) err('pages.faq', 'category count differs');
  EN.PAGE_CONTENT.en.faq.categories.forEach((c, i) => { if (pages.faq?.categories?.[i]?.items?.length !== c.items.length) err(`pages.faq.categories[${i}]`, 'question count differs'); });
  checkText('pages.about', EN.PAGE_CONTENT.en.about, pages.about, { allowSame: true });
  checkText('pages.faq', EN.PAGE_CONTENT.en.faq, pages.faq, { allowSame: true });
}

// ---- 7. head / SEO strings
const head = await importFile(`src/i18n/locales/${lang}.js`);
const NAME = 'Bhuiyan Workforce';
if (!head) err(`src/i18n/locales/${lang}.js`, 'file missing');
else {
  const h = head.head || {};
  const seen = new Map();
  const seo = (where, o) => {
    if (!isStr(o?.title) || !isStr(o?.description)) return err(where, 'title/description missing');
    if (!o.title.includes(NAME)) err(where, `title must contain "${NAME}"`);
    // Lengths are advisory: blog and guide headlines are long in the English source as well.
    if (o.title.length > 70) warn(where, `title is ${o.title.length} characters (aim for 60; Google may cut it)`);
    if (o.description.length < 100 || o.description.length > 175) warn(where, `description is ${o.description.length} characters (aim for 120–160)`);
    if (seen.has(o.title)) err(where, `title duplicates ${seen.get(o.title)}`); else seen.set(o.title, where);
  };
  for (const id of ['home', 'about', 'faq', 'blog', 'countries', 'capabilities', 'employer-guide', 'privacy', 'terms', 'apply']) {
    if (id === 'countries' && !h.pages?.countries) { warn('head.pages.countries', 'missing (Arabic file does not have it either)'); continue; }
    seo(`head.pages.${id}`, h.pages?.[id]);
  }
  for (const c of EN.COUNTRIES) seo(`head.countries.${c.slug}`, h.countries?.[c.slug]);
  for (const s of EN.SERVICES) seo(`head.services.${s.slug}`, h.services?.[s.slug]);
  for (const p of EN.POSTS) seo(`head.posts.${p.slug}`, h.posts?.[p.slug]);
  for (const g of Object.keys(EN.COUNTRY_GUIDES)) seo(`head.guides.${g}`, h.guides?.[g]);
  for (const k of ['siteName', 'ogImageAlt', 'orgDescription', 'siteDescription']) if (!isStr(h[k])) err(`head.${k}`, 'missing');
  if (h.siteName !== 'Bhuiyan Workforce Ltd.') err('head.siteName', 'must be exactly "Bhuiyan Workforce Ltd."');
  for (const k of ['home', 'countries', 'services', 'blog', 'faq', 'employerGuide']) if (!isStr(h.breadcrumb?.[k])) err(`head.breadcrumb.${k}`, 'missing');
  if (!Array.isArray(h.areaServed) || h.areaServed.length !== 24) err('head.areaServed', `needs 24 country names (has ${h.areaServed?.length})`);
  if (!h.notFound?.title) err('head.notFound', 'missing');
  if (h.pages?.home && !/[A-Za-zÀ-ÿ]/.test(h.pages.home.title)) err('head.pages.home', 'title looks empty');
}

// ---- 8. language-specific terminology
if (lang === 'it') {
  const banned = [
    [/agenzi[ae] (per il lavoro|di somministrazione|interinal\w*)/i, '"agenzia per il lavoro / di somministrazione / interinale" are authorised, regulated activities in Italy (ANPAL register). The company must not describe itself that way.'],
    [/somministrazione/i, '"somministrazione" is a regulated legal term'],
    [/intermediazione/i, '"intermediazione" is a regulated legal term'],
    [/distacc/i, '"distacco" means legal posting of workers (D.Lgs. 136/2016): use "invio", "inserimento" or "impiego"'],
    [/avviament/i, '"avviamento" has a specific labour-law meaning in Italian'],
  ];
  const files = ['ui', 'countries', 'services', 'posts', 'guides'];
  const all = { ui, countries, services, posts, guides, pages, head };
  for (const [re, why] of banned) for (const [name, data] of Object.entries(all)) { const m = flat(data || {}).match(re); if (m) err(`terminology (${name})`, `found "${m[0]}": ${why}`); }
  if (/\b(BMET)\b/.test(flat(EN.PAGE_CONTENT)) && !/BMET/.test(flat(pages || {}))) err('terminology', 'BMET must stay as written');
}
for (const [name, data] of Object.entries({ ui, countries, services, posts, guides, pages, head })) {
  if (data && /بهويان|Bhuiyan Workforce Ltd\.? \(/.test(flat(data))) warn(`brand (${name})`, 'check how the company name is written');
  if (data && /\u200e|\u200f|\u2066|\u2069/.test(flat(data)) && lang !== 'ar') warn(`format (${name})`, 'contains invisible bidi control characters (only needed for Arabic)');
}

// ---- report
const show = (list, label) => { if (list.length) { console.log(`\n${label} (${list.length})`); list.slice(0, 80).forEach((l) => console.log('  ' + l)); if (list.length > 80) console.log(`  ... and ${list.length - 80} more`); } };
show(errors, 'ERRORS'); show(warnings, 'WARNINGS');
console.log(`\ncheck-translation (${lang}): ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
