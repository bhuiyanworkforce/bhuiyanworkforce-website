// Body content of the About and FAQ pages, per language (pure JS, no JSX, so the
// SEO code can import it in Node). English is the source; a language missing here
// falls back to English. Only the languages in PAGE_CONTENT have translated pages.
// Personal names, email addresses and phone numbers are never translated.
// NEEDS NATIVE-SPEAKER REVIEW before launch.


const en = {
  about: {
    imgAlt: 'Illustration of deployment corridors from Bangladesh to partner countries',
    story: [
      'Bhuiyan Workforce Ltd. was founded with a straightforward mission: to create transparent, ethical pathways for skilled Bangladeshi workers to access legitimate international employment — while giving overseas employers a reliable, fully compliant recruitment partner.',
      "Bangladesh has one of the world's most capable overseas workforces, with millions of citizens working abroad in construction, manufacturing, logistics, and hospitality. Too often, those workers have been exploited by unregulated brokers. We exist to be different.",
      'Bhuiyan Workforce Ltd. is building verified deployment corridors across 25+ countries across the Gulf, Southeast Asia, and Europe — with every placement designed to be BMET-registered and fully documented.',
    ],
    values: [
      { icon: '⚖️', title: 'Transparent Recruitment', body: 'Workers receive verified, honest job offers in their own language — with clear terms, full documentation, and no hidden fees — before they commit to anything.' },
      { icon: '🏛️', title: 'Regulatory Compliance', body: 'Every placement is registered with BMET. Every worker has passed a GAMCA medical. We maintain complete documentation for every deployment.' },
      { icon: '🔍', title: 'Skills Verification', body: 'Practical trade tests and independent reference checks ensure you receive workers with the skills they claim.' },
      { icon: '🤝', title: 'Long-Term Relationships', body: 'We measure success not by transaction volume but by how many employers return for their next requirement.' },
      { icon: '🌍', title: 'Destination Knowledge', body: 'Understanding local labour law, visa categories, and cultural context at each destination reduces friction and delays.' },
      { icon: '📣', title: 'Transparency', body: 'Employers receive clear timelines, honest candidate availability assessments, and a fully itemised cost breakdown before committing to anything.' },
    ],
    teamIntro: 'Our team combines recruitment expertise, immigration knowledge, and deep sector understanding across all six service categories.',
    team: [
      { photo: '/team-rezaul.webp', name: 'MD Rezaul Kabir Bhuiyan', role: 'Founder & CEO', body: 'Computer Science graduate (Jiangnan University, China) with expertise in international business development and technology. Leads all strategic partnerships and business development across Gulf, European, and Asian markets.' },
      { photo: '/team-asraful.webp', name: 'Asraful Kabir Bhuiyan', role: 'Business Development Manager', body: 'Drives employer relationships and new market expansion across Gulf, European, and Asian markets.' },
      { photo: '/team-kishor.webp', name: 'Kishor Kumar', role: 'Compliance & Documentation Manager', body: 'Ensures every deployment meets BMET, GAMCA, and destination-country legal requirements. Expert in overseas employment documentation.' },
      { photo: null, initials: 'AB', name: 'Akhi Begum', role: 'Head of Operations', body: 'Oversees day-to-day recruitment operations, candidate processing, and ensures every deployment meets compliance standards.' },
    ],
    partnersTag: 'Regional Partners',
    partnersTitle: 'Our Regional Partner Network',
    partnersSub: 'Bhuiyan Workforce Ltd. works with a network of licensed recruitment and employment agencies across the Gulf and Europe. Our partners hold valid government-issued licenses in their respective countries and operate verified employer relationships across multiple industries.',
    partners: [
      { flag: '🇵🇱', region: 'EU Licensed Partner', country: 'Poland', body: 'Government-registered employment agency. Authorized to place workers across Poland and the broader European Union.' },
      { flag: '🇦🇪', region: 'Gulf Licensed Partner', country: 'UAE', body: 'Licensed recruitment agency operating from Dubai with active employer networks across the GCC region.' },
      { flag: '🇷🇴', region: 'EU Licensed Partner', country: 'Romania', body: 'Authorized employment agency with verified employer relationships in Romania and wider Eastern Europe.' },
    ],
    ctaTitle: 'Work With Us',
    ctaDesc: "We're always happy to discuss your manpower requirements — no obligation.",
    ctaBtn: 'Get In Touch →',
  },
  faq: {
    ui: {
      searchPlaceholder: 'Search questions… e.g. Saudi visa, fees, documents',
      noResultsBefore: 'No results found for "',
      noResultsAfter: '" — try different keywords.',
      stillTitle: 'Still Have Questions?',
      stillDesc: 'Employers: contact us via email or WhatsApp. Workers: use the dedicated contacts below.',
      forEmployers: 'For Employers',
      forWorkers: 'For Workers',
    },
    categories: [
      {
        category: 'For Employers',
        items: [
          { q: 'How quickly can you supply workers?', a: 'For most trade categories, we can present a verified shortlist within 7 working days. After employer selection, the full documentation and visa process typically takes 4–8 weeks depending on the destination country. For countries with streamlined visa procedures (e.g. Malaysia, UAE), timelines are often faster.' },
          { q: 'What is your minimum order size?', a: "We handle both small deployments (5–10 workers) and large-scale mobilisations (200+ workers). There is no minimum order. However, for very small placements, we may combine your requirement with another employer's deployment to manage costs efficiently — we will always be transparent about this." },
          { q: 'Do you handle all the documentation?', a: 'Yes. We manage BMET registration, Bureau of Manpower clearance, GAMCA medical examinations for Gulf destinations, police clearance certificates, passport validity checks, and the visa application process. You provide a valid demand letter and employment contract; we handle the rest.' },
          { q: 'What if a worker underperforms or leaves early?', a: 'We offer a replacement guarantee for workers who leave within the first 90 days for reasons attributable to misrepresentation on their CV or skills test. We will work with you to replace the worker as quickly as possible at no additional placement fee.' },
          { q: 'What countries do you serve?', a: 'We currently deploy to 25+ countries: Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, Jordan, Malaysia, Singapore, Maldives, Serbia, Portugal, Greece, Romania, Poland, Hungary, Croatia, Czech Republic, Lithuania, Latvia, Estonia, Bulgaria, Cyprus, Slovakia, Bosnia and Herzegovina, Armenia, Montenegro, Georgia, Slovenia, North Macedonia, and Italy. If your destination is not on this list, please contact us — we may still be able to help.' },
          { q: 'What are your fees?', a: 'Our fees vary based on worker category, numbers, and destination country. We provide a fully itemised cost breakdown before you commit to anything. We operate on a success-fee model — you pay only after workers are confirmed for deployment.' },
        ],
      },
      {
        category: 'For Workers',
        items: [
          { q: 'Do workers pay a recruitment fee?', a: 'Fees vary depending on the service package and destination country. Please contact us directly to discuss your situation and get a clear breakdown of applicable costs.' },
          { q: 'How do I register my interest as a worker?', a: 'Contact us via WhatsApp (+880 1978 356710) or email (careers@bhuiyanworkforce.com) with your trade category, years of experience, and a copy of any relevant trade certificates. We will add you to our candidate database and contact you when a matching opportunity arises.' },
          { q: 'What documents will I need?', a: 'A valid Bangladesh passport (minimum 12 months remaining), National ID card, trade certificates (if applicable), previous employment reference letters, and a BMET Smart Card (we can help you obtain this). For Gulf destinations, you will also need to pass a GAMCA medical examination.' },
          { q: 'Will I receive a contract before I travel?', a: 'Yes. You will receive a verified employment contract in Bengali before you agree to travel. It will clearly state your job title, salary, working hours, accommodation arrangements, and contract duration. Never travel on the basis of a verbal promise alone.' },
        ],
      },
      {
        category: 'Compliance & Credentials',
        items: [
          { q: 'What is GAMCA and why is it required?', a: "GAMCA (Gulf Approved Medical Centre Association) medical testing is a mandatory health clearance required by all GCC countries before a worker's visa can be processed. It screens for communicable diseases and general fitness for work. We coordinate GAMCA appointments for all workers going to Gulf destinations." },
        ],
      },
    ],
  },
};


export const PAGE_CONTENT = { en };

/** Called by src/i18n/ar-bundle.js once the Arabic content has been loaded. */
export function registerPageContent(lang, content) {
  PAGE_CONTENT[lang] = content;
}

/** Content of a page ('about' | 'faq') for the URL language; English when the language has none. */
export function pageContent(id, lang) {
  return (PAGE_CONTENT[lang] || en)[id] || en[id];
}

/** Plain text for JSON-LD: removes the bidi isolate marks used in RTL strings. */
export function plain(text) {
  return String(text).replace(/[\u2066-\u2069]/g, '');
}
