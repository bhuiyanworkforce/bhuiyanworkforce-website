// JSON-LD builders. Pure functions, no DOM.

import { SITE_URL } from '../i18n/config.js';

const ORG_ID = `${SITE_URL}/#organization`;

// Offer catalog carried over unchanged from index.html (20 of the 25 services:
// the five newest are missing there). English only; see getPageHead.
const OFFERS = [
  ['Construction & Engineering Workers', 'construction'],
  ['Drivers & Transport Workers', 'drivers'],
  ['Chefs & Hospitality Staff', 'hospitality'],
  ['Factory & Manufacturing Workers', 'factory'],
  ['Farm & Garden Workers', 'farm-garden'],
  ['Warehouse & Logistics Staff', 'warehouse'],
  ['Oil & Gas Workers', 'oil-gas'],
  ['Security Guards', 'security'],
  ['Cleaning & Housekeeping Staff', 'cleaning'],
  ['Retail & Supermarket Staff', 'retail'],
  ['Caregiving & Elderly Support Workers', 'caregiving'],
  ['Painting & Finishing Workers', 'painting-finishing'],
  ['Steel Fixing & Reinforcement Workers', 'steel-fixing'],
  ['Scaffolding & Formwork Workers', 'scaffolding-formwork'],
  ['Mason & Bricklaying Workers', 'masonry-bricklaying'],
  ['Food Processing & Packing Workers', 'food-processing'],
  ['Laundry & Linen Services Staff', 'laundry-linen'],
  ['Landscaping & Groundskeeping Workers', 'landscaping-groundskeeping'],
  ['Electrical Helpers & Cable Pullers', 'electrical-helpers'],
];

const PEOPLE = [
  { name: 'MD Rezaul Kabir Bhuiyan', jobTitle: 'Founder & CEO', email: 'Rezaul@bhuiyanworkforce.com', image: 'team-rezaul.webp' },
  { name: 'Asraful Kabir Bhuiyan', jobTitle: 'Business Development Manager', image: 'team-asraful.webp' },
  { name: 'Kishor Kumar', jobTitle: 'Compliance & Documentation Manager', image: 'team-kishor.webp' },
];

export function organizationSchema(locale, lang) {
  const h = locale.head;
  const org = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EmploymentAgency'],
    '@id': ORG_ID,
    name: 'Bhuiyan Workforce Ltd.',
    alternateName: 'Bhuiyan Workforce',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 200, height: 60 },
    image: `${SITE_URL}/og-image.png`,
    description: h.orgDescription,
    foundingDate: '2021',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD',
      addressLocality: 'Brahmanbaria',
      addressRegion: 'Chittagong Division',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+880-1864-567912',
        contactType: 'sales',
        email: 'info@bhuiyanworkforce.com',
        availableLanguage: ['English', 'Bengali'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: '+880-1978-356710',
        contactType: 'customer support',
        email: 'careers@bhuiyanworkforce.com',
        availableLanguage: ['Bengali', 'English'],
      },
    ],
    email: 'info@bhuiyanworkforce.com',
    telephone: '+880-1864-567912',
    sameAs: ['https://linkedin.com/company/bhuiyan-workforce', 'https://www.facebook.com/share/1GjrNbPYvf/'],
    areaServed: h.areaServed.map((name) => ({ '@type': 'Country', name })),
    employee: PEOPLE.map((p) => ({
      '@type': 'Person',
      name: p.name,
      jobTitle: p.jobTitle,
      worksFor: { '@type': 'Organization', name: 'Bhuiyan Workforce Ltd.' },
      ...(p.email ? { email: p.email } : {}),
      image: `${SITE_URL}/${p.image}`,
    })),
  };
  // The offer catalog links to English service pages and uses English names;
  // it is only emitted on the English homepage until services are translated.
  if (lang === 'en') {
    org.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Workforce Recruitment Services',
      itemListElement: OFFERS.map(([name, slug]) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, url: `${SITE_URL}/services/${slug}` },
      })),
    };
  }
  return org;
}

export function websiteSchema(locale, lang, homeUrl) {
  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Bhuiyan Workforce Ltd.',
    url: homeUrl,
    description: locale.head.siteDescription,
    inLanguage: lang === 'en' ? ['en', 'bn'] : [lang],
    publisher: { '@id': ORG_ID },
  };
  if (lang === 'en') {
    // Carried over from index.html. /services?q= is not a real page (flagged in
    // the Phase 1 report); Google retired the sitelinks search box in 2024.
    site.potentialAction = {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/services?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    };
  }
  return site;
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function providerRef() {
  return { '@type': 'Organization', '@id': ORG_ID, name: 'Bhuiyan Workforce Ltd.', url: SITE_URL };
}

export { ORG_ID };
