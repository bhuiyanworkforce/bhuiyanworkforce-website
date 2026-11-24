import { COUNTRIES_BN, SERVICES_BN } from './workerTopics.js';

// Head data (title, description, keywords) for the Bengali country and service pages.
// Written as informational/trust queries: no visa-guarantee, cost, date or licence claims,
// and none of the fraud-related words (the brand must not surface for those searches).
const SITE = 'Bhuiyan Workforce Ltd.';

export function bnCountryHeads() {
  const out = {};
  for (const [slug, c] of Object.entries(COUNTRIES_BN)) {
    out[slug] = {
      name: c.name,
      title: `${c.loc} কাজ: কোন কোন পেশায় কর্মী নেওয়া হয় ও কী জানা দরকার | ${SITE}`,
      description: `${c.loc} কাজের তথ্য: ${c.sectors.slice(0, 3).join(', ')} খাত। ওয়ার্ক পারমিট, বিএমইটি, মেডিকেল ও ভিসার ধাপ এবং আবেদনের নিয়ম বাংলায়।`,
      keywords: [
        `${c.name} কাজ`, `${c.name} ওয়ার্ক ভিসা`, `${c.name} ওয়ার্ক পারমিট`, `${c.name} জব`,
        `বাংলাদেশ থেকে ${c.name} যাওয়ার নিয়ম`, `${c.name} রিক্রুটিং এজেন্সি`, `${c.name} শ্রমিক নিয়োগ`,
      ].join(', '),
    };
  }
  return out;
}

export function bnServiceHeads() {
  const out = {};
  for (const [slug, s] of Object.entries(SERVICES_BN)) {
    const countries = s.countries.slice(0, 3).map((x) => COUNTRIES_BN[x].name).join(', ');
    out[slug] = {
      name: s.name,
      shortDesc: s.intro,
      title: `${s.name}: বিদেশে কাজের পেশা, দেশ ও আবেদনের নিয়ম | ${SITE}`,
      description: `${s.name} বিদেশে কোন কোন পদে কর্মী লাগে (${s.roles.slice(0, 3).join(', ')}), কোন দেশে নিয়োগকর্তাদের সঙ্গে যোগাযোগ আছে (${countries} ইত্যাদি) এবং কীভাবে আবেদন করবেন।`,
      keywords: [...s.kw, `${s.name} বিদেশে`, `${s.name} ওয়ার্ক ভিসা`, 'বিদেশে কাজের আবেদন'].join(', '),
    };
  }
  return out;
}
