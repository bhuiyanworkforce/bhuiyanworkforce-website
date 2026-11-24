import React from 'react';
import { Link, useParams, Navigate } from '../i18n/router';
import { COUNTRIES_BN, SERVICES_BN, REGION_BN } from '../content/bn/workerTopics.js';

// Worker-facing Bengali country and service pages (/bn/countries/<slug>, /bn/services/<slug>).
// Informational only: no salary, fee, timeline, visa-guarantee or licence claims. Specific facts
// are given to each applicant in writing. NEEDS NATIVE-SPEAKER REVIEW before launch.

const BN_FONT = "'Noto Sans Bengali','Nirmala UI','Kalpurush','Siyam Rupali','Shonar Bangla',system-ui,sans-serif";
const WA = 'https://wa.me/8801978356710';
const NAVY = 'var(--navy, #0f2347)';
const CARD = { background: 'var(--white, #fff)', border: '1px solid var(--gray-200, #e5e7eb)', borderRadius: 12, padding: 20 };

const REGION_NOTES = {
  gulf: [
    'সাধারণত নিয়োগকর্তা বা তাঁর প্রতিনিধি ওয়ার্ক পারমিট ও ভিসার আবেদন করেন। ভিসা বা কাজের সুযোগ টাকা দিয়ে "কিনতে" যাবেন না।',
    'গন্তব্য দেশের নিয়ম অনুযায়ী অনুমোদিত কেন্দ্রে মেডিকেল পরীক্ষা (জিএএমসিএ) লাগতে পারে।',
    'বিএমইটি নিবন্ধন, স্মার্ট কার্ড ও বিদেশ গমনের প্রয়োজনীয় ছাড়পত্র লাগে।',
    'কাজের চুক্তিতে বেতন, কর্মঘণ্টা, থাকা-খাওয়া ও ছুটি লেখা আছে কি না দেখে সই করুন। পাসপোর্ট নিজের কাছে রাখুন।',
    'পেশা অনুযায়ী হাতে-কলমে দক্ষতা পরীক্ষা বা সনদ চাওয়া হতে পারে।',
  ],
  europe: [
    'ইউরোপের দেশগুলোতে ওয়ার্ক পারমিট ও ভিসা প্রক্রিয়ায় সাধারণত বেশি কাগজপত্র লাগে এবং স্থানীয় কর্তৃপক্ষের অনুমোদন দরকার হয়।',
    'নিয়োগকর্তার কাজের প্রস্তাব ও কর্তৃপক্ষের অনুমোদন ছাড়া ভিসা হয় না। "ভিসা রেডি" বা "ভিসা নিশ্চিত" দাবি শুনলে লিখিত প্রমাণ চান।',
    'শিক্ষাগত বা কাজের সনদ, পুলিশ ক্লিয়ারেন্সসহ নানা কাগজ যাচাই হতে পারে।',
    'দূতাবাসে সাক্ষাৎকার এবং প্রাথমিক ভাষা বা ইংরেজির জ্ঞান প্রয়োজন হতে পারে।',
    'বিএমইটি নিবন্ধন করুন এবং চুক্তি বাংলায় বুঝে সই করুন।',
  ],
  mideast: [
    'সাধারণত নিয়োগকর্তা ওয়ার্ক পারমিটের আবেদন করেন; নিজে কোনো দালালকে টাকা দিয়ে ভিসা কিনবেন না।',
    'গন্তব্য দেশের নিয়ম অনুযায়ী মেডিকেল পরীক্ষা লাগতে পারে।',
    'বিএমইটি নিবন্ধন, স্মার্ট কার্ড ও প্রয়োজনীয় ছাড়পত্র লাগে।',
    'চুক্তি বাংলায় বুঝে সই করুন এবং পাসপোর্ট নিজের কাছে রাখুন।',
  ],
  asia: [
    'শ্রমিক নেওয়ার নিয়ম, কোটা ও খাতভিত্তিক অনুমতি সরকারি সিদ্ধান্তে সময়ে সময়ে বদলায়। আবেদনের আগে সর্বশেষ অবস্থা জেনে নিন।',
    'সাধারণত নিয়োগকর্তা ওয়ার্ক পারমিটের আবেদন করেন; ভিসার জন্য কাউকে টাকা দিয়ে "ব্যবস্থা" করাবেন না।',
    'মেডিকেল পরীক্ষা, বিএমইটি নিবন্ধন ও স্মার্ট কার্ড প্রয়োজন হতে পারে।',
    'চুক্তি বাংলায় বুঝে সই করুন এবং পাসপোর্ট নিজের কাছে রাখুন।',
  ],
  caucasus: [
    'ওয়ার্ক পারমিট ও ভিসার নিয়ম দেশভেদে আলাদা; নিয়োগকর্তার প্রস্তাব ও স্থানীয় অনুমোদন লাগে।',
    'শিক্ষাগত বা কাজের সনদ এবং পুলিশ ক্লিয়ারেন্স যাচাই হতে পারে।',
    'বিএমইটি নিবন্ধন করুন এবং চুক্তি বাংলায় বুঝে সই করুন।',
  ],
  africa: [
    'এই দেশগুলোতে ওয়ার্ক পারমিটের আবেদন সাধারণত নিয়োগকর্তা করেন এবং স্থানীয় কর্তৃপক্ষের অনুমোদন দরকার হয়।',
    'মেডিকেল পরীক্ষা, বিএমইটি নিবন্ধন ও স্মার্ট কার্ড প্রয়োজন হতে পারে।',
    'চুক্তি বাংলায় বুঝে সই করুন এবং পাসপোর্ট নিজের কাছে রাখুন।',
  ],
};

const STATUS_NOTES = {
  serbia: 'সার্বিয়ায় শ্রমিক পাঠানোর ক্ষেত্রে প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের পূর্ব অনুমোদন লাগছে বলে জানা গেছে। এই অনুমোদন না থাকলে নতুন আবেদন নেওয়া বা কোনো প্রতিশ্রুতি দেওয়া ঠিক নয়। সর্বশেষ অবস্থা আবেদনের সময় লিখিতভাবে জানানো হবে।',
  'bosnia-herzegovina': 'বসনিয়া ও হার্জেগোভিনায় শ্রমিক পাঠানোর ক্ষেত্রেও প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের পূর্ব অনুমোদনের বিষয়টি সামনে এসেছে। অনুমোদনের অবস্থা বদলাতে পারে; আবেদনের সময় সর্বশেষ তথ্য লিখিতভাবে জানানো হবে।',
  malaysia: 'মালয়েশিয়ার শ্রমবাজার নীতি সরকারি সিদ্ধান্তে বদলায়। কোন খাতে ও কোন প্রক্রিয়ায় শ্রমিক নেওয়া হচ্ছে তা আবেদনের সময় সর্বশেষ অবস্থা অনুযায়ী জানানো হবে।',
};

function Shell({ children }) {
  return <div lang="bn" style={{ fontFamily: BN_FONT }}>{children}</div>;
}

function Section({ title, children, tint }) {
  return (
    <section className="section" style={tint ? { background: 'var(--off-white, #f7f5ef)' } : undefined}>
      <div className="container" style={{ maxWidth: 960 }}>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.35rem,2.6vw,1.8rem)', marginBottom: 20, lineHeight: 1.4 }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Chips({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {items.map(([label, to]) => (
        <li key={to || label}>
          {to
            ? <Link to={to} style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, border: '1px solid var(--gray-200, #e5e7eb)', background: 'var(--white, #fff)', fontSize: '0.92rem' }}>{label}</Link>
            : <span style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, border: '1px solid var(--gray-200, #e5e7eb)', background: 'var(--white, #fff)', fontSize: '0.92rem' }}>{label}</span>}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }) {
  return <ul style={{ margin: 0, paddingInlineStart: 20, display: 'grid', gap: 10, lineHeight: 1.75 }}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

function Cta({ topic }) {
  return (
    <Section title="আবেদন বা প্রশ্ন" tint>
      <p style={{ marginTop: 0, lineHeight: 1.8 }}>
        {topic} নিয়ে প্রশ্ন থাকলে বা আবেদন করতে চাইলে আপনার পেশা, অভিজ্ঞতা ও সনদের তথ্যসহ যোগাযোগ করুন।
        টাকা দেওয়ার আগে সবসময় লিখিত চুক্তি ও খরচের তালিকা চেয়ে নিন এবং ব্যক্তিগত বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে টাকা পাঠাবেন না।
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <Link to="/apply" className="btn btn-primary">আবেদন করুন</Link>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp-এ কথা বলুন</a>
        <Link to="/faq" className="btn btn-secondary">প্রশ্ন ও উত্তর</Link>
        <Link to="/worker-guide" className="btn btn-secondary">শ্রমিক নির্দেশিকা</Link>
      </div>
    </Section>
  );
}

function Hero({ crumbs, h1, lead }) {
  return (
    <div className="page-hero">
      <div className="container">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            {crumbs.map(([label, to], i) => (
              <React.Fragment key={label}>
                {to ? <Link to={to}>{label}</Link> : <span style={{ color: 'var(--gold)' }}>{label}</span>}
                {i < crumbs.length - 1 && <span>›</span>}
              </React.Fragment>
            ))}
          </div>
          <h1 style={{ lineHeight: 1.35 }}>{h1}</h1>
          <p>{lead}</p>
        </div>
      </div>
    </div>
  );
}

export function BengaliCountryPage() {
  const { slug } = useParams();
  const c = COUNTRIES_BN[slug];
  if (!c) return <Navigate to="/" replace />;
  const services = Object.entries(SERVICES_BN).filter(([, s]) => s.countries.includes(slug));
  const nearby = Object.entries(COUNTRIES_BN).filter(([k, x]) => k !== slug && x.region === c.region).slice(0, 8);
  const facts = [['রাজধানী', c.capital], ['মুদ্রা', c.currency], ['প্রধান ভাষা', c.language], ['অঞ্চল', REGION_BN[c.region]]];
  return (
    <Shell>
      <Hero
        crumbs={[['হোম', '/'], ['গন্তব্য দেশ', '/#countries'], [c.name]]}
        h1={`${c.loc} কাজ: যা জানা দরকার`}
        lead={`${c.name}-এ কাজ করতে আগ্রহী বাংলাদেশি কর্মীদের জন্য সাধারণ তথ্য। কোন খাতে কর্মী লাগে, কী কাগজপত্র ও ধাপ থাকে এবং কীভাবে নিরাপদে আবেদন করবেন, এখানে বাংলায় দেওয়া হলো।`}
      />
      <Section title={`${c.name} সম্পর্কে এক নজরে`}>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {facts.map(([k, v]) => (
            <div key={k} style={CARD}>
              <dt style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{k}</dt>
              <dd style={{ margin: '4px 0 0', fontWeight: 700, color: NAVY }}>{v}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section title={`${c.loc} কোন কোন খাতে কর্মী লাগে`} tint>
        <Chips items={c.sectors.map((x) => [x])} />
        <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          কোন সময় কোন খাতে চাহিদা আছে তা নিয়োগকর্তা ও সরকারি নীতির ওপর নির্ভর করে এবং বদলায়। নির্দিষ্ট পদ খালি আছে কি না, আবেদনের সময় জানানো হবে।
        </p>
      </Section>
      {services.length > 0 && (
        <Section title={`${c.loc} যেসব পেশার কাজ নিয়ে আমরা যোগাযোগ রাখি`}>
          <Chips items={services.map(([k, s]) => [s.name, `/services/${k}`])} />
        </Section>
      )}
      <Section title={`${c.loc} যাওয়ার আগে যা জানবেন`} tint>
        <Bullets items={REGION_NOTES[c.region]} />
        {STATUS_NOTES[slug] && (
          <p style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'var(--white, #fff)', border: '1px solid var(--gold, #c9a84c)', lineHeight: 1.8 }}>{STATUS_NOTES[slug]}</p>
        )}
        <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          এটি সাধারণ তথ্য, আইনি পরামর্শ নয়। নিয়ম বদলাতে পারে, তাই চূড়ান্ত সিদ্ধান্তের আগে সরকারি উৎস ও লিখিত চুক্তি যাচাই করুন। খরচ, বেতন ও সময়সীমা আমরা আবেদনকারীকে লিখিতভাবে জানাই।
        </p>
      </Section>
      <Cta topic={c.name} />
      {nearby.length > 0 && (
        <Section title="একই অঞ্চলের অন্যান্য দেশ">
          <Chips items={nearby.map(([k, x]) => [x.name, `/countries/${k}`])} />
          <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7 }}>
            নিয়োগকর্তাদের জন্য এই দেশের ইংরেজি পাতা: <a href={`/countries/${slug}`} hrefLang="en" lang="en">English page</a>
          </p>
        </Section>
      )}
    </Shell>
  );
}

export function BengaliServicePage() {
  const { slug } = useParams();
  const s = SERVICES_BN[slug];
  if (!s) return <Navigate to="/" replace />;
  const others = Object.entries(SERVICES_BN).filter(([k]) => k !== slug);
  return (
    <Shell>
      <Hero
        crumbs={[['হোম', '/'], ['পেশা ও সেবা', '/#services'], [s.name]]}
        h1={`${s.name}: বিদেশে কাজের সুযোগ`}
        lead={s.intro}
      />
      <Section title="কোন কোন পদে কর্মী লাগে">
        <Chips items={s.roles.map((r) => [r])} />
        <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          নির্দিষ্ট সময়ে কোন পদে চাহিদা আছে তা নিয়োগকর্তার ওপর নির্ভর করে। আপনার পদ তালিকায় না থাকলেও যোগাযোগ করুন।
        </p>
      </Section>
      <Section title="যেসব দেশে এই খাতের নিয়োগকর্তাদের সঙ্গে যোগাযোগ" tint>
        <Chips items={s.countries.map((k) => [COUNTRIES_BN[k].name, `/countries/${k}`])} />
        <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--gray-500)' }}>
          কোন দেশে কখন সরকারি অনুমোদন চালু আছে তা বদলায়। আবেদনের সময় সর্বশেষ অবস্থা জানানো হবে।
        </p>
      </Section>
      <Section title="আবেদনের সময় কী লাগে">
        <Bullets items={[
          'বৈধ পাসপোর্ট (মেয়াদ কমপক্ষে যথেষ্ট থাকতে হবে) এবং জাতীয় পরিচয়পত্র।',
          'আপনার কাজের অভিজ্ঞতার বিবরণ: কোথায়, কত দিন, কী কাজ।',
          'প্রশিক্ষণ বা সনদ থাকলে তার কপি (যেমন কারিগরি প্রশিক্ষণ, ড্রাইভিং লাইসেন্স, ওয়েল্ডিং সনদ)।',
          'প্রয়োজনে হাতে-কলমে দক্ষতা পরীক্ষা (ট্রেড টেস্ট)। এতে আপনার প্রকৃত দক্ষতা যাচাই হয়।',
          'সাম্প্রতিক ছবি এবং যোগাযোগের নম্বর (WhatsApp থাকলে ভালো)।',
        ]} />
        <p style={{ marginTop: 16, lineHeight: 1.8 }}>
          সার্টিফিকেট বা অভিজ্ঞতার ভুল তথ্য দেবেন না। মিথ্যা কাগজ ধরা পড়লে আপনি দেশে ফেরত আসতে পারেন বা আইনি সমস্যায় পড়তে পারেন।
        </p>
      </Section>
      <Cta topic={s.name} />
      <Section title="অন্যান্য পেশা" >
        <Chips items={others.map(([k, x]) => [x.name, `/services/${k}`])} />
        <p style={{ marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7 }}>
          নিয়োগকর্তাদের জন্য ইংরেজি পাতা: <a href={`/services/${slug}`} hrefLang="en" lang="en">English page</a>
        </p>
      </Section>
    </Shell>
  );
}
