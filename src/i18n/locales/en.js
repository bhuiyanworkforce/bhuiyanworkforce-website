// English head/SEO strings. Phase 1a holds only what getPageHead needs; the
// UI string tables (nav, footer, buttons) are added in Phase 1b.
// Wording is carried over from the existing site (index.html and the per-page
// useEffect code) so English output does not change.

const NAME = 'Bhuiyan Workforce Ltd.';

export default {
  code: 'en',
  // Pages that have an English URL. English has everything, so this is the
  // wildcard 'all'. Other locales list their translated pages explicitly.
  translated: 'all',
  head: {
    siteName: NAME,
    ogImageAlt: 'Bhuiyan Workforce Ltd. — ethical global recruitment from Bangladesh',
    orgDescription:
      'Ethical international manpower recruitment company connecting skilled Bangladeshi workers with employers across 25+ countries in the Gulf, Europe, and Southeast Asia.',
    siteDescription:
      'Ethical global recruitment from Bangladesh — connecting skilled workers with employers across 25+ countries.',
    breadcrumb: {
      home: 'Home',
      countries: 'Countries',
      services: 'Services',
      blog: 'Blog',
      faq: 'FAQ',
      employerGuide: "Employer's Guide",
    },
    pages: {
      home: {
        title: 'Bhuiyan Workforce Ltd. — Ethical Global Recruitment from Bangladesh',
        description:
          'Bhuiyan Workforce Ltd. connects skilled Bangladeshi workers with employers across 25+ countries. Ethical, BMET-compliant, transparent global recruitment.',
        ogDescription:
          'Connecting skilled Bangladeshi workers with employers across 25+ countries. Gulf, Europe & Southeast Asia. BMET-compliant and transparent.',
        keywords:
          'hire skilled construction workers from Bangladesh, ethical recruitment agency for Saudi Arabia, manpower supply Bangladesh to Europe, BMET registered recruitment agency Bangladesh, Bangladesh to Gulf workers, overseas employment agency Dhaka, manpower export Bangladesh 2026, recruit Bangladeshi workers Poland Romania, construction workers Gulf countries Bangladesh',
      },
      countries: {
        title: 'Countries We Deploy To — Bhuiyan Workforce Ltd.',
        description: 'Full details on deploying Bangladeshi workers to 25+ countries including Gulf, Europe, and Southeast Asia.',
      },
      about: {
        title: 'About Us — Bhuiyan Workforce Ltd.',
        description: 'Learn about Bhuiyan Workforce Ltd., our story, team, and commitment to ethical recruitment and worker welfare.',
      },
      faq: {
        title: 'FAQ — Bhuiyan Workforce Ltd.',
        description: 'Answers to common questions from employers and workers about our manpower recruitment process, fees, and compliance.',
      },
      blog: {
        title: 'Blog — Bhuiyan Workforce Ltd.',
        description: 'Industry insights on overseas employment, ethical recruitment, Gulf labour markets, and European workforce trends.',
      },
      apply: {
        title: 'Apply for Work Abroad — Bhuiyan Workforce Ltd.',
        description: 'Register your interest in overseas employment with Bhuiyan Workforce Ltd.',
      },
      capabilities: {
        title: 'Capabilities — Bhuiyan Workforce Ltd.',
        description: 'Our full capabilities, worker categories, and deployment destinations.',
      },
      'employer-guide': {
        // New in Phase 1a: this page previously inherited the homepage title.
        title: "Employer's Guide to Hiring Bangladeshi Workers — Bhuiyan Workforce Ltd.",
        description:
          'Employer guides for hiring Bangladeshi workers: BMET clearance, visa requirements by country, compliance, trade testing, contracts and mobilisation timelines.',
      },
      privacy: {
        title: 'Privacy Policy — Bhuiyan Workforce Ltd.',
        description: 'How Bhuiyan Workforce Ltd. collects, uses, and protects your personal information in accordance with Bangladesh law.',
      },
      terms: {
        title: 'Terms of Service — Bhuiyan Workforce Ltd.',
        description: 'Terms and conditions governing use of the Bhuiyan Workforce Ltd. website and recruitment services, governed by the laws of Bangladesh.',
      },
    },
    notFound: { title: `Page Not Found — ${NAME}`, description: 'The page you are looking for does not exist.' },
    // Entity templates. Non-English locales provide per-slug overrides in
    // `countries`, `services`, `posts`, `guides` instead of templates.
    templates: {
      country: (c) => ({
        title: `Hire Workers for ${c.name} — ${NAME}`,
        description: `Deploy skilled Bangladeshi workers to ${c.name}. BMET-compliant recruitment covering ${(c.topSectors || []).slice(0, 3).join(', ')}. Fast mobilisation, full documentation support.`,
      }),
      service: (s) => ({
        title: `${s.name} Workers from Bangladesh — ${NAME}`,
        description: `Hire skilled Bangladeshi ${s.name.toLowerCase()} workers. ${s.shortDesc} BMET-compliant, fast deployment to ${(s.countries || []).slice(0, 3).join(', ')} and more.`,
      }),
      post: (p) => ({ title: `${p.title} — ${NAME}`, description: p.excerpt }),
      guide: (g) => ({
        title: `Employer's Guide: Recruiting from Bangladesh to ${g.country} — ${NAME}`,
        description: `Complete employer guide for hiring Bangladeshi workers for ${g.country}. Covers recruitment process, visa requirements, documentation, and employer obligations. BMET-compliant.`,
      }),
    },
    // Country names for areaServed in Organization JSON-LD. Keep in the same
    // order as the existing index.html block.
    areaServed: [
      'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Jordan',
      'Malaysia', 'Singapore', 'Maldives', 'Italy', 'Portugal', 'Greece', 'Romania', 'Poland',
      'Hungary', 'Croatia', 'Czech Republic', 'Lithuania', 'Latvia', 'Estonia', 'Bulgaria',
      'Bosnia and Herzegovina', 'Cyprus', 'Serbia', 'Slovakia', 'Slovenia', 'Armenia', 'Georgia',
      'Montenegro', 'North Macedonia',
    ],
  },
};
