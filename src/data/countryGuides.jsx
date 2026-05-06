// Country-specific employer guides
// Accessed at /employer-guide/:slug

// Shared section titles used across multiple guides
const SECTION_TITLES = {
  whyRecruit: (country) => `Why Recruit from Bangladesh for ${country}?`,
  sectors: 'In-Demand Sectors & Roles',
  process: 'The Recruitment Process',
  visa: 'Visa & Documentation Requirements',
  obligations: 'Employer Obligations',
  timeline: 'Typical Timeline',
};

// Shared employer obligations text for Gulf countries
const GULF_EMPLOYER_OBLIGATIONS = `Under Gulf labour law and BMET export regulations, employers must provide: a verified employment contract in Bengali before departure, return air ticket, accommodation, medical insurance, and timely salary payment via the Wage Protection System (WPS).`;

// Shared BMET process steps for Gulf countries
const GULF_PROCESS_STEPS = `1. Submit your demand letter and job descriptions to Bhuiyan Workforce.\n2. We source, screen, and trade-test candidates against your requirements.\n3. Selected candidates undergo GAMCA medical clearance at government-approved centres.\n4. We manage all attestation, BMET clearance, and visa application paperwork.\n5. Workers are briefed, oriented, and mobilised to your schedule.`;

// Shared Bangladesh worker strengths paragraph
const BD_WORKER_STRENGTHS = `Bangladeshi workers are known for reliability, discipline, and competitive cost-to-quality ratios.`;

export const COUNTRY_GUIDES = {
  'saudi-arabia': {
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    intro: `Saudi Arabia is the single largest employer of Bangladeshi workers globally and a cornerstone market for any manpower agency. This guide covers everything an employer needs to know to recruit Bangladeshi workers for projects in the Kingdom.`,
    sections: [
      {
        title: SECTION_TITLES.whyRecruit('Saudi Arabia'),
        content: `Bangladesh is an approved sending country for Saudi Arabia with decades of established migration history. Over 2 million Bangladeshis already work in the Kingdom, meaning strong community networks, cultural familiarity with Gulf norms, and workers who understand the working environment. ${BD_WORKER_STRENGTHS}`,
      },
      {
        title: SECTION_TITLES.sectors,
        content: `Saudi Vision 2030 is driving enormous construction demand — NEOM, the Red Sea Project, Diriyah, and countless infrastructure upgrades require tens of thousands of workers. Key roles: masons, carpenters, steel fixers, scaffolders, painters, electricians, plumbers, HVAC technicians, welders, drivers, cleaners, and hospitality staff.`,
      },
      {
        title: 'The Recruitment Process (Employer Side)',
        content: GULF_PROCESS_STEPS,
      },
      {
        title: SECTION_TITLES.visa,
        content: `Saudi employment visas are processed through the Ministry of Human Resources and Social Development. Your company must have an active HRSD account. Required documents from your side: demand letter on company letterhead, commercial registration, power of attorney (if using an agency), and visa quota approval. Processing typically takes 4–8 weeks from submission.`,
      },
      {
        title: SECTION_TITLES.obligations,
        content: `${GULF_EMPLOYER_OBLIGATIONS} Failure to comply with WPS can result in visa blacklisting.`,
      },
      {
        title: SECTION_TITLES.timeline,
        content: `Week 1–2: Requirement intake and candidate sourcing.\nWeek 2–4: Screening, trade testing, and shortlisting.\nWeek 4–6: Medical clearance (GAMCA).\nWeek 5–8: Documentation, attestation, and visa stamping.\nWeek 8–10: BMET clearance and departure.\n\nTotal: approximately 8–12 weeks from first contact to workers on site.`,
      },
    ],
  },
  'uae': {
    country: 'UAE',
    flag: '🇦🇪',
    intro: `The UAE is the most worker-friendly Gulf destination and a top choice for Bangladeshi workers. This guide covers what UAE employers need to know about recruiting from Bangladesh.`,
    sections: [
      {
        title: SECTION_TITLES.whyRecruit('the UAE'),
        content: `The UAE hosts one of the largest Bangladeshi communities in the world. Workers are experienced with UAE work culture, and the UAE's Wage Protection System (WPS) and 2022 labour reforms make it an attractive destination that workers actively seek. This means lower attrition and higher retention rates for employers.`,
      },
      {
        title: SECTION_TITLES.sectors,
        content: `Construction (Dubai and Abu Dhabi mega-projects), hospitality (luxury hotels and resorts), logistics and warehousing, facility management, retail, and domestic work. Specialist roles like MEP technicians, fit-out carpenters, and F&B professionals are particularly sought.`,
      },
      {
        title: SECTION_TITLES.process,
        content: `1. UAE employer submits a work permit application to MOHRE.\n2. Bhuiyan Workforce sources, screens, and tests candidates.\n3. Entry permit issued by UAE immigration.\n4. Workers complete BMET clearance in Bangladesh.\n5. Medical fitness and Emirates ID on arrival.\n6. Residence visa stamped — valid 2 years, renewable.`,
      },
      {
        title: 'Key 2022 Labour Law Changes',
        content: `The UAE's 2022 labour reforms are significant for employers: workers can now change jobs without employer consent after completing their initial contract. This increases competition for good workers but also reduces unlawful absconding. Employers who provide good conditions retain workers easily. Fixed-term contracts (1–3 years) are now standard.`,
      },
      {
        title: SECTION_TITLES.obligations,
        content: `UAE employers must register with MOHRE and use the Wage Protection System. Accommodation and medical insurance are mandatory. The mid-day work ban (12:30–3pm, June–September) applies to all outdoor work. Employment contracts must be provided in the worker's language before departure.`,
      },
      {
        title: SECTION_TITLES.timeline,
        content: `The UAE has one of the fastest processing times in the Gulf. From MOHRE approval to workers on site: typically 6–10 weeks. Emergency mobilisation (for pre-approved categories) can be as fast as 4 weeks.`,
      },
    ],
  },
  'poland': {
    country: 'Poland',
    flag: '🇵🇱',
    intro: `Poland is the most accessible European destination for Bangladeshi workers, with high approval rates, fast processing, and significant labour demand. This guide is for Polish employers recruiting from Bangladesh.`,
    sections: [
      {
        title: SECTION_TITLES.whyRecruit('Poland'),
        content: `Poland has one of the lowest unemployment rates in the EU and severe labour shortages across construction, manufacturing, and agriculture. Bangladeshi workers are known for strong work ethic, physical endurance, and reliability. Processing via VFS Global in Dhaka makes the visa application straightforward.`,
      },
      {
        title: SECTION_TITLES.sectors,
        content: `Construction (civil works, fit-out, MEP), manufacturing and assembly lines, warehouse and logistics, agriculture (seasonal), and food processing. Polish companies supplying to German automotive and construction firms particularly benefit from reliable Bangladeshi workers.`,
      },
      {
        title: SECTION_TITLES.process,
        content: `1. Polish employer applies for a Type A Work Permit at the local Voivodeship Office (3–4 weeks).\n2. With the work permit, Bhuiyan Workforce applies for a national visa via VFS Global in Dhaka.\n3. Workers complete BMET clearance and emigration documentation.\n4. Visa processing: approximately 2–4 weeks.\n5. Employer registers the worker's stay on arrival.`,
      },
      {
        title: 'Visa & Legal Framework',
        content: `Poland uses a Type A Work Permit system — employer-specific, tied to the job described in the permit. Workers cannot change employers without a new permit. Permits are valid for up to 3 years (renewable). Note: Poland has no embassy in Bangladesh — all applications go through VFS Global to the Polish Embassy in New Delhi.`,
      },
      {
        title: SECTION_TITLES.obligations,
        content: `Polish employers must register foreign workers with ZUS (social insurance), provide written employment contracts (Polish law requires this), pay at least minimum wage (PLN 4,300/month in 2024), and provide a safe working environment. Accommodation is typically arranged by the employer and deducted from salary (with worker consent).`,
      },
      {
        title: SECTION_TITLES.timeline,
        content: `Work permit at Voivodeship Office: 3–4 weeks.\nVisa via VFS Global: 2–4 weeks.\nBMET clearance: 1–2 weeks.\nTotal: approximately 8–12 weeks from signed contract to arrival in Poland.`,
      },
    ],
  },
};

export function getCountryGuide(slug) {
  return COUNTRY_GUIDES[slug] || null;
}
