import React from 'react';
import { Link } from '../i18n/router';

// Bengali "About us" page (/bn/about) for Bangladeshi workers. Short and worker-focused:
// who we are, how we work, what we never do, what we cannot promise, how to reach us.
// Deliberately makes no licence, visa, job, cost, timeline or replacement-guarantee claim.
// Same wording standard as BengaliHomePage. NEEDS NATIVE-SPEAKER REVIEW before launch.

const BN_FONT = "'Noto Sans Bengali','Nirmala UI','Kalpurush','Siyam Rupali','Shonar Bangla',system-ui,sans-serif";
const WA_WORKERS = 'https://wa.me/8801978356710';
const CARD = { background: 'var(--white, #fff)', border: '1px solid var(--gray-200, #e5e7eb)', borderRadius: 12, padding: 20 };

const PRINCIPLES = [
  ['বাংলায় লিখিত চুক্তি', 'বেতন, কর্মঘণ্টা, থাকা-খাওয়া, ছুটি ও মেয়াদ লেখা চুক্তি আপনাকে বাংলায় বুঝিয়ে দেওয়া হবে। সই করার আগে পুরোটা পড়ার সুযোগ থাকবে।'],
  ['স্বচ্ছ খরচ ও রসিদ', 'টাকা নেওয়ার আগে সব খরচের লিখিত তালিকা দেওয়া হবে। কোনো লুকানো ফি থাকবে না এবং প্রতিটি টাকার রসিদ দেওয়া হবে।'],
  ['যাচাই ও দক্ষতা পরীক্ষা', 'আপনার তথ্য, অভিজ্ঞতা ও কাজের দক্ষতা যাচাই করা হয়। প্রয়োজনে হাতে-কলমে ট্রেড টেস্ট নেওয়া হয়।'],
  ['প্রশিক্ষণ ও খোঁজখবর', 'রওনা হওয়ার আগে গন্তব্য দেশের নিয়ম, সংস্কৃতি ও আপনার অধিকার নিয়ে ব্রিফিং দেওয়া হবে। বিদেশে পৌঁছানোর পরেও খোঁজখবর নেওয়া হবে।'],
];

const NEVER = [
  'ভিসা, চাকরি বা ফ্লাইটের নিশ্চয়তা দেওয়া।',
  'রসিদ ছাড়া বা ব্যক্তিগত বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে টাকা নেওয়া।',
  'আপনার পাসপোর্ট নিজেদের কাছে আটকে রাখা।',
  'চুক্তিতে যা লেখা আছে তার বাইরে অন্য শর্তে কাজ দেওয়া।',
  'দক্ষতা বা সার্টিফিকেটের ভুল তথ্য দিয়ে আবেদন জমা দেওয়া।',
];

const LIMITS = [
  'কর্মী নির্বাচন করেন নিয়োগকর্তা। আপনার আবেদন জমা দিলেই নির্বাচন নিশ্চিত হয় না।',
  'ওয়ার্ক পারমিট ও ভিসার সিদ্ধান্ত নেয় গন্তব্য দেশের কর্তৃপক্ষ। বিএমইটি নিবন্ধন ও মেডিকেল সহ বাংলাদেশের নিয়মও মানতে হয়।',
  'কোন দেশে কোন পেশায় চাহিদা আছে এবং সরকারি অনুমোদন চালু আছে কি না, তা সময়ের সঙ্গে বদলায়।',
  'খরচ, বেতন ও সময়সীমার নির্দিষ্ট তথ্য প্রতিটি আবেদনকারীকে লিখিতভাবে জানানো হবে। মুখের কথায় সিদ্ধান্ত নেবেন না।',
];

function Section({ title, children, tint, id }) {
  return (
    <section id={id} className="section" style={tint ? { background: 'var(--off-white, #f7f5ef)' } : undefined}>
      <div className="container" style={{ maxWidth: 960 }}>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.35rem,2.8vw,1.9rem)', marginBottom: 20, lineHeight: 1.4 }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }) {
  return <ul style={{ margin: 0, paddingInlineStart: 20, display: 'grid', gap: 10, lineHeight: 1.75 }}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

export default function BengaliAboutPage() {
  return (
    <div lang="bn" style={{ fontFamily: BN_FONT }}>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">হোম</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>আমাদের পরিচয়</span>
            </div>
            <h1 style={{ lineHeight: 1.35 }}>আমরা কারা</h1>
            <p>
              Bhuiyan Workforce Ltd. ব্রাহ্মণবাড়িয়াভিত্তিক একটি জনশক্তি নিয়োগ প্রতিষ্ঠান। আমরা দক্ষ বাংলাদেশি কর্মীদের যাচাই করে
              বিদেশি নিয়োগকর্তাদের কাছে উপস্থাপন করি। আমাদের কাজের ভিত্তি তিনটি: স্বচ্ছতা, লিখিত শর্ত এবং কর্মীর নিরাপত্তা।
            </p>
          </div>
        </div>
      </div>

      <Section title="আমরা কী করি">
        <p style={{ marginTop: 0, lineHeight: 1.85 }}>
          আমরা বাংলাদেশি কর্মী ও বিদেশি নিয়োগকর্তার মধ্যে যোগাযোগ ঘটাই। কর্মীর তথ্য ও দক্ষতা যাচাই করি, নিয়োগকর্তার চাহিদার সঙ্গে মেলে এমন প্রোফাইল পাঠাই
          এবং নির্বাচনের পর চুক্তি, বিএমইটি, মেডিকেল ও ভিসার ধাপগুলোতে পাশে থাকি। নির্মাণ, ড্রাইভিং, হসপিটালিটি, কারখানা, কৃষিসহ নানা পেশায় আমরা
          নিয়োগকর্তাদের সঙ্গে যোগাযোগ রাখি।
        </p>
        <p style={{ marginBottom: 0, lineHeight: 1.85 }}>
          <Link to="/#services">পেশার তালিকা</Link> ও <Link to="/#countries">গন্তব্য দেশের তালিকা</Link> দেখুন।
        </p>
      </Section>

      <Section title="আমরা যেভাবে কাজ করি" tint>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {PRINCIPLES.map(([title, body]) => (
            <div key={title} style={CARD}>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', color: 'var(--navy, #0f2347)' }}>{title}</h3>
              <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--text-body)' }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="যা আমরা কখনো করি না">
        <Bullets items={NEVER} />
        <p style={{ marginTop: 16, lineHeight: 1.8 }}>
          কেউ এর কোনোটি করতে বললে, সে আমাদের নাম ব্যবহার করলেও, আমাদের সরাসরি জানান।
        </p>
      </Section>

      <Section title="যা আগে থেকে জানা ভালো" tint>
        <Bullets items={LIMITS} />
        <p style={{ marginTop: 16, lineHeight: 1.8 }}>
          পুরো প্রক্রিয়া, সম্ভাব্য খরচ ও সতর্কতা পড়ুন: <Link to="/worker-guide">শ্রমিক নির্দেশিকা</Link>। সাধারণ প্রশ্নের উত্তর: <Link to="/faq">সাধারণ জিজ্ঞাসা</Link>।
        </p>
      </Section>

      <Section title="যোগাযোগ ও অভিযোগ" id="contact">
        <p style={{ marginTop: 0, lineHeight: 1.8 }}>
          প্রশ্ন, সমস্যা বা অভিযোগ থাকলে সরাসরি জানান। WhatsApp:{' '}
          <a href={WA_WORKERS} target="_blank" rel="noopener noreferrer"><bdi dir="ltr">+880 1978 356710</bdi></a>
          {' '}· ইমেইল: <a href="mailto:careers@bhuiyanworkforce.com"><bdi dir="ltr">careers@bhuiyanworkforce.com</bdi></a>
        </p>
        <p style={{ lineHeight: 1.8 }}>ঠিকানা: <bdi dir="ltr">Kawtoli, Brahmanbaria, Bangladesh 3400</bdi></p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
          <Link to="/apply" className="btn btn-primary">আবেদন করুন</Link>
          <a href={WA_WORKERS} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp-এ কথা বলুন</a>
        </div>
        <p style={{ marginTop: 24, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          আপনি যদি বিদেশি নিয়োগকর্তা বা নিয়োগ অংশীদার হন, আমাদের ইংরেজি পাতা দেখুন:{' '}
          <a href="/about" hrefLang="en" lang="en">About us (English)</a>
        </p>
      </Section>
    </div>
  );
}
