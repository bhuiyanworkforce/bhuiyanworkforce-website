import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from '../i18n/router';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { pageContent } from '../content/pages';

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
  const { lang, urlLang } = useLang();
  const { categories: FAQS, ui } = pageContent('faq', urlLang);

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
                placeholder={ui.searchPlaceholder}
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
                {ui.noResultsBefore}<strong>{search}</strong>{ui.noResultsAfter}
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
              {ui.stillTitle}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, fontSize: '0.9rem' }}>
              {ui.stillDesc}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24, textAlign: 'start' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{ui.forEmployers}</p>
                <a href="mailto:partnerships@bhuiyanworkforce.com" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: 6 }}>✉️ <bdi dir="ltr">partnerships@bhuiyanworkforce.com</bdi></a>
                <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>💬 <bdi dir="ltr">+880 1864 567912</bdi></a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{ui.forWorkers}</p>
                <a href="mailto:careers@bhuiyanworkforce.com" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: 6 }}>✉️ <bdi dir="ltr">careers@bhuiyanworkforce.com</bdi></a>
                <a href="https://wa.me/8801978356710" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>💬 <bdi dir="ltr">+880 1978 356710</bdi></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
