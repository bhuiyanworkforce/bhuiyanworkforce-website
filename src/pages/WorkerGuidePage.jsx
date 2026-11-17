import React, { useState } from 'react';
import { Link } from '../i18n/router';

// Worker guide for Bangladeshi applicants: how overseas recruitment works, what it costs and what a
// worker must never pay. The page is bilingual by design (Bengali first, English one click away),
// lives only at the English URL, and is independent of the site language switcher.

const BN_FONT = "'Noto Sans Bengali','Nirmala UI','Kalpurush','Siyam Rupali','Shonar Bangla',system-ui,sans-serif";
const WA_WORKERS = 'https://wa.me/8801978356710';

const CONTENT = {
  bn: {
    home: 'হোম',
    crumb: 'শ্রমিক নির্দেশিকা',
    h1: 'বিদেশে কাজ: সঠিক প্রক্রিয়া, খরচ ও সতর্কতা',
    sub: 'বাংলাদেশি কর্মীদের জন্য সহজ নির্দেশিকা। বিদেশে যাওয়ার আগে জানুন সবকিছু কোন নিয়মে হওয়া উচিত, যাতে কেউ আপনাকে ঠকাতে না পারে।',
    stepsTitle: 'সঠিক প্রক্রিয়া: ধাপে ধাপে',
    steps: [
      ['আবেদন ও যাচাই', 'আপনার তথ্য, অভিজ্ঞতা ও কাজের দক্ষতা যাচাই করা হয়। প্রয়োজনে হাতে-কলমে দক্ষতা পরীক্ষা (ট্রেড টেস্ট) নেওয়া হয়।'],
      ['নিয়োগকর্তার নির্বাচন', 'নিয়োগকর্তা আপনার প্রোফাইল দেখে নির্বাচন করেন বা সাক্ষাৎকার নেন। নির্বাচিত হওয়ার আগে কেউ ভিসা বা ফ্লাইটের নিশ্চয়তা দিতে পারে না।'],
      ['কাজের চুক্তি', 'বেতন, কর্মঘণ্টা, থাকা-খাওয়া, ছুটি ও চুক্তির মেয়াদ লেখা চুক্তি আপনাকে বাংলায় বুঝিয়ে দেওয়া হয়। সই করার আগে পুরোটা পড়ুন এবং একটি কপি নিজের কাছে রাখুন।'],
      ['বিএমইটি নিবন্ধন', 'বিদেশগামী প্রত্যেক কর্মীকে বিএমইটি (জনশক্তি, কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো)-তে নিবন্ধিত হতে হয়। নিবন্ধন ছাড়া বিদেশে যাওয়ার সরকারি ছাড়পত্র পাওয়া যায় না। এই ধাপটি আমরা একটি লাইসেন্সপ্রাপ্ত রিক্রুটিং এজেন্সির মাধ্যমে সম্পন্ন করি; সেই এজেন্সির নাম ও লাইসেন্স নম্বর আপনাকে লিখিতভাবে জানানো হবে।'],
      ['স্বাস্থ্য পরীক্ষা', 'গন্তব্য দেশের নিয়ম অনুযায়ী অনুমোদিত মেডিকেল সেন্টারে স্বাস্থ্য পরীক্ষা করাতে হয় (যেমন উপসাগরীয় দেশগুলোর জন্য GAMCA)। শুধু অনুমোদিত কেন্দ্রেই যান।'],
      ['ভিসা ও কাগজপত্র', 'ভিসা ও অন্যান্য কাগজপত্র গন্তব্য দেশের কর্তৃপক্ষ অনুমোদন করে। এতে সময় লাগে; কেউ নির্দিষ্ট তারিখে ভিসার গ্যারান্টি দিতে পারে না।'],
      ['প্রশিক্ষণ ও ব্রিফিং', 'রওনা হওয়ার আগে গন্তব্য দেশের আইন, সংস্কৃতি, কাজের নিয়ম ও আপনার অধিকার সম্পর্কে জানানো হয়।'],
      ['যাত্রা ও পরবর্তী খোঁজখবর', 'কাগজপত্র সম্পূর্ণ হলে আপনি রওনা হন। পৌঁছানোর পরেও আমরা আপনার খোঁজখবর নিই।'],
    ],
    costTitle: 'খরচ: কী জানা ও কী চাওয়া উচিত',
    cost: [
      'টাকা দেওয়ার আগে সব খরচের লিখিত তালিকা চান: কোন খাতে কত টাকা এবং কার কাছে যাবে।',
      'প্রতিটি টাকার জন্য রসিদ নিন এবং যত্ন করে রাখুন। রসিদ ছাড়া কোনো টাকা দেবেন না।',
      'বাংলাদেশ সরকার কিছু গন্তব্যের জন্য সর্বোচ্চ অভিবাসন ব্যয় নির্ধারণ করে। কেউ তার বেশি চাইলে বিএমইটি বা প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয় থেকে যাচাই করুন।',
      'কোনো লুকানো বা অতিরিক্ত ফি নেই, এই নিশ্চয়তা মুখে নয়, লিখিতভাবে নিন।',
    ],
    neverTitle: 'কখনোই এগুলো করবেন না',
    never: [
      'চাকরির লিখিত প্রস্তাব ও চুক্তি না দেখে টাকা দেবেন না।',
      'কোনো ব্যক্তির ব্যক্তিগত বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে টাকা পাঠাবেন না। এজেন্সির অফিসিয়াল অ্যাকাউন্টে বা অফিসে রসিদসহ দিন।',
      'ফাঁকা কাগজে বা আপনি বুঝতে পারেন না এমন ভাষার চুক্তিতে সই করবেন না।',
      'ভিসা প্রক্রিয়ার প্রয়োজনের বেশি সময় কাউকে আপনার পাসপোর্ট আটকে রাখতে দেবেন না।',
      '"ভিসা নিশ্চিত", "আগামীকালই ফ্লাইট" বা "বাড়তি টাকা দিলে সব ম্যানেজ হবে", এমন কথায় বিশ্বাস করবেন না। ভিসা দেয় গন্তব্য দেশের কর্তৃপক্ষ, কোনো দালাল বা এজেন্সি নয়।',
      'ভুয়া সার্টিফিকেট বা মিথ্যা অভিজ্ঞতার কাগজ ব্যবহার করবেন না। ধরা পড়লে আপনাকেই ফেরত পাঠানো হতে পারে এবং ক্ষতি আপনারই হবে।',
      'মেডিকেল, নিবন্ধন বা ইমিগ্রেশন "ম্যানেজ" করার নামে বাড়তি টাকা দেবেন না। এটি ঘুষ ও প্রতারণা।',
    ],
    verifyTitle: 'এজেন্সি আসল কি না, কীভাবে যাচাই করবেন',
    verify: [
      'এজেন্সির রিক্রুটিং লাইসেন্স নম্বর চান এবং বিএমইটির সরকারি ওয়েবসাইট (bmet.gov.bd) বা মন্ত্রণালয় থেকে তা মিলিয়ে দেখুন।',
      'নিয়োগকর্তার নাম, দেশ ও চাকরির বিবরণ লিখিতভাবে চান।',
      'চুক্তি, রসিদ ও পাসপোর্টের ছবি বা ফটোকপি নিজের কাছে এবং পরিবারের কাছে রাখুন।',
      'সন্দেহ হলে থামুন, বিশ্বস্ত কারও সঙ্গে পরামর্শ করুন, তারপর টাকা দিন।',
    ],
    promiseTitle: 'Bhuiyan Workforce Ltd.-এর প্রতিশ্রুতি',
    promise: [
      'কাজের চুক্তি আপনাকে বাংলায় বুঝিয়ে দেওয়া হবে।',
      'টাকা নেওয়ার আগে সব খরচের বিস্তারিত লিখিত তালিকা দেওয়া হবে। কোনো লুকানো ফি থাকবে না।',
      'আপনার দেওয়া প্রতিটি টাকার রসিদ দেওয়া হবে।',
      'রওনা হওয়ার আগে প্রশিক্ষণ ও ব্রিফিং দেওয়া হবে।',
      'বিদেশে যাওয়ার পরও আপনার খোঁজখবর নেওয়া হবে।',
    ],
    contactLine: 'কোনো সমস্যা, প্রশ্ন বা অভিযোগ থাকলে সরাসরি WhatsApp-এ জানান:',
    apply: 'আবেদন করুন',
    whatsapp: 'WhatsApp-এ কথা বলুন',
    note: 'এই পাতার তথ্য সাধারণ নির্দেশিকা। নির্দিষ্ট খরচ ও নিয়ম দেশ ও সময় অনুযায়ী বদলাতে পারে। সর্বশেষ নিয়ম বিএমইটি বা প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয় থেকে যাচাই করুন।',
  },
  en: {
    home: 'Home',
    crumb: 'Worker guide',
    h1: 'Working abroad: the right process, the costs, and what to watch for',
    sub: 'A plain guide for Bangladeshi workers. Know how everything should work before you go abroad, so nobody can cheat you.',
    stepsTitle: 'The correct process, step by step',
    steps: [
      ['Application and screening', 'Your details, experience and trade skills are checked. A practical trade test may be held.'],
      ['Employer selection', 'The employer reviews your profile or interviews you. Nobody can promise a visa or a flight before you are selected.'],
      ['Employment contract', 'The contract, with salary, working hours, accommodation, leave and duration, is explained to you in Bengali. Read all of it before you sign and keep a copy.'],
      ['BMET registration', 'Every worker going abroad must be registered with BMET (Bureau of Manpower, Employment and Training). Without registration you cannot get the government clearance to leave. We complete this step through a licensed recruiting agency, and we will give you that agency’s name and licence number in writing.'],
      ['Medical examination', 'You take a medical at an approved centre, as the destination country requires (for example GAMCA for the Gulf). Go only to approved centres.'],
      ['Visa and documents', 'The destination country’s authorities approve the visa and documents. This takes time, and nobody can guarantee a visa on a fixed date.'],
      ['Training and briefing', 'Before you leave you are briefed on the destination country’s laws, culture, workplace rules and your rights.'],
      ['Departure and follow-up', 'When your documents are complete you travel. After you arrive, we keep in touch to check on you.'],
    ],
    costTitle: 'Costs: what to know and what to ask for',
    cost: [
      'Before you pay anything, ask for a written list of every cost: what each amount is for and who receives it.',
      'Take a receipt for every payment and keep it safe. Pay nothing without a receipt.',
      'The Government of Bangladesh sets a maximum migration cost for some destinations. If anyone asks for more, check with BMET or the Ministry of Expatriates’ Welfare and Overseas Employment.',
      'Get the promise of “no hidden fees” in writing, not just by word of mouth.',
    ],
    neverTitle: 'Never do these',
    never: [
      'Do not pay before you have seen a written job offer and contract.',
      'Do not send money to anyone’s personal bKash, Nagad or bank account. Pay only to the agency’s official account, or at its office, with a receipt.',
      'Do not sign blank papers, or a contract in a language you cannot understand.',
      'Do not let anyone keep your passport longer than the visa process needs.',
      'Do not believe “visa guaranteed”, “flight tomorrow” or “pay extra and everything is arranged”. The destination country’s authorities issue visas, not a broker or an agency.',
      'Do not use fake certificates or false experience papers. If caught, you can be sent back and you are the one who loses.',
      'Do not pay extra to “arrange” a medical, registration or immigration. That is a bribe and a fraud.',
    ],
    verifyTitle: 'How to check that an agency is genuine',
    verify: [
      'Ask for the agency’s recruiting licence number and check it on the official BMET website (bmet.gov.bd) or with the Ministry.',
      'Ask in writing for the employer’s name, the country and the job description.',
      'Keep copies or photos of your contract, receipts and passport, and give a set to your family.',
      'If you feel unsure, stop, speak to someone you trust, and only then pay.',
    ],
    promiseTitle: 'The promise of Bhuiyan Workforce Ltd.',
    promise: [
      'Your employment contract will be explained to you in Bengali.',
      'You will receive a detailed written list of all costs before we take any payment. There are no hidden fees.',
      'You will receive a receipt for every payment you make.',
      'You will receive training and a briefing before you leave.',
      'We will keep in touch with you after you go abroad.',
    ],
    contactLine: 'For any problem, question or complaint, message us directly on WhatsApp:',
    apply: 'Apply now',
    whatsapp: 'Chat on WhatsApp',
    note: 'This page is general guidance. Specific costs and rules vary by country and over time. Check the latest rules with BMET or the Ministry of Expatriates’ Welfare and Overseas Employment.',
  },
};

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const num = (n, view) => (view === 'bn' ? String(n).replace(/\d/g, (d) => BN_DIGITS[d]) : String(n));

function Section({ title, children, tint }) {
  return (
    <section className="section" style={tint ? { background: 'var(--off-white, #f7f5ef)' } : undefined}>
      <div className="container" style={{ maxWidth: 860 }}>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 24 }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Bullets({ items, mark, color }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
      {items.map((text) => (
        <li key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', lineHeight: 1.75, color: 'var(--text-body)' }}>
          <span aria-hidden="true" style={{ color, fontWeight: 800, flexShrink: 0 }}>{mark}</span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WorkerGuidePage() {
  const [view, setView] = useState('bn');
  const c = CONTENT[view];

  const toggle = (id, label) => (
    <button
      type="button" onClick={() => setView(id)} aria-pressed={view === id} lang={id}
      style={{
        padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontFamily: id === 'bn' ? BN_FONT : 'inherit',
        fontSize: '0.9rem', fontWeight: view === id ? 700 : 500,
        background: view === id ? 'var(--gold, #c9a84c)' : 'transparent',
        color: view === id ? '#0f2347' : 'var(--white, #fff)', border: '1px solid var(--gold, #c9a84c)',
      }}
    >
      {label}
    </button>
  );

  return (
    <div lang={view} style={view === 'bn' ? { fontFamily: BN_FONT } : undefined}>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">{c.home}</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{c.crumb}</span>
            </div>
            <h1 style={view === 'bn' ? { lineHeight: 1.35 } : undefined}>{c.h1}</h1>
            <p>{c.sub}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              {toggle('bn', 'বাংলা')}
              {toggle('en', 'English')}
            </div>
          </div>
        </div>
      </div>

      <Section title={c.stepsTitle}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 18 }}>
          {c.steps.map(([title, body], i) => (
            <li key={title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={{
                flexShrink: 0, width: 38, height: 38, borderRadius: '50%', background: 'var(--navy, #0f2347)',
                color: 'var(--gold, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800,
              }}>{num(i + 1, view)}</span>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: 'var(--navy, #0f2347)' }}>{title}</h3>
                <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--text-body)' }}>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={c.costTitle} tint>
        <Bullets items={c.cost} mark="✓" color="#2f855a" />
      </Section>

      <Section title={c.neverTitle}>
        <Bullets items={c.never} mark="✕" color="#c53030" />
      </Section>

      <Section title={c.verifyTitle} tint>
        <Bullets items={c.verify} mark="→" color="var(--gold, #c9a84c)" />
      </Section>

      <Section title={c.promiseTitle}>
        <Bullets items={c.promise} mark="✓" color="#2f855a" />
        <p style={{ marginTop: 24, lineHeight: 1.75, color: 'var(--text-body)' }}>
          {c.contactLine} <a href={WA_WORKERS} target="_blank" rel="noopener noreferrer"><bdi dir="ltr">+880 1978 356710</bdi></a>
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
          <Link to="/apply" className="btn btn-primary">{c.apply}</Link>
          <a href={WA_WORKERS} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">{c.whatsapp}</a>
        </div>
        <p style={{ marginTop: 32, fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>{c.note}</p>
      </Section>
    </div>
  );
}
