import React, { useState } from 'react';
import { Link } from '../i18n/router';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import Tx from '../i18n/Tx';
import { tx } from '../i18n/extra.js';
import { StaticPageLocalizer } from '../i18n/staticPageText.js';


// ── Bangla support ──────────────────────────────────────────────────────────────
// English visitors (most applicants are from Bangladesh) see every label with its Bangla meaning.
// Submitted values stay English so the recruitment team reads one consistent format.
// NEEDS NATIVE-SPEAKER REVIEW.
const BN_FONT = "'Noto Sans Bengali','Nirmala UI','Kalpurush','Siyam Rupali','Shonar Bangla',system-ui,sans-serif";
const BN = {
  'For Workers': 'শ্রমিকদের জন্য',
  'Full Name (as in passport) *': 'পুরো নাম (পাসপোর্ট অনুযায়ী) *',
  'Date of Birth *': 'জন্ম তারিখ *',
  'Nationality': 'জাতীয়তা',
  'Phone / WhatsApp *': 'ফোন / হোয়াটসঅ্যাপ নম্বর *',
  'Email Address': 'ইমেইল ঠিকানা',
  'Home Address (District/Division) *': 'বাড়ির ঠিকানা (জেলা/বিভাগ) *',
  'Trade Category *': 'পেশার ধরন *',
  'Specific Role / Trade *': 'নির্দিষ্ট পেশা / কাজ *',
  'Years of Experience *': 'কত বছরের অভিজ্ঞতা *',
  'Preferred Country *': 'পছন্দের দেশ *',
  'Available From': 'কবে থেকে যেতে পারবেন',
  'Education Level': 'শিক্ষাগত যোগ্যতা',
  'Languages Spoken': 'যেসব ভাষা জানেন',
  'Medical Fitness Certificate?': 'মেডিকেল ফিটনেস সনদ আছে কি?',
  'Trade Test Certificate?': 'ট্রেড টেস্ট সনদ আছে কি?',
  'BMET Smart Card?': 'বিএমইটি স্মার্ট কার্ড আছে কি?',
  'Upload CV / Resume (PDF or Word, max 5MB)': 'সিভি আপলোড করুন (PDF বা Word, সর্বোচ্চ ৫ এমবি)',
  'Passport Number': 'পাসপোর্ট নম্বর',
  'Passport Expiry Date': 'পাসপোর্টের মেয়াদ শেষের তারিখ',
  'Upload Passport Copy (PDF or image, max 5MB)': 'পাসপোর্টের কপি আপলোড করুন (PDF বা ছবি, সর্বোচ্চ ৫ এমবি)',
  'Upload Trade/Skills Certificate (optional)': 'পেশাগত/দক্ষতার সনদ আপলোড করুন (ঐচ্ছিক)',
  'Additional Information / Cover Letter': 'অতিরিক্ত তথ্য / আবেদনপত্র',
  'Select category…': 'পেশার ধরন বাছাই করুন…',
  'Select…': 'বাছাই করুন…',
  'Select country…': 'দেশ বাছাই করুন…',
  'Less than 1 year': '১ বছরের কম', '1–2 years': '১–২ বছর', '3–5 years': '৩–৫ বছর', '6–10 years': '৬–১০ বছর', '10+ years': '১০+ বছর',
  'No formal education': 'প্রাতিষ্ঠানিক শিক্ষা নেই', 'Primary (Class 1–5)': 'প্রাথমিক (১ম–৫ম শ্রেণি)',
  'JSC / Class 8': 'জেএসসি / ৮ম শ্রেণি', 'SSC / Class 10': 'এসএসসি / ১০ম শ্রেণি', 'HSC / Class 12': 'এইচএসসি / ১২শ শ্রেণি',
  'Diploma / Vocational': 'ডিপ্লোমা / কারিগরি', "Bachelor's Degree": 'স্নাতক ডিগ্রি', "Master's Degree or above": 'স্নাতকোত্তর বা তার ঊর্ধ্বে',
  'Yes — valid certificate': 'হ্যাঁ — বৈধ সনদ আছে', 'No — not yet obtained': 'না — এখনো করা হয়নি', 'Expired — needs renewal': 'মেয়াদ শেষ — নবায়ন দরকার',
  'Yes — certified': 'হ্যাঁ — সনদ আছে', 'No — not yet tested': 'না — এখনো পরীক্ষা দেননি', 'In progress': 'প্রক্রিয়াধীন',
  'Yes — registered': 'হ্যাঁ — নিবন্ধিত', 'No — not yet registered': 'না — এখনো নিবন্ধন হয়নি',
  'e.g. Brahmanbaria, Chittagong Division': 'যেমন: ব্রাহ্মণবাড়িয়া, চট্টগ্রাম বিভাগ',
  'e.g. Mason, Welder, Chef de Partie': 'যেমন: রাজমিস্ত্রি, ওয়েল্ডার, শেফ',
  'e.g. Bengali, English (basic), Arabic (basic)': 'যেমন: বাংলা, ইংরেজি (প্রাথমিক), আরবি (প্রাথমিক)',
  'Tell us about your experience, previous overseas employment, skills, and why you want to work abroad…': 'আপনার অভিজ্ঞতা, আগে বিদেশে কাজ করে থাকলে তার বিবরণ, দক্ষতা এবং কেন বিদেশে কাজ করতে চান তা লিখুন…',
  'optional': 'ঐচ্ছিক',
  // trade categories
  'Construction & Engineering': 'নির্মাণ ও ইঞ্জিনিয়ারিং', 'Oil & Gas': 'তেল ও গ্যাস', 'Drivers & Transport': 'ড্রাইভার ও পরিবহন',
  'Chefs & Hospitality': 'শেফ ও হসপিটালিটি', 'Security Guards': 'নিরাপত্তা প্রহরী', 'Cleaning & Housekeeping': 'ক্লিনিং ও হাউসকিপিং',
  'Farm & Garden': 'কৃষি ও বাগান', 'Warehouse & Logistics': 'ওয়্যারহাউস ও লজিস্টিকস', 'Factory & Manufacturing': 'কারখানা ও উৎপাদন',
  'Retail & Supermarket Staff': 'রিটেইল ও সুপারশপ কর্মী', 'Painting & Finishing': 'পেইন্টিং ও ফিনিশিং',
  'Steel Fixing & Reinforcement': 'স্টিল ফিক্সিং ও রড বাঁধা', 'Scaffolding & Formwork': 'স্ক্যাফোল্ডিং ও ফর্মওয়ার্ক',
  'Landscaping & Groundskeeping': 'ল্যান্ডস্কেপিং ও গ্রাউন্ডস কিপিং', 'Mason & Bricklaying': 'রাজমিস্ত্রি ও ইট গাঁথা',
  'Electrical Helpers & Cable Pullers': 'ইলেকট্রিক্যাল হেল্পার ও ক্যাবল পুলার', 'Laundry & Linen Services': 'লন্ড্রি ও লিনেন সেবা',
  'Food Processing & Packing': 'খাদ্য প্রক্রিয়াজাতকরণ ও প্যাকিং', 'Fishery & Aquaculture': 'মৎস্য ও অ্যাকুয়াকালচার',
  'Caregiving & Elderly Support': 'কেয়ারগিভিং ও বয়স্ক সেবা', 'Other': 'অন্যান্য',
  // countries
  'Saudi Arabia': 'সৌদি আরব', 'UAE': 'সংযুক্ত আরব আমিরাত', 'Qatar': 'কাতার', 'Kuwait': 'কুয়েত', 'Oman': 'ওমান', 'Bahrain': 'বাহরাইন',
  'Jordan': 'জর্ডান', 'Malaysia': 'মালয়েশিয়া', 'Singapore': 'সিঙ্গাপুর', 'Maldives': 'মালদ্বীপ', 'Poland': 'পোল্যান্ড',
  'Romania': 'রোমানিয়া', 'Serbia': 'সার্বিয়া', 'Portugal': 'পর্তুগাল', 'Greece': 'গ্রিস', 'Hungary': 'হাঙ্গেরি', 'Croatia': 'ক্রোয়েশিয়া',
  'Czech Republic': 'চেক প্রজাতন্ত্র', 'Lithuania': 'লিথুয়ানিয়া', 'Latvia': 'লাতভিয়া', 'Estonia': 'এস্তোনিয়া', 'Bulgaria': 'বুলগেরিয়া',
  'Cyprus': 'সাইপ্রাস', 'Slovakia': 'স্লোভাকিয়া', 'Bosnia and Herzegovina': 'বসনিয়া ও হার্জেগোভিনা', 'Montenegro': 'মন্টিনেগ্রো',
  'Slovenia': 'স্লোভেনিয়া', 'North Macedonia': 'উত্তর মেসিডোনিয়া', 'Italy': 'ইতালি', 'Armenia': 'আর্মেনিয়া', 'Georgia': 'জর্জিয়া',
  'Seychelles': 'সেশেলস', 'Mauritius': 'মরিশাস', 'Open to Any Country': 'যেকোনো দেশ',
};
// Same keys as src/i18n/translations.jsx; the Bangla is shown beside the English.
const BN_T = {
  apply_hero_h1: 'বিদেশে কাজের সুযোগের জন্য আবেদন করুন',
  apply_hero_sub: 'বিদেশে চাকরির আগ্রহ জানাতে নিচের ফর্মটি পূরণ করুন। আমরা যোগাযোগ করব।',
  apply_step1: 'ব্যক্তিগত তথ্য', apply_step2: 'পেশাগত তথ্য', apply_step3: 'কাগজপত্র ও জমা দিন',
  apply_submit: 'আবেদন জমা দিন →', apply_submitting: 'পাঠানো হচ্ছে…',
  apply_success_h1: 'আবেদন সফলভাবে জমা হয়েছে!', apply_back_home: 'প্রথম পাতায় ফিরুন →',
  common_back: '← পেছনে যান',
};

// The English form is deliberately bilingual (English + Bangla side by side). Browser auto-translate
// (Chrome / Google Translate) mangles the Bangla fragments and the English/Bangla pairs, so the page
// is marked translate="no" in English. The other languages are real translations and stay translatable.
const NO_TRANSLATE = (lang) => (lang === 'en' ? 'no' : undefined);

// "English / বাংলা" for option text and placeholders (plain strings).
const bi = (lang, en) => (lang === 'en' && BN[en] ? `${en} / ${BN[en]}` : tx(lang, en));
// Label text: English, with the Bangla meaning on a second line for English visitors.
function Bi({ children, block }) {
  const { lang } = useLang();
  const text = typeof children === 'string' ? children : null;
  if (lang === 'en' && text && BN[text]) {
    return (
      <>
        {text}
        <span lang="bn" style={{ display: block ? 'block' : 'inline', fontFamily: BN_FONT, textTransform: 'none', letterSpacing: 0, fontWeight: 500, fontSize: '0.88rem', marginTop: block ? 2 : 0 }}>
          {block ? '' : ' / '}{BN[text]}
        </span>
      </>
    );
  }
  return <Tx>{children}</Tx>;
}
// A Bangla-only paragraph shown under longer English text for English visitors.
function BnNote({ lang, children, style }) {
  if (lang !== 'en') return null;
  return <p lang="bn" style={{ margin: '8px 0 0', fontFamily: BN_FONT, lineHeight: 1.8, ...style }}>{children}</p>;
}

const EMPTY = {
  fullName: '', dateOfBirth: '', nationality: 'Bangladeshi',
  phone: '', email: '', address: '',
  passportNumber: '', passportExpiry: '',
  tradeCategory: '', specificRole: '', experienceYears: '',
  preferredCountry: '', availableDate: '',
  education: '', languages: '',
  hasMedical: '', hasTradeTest: '', hasBMET: '',
  coverLetter: '',
  cvFile: null, passportFile: null, certFile: null,
};

// File rules. The worker checks the same limits (worker/contact-form-guard.js).
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 12 * 1024 * 1024;
const FILE_EXTENSIONS = {
  cvFile: ['pdf', 'doc', 'docx'],
  passportFile: ['pdf', 'jpg', 'jpeg', 'png'],
  certFile: ['pdf', 'jpg', 'jpeg', 'png'],
};

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const TRADE_CATEGORIES = [
  'Construction & Engineering', 'Oil & Gas', 'Drivers & Transport',
  'Chefs & Hospitality', 'Security Guards',
  'Cleaning & Housekeeping', 'Farm & Garden', 'Warehouse & Logistics',
  'Factory & Manufacturing', 'Retail & Supermarket Staff',
  'Painting & Finishing', 'Steel Fixing & Reinforcement',
  'Scaffolding & Formwork', 'Landscaping & Groundskeeping',
  'Mason & Bricklaying', 'Electrical Helpers & Cable Pullers',
  'Laundry & Linen Services', 'Food Processing & Packing',
  'Fishery & Aquaculture', 'Caregiving & Elderly Support', 'Other',
];

const COUNTRIES = [
  'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Jordan',
  'Malaysia', 'Singapore', 'Maldives',
  'Poland', 'Romania', 'Serbia', 'Portugal', 'Greece', 'Hungary', 'Croatia',
  'Czech Republic', 'Lithuania', 'Latvia', 'Estonia', 'Bulgaria', 'Cyprus',
  'Slovakia', 'Bosnia and Herzegovina', 'Montenegro', 'Slovenia', 'North Macedonia', 'Italy',
  'Armenia', 'Georgia', 'Seychelles', 'Mauritius', 'Open to Any Country',
];

export default function WorkerApplicationPage() {
  const [fields,     setFields]     = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState(false);
  const [step,       setStep]       = useState(1);
  const [consent,    setConsent]    = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [fileError, setFileError] = useState('');
  const { lang }                    = useLang();
  const tk = (key) => (lang === 'en' ? `${t(key, 'en')} / ${BN_T[key]}` : t(key, lang));

  const handleChange = ({ target: { name, value } }) =>
    setFields(p => ({ ...p, [name]: value }));

  const handleFile = (field) => (e) => {
    const file = e.target.files[0];
    setFileError('');
    if (!file) { setFields(p => ({ ...p, [field]: null })); return; }

    const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
    if (!FILE_EXTENSIONS[field].includes(ext)) {
      const types = FILE_EXTENSIONS[field].map((type) => type.toUpperCase()).join(', ');
      setFileError(t('apply.file_type_error', lang, { file: file.name, types }));
      e.target.value = '';
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(t('apply.file_size_error', lang, { file: file.name }));
      e.target.value = '';
      return;
    }
    const others = ['cvFile', 'passportFile', 'certFile']
      .filter(k => k !== field)
      .reduce((sum, k) => sum + (fields[k] ? fields[k].size : 0), 0);
    if (others + file.size > MAX_TOTAL_BYTES) {
      setFileError(t('apply.total_size_error', lang));
      e.target.value = '';
      return;
    }
    setFields(p => ({ ...p, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) { setConsentError(true); return; }
    const consentAt = new Date().toISOString();
    setSubmitting(true);
    setError(false);

    try {
      const messageBody = `
=== WORKER APPLICATION ===

PERSONAL DETAILS
Name: ${fields.fullName}
Date of Birth: ${fields.dateOfBirth}
Nationality: ${fields.nationality}
Phone: ${fields.phone}
Email: ${fields.email || 'Not provided'}
Address: ${fields.address}

PASSPORT
Passport Number: ${fields.passportNumber || 'Not provided'}
Passport Expiry: ${fields.passportExpiry || 'Not provided'}

PROFESSIONAL DETAILS
Trade Category: ${fields.tradeCategory}
Specific Role: ${fields.specificRole}
Years of Experience: ${fields.experienceYears}
Preferred Country: ${fields.preferredCountry}
Available From: ${fields.availableDate}

QUALIFICATIONS
Education Level: ${fields.education}
Languages Spoken: ${fields.languages}
Medical Fitness Certificate: ${fields.hasMedical}
Trade Test Certificate: ${fields.hasTradeTest}
BMET Smart Card: ${fields.hasBMET}

COVER LETTER / ADDITIONAL INFO
${fields.coverLetter || 'Not provided'}

CONSENT
The applicant accepted the Privacy Policy and consented to processing of their data, including uploaded documents, on ${consentAt}.
      `.trim();

      // Build attachments array — all 3 files
      const attachments = [];

      if (fields.cvFile) {
        attachments.push({
          filename: fields.cvFile.name,
          content: await toBase64(fields.cvFile),
          type: fields.cvFile.type || 'application/octet-stream',
        });
      }
      if (fields.passportFile) {
        attachments.push({
          filename: fields.passportFile.name,
          content: await toBase64(fields.passportFile),
          type: fields.passportFile.type || 'application/octet-stream',
        });
      }
      if (fields.certFile) {
        attachments.push({
          filename: fields.certFile.name,
          content: await toBase64(fields.certFile),
          type: fields.certFile.type || 'application/octet-stream',
        });
      }

      const payload = {
        name:    fields.fullName,
        email:   fields.email || 'no-reply@bhuiyanworkforce.com',
        company: `Worker Application — ${fields.tradeCategory}`,
        service: fields.tradeCategory,
        message: messageBody,
        attachments, // array of all uploaded files
        formType: 'worker_application',
        consent: true,
        consentAt,
      };

      const res = await fetch('https://contact-form.bhuiyanrezaul71.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success !== false) setSubmitted(true);
      else setError(true);
    } catch { setError(true); }
    finally { setSubmitting(false); }
  };

  if (submitted) return (
    <StaticPageLocalizer locale={lang} file="src/pages/WorkerApplicationPage.jsx">
    <div translate={NO_TRANSLATE(lang)}>
    <div className="page-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 24 }}>✅</div>
        <h1 style={{ marginBottom: 16 }}>{tk('apply_success_h1')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
          <Tx>Thank you,</Tx> <strong style={{ color: 'var(--gold)' }}>{fields.fullName}</strong><Tx>. We have received your application and will review it within 3–5 working days. If shortlisted, our team will contact you directly.</Tx>
        </p>
        <BnNote lang={lang} style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '-16px auto 32px' }}>ধন্যবাদ, {fields.fullName}। আপনার আবেদন আমরা পেয়েছি এবং ৩–৫ কর্মদিবসের মধ্যে দেখব। বাছাই হলে আমাদের দল সরাসরি যোগাযোগ করবে।</BnNote>
        <Link to="/" className="btn btn-primary">{tk('apply_back_home')}</Link>
      </div>
    </div>
    </div>
    </StaticPageLocalizer>
  );

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: '1px solid var(--gray-100)', background: 'var(--white)',
    color: 'var(--navy)', fontSize: '0.9rem', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit',
  };
  const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--gray-700)', marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: '0.05em',
  };
  const groupStyle = { display: 'flex', flexDirection: 'column', gap: 6 };

  const steps = [tk('apply_step1'), tk('apply_step2'), tk('apply_step3')];

  return (
    <StaticPageLocalizer locale={lang} file="src/pages/WorkerApplicationPage.jsx">
      <div translate={NO_TRANSLATE(lang)}>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">{t('common_home', lang)}</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{t('nav_apply', lang)}</span>
            </div>
            <div className="label-tag" style={{ marginBottom: 16 }}><Bi>For Workers</Bi></div>
            <h1>{tk('apply_hero_h1')}</h1>
            <p>{tk('apply_hero_sub')}</p>
            <BnNote lang={lang} style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 640 }}>প্রতিটি প্রশ্নের সঙ্গে বাংলা অর্থ দেওয়া আছে। নাম ও পাসপোর্টের তথ্য পাসপোর্ট অনুযায়ী ইংরেজিতে লিখুন; অন্য বিবরণ বাংলায় লিখলেও চলবে।</BnNote>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 0 }}>
            {steps.map((label, i) => (
              <button key={label} type="button" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', padding: 0 }}
                onClick={() => setStep(i + 1)}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: (step > i || step === i + 1) ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  color: step >= i + 1 ? 'var(--navy)' : 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.8rem', color: step === i + 1 ? 'var(--white)' : 'rgba(255,255,255,0.4)', fontWeight: step === i + 1 ? 600 : 400 }}>
                  {label}
                </span>
                {i < 2 && <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

              {/* Step 1: Personal */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 32 }}>{tk('apply_step1')}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-fullName" style={labelStyle}><Bi block>Full Name (as in passport) *</Bi></label>
                      <input id="wa-fullName" style={inputStyle} name="fullName" value={fields.fullName} onChange={handleChange} required placeholder={bi(lang, "Mohammad Rafiqul Islam")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-dateOfBirth" style={labelStyle}><Bi block>Date of Birth *</Bi></label>
                      <input id="wa-dateOfBirth" style={inputStyle} type="date" name="dateOfBirth" value={fields.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-nationality" style={labelStyle}><Bi block>Nationality</Bi></label>
                      <input id="wa-nationality" style={inputStyle} name="nationality" value={fields.nationality} onChange={handleChange} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-phone" style={labelStyle}><Bi block>Phone / WhatsApp *</Bi></label>
                      <input id="wa-phone" style={inputStyle} type="tel" name="phone" value={fields.phone} onChange={handleChange} required placeholder={bi(lang, "+880 17XX XXX XXX")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-email" style={labelStyle}><Bi block>Email Address</Bi></label>
                      <input id="wa-email" style={inputStyle} type="email" name="email" value={fields.email} onChange={handleChange} placeholder={bi(lang, "optional")} />
                    </div>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-address" style={labelStyle}><Bi block>Home Address (District/Division) *</Bi></label>
                      <input id="wa-address" style={inputStyle} name="address" value={fields.address} onChange={handleChange} required placeholder={bi(lang, "e.g. Brahmanbaria, Chittagong Division")} />
                    </div>
                  </div>
                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}
                      disabled={!fields.fullName || !fields.dateOfBirth || !fields.phone || !fields.address}>
                      {tk('apply_step2')} →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Professional */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 32 }}>{tk('apply_step2')}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                    <div style={groupStyle}>
                      <label htmlFor="wa-tradeCategory" style={labelStyle}><Bi block>Trade Category *</Bi></label>
                      <select id="wa-tradeCategory" style={inputStyle} name="tradeCategory" value={fields.tradeCategory} onChange={handleChange} required>
                        <option value="">{bi(lang, "Select category…")}</option>
                        {TRADE_CATEGORIES.map(t => <option key={t} value={t}>{bi(lang, t)}</option>)}
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-specificRole" style={labelStyle}><Bi block>Specific Role / Trade *</Bi></label>
                      <input id="wa-specificRole" style={inputStyle} name="specificRole" value={fields.specificRole} onChange={handleChange} required placeholder={bi(lang, "e.g. Mason, Welder, Chef de Partie")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-experienceYears" style={labelStyle}><Bi block>Years of Experience *</Bi></label>
                      <select id="wa-experienceYears" style={inputStyle} name="experienceYears" value={fields.experienceYears} onChange={handleChange} required>
                        <option value="">{bi(lang, "Select…")}</option>
                        <option value="Less than 1 year">{bi(lang, "Less than 1 year")}</option>
                        <option value="1–2 years">{bi(lang, "1–2 years")}</option>
                        <option value="3–5 years">{bi(lang, "3–5 years")}</option>
                        <option value="6–10 years">{bi(lang, "6–10 years")}</option>
                        <option value="10+ years">{bi(lang, "10+ years")}</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-preferredCountry" style={labelStyle}><Bi block>Preferred Country *</Bi></label>
                      <select id="wa-preferredCountry" style={inputStyle} name="preferredCountry" value={fields.preferredCountry} onChange={handleChange} required>
                        <option value="">{bi(lang, "Select country…")}</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{bi(lang, c)}</option>)}
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-availableDate" style={labelStyle}><Bi block>Available From</Bi></label>
                      <input id="wa-availableDate" style={inputStyle} type="date" name="availableDate" value={fields.availableDate} onChange={handleChange} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-education" style={labelStyle}><Bi block>Education Level</Bi></label>
                      <select id="wa-education" style={inputStyle} name="education" value={fields.education} onChange={handleChange}>
                        <option value="">{bi(lang, "Select…")}</option>
                        <option value="No formal education">{bi(lang, "No formal education")}</option>
                        <option value="Primary (Class 1–5)">{bi(lang, "Primary (Class 1–5)")}</option>
                        <option value="JSC / Class 8">{bi(lang, "JSC / Class 8")}</option>
                        <option value="SSC / Class 10">{bi(lang, "SSC / Class 10")}</option>
                        <option value="HSC / Class 12">{bi(lang, "HSC / Class 12")}</option>
                        <option value="Diploma / Vocational">{bi(lang, "Diploma / Vocational")}</option>
                        <option value="Bachelor's Degree">{bi(lang, "Bachelor's Degree")}</option>
                        <option value="Master's Degree or above">{bi(lang, "Master's Degree or above")}</option>
                      </select>
                    </div>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-languages" style={labelStyle}><Bi block>Languages Spoken</Bi></label>
                      <input id="wa-languages" style={inputStyle} name="languages" value={fields.languages} onChange={handleChange} placeholder={bi(lang, "e.g. Bengali, English (basic), Arabic (basic)")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasMedical" style={labelStyle}><Bi block>Medical Fitness Certificate?</Bi></label>
                      <select id="wa-hasMedical" style={inputStyle} name="hasMedical" value={fields.hasMedical} onChange={handleChange}>
                        <option value="">{bi(lang, "Select…")}</option>
                        <option value="Yes — valid certificate">{bi(lang, "Yes — valid certificate")}</option>
                        <option value="No — not yet obtained">{bi(lang, "No — not yet obtained")}</option>
                        <option value="Expired — needs renewal">{bi(lang, "Expired — needs renewal")}</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasTradeTest" style={labelStyle}><Bi block>Trade Test Certificate?</Bi></label>
                      <select id="wa-hasTradeTest" style={inputStyle} name="hasTradeTest" value={fields.hasTradeTest} onChange={handleChange}>
                        <option value="">{bi(lang, "Select…")}</option>
                        <option value="Yes — certified">{bi(lang, "Yes — certified")}</option>
                        <option value="No — not yet tested">{bi(lang, "No — not yet tested")}</option>
                        <option value="In progress">{bi(lang, "In progress")}</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasBMET" style={labelStyle}><Bi block>BMET Smart Card?</Bi></label>
                      <select id="wa-hasBMET" style={inputStyle} name="hasBMET" value={fields.hasBMET} onChange={handleChange}>
                        <option value="">{bi(lang, "Select…")}</option>
                        <option value="Yes — registered">{bi(lang, "Yes — registered")}</option>
                        <option value="No — not yet registered">{bi(lang, "No — not yet registered")}</option>
                        <option value="In progress">{bi(lang, "In progress")}</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>{tk('common_back')}</button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)}
                      disabled={!fields.tradeCategory || !fields.specificRole || !fields.experienceYears || !fields.preferredCountry}>
                      {tk('apply_step3')} →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Documents & Submit */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 32 }}>{tk('apply_step3')}</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={groupStyle}>
                      <label htmlFor="wa-cvFile" style={labelStyle}><Bi block>Upload CV / Resume (PDF or Word, max 5MB)</Bi></label>
                      <input id="wa-cvFile" type="file" accept=".pdf,.doc,.docx" onChange={handleFile('cvFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.cvFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.cvFile.name}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                    <div style={groupStyle}>
                      <label htmlFor="wa-passportNumber" style={labelStyle}><Bi block>Passport Number</Bi></label>
                      <input id="wa-passportNumber" style={inputStyle} name="passportNumber" value={fields.passportNumber} onChange={handleChange} placeholder="A1234567" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-passportExpiry" style={labelStyle}><Bi block>Passport Expiry Date</Bi></label>
                      <input id="wa-passportExpiry" style={inputStyle} type="date" name="passportExpiry" value={fields.passportExpiry} onChange={handleChange} />
                    </div>
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-passportFile" style={labelStyle}><Bi block>Upload Passport Copy (PDF or image, max 5MB)</Bi></label>
                      <input id="wa-passportFile" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif" onChange={handleFile('passportFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.passportFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.passportFile.name}</span>}
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-certFile" style={labelStyle}><Bi block>Upload Trade/Skills Certificate (optional)</Bi></label>
                      <input id="wa-certFile" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif" onChange={handleFile('certFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.certFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.certFile.name}</span>}
                    </div>

                    {fileError && (
                      <div role="alert" style={{ color: '#e53e3e', background: '#fff5f5', padding: '12px 16px', borderRadius: 8, border: '1px solid #fed7d7', fontSize: '0.875rem' }}>
                        {fileError}
                      </div>
                    )}

                    <div style={{ background: 'var(--off-white)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: '0.82rem', color: 'var(--gray-500)', display: 'flex', gap: 10 }}>
                      <span><Tx>📎</Tx></span>
                      <span><Tx>All uploaded files (CV, passport copy, certificate) will be sent as email attachments for our team to review.</Tx><BnNote lang={lang} style={{ margin: '4px 0 0' }}>আপনার আপলোড করা সব ফাইল (সিভি, পাসপোর্টের কপি, সনদ) আমাদের দল দেখার জন্য ইমেইলে পাঠানো হবে।</BnNote></span>
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-coverLetter" style={labelStyle}><Bi block>Additional Information / Cover Letter</Bi></label>
                      <textarea id="wa-coverLetter" style={{ ...inputStyle, resize: 'vertical' }} rows={5}
                        name="coverLetter" value={fields.coverLetter} onChange={handleChange}
                        placeholder={bi(lang, "Tell us about your experience, previous overseas employment, skills, and why you want to work abroad…")} />
                    </div>

                    <div style={{ background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: 20, fontSize: '0.82rem', color: 'var(--gray-500)', lineHeight: 1.65 }}>
                      <strong style={{ color: 'var(--navy)' }}><Tx>Important:</Tx></strong> <Tx>By submitting this application, you confirm that all information provided is accurate. Bhuiyan Workforce Ltd. will contact shortlisted candidates within 3–5 working days. Submission does not guarantee placement. We handle your data in accordance with our</Tx> <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}><Tx>Privacy Policy</Tx></a>.
                      <BnNote lang={lang} style={{ fontSize: '0.82rem' }}><strong>গুরুত্বপূর্ণ:</strong> আবেদন জমা দিয়ে আপনি নিশ্চিত করছেন যে দেওয়া সব তথ্য সঠিক। বাছাই হলে ৩–৫ কর্মদিবসের মধ্যে আমরা যোগাযোগ করব। আবেদন জমা দিলেই চাকরির নিশ্চয়তা হয় না। আপনার তথ্য আমরা গোপনীয়তা নীতি অনুযায়ী সংরক্ষণ করি।</BnNote>
                    </div>

                    <div>
                      <label htmlFor="wa-consent" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--navy)', lineHeight: 1.6, cursor: 'pointer' }}>
                        <input
                          id="wa-consent" type="checkbox" checked={consent} required
                          aria-describedby={consentError ? 'wa-consent-error' : undefined}
                          onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(false); }}
                          style={{ marginTop: 4, width: 20, height: 20, flexShrink: 0 }}
                        />
                        <span>
                          <Tx>I have read</Tx> <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 600 }}><Tx>the Privacy Policy</Tx></a> <Tx>and I consent to Bhuiyan Workforce Ltd. processing my personal data, including my passport copy and the other documents I upload, to assess my application and arrange recruitment. I understand that my profile is shared with an employer only after I have been informed and have agreed.</Tx> <span className="required">*</span>
                          <BnNote lang={lang} style={{ fontSize: '0.85rem' }}>আমি গোপনীয়তা নীতি পড়েছি এবং আবেদন যাচাই ও নিয়োগের জন্য আমার পাসপোর্টের কপিসহ ব্যক্তিগত তথ্য ও আপলোড করা কাগজপত্র প্রক্রিয়া করতে Bhuiyan Workforce Ltd.-কে সম্মতি দিচ্ছি। আমাকে জানিয়ে আমার সম্মতি নেওয়ার পরই আমার প্রোফাইল কোনো নিয়োগকর্তাকে দেখানো হবে।</BnNote>
                        </span>
                      </label>
                      {consentError && (
                        <div id="wa-consent-error" role="alert" style={{ color: '#e53e3e', fontSize: '0.82rem', marginTop: 8 }}>
                          <Tx>Please tick the box above to submit your application.</Tx>{lang === 'en' && <span lang="bn" style={{ fontFamily: BN_FONT }}> / আবেদন জমা দিতে উপরের বক্সে টিক দিন।</span>}
                        </div>
                      )}
                    </div>

                    {error && (
                      <div style={{ color: '#e53e3e', background: '#fff5f5', padding: '12px 16px', borderRadius: 8, border: '1px solid #fed7d7', fontSize: '0.875rem' }}>
                        <Tx>Something went wrong. Please call us on</Tx> <a href="tel:+8801978356710" style={{ color: '#e53e3e', fontWeight: 600 }}>+880 1978 356710</a> <Tx>or email</Tx> <a href="mailto:careers@bhuiyanworkforce.com" style={{ color: '#e53e3e', fontWeight: 600 }}>careers@bhuiyanworkforce.com</a>.
                        <BnNote lang={lang} style={{ color: '#e53e3e', fontSize: '0.875rem' }}>কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে ফোন করুন অথবা ইমেইল করুন।</BnNote>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>{tk('common_back')}</button>
                    <button type="submit" className="btn btn-primary" disabled={submitting} style={{ minWidth: 180 }}>
                      {submitting ? tk('apply_submitting') : tk('apply_submit')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
      </div>
    </StaticPageLocalizer>
  );
}
