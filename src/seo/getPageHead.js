// getPageHead(route, lang, data) -> everything that belongs in <head> for a page.
//
// Pure: no DOM, no React. The static generator turns the result into HTML
// (headHtml.js) and the client keeps document.head in sync with the same
// object, so both always agree.
//
// `data` supplies entity content: { country(slug), service(slug), post(slug),
// guide(slug) } each returning the record from src/data/* or undefined.

import { SITE_URL, LOCALES } from '../i18n/config.js';
import { LOCALE_DATA } from '../i18n/locales/index.js';
import { buildPath } from '../i18n/slugs.js';
import {
  isAvailable, isNoindex, getAlternates, availableLanguages, absoluteUrl,
} from '../routes.js';
import {
  organizationSchema, websiteSchema, breadcrumbSchema, providerRef,
} from './schema.js';
import { FAQ_EN } from './faq.en.js';

const ROBOTS_INDEX = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, follow';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function must(value, what) {
  if (value === undefined || value === null) throw new Error(`getPageHead: missing ${what}`);
  return value;
}

function entityMeta(route, lang, locale, data) {
  const t = locale.head;
  const slug = route.id;
  if (route.type === 'country') {
    if (lang === 'en') {
      const c = must(data.country(slug), `country "${slug}"`);
      return { ...t.templates.country(c), name: c.name };
    }
    return must(t.countries[slug], `${lang} country override "${slug}"`);
  }
  if (route.type === 'service') {
    if (lang === 'en') {
      const s = must(data.service(slug), `service "${slug}"`);
      return { ...t.templates.service(s), name: s.name, shortDesc: s.shortDesc, areaServed: s.countries };
    }
    return must(t.services[slug], `${lang} service override "${slug}"`);
  }
  if (route.type === 'post') {
    if (lang === 'en') {
      const p = must(data.post(slug), `post "${slug}"`);
      return { ...t.templates.post(p), name: p.title, headline: p.title, date: p.date };
    }
    return must(t.posts[slug], `${lang} post override "${slug}"`);
  }
  if (route.type === 'guide') {
    if (lang === 'en') {
      const g = must(data.guide(slug), `guide "${slug}"`);
      return { ...t.templates.guide(g), name: g.country };
    }
    return must(t.guides[slug], `${lang} guide override "${slug}"`);
  }
  throw new Error(`getPageHead: unknown route type "${route.type}"`);
}

function breadcrumbFor(route, lang, locale, meta) {
  const b = locale.head.breadcrumb;
  const home = { name: b.home, url: absoluteUrl(lang, { type: 'page', id: 'home' }) };
  const here = (name) => ({ name, url: absoluteUrl(lang, route) });
  if (route.type === 'page') {
    if (route.id === 'home') return null;
    const label = { faq: b.faq, blog: b.blog, countries: b.countries, 'employer-guide': b.employerGuide }[route.id]
      || locale.head.pages[route.id].title.split(/ [—|] /)[0];
    return [home, here(label)];
  }
  const parents = {
    country: { name: b.countries, route: { type: 'page', id: 'countries' } },
    post: { name: b.blog, route: { type: 'page', id: 'blog' } },
    guide: { name: b.employerGuide, route: { type: 'page', id: 'employer-guide' } },
    // There is no /services index page; the services list lives on the homepage.
    service: { name: b.services, route: { type: 'page', id: 'home' }, hash: '#services' },
  }[route.type];
  const parentUrl = absoluteUrl(lang, parents.route) + (parents.hash || '');
  return [home, { name: parents.name, url: parentUrl }, here(meta.name || meta.headline)];
}

function jsonLdFor(route, lang, locale, meta, url) {
  const out = [];
  if (route.type === 'page' && route.id === 'home') {
    out.push(organizationSchema(locale, lang));
    out.push(websiteSchema(locale, lang, url));
    return out;
  }
  const crumbs = breadcrumbFor(route, lang, locale, meta);
  if (route.type === 'page') {
    if (crumbs) out.push(breadcrumbSchema(crumbs));
    if (route.id === 'faq' && lang === 'en') {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_EN.map(([q, a]) => ({
          '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      });
    }
    return out;
  }
  const base = { '@context': 'https://schema.org', url, inLanguage: lang };
  if (route.type === 'country') {
    out.push({ ...base, '@type': 'WebPage', name: meta.title, description: meta.description });
  } else if (route.type === 'service') {
    out.push({
      ...base, '@type': 'Service', name: meta.name, description: meta.shortDesc || meta.description,
      provider: providerRef(), ...(meta.areaServed ? { areaServed: meta.areaServed } : {}),
    });
  } else if (route.type === 'post') {
    out.push({
      ...base, '@type': 'BlogPosting', headline: meta.headline || meta.name, description: meta.description,
      // Source data holds free text ("September 2026"), which is not a valid
      // schema.org date, so datePublished is left out until the data has ISO dates.
      author: providerRef(), publisher: { ...providerRef(), logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    });
  } else if (route.type === 'guide') {
    out.push({
      ...base, '@type': 'Article', headline: meta.title, description: meta.description,
      author: providerRef(), publisher: { ...providerRef(), logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    });
  }
  if (crumbs) out.push(breadcrumbSchema(crumbs));
  return out;
}

export function getPageHead(route, lang, data = {}) {
  const locale = LOCALE_DATA[lang];
  if (!locale) throw new Error(`getPageHead: unknown language "${lang}"`);
  const dir = LOCALES[lang].dir;

  // 404: no canonical, no hreflang, not indexable, no structured data.
  if (route && route.type === 'notfound') {
    const m = locale.head.notFound;
    return {
      lang, dir, title: m.title, description: m.description, keywords: null,
      robots: ROBOTS_NOINDEX, canonical: null, alternates: [],
      og: { type: 'website', siteName: locale.head.siteName, title: m.title, description: m.description, url: null,
        image: OG_IMAGE, imageAlt: locale.head.ogImageAlt, locale: LOCALES[lang].ogLocale, localeAlternates: [] },
      twitter: { card: 'summary_large_image', title: m.title, description: m.description, image: OG_IMAGE },
      links: LOCALES[lang].fontsHref ? [{ rel: 'stylesheet', href: LOCALES[lang].fontsHref }] : [],
      jsonld: [],
    };
  }

  if (!isAvailable(route, lang)) {
    throw new Error(`getPageHead: ${route.type}:${route.id} has no "${lang}" version`);
  }

  const url = absoluteUrl(lang, route);
  let meta;
  let keywords = null;
  let ogDescription;
  if (route.type === 'page') {
    meta = must(locale.head.pages[route.id], `${lang} page meta "${route.id}"`);
    keywords = meta.keywords || null;
    ogDescription = meta.ogDescription || meta.description;
  } else {
    meta = entityMeta(route, lang, locale, data);
    ogDescription = meta.description;
  }

  const alternates = getAlternates(route);
  const otherLangs = availableLanguages(route).filter((l) => l !== lang);

  return {
    lang,
    dir,
    title: meta.title,
    description: meta.description,
    keywords,
    robots: isNoindex(route) ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    canonical: url,
    alternates,
    og: {
      type: route.type === 'post' ? 'article' : 'website',
      siteName: locale.head.siteName,
      title: meta.title,
      description: ogDescription,
      url,
      image: OG_IMAGE,
      imageAlt: locale.head.ogImageAlt,
      locale: LOCALES[lang].ogLocale,
      localeAlternates: otherLangs.map((l) => LOCALES[l].ogLocale),
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, image: OG_IMAGE },
    links: LOCALES[lang].fontsHref ? [{ rel: 'stylesheet', href: LOCALES[lang].fontsHref }] : [],
    jsonld: jsonLdFor(route, lang, locale, meta, url),
  };
}

export { buildPath };
