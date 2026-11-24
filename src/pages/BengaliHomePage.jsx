import React from 'react';
import { Link } from '../i18n/router';
import { COUNTRIES_BN, SERVICES_BN, REGION_BN } from '../content/bn/workerTopics.js';

// Bengali landing page (/bn) for Bangladeshi workers searching in Bangla. It is deliberately
// informational: it makes no job, visa, cost or licence promise. Specific facts (partner agency
// name and licence number, costs) are given to each applicant in writing, as in the worker guide.
// NEEDS NATIVE-SPEAKER REVIEW before launch.

const BN_FONT = "'Noto Sans Bengali','Nirmala UI','Kalpurush','Siyam Rupali','Shonar Bangla',system-ui,sans-serif";
const WA_WORKERS = 'https://wa.me/8801978356710';

const PROMISES = [
  ['বাংলায় লিখিত চুক্তি', 'বেতন, কর্মঘণ্টা, থাকা-খাওয়া, ছুটি ও মেয়াদ লেখা কাজের চুক্তি আপনাকে বাংলায় বুঝিয়ে দেওয়া হবে। সই করার আগে পুরোটা পড়ার সুযোগ থাকবে।'],
  ['স্বচ্ছ খরচ ও রসিদ', 'টাকা নেওয়ার আগে সব খরচের বিস্তারিত লিখিত তালিকা দেওয়া হবে। কোনো লুকানো ফি থাকবে না এবং প্রতিটি টাকার রসিদ দেওয়া হবে।'],
  ['যাচাই ও দক্ষতা পরীক্ষা', 'আপনার তথ্য, অভিজ্ঞতা ও কাজের দক্ষতা যাচাই করা হয়। প্রয়োজনে হাতে-কলমে ট্রেড টেস্ট নেওয়া হয়।'],
  ['প্রশিক্ষণ ও খোঁজখবর', 'রওনা হওয়ার আগে গন্তব্য দেশের আইন, সংস্কৃতি ও আপনার অধিকার সম্পর্কে ব্রিফিং দেওয়া হবে। বিদেশে পৌঁছানোর পরেও খোঁজখবর নেওয়া হবে।'],
];

const STEPS = [
  ['যোগাযোগ বা আবেদন', 'WhatsApp, ইমেইল বা ওয়েবসাইটের ফর্মে আপনার পেশা, অভিজ্ঞতা ও সার্টিফিকেটের তথ্য দিন।'],
  ['যাচাই', 'আপনার তথ্য ও দক্ষতা যাচাই করা হয়। প্রয়োজনে ট্রেড টেস্ট হয়।'],
  ['নিয়োগকর্তার নির্বাচন', 'নিয়োগকর্তার চাহিদার সঙ্গে মিললে তিনি আপনার প্রোফাইল দেখে নির্বাচন বা সাক্ষাৎকার নেন।'],
  ['চুক্তি, বিএমইটি, মেডিকেল ও ভিসা', 'চুক্তি বাংলায় বোঝানো হয়। এরপর বিএমইটি নিবন্ধন, প্রয়োজনে মেডিকেল এবং গন্তব্য দেশের কর্তৃপক্ষের ভিসা অনুমোদন।'],
];

function Section({ title, children, tint, id }) {
  return (
    <section id={id} className="section" style={tint ? { background: 'var(--off-white, #f7f5ef)' } : undefined}>
      <div className="container" style={{ maxWidth: 960 }}>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 24, lineHeight: 1.4 }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function BengaliHomePage() {
  return (
    <div lang="bn" style={{ fontFamily: BN_FONT }}>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <h1 style={{ lineHeight: 1.35 }}>বিদেশে কাজ: সঠিক পথে, স্বচ্ছ নিয়মে</h1>
            <p>
              Bhuiyan Workforce Ltd. ব্রাহ্মণবাড়িয়াভিত্তিক একটি জনশক্তি নিয়োগ প্রতিষ্ঠান। আমরা দক্ষ বাংলাদেশি কর্মীদের
              যাচাই করে বিদেশি নিয়োগকর্তাদের কাছে উপস্থাপন করি। সব কিছু লিখিত, সব খরচের রসিদ, সব শর্ত বাংলায় বোঝানো।
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
              <Link to="/worker-guide" className="btn btn-primary">শ্রমিক নির্দেশিকা পড়ুন</Link>
              <Link to="/apply" className="btn btn-secondary">আবেদন করুন</Link>
              <a href={WA_WORKERS} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp-এ কথা বলুন</a>
            </div>
          </div>
        </div>
      </div>

      <Section title="আমরা যে চারটি বিষয় নিশ্চিত করতে চাই">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {PROMISES.map(([title, body]) => (
            <div key={title} style={{ background: 'var(--white, #fff)', border: '1px solid var(--gray-200, #e5e7eb)', borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', color: 'var(--navy, #0f2347)' }}>{title}</h3>
              <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--text-body)' }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="কীভাবে শুরু হয়" tint>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
          {STEPS.map(([title, body], i) => (
            <li key={title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={{
                flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'var(--navy, #0f2347)',
                color: 'var(--gold, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800,
              }}>{'১২৩৪'[i]}</span>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: 'var(--navy, #0f2347)' }}>{title}</h3>
                <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--text-body)' }}>{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p style={{ marginTop: 20, lineHeight: 1.75 }}>
          নির্বাচনের আগে কেউ চাকরি, ভিসা বা ফ্লাইটের নিশ্চয়তা দিতে পারে না। পুরো প্রক্রিয়া, খরচ ও সতর্কতা পড়ুন:{' '}
          <Link to="/worker-guide">শ্রমিক নির্দেশিকা</Link>।
        </p>
      </Section>

      <Section title="যেসব পেশায় নিয়োগকর্তাদের সঙ্গে কাজ করি" id="services">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {Object.entries(SERVICES_BN).map(([slug, s]) => (
            <li key={slug}>
              <Link to={`/services/${slug}`} style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, border: '1px solid var(--gray-200, #e5e7eb)', background: 'var(--white, #fff)', fontSize: '0.92rem' }}>{s.name}</Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          কোন সময় কোন পেশায় চাহিদা আছে তা নিয়োগকর্তাদের ওপর নির্ভর করে এবং বদলায়। আপনার পেশা তালিকায় না থাকলেও যোগাযোগ করুন।
        </p>
      </Section>

      <Section title="কোন দেশের নিয়োগকর্তাদের সঙ্গে যোগাযোগ" tint id="countries">
        <div style={{ display: 'grid', gap: 18 }}>
          {Object.entries(REGION_BN).map(([region, label]) => {
            const list = Object.entries(COUNTRIES_BN).filter(([, c]) => c.region === region);
            if (!list.length) return null;
            return (
              <div key={region}>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', color: 'var(--navy, #0f2347)' }}>{label}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {list.map(([slug, c]) => (
                    <li key={slug}>
                      <Link to={`/countries/${slug}`} style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, border: '1px solid var(--gray-200, #e5e7eb)', background: 'var(--white, #fff)', fontSize: '0.92rem' }}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          কোন দেশে কখন সরকারি অনুমোদন চালু আছে তা সময়ের সঙ্গে বদলায়। আবেদনের সময় আমরা সর্বশেষ অবস্থা জানিয়ে দেব।
        </p>
      </Section>

      <Section title="প্রায়ই জিজ্ঞেস করা প্রশ্ন">
        <ul style={{ margin: 0, paddingInlineStart: 20, display: 'grid', gap: 10, lineHeight: 1.75 }}>
          <li>বিদেশে যেতে কত টাকা লাগে এবং কীভাবে টাকা দেওয়া নিরাপদ?</li>
          <li>ওয়ার্ক ভিসা কে দেয় এবং কতদিন লাগে?</li>
          <li>এজেন্সি আসল কি না কীভাবে যাচাই করব?</li>
          <li>বিএমইটি স্মার্ট কার্ড ও জিএএমসিএ মেডিকেল কী?</li>
        </ul>
        <p style={{ marginTop: 16 }}><Link to="/faq" className="btn btn-primary">সব প্রশ্ন ও উত্তর দেখুন</Link></p>
      </Section>

      <Section title="যোগাযোগ" tint id="contact">
        <p style={{ marginTop: 0, lineHeight: 1.8 }}>
          প্রশ্ন, সমস্যা বা অভিযোগ থাকলে সরাসরি জানান। WhatsApp:{' '}
          <a href={WA_WORKERS} target="_blank" rel="noopener noreferrer"><bdi dir="ltr">+880 1978 356710</bdi></a>
          {' '}· ইমেইল: <a href="mailto:careers@bhuiyanworkforce.com"><bdi dir="ltr">careers@bhuiyanworkforce.com</bdi></a>
        </p>
        <p style={{ lineHeight: 1.8 }}>ঠিকানা: <bdi dir="ltr">Kawtoli, Brahmanbaria, Bangladesh 3400</bdi></p>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          টাকা পাঠানোর আগে সবসময় লিখিত চুক্তি ও খরচের তালিকা দেখে নিন। কোনো ব্যক্তির ব্যক্তিগত বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে টাকা পাঠাবেন না।
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
          <Link to="/apply" className="btn btn-primary">আবেদন করুন</Link>
          <a href={WA_WORKERS} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp-এ কথা বলুন</a>
        </div>
      </Section>
    </div>
  );
}
