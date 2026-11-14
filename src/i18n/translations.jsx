// UI strings.
//
// - Arabic and Polish live in ./locales/ar.ui.js and ./locales/pl.ui.js (real languages with their own URLs).
//   Polish is registered here; Arabic is registered by ./ar-bundle.js (loaded on demand).
// - English for keys added in Phase 1b lives in ./locales/en.ui.js.
// - This file keeps English + Bengali + Italian for the original keys. Bengali and Italian are an in-place
//   overlay only (no URL, no hreflang): they swap these strings on the English URL after hydration.
//
// Resolution order for t(key, lang): language table -> English -> the key itself.
// Any real-language lookup that falls back to English is recorded and reported by the page generator.

import plUi from './locales/pl.ui.js';
import { REAL_UI, registerUi } from './uiTables.js';
import enUi from './locales/en.ui.js';
import { LOCALES, OVERLAY_LOCALE_CODES } from './config.js';
import { recordFallback } from '../content/fallbacks.js';

// Languages offered in the switcher's overlay group (everything marked overlay: true in config).
export const OVERLAY_LANGUAGES = OVERLAY_LOCALE_CODES.map((code) => ({
  code, label: LOCALES[code].label, dir: LOCALES[code].dir,
}));

registerUi('pl', plUi);

export const T = {
  nav_services: { en: "Services", bn: "সেবা", it: "Servizi" },
  nav_countries: { en: "Countries", bn: "গন্তব্য দেশ", it: "Paesi" },
  nav_capabilities: { en: "Capabilities", bn: "আমাদের সক্ষমতা", it: "Competenze" },
  nav_about: { en: "About Us", bn: "আমাদের পরিচয়", it: "Chi siamo" },
  nav_why_us: { en: "Why Us", bn: "কেন আমরা?", it: "Perché noi" },
  nav_faq: { en: "FAQ", bn: "সাধারণ জিজ্ঞাসা", it: "FAQ" },
  nav_blog: { en: "Blog", bn: "ব্লগ", it: "Blog" },
  nav_get_started: { en: "Get Started", bn: "যোগাযোগ করুন", it: "Inizia ora" },
  nav_apply: { en: "Apply for Work", bn: "কাজের আবেদন করুন", it: "Candidati" },
  home_eyebrow: { en: "Bangladesh's Ethical Manpower Partner", bn: "বাংলাদেশের বিশ্বস্ত জনশক্তি সরবরাহকারী প্রতিষ্ঠান", it: "Il vostro partner affidabile per la manodopera dal Bangladesh" },
  home_title1: { en: "Verified Workers.", bn: "যাচাইকৃত কর্মী।", it: "Lavoratori verificati." },
  home_title2: { en: "Ethical Recruitment.", bn: "নৈতিক নিয়োগ।", it: "Reclutamento etico." },
  home_desc: { en: "Bhuiyan Workforce connects pre-screened Bangladeshi workers with employers across 25+ countries. Every placement is fully documented, transparently contracted, and compliant with destination-country requirements.", bn: "ভূঁইয়া ওয়ার্কফোর্স বাংলাদেশের যাচাইকৃত কর্মীদের ২৫টিরও বেশি দেশের নিয়োগকর্তাদের কাছে পৌঁছে দেয়। প্রতিটি নিয়োগ সম্পূর্ণ নথিভুক্ত, স্বচ্ছ চুক্তিবদ্ধ এবং গন্তব্য দেশের বিধিমালা অনুযায়ী।", it: "Bhuiyan Workforce collega lavoratori bangladesi pre-selezionati con datori di lavoro in oltre 25 paesi. Ogni collocamento è completamente documentato, contrattualizzato in modo trasparente e conforme ai requisiti del paese di destinazione." },
  home_find_workers: { en: "Find Workers Now →", bn: "এখনই কর্মী খুঁজুন →", it: "Trova lavoratori ora →" },
  home_our_services: { en: "Our Services", bn: "আমাদের সেবাসমূহ", it: "I nostri servizi" },
  home_stats_countries: { en: "Deployment Countries", bn: "দেশে কর্মী প্রেরণ", it: "Paesi di destinazione" },
  home_stats_sectors: { en: "Trade Categories", bn: "পেশাদার বিভাগ", it: "Categorie lavorative" },
  home_stats_response: { en: "Response Time", bn: "সাড়া দেওয়ার সময়", it: "Tempo di risposta" },
  home_services_tag: { en: "What We Offer", bn: "আমরা যা দিই", it: "Cosa offriamo" },
  home_services_title: { en: "Our Service Categories", bn: "আমাদের সেবার বিভাগ", it: "Le nostre categorie di servizi" },
  home_services_sub: { en: "We supply skilled and semi-skilled workers across 25 trade categories, each with sector-specific pre-departure training and full documentation.", bn: "আমরা ২৫টি পেশাদার বিভাগে দক্ষ ও আধা-দক্ষ কর্মী সরবরাহ করি। প্রতিটি কর্মীকে বিদেশ যাওয়ার আগে নির্দিষ্ট প্রশিক্ষণ ও কাগজপত্র প্রস্তুত করা হয়।", it: "Forniamo lavoratori qualificati e semiqualificati in 25 categorie lavorative, con formazione pre-partenza e documentazione completa." },
  home_countries_tag: { en: "Global Reach", bn: "বিশ্বজুড়ে আমাদের উপস্থিতি", it: "La nostra presenza globale" },
  home_countries_title: { en: "Countries We Deploy To", bn: "যেসব দেশে আমরা কর্মী পাঠাই", it: "Paesi in cui operiamo" },
  home_countries_sub: { en: "Active deployment corridors across 25+ countries — Gulf, Southeast Asia, and Europe — with full immigration and documentation compliance at each destination.", bn: "মধ্যপ্রাচ্য, দক্ষিণ-পূর্ব এশিয়া এবং ইউরোপ মিলিয়ে ২৫টিরও বেশি দেশে সক্রিয় নিয়োগ করিডোর — প্রতিটি গন্তব্যে অভিবাসন ও নথিপত্রের সম্পূর্ণ সম্মতি সহ।", it: "Corridoi di collocamento attivi in oltre 25 paesi — Golfo Persico, Asia sud-orientale ed Europa — con piena conformità alle normative di immigrazione e documentazione di ogni destinazione." },
  home_view_countries: { en: "View All Countries with Full Details →", bn: "সব দেশের বিস্তারিত তথ্য দেখুন →", it: "Vedi tutti i paesi con i dettagli completi →" },
  home_process_tag: { en: "Our Approach", bn: "আমাদের কাজের ধরন", it: "Il nostro metodo" },
  home_process_title: { en: "How We Work", bn: "আমরা কীভাবে কাজ করি", it: "Come lavoriamo" },
  home_process_sub: { en: "A clear, transparent process from your first enquiry to workers arriving on site.", bn: "আপনার প্রথম যোগাযোগ থেকে শুরু করে কর্মী নিয়োগ সম্পন্ন হওয়া পর্যন্ত প্রতিটি ধাপ স্পষ্ট ও স্বচ্ছ।", it: "Un percorso chiaro e trasparente: dalla prima richiesta all'arrivo dei lavoratori in cantiere." },
  founding_tag: { en: "Founding Employer Program", bn: "প্রতিষ্ঠাতা নিয়োগকর্তা প্রোগ্রাম", it: "Programma Datori di Lavoro Fondatori" },
  founding_title: { en: "Join Our 10 Founding Employer Partners", bn: "আমাদের ১০ প্রতিষ্ঠাতা নিয়োগকর্তা অংশীদারের একজন হন", it: "Unisciti ai nostri 10 Datori di Lavoro Partner Fondatori" },
  founding_desc: { en: "We are accepting a select group of 10 founding employer partners as we launch. Founding partners receive priority mobilisation and a guaranteed first shortlist within 7 working days — at no obligation.", bn: "আমরা ১০টি প্রতিষ্ঠাতা নিয়োগকর্তা অংশীদার গ্রহণ করছি। প্রতিষ্ঠাতা অংশীদাররা অগ্রাধিকারভিত্তিক নিয়োগ এবং ৭ কার্যদিবসের মধ্যে প্রথম শর্টলিস্ট পাবেন — কোনো বাধ্যবাধকতা ছাড়াই।", it: "Accettiamo un gruppo selezionato di 10 datori di lavoro partner fondatori in fase di avvio. I partner fondatori ricevono mobilizzazione prioritaria e una prima lista di candidati garantita entro 7 giorni lavorativi — senza alcun obbligo." },
  founding_cta: { en: "Reserve a Founding Slot →", bn: "একটি প্রতিষ্ঠাতা স্লট সংরক্ষণ করুন →", it: "Riserva un posto fondatore →" },
  founding_slots: { en: "of 10 founding slots remaining", bn: "১০টির মধ্যে বাকি আছে", it: "dei 10 posti fondatori rimasti" },
  about_hero_h1: { en: "About Bhuiyan Workforce Ltd.", bn: "ভূঁইয়া ওয়ার্কফোর্স লিমিটেড পরিচিতি", it: "Chi siamo — Bhuiyan Workforce Ltd." },
  about_hero_sub: { en: "A Bangladeshi manpower export company built on ethical recruitment, full regulatory transparency, and long-term employer relationships.", bn: "আমরা একটি বাংলাদেশি জনশক্তি রপ্তানিকারক প্রতিষ্ঠান, যা নৈতিক নিয়োগ প্রক্রিয়া, সম্পূর্ণ আইনি স্বচ্ছতা এবং নিয়োগকর্তাদের সাথে দীর্ঘমেয়াদি সম্পর্কের ভিত্তিতে গড়ে উঠেছে।", it: "Un'agenzia bangladese di esportazione di manodopera fondata su reclutamento etico, piena trasparenza normativa e rapporti duraturi con i datori di lavoro." },
  about_story_tag: { en: "Our Story", bn: "আমাদের যাত্রা", it: "La nostra storia" },
  about_story_h2: { en: "Connecting Talent With Opportunity", bn: "দক্ষতা ও সুযোগের সেতুবন্ধন", it: "Uniamo talento e opportunità" },
  about_values_tag: { en: "What Drives Us", bn: "আমাদের অনুপ্রেরণা", it: "I nostri valori guida" },
  about_values_h2: { en: "Our Core Values", bn: "আমাদের মূল নীতিমালা", it: "I nostri valori fondamentali" },
  about_team_tag: { en: "Our People", bn: "আমাদের দল", it: "Il nostro team" },
  about_team_h2: { en: "The Team Behind the Placements", bn: "যাঁরা কর্মী নিয়োগের পেছনে আছেন", it: "Il team che gestisce i collocamenti" },
  faq_hero_h1: { en: "Frequently Asked Questions", bn: "প্রায়ই জিজ্ঞেস করা প্রশ্নগুলো", it: "Domande frequenti" },
  faq_hero_sub: { en: "Answers to common questions from employers and workers about our manpower recruitment process, fees, and compliance.", bn: "নিয়োগকর্তা ও কর্মীদের কাছ থেকে আসা সাধারণ প্রশ্নের উত্তর — নিয়োগ প্রক্রিয়া, খরচ এবং আইনি বিষয়াদি সম্পর্কে।", it: "Risposte alle domande più comuni di datori di lavoro e lavoratori sul nostro processo di reclutamento, tariffe e conformità." },
  apply_hero_h1: { en: "Apply for International Employment", bn: "বিদেশে কাজের সুযোগের জন্য আবেদন করুন", it: "Candidati per un impiego internazionale" },
  apply_hero_sub: { en: "Complete the form below to register your interest in overseas employment.", bn: "বিদেশে চাকরির আগ্রহ জানাতে নিচের ফর্মটি পূরণ করুন। আমরা যোগাযোগ করব।", it: "Compila il modulo sottostante per manifestare il tuo interesse a lavorare all'estero." },
  apply_step1: { en: "Personal Details", bn: "ব্যক্তিগত তথ্য", it: "Dati personali" },
  apply_step2: { en: "Professional Info", bn: "পেশাগত তথ্য", it: "Informazioni professionali" },
  apply_step3: { en: "Documents & Submit", bn: "কাগজপত্র ও জমা দিন", it: "Documenti e invio" },
  apply_submit: { en: "Submit Application →", bn: "আবেদন জমা দিন →", it: "Invia la candidatura →" },
  apply_submitting: { en: "Submitting…", bn: "পাঠানো হচ্ছে…", it: "Invio in corso…" },
  apply_success_h1: { en: "Application Submitted!", bn: "আবেদন সফলভাবে জমা হয়েছে!", it: "Candidatura inviata con successo!" },
  apply_back_home: { en: "Back to Home →", bn: "প্রথম পাতায় ফিরুন →", it: "Torna alla home →" },
  countries_hero_h1: { en: "Countries We Deploy To", bn: "যেসব দেশে আমরা কর্মী পাঠাই", it: "Paesi in cui operiamo" },
  countries_hero_sub: { en: "Bhuiyan Workforce places skilled Bangladeshi workers across 25+ countries spanning the Gulf, Southeast Asia, and Europe. Click any country for full details.", bn: "ভূঁইয়া ওয়ার্কফোর্স মধ্যপ্রাচ্য, দক্ষিণ-পূর্ব এশিয়া ও ইউরোপ মিলিয়ে ২৫টিরও বেশি দেশে দক্ষ বাংলাদেশি কর্মী পাঠায়। যেকোনো দেশে ক্লিক করলে বিস্তারিত জানতে পারবেন।", it: "Bhuiyan Workforce colloca lavoratori bangladesi qualificati in oltre 25 paesi tra Golfo Persico, Asia sud-orientale ed Europa. Clicca su un paese per tutti i dettagli." },
  common_home: { en: "Home", bn: "হোম", it: "Home" },
  common_back: { en: "← Back", bn: "← পেছনে যান", it: "← Indietro" },
  common_next: { en: "Next →", bn: "পরবর্তী →", it: "Avanti →" },
  common_view_det: { en: "View details →", bn: "বিস্তারিত দেখুন →", it: "Scopri di più →" },
  common_contact: { en: "Contact Us", bn: "যোগাযোগ করুন", it: "Contattaci" },
};

function fill(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, name) => (vars[name] === undefined ? `{${name}}` : String(vars[name])));
}

export function t(key, lang = 'en', vars) {
  let value;
  if (REAL_UI[lang]) {
    value = REAL_UI[lang][key];
    if (value === undefined) {
      recordFallback('ui', lang, key);
      value = enUi[key] ?? T[key]?.en;
    }
  } else if (OVERLAY_LOCALE_CODES.includes(lang)) {
    value = T[key]?.[lang] ?? enUi[key] ?? T[key]?.en;
  } else {
    value = enUi[key] ?? T[key]?.en;
  }
  return value === undefined ? key : fill(value, vars);
}
