// Shared document lists
export const DOCS = {
  PASSPORT: 'Valid passport (min. 6 months remaining)',
  BMET: 'BMET Smart Card',
  GAMCA: 'GAMCA medical certificate',
  POLICE_GULF: 'Police clearance certificate',
  POLICE_EU: 'Police clearance (apostilled)',
  CONTRACT: 'Employment contract',
  CONTRACT_ATTESTED: 'Employment contract (attested)',
  PHOTOS: 'Passport photos',
  MEDICAL: 'Medical certificate',
  ACCOMMODATION: 'Proof of accommodation',
};

// Shared process steps
export const STEPS = {
  BMET: { title: 'BMET Clearance', desc: 'Worker obtains BMET Smart Card and emigration clearance in Bangladesh.' },
  BMET_BD: { title: 'BMET Clearance (Bangladesh)', desc: 'Workers register with BMET in Dhaka and obtain Smart Card emigration clearance.' },
  GAMCA: { title: 'GAMCA Medical', desc: 'Mandatory medical fitness test at a GAMCA-approved centre in Bangladesh.' },
};

// Document presets
export const GULF_DOCS = [DOCS.PASSPORT, DOCS.BMET, DOCS.GAMCA, DOCS.POLICE_GULF, DOCS.CONTRACT_ATTESTED, DOCS.PHOTOS];
export const EU_DOCS = [DOCS.PASSPORT, DOCS.BMET, DOCS.POLICE_EU, DOCS.MEDICAL, DOCS.CONTRACT, DOCS.ACCOMMODATION];
