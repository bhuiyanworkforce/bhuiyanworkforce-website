import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

const FAQS = [
  {
    category: 'For Employers',
    items: [
      {
        q: 'How quickly can you supply workers?',
        a: 'For most trade categories, we can present a verified shortlist within 5–10 working days. After employer selection, the full documentation and visa process typically takes 4–8 weeks depending on the destination country. For countries with streamlined visa procedures (e.g. Malaysia, UAE), timelines are often faster.',
      },
      {
        q: 'What is your minimum order size?',
        a: 'We handle both small deployments (5–10 workers) and large-scale mobilisations (200+ workers). There is no minimum order. However, for very small placements, we may combine your requirement with another employer\'s deployment to manage costs efficiently — we will always be transparent about this.',
      },
      {
        q: 'Do you handle all the documentation?',
        a: 'Yes. We manage BMET registration, Bureau of Manpower clearance, GAMCA medical examinations for Gulf destinations, police clearance certificates, passport validity checks, and the visa application process. You provide a valid demand letter and employment contract; we handle the rest.',
      },
      {
        q: 'What if a worker underperforms or leaves early?',
        a: 'We offer a replacement guarantee for workers who leave within the first 90 days for reasons attributable to misrepresentation on their CV or skills test. We will work with you to replace the worker as quickly as possible at no additional placement fee.',
      },
      {
        q: 'What countries do you serve?',
        a: 'We currently deploy to 25+ countries: Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, Jordan, Malaysia, Singapore, Maldives, Italy, Portugal, Greece, Romania, Poland, Hungary, Croatia, Czech Republic, Lithuania, Latvia, Estonia, Bulgaria, Cyprus, Russia, and Slovakia. If your destination is not on this list, please contact us — we may still be able to help.',
      },
      {
        q: 'What are your fees?',
        a: 'Our fees vary based on worker category, numbers, and destination country. We provide a fully itemised cost breakdown before you commit to anything. We operate on a success-fee model — you pay only after workers are confirmed for deployment.',
      },
    ],
  },
  {
    category: 'For Workers',
    items: [
      {
        q: 'Do workers pay a recruitment fee?',
        a: 'Fees vary depending on the service package and destination country. Please contact us directly to discuss your situation and get a clear breakdown of applicable costs.',
      },
      {
        q: 'How do I register my interest as a worker?',
        a: 'Contact us via WhatsApp (+880 1978 356710) or email (careers@bhuiyanworkforce.com) with your trade category, years of experience, and a copy of any relevant trade certificates. We will add you to our candidate database and contact you when a matching opportunity arises.',
      },
      {
        q: 'What documents will I need?',
        a: 'A valid Bangladesh passport (minimum 12 months remaining), National ID card, trade certificates (if applicable), previous employment reference letters, and a BMET Smart Card (we can help you obtain this). For Gulf destinations, you will also need to pass a GAMCA medical examination.',
      },
      {
        q: 'Will I receive a contract before I travel?',
        a: 'Yes. You will receive a verified employment contract in Bengali before you agree to travel. It will clearly state your job title, salary, working hours, accommodation arrangements, and contract duration. Never travel on the basis of a verbal promise alone.',
      },
    ],
  },
  {
    category: 'Compliance & Credentials',
    items: [
      {
        q: 'What is GAMCA and why is it required?',
        a: 'GAMCA (Gulf Approved Medical Centre Association) medical testing is a mandatory health clearance required by all GCC countries before a worker\'s visa can be processed. It screens for communicable diseases and general fitness for work. We coordinate GAMCA appointments for all workers going to Gulf destinations.',
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-chevron" aria-hidden="true">▾</span>
      </button>
      <div className="faq-answer" aria-hidden={!open}>
        <div className="faq-answer-inner">{a}</div>
      </div>
    </div>
  );
}

FAQItem.propTypes = {
  q: PropTypes.string.isRequired,
  a: PropTypes.string.isRequired,
};

export default function FAQPage() {
  const [search, setSearch] = React.useState('');
  const { lang } = useLang();
  const filtered = FAQS.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(section => section.items.length > 0);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">{t('common_home', lang)}</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{t('nav_faq', lang)}</span>
            </div>
            <h1>{t('faq_hero_h1', lang)}</h1>
            <p>{t('faq_hero_sub', lang)}</p>
            {/* Search */}
            <div style={{ marginTop: 24, maxWidth: 480 }}>
              <input
                type="text"
                placeholder="Search questions… e.g. Saudi visa, fees, documents"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="faq-grid">
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-500)' }}>
                No results found for "<strong>{search}</strong>" — try different keywords.
              </div>
            ) : filtered.map(section => (
              <div key={section.category} style={{ marginBottom: 48 }}>
                <div className="label-tag" style={{ marginBottom: 24 }}>{section.category}</div>
                {section.items.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: 40, textAlign: 'center', maxWidth: 800, margin: '32px auto 0' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1.5rem', marginBottom: 12 }}>
              Still Have Questions?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, fontSize: '0.9rem' }}>
              Employers: contact us via email or WhatsApp. Workers: use the dedicated contacts below.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24, textAlign: 'left' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>For Employers</p>
                <a href="mailto:partnerships@bhuiyanworkforce.com" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: 6 }}>✉️ partnerships@bhuiyanworkforce.com</a>
                <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>💬 +880 1864 567912</a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>For Workers</p>
                <a href="mailto:careers@bhuiyanworkforce.com" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: 6 }}>✉️ careers@bhuiyanworkforce.com</a>
                <a href="https://wa.me/8801978356710" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>💬 +880 1978 356710</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
