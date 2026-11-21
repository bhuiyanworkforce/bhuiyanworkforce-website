import React from 'react';
import { Link } from '../i18n/router';
import { useLang } from '../i18n/LanguageContext';
import { StaticPageLocalizer } from '../i18n/staticPageText.js';

// Founder page. Translated through StaticPageLocalizer: each string below is matched by its exact English
// text against the rows for src/pages/FounderPage.jsx in <lang>-extra-pages.json. If you change an English
// string here, update that row in every language file, or that language falls back to English.
// Facts here come from the founder himself; keep it that way.

const FACTS = [
  ['Role', 'Founder & CEO, Bhuiyan Workforce Ltd.'],
  ['Education', 'Computer Science and Technology, Jiangnan University, China (2022), first in his department'],
  ['Before the company', 'ICT and Physics teacher'],
  ['Languages', 'Bengali, English, Hindi, Chinese'],
];

const PRINCIPLES = [
  'Workers get honest job offers and a contract explained in Bengali before they commit to anything.',
  'Every cost is itemised and written down before money changes hands. No hidden fees.',
  'Skills are tested, not assumed, so employers receive the workers they were promised.',
  'We follow up after deployment, because a placement does not end at the airport.',
];

function Block({ title, children, tint }) {
  return (
    <section className="section" style={tint ? { background: 'var(--off-white, #f7f5ef)' } : undefined}>
      <div className="container" style={{ maxWidth: 860 }}>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 20 }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

const body = { lineHeight: 1.85, color: 'var(--text-body)', fontSize: '1.02rem', margin: '0 0 16px' };

export default function FounderPage() {
  const { lang } = useLang();
  return (
    <StaticPageLocalizer locale={lang} file="src/pages/FounderPage.jsx">
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>Founder</span>
            </div>
            <h1>MD Rezaul Kabir Bhuiyan</h1>
            <p>Founder &amp; CEO of Bhuiyan Workforce Ltd., a Bangladesh-based international recruitment company built on transparency.</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40, alignItems: 'start' }}>
            <img
              src="/team-rezaul.webp" alt="MD Rezaul Kabir Bhuiyan, Founder and CEO of Bhuiyan Workforce Ltd."
              width="316" height="400"
              style={{ width: '100%', maxWidth: 316, height: 'auto', borderRadius: 14, boxShadow: '0 10px 30px rgba(15,35,71,0.18)' }}
            />
            <dl style={{ margin: 0, display: 'grid', gap: 18 }}>
              {FACTS.map(([k, v]) => (
                <div key={k}>
                  <dt style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark, #a8842a)', fontWeight: 700, marginBottom: 4 }}>{k}</dt>
                  <dd style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-body)' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Block title="Why he started this company" tint>
        <p style={body}>
          Mr. Bhuiyan watched people in his community overpay unregulated brokers when they tried to find work abroad.
          He started Bhuiyan Workforce Ltd. to offer the opposite: ethical, transparent placement, where the worker
          knows the terms and the cost, and the employer knows exactly who is coming.
        </p>
        <p style={{ ...body, marginBottom: 0 }}>
          The company is a registered limited company in Bangladesh. Its job is to connect pre-screened Bangladeshi
          workers with employers in Europe, the Gulf and Southeast Asia.
        </p>
      </Block>

      <Block title="Background">
        <p style={body}>
          Mr. Bhuiyan studied Computer Science and Technology at Jiangnan University in China and graduated in 2022,
          ranked first in his department. Before founding the company he taught ICT and Physics.
        </p>
        <p style={body}>
          He speaks Bengali, English, Hindi and Chinese, which helps when talking to employers and partners
          directly.
        </p>
        <p style={{ ...body, marginBottom: 0 }}>
          Today he leads the company’s partnerships and business development across the Gulf, Europe and Asia. He also
          led the development of the company’s website and its internal workforce-management system, so candidate
          records, documents and deployments are tracked in one place.
        </p>
      </Block>

      <Block title="What the company stands for" tint>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
          {PRINCIPLES.map((p) => (
            <li key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', lineHeight: 1.75, color: 'var(--text-body)' }}>
              <span aria-hidden="true" style={{ color: '#2f855a', fontWeight: 800, flexShrink: 0 }}>✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Get in touch">
        <p style={body}>
          Employers and partners can write to Mr. Bhuiyan directly at{' '}
          <a href="mailto:Rezaul@bhuiyanworkforce.com"><bdi dir="ltr">Rezaul@bhuiyanworkforce.com</bdi></a> or on WhatsApp at{' '}
          <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer"><bdi dir="ltr">+880 1864 567912</bdi></a>.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
          <Link to="/about" className="btn btn-outline">About the company</Link>
          <Link to="/capabilities" className="btn btn-primary">See our capabilities</Link>
        </div>
      </Block>
    </StaticPageLocalizer>
  );
}
