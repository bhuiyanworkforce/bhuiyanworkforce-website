import React, { useState } from 'react';
import { Link, useParams, Navigate } from '../i18n/router';
import { getCountryGuide, COUNTRY_GUIDES, useGuidesReady } from '../data/countryGuides';
import { getCountry } from '../data/countries';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { countryName } from '../content/index.js';
import { localizeGuide } from '../content/index.js';

// Each guide is shown in the language it was written in; this is the label for that language.
const GUIDE_LANG_NAMES = {
  en: 'English', ar: 'العربية', bs: 'Bosanski', bg: 'Български', hr: 'Hrvatski', el: 'Ελληνικά',
  cs: 'Čeština', et: 'Eesti', hu: 'Magyar', it: 'Italiano', lv: 'Latviešu', lt: 'Lietuvių',
  ms: 'Bahasa Melayu', sr: 'Srpski', mk: 'Македонски', pl: 'Polski', pt: 'Português',
  ro: 'Română', sk: 'Slovenčina', sl: 'Slovenščina',
};

// Inline: **bold** and bare https:// links. Everything else is plain text (React escapes it).
function inline(text, key) {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)<]+)/g).map((part, i) => {
    if (!part) return null;
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${key}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    if (/^https?:\/\//.test(part)) {
      const [, url, tail] = part.match(/^(.*?)([.,;:]*)$/);
      return (
        <React.Fragment key={`${key}-${i}`}>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', wordBreak: 'break-all' }}>{url}</a>{tail}
        </React.Fragment>
      );
    }
    return part;
  });
}

// Guide text is simple Markdown: paragraphs, "- " bullets, "1. " numbered steps.
function RichText({ text, id }) {
  const blocks = [];
  let list = null;
  text.split('\n').forEach((raw) => {
    const line = raw.trim();
    if (!line) { list = null; return; }
    const ul = line.match(/^[-•]\s+(.*)$/);
    const ol = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (ul || ol) {
      const type = ul ? 'ul' : 'ol';
      if (!list || list.type !== type) { list = { type, start: ol ? Number(ol[1]) : 1, items: [] }; blocks.push(list); }
      list.items.push(ul ? ul[1] : ol[2]);
      return;
    }
    list = null;
    blocks.push({ type: 'p', text: line });
  });
  const body = { color: 'var(--text-body)', lineHeight: 1.8 };
  return blocks.map((b, i) => {
    const key = `${id}-${i}`;
    if (b.type === 'p') return <p key={key} style={{ ...body, marginBottom: 8 }}>{inline(b.text, key)}</p>;
    const Tag = b.type;
    return (
      <Tag key={key} start={b.type === 'ol' ? b.start : undefined} style={{ ...body, margin: '0 0 12px', paddingInlineStart: 24 }}>
        {b.items.map((it, j) => <li key={`${key}-${j}`} style={{ marginBottom: 6 }}>{inline(it, `${key}-${j}`)}</li>)}
      </Tag>
    );
  });
}

export default function CountryGuidePage() {
  const { slug } = useParams();
  const { lang, urlLang, arrow } = useLang();
  const guidesReady = useGuidesReady();
  const guide = localizeGuide(getCountryGuide(slug), lang);
  const tr = (key, vars) => t(key, lang, vars);
  const country = getCountry(slug);
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields]  = useState({ name: '', company: '', email: '', message: '' });
  const [msgError, setMsgError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  if (!guidesReady) return null; // the guide text is still loading
  if (!guide) return <Navigate to="/employer-guide" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = fields.message.trim();
    if (!msg) { setMsgError(tr('cf.err_msg_req')); return; }
    if (msg.length < 20) { setMsgError(tr('cf.err_msg_short')); return; }
    setMsgError('');
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch('https://contact-form.bhuiyanrezaul71.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name, email: fields.email,
          company: fields.company,
          service: `Country Guide Request — ${guide.country}`,
          message: msg,
          formType: 'country_guide',
        }),
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch { setError(true); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">{tr('common_home')}</Link><span>›</span>
              <Link to="/employer-guide">{tr('gd.crumb')}</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{guide.country}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: '3rem' }}>{guide.flag}</span>
              <div>
                <div className="label-tag" style={{ marginBottom: 6 }}>{tr('gd.crumb')}</div>
                <h1 style={{ margin: 0 }}>{tr('gd.h1', { country: guide.country })}</h1>
              </div>
            </div>
            <p lang={guide.lang} dir={guide.dir}>{guide.intro}</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Guide Content */}
            <div>
              {guide.restricted && (
                <div role="note" lang="en" dir="ltr" style={{ background: '#fff7e6', border: '1px solid #f0c36d', borderInlineStart: '4px solid #d9822b', borderRadius: 'var(--radius)', padding: '16px 20px', marginBottom: 28 }}>
                  <div style={{ fontWeight: 700, color: '#8a4b08', marginBottom: 6 }}>Currently restricted: confirm before you spend any money</div>
                  <p style={{ margin: 0, color: '#5c3a0a', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {guide.status.charAt(0).toUpperCase() + guide.status.slice(1)}{/[.!?]$/.test(guide.status) ? '' : '.'} Read section 1 of the guide first.
                  </p>
                </div>
              )}

              {guide.lang !== 'en' && guide.summary?.length > 0 && (
                <details open lang="en" dir="ltr" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: '14px 20px', marginBottom: 32 }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--navy)' }}>English summary</summary>
                  <ul style={{ color: 'var(--text-body)', lineHeight: 1.7, margin: '12px 0 8px', paddingInlineStart: 20, fontSize: '0.92rem' }}>
                    {guide.summary.map((s, k) => <li key={`sum-${k}`} style={{ marginBottom: 4 }}>{s}</li>)}
                  </ul>
                  <p style={{ margin: 0, color: 'var(--gray-500)', fontSize: '0.8rem' }}>
                    The full guide below is published in {GUIDE_LANG_NAMES[guide.lang] || guide.lang}.
                  </p>
                </details>
              )}

              <div lang={guide.lang} dir={guide.dir}>
                {guide.sections.map((section, i) => (
                  <div key={`sec-${i}`} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < guide.sections.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: 16 }}>
                      {section.title}
                    </h2>
                    <RichText text={section.content} id={`s${i}`} />
                  </div>
                ))}
                {guide.disclaimer && (
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 24 }}>{guide.disclaimer}</p>
                )}
              </div>

              {country && (
                <div style={{ background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius-lg)', padding: 28, marginTop: 16 }}>
                  <h3 style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
                    {guide.flag} {tr('gd.details_title', { country: guide.country })}
                  </h3>
                  <p style={{ color: 'var(--gray-500)', marginBottom: 20, fontSize: '0.9rem' }}>
                    {tr('gd.details_text', { country: guide.country })}
                  </p>
                  <Link to={`/countries/${slug}`} className="btn btn-primary">
                    {tr('gd.details_btn', { country: guide.country })}
                  </Link>
                </div>
              )}
            </div>

            {/* Sticky Lead Form */}
            <div style={{ position: 'sticky', top: 100 }}>
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: 32, border: '1px solid rgba(201,168,76,0.2)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
                    <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', marginBottom: 8, fontSize: '1.2rem' }}>{tr('gd.received')}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      {tr('gd.received_text', { country: guide.country })}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="label-tag" style={{ marginBottom: 12 }}>{tr('gd.proposal_tag')}</div>
                    <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 8 }}>
                      {tr('gd.recruit_for', { country: guide.country })}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: 24, lineHeight: 1.6 }}>
                      {tr('gd.proposal_text')}
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div>
                        <label htmlFor="cg-name" style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{tr('gd.your_name')}</label>
                        <input id="cg-name" type="text" required placeholder={tr('gd.your_name')}
                          value={fields.name}
                          onChange={e => setFields(p => ({ ...p, name: e.target.value }))}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cg-company" style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{tr('gd.company_name')}</label>
                        <input id="cg-company" type="text" required placeholder={tr('gd.company_name')}
                          value={fields.company}
                          onChange={e => setFields(p => ({ ...p, company: e.target.value }))}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cg-email" style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{tr('gd.work_email')}</label>
                        <input id="cg-email" type="email" required placeholder={tr('gd.work_email')}
                          value={fields.email}
                          onChange={e => setFields(p => ({ ...p, email: e.target.value }))}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cg-message" style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{tr('cf.message')}</label>
                        <textarea id="cg-message" rows={4} required placeholder={tr('cf.message_ph')}
                          value={fields.message}
                          onChange={e => setFields(p => ({ ...p, message: e.target.value }))}
                          aria-invalid={msgError ? 'true' : undefined}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                        {msgError && <span role="alert" style={{ color: '#fc8181', fontSize: '0.8rem' }}>{msgError}</span>}
                      </div>
                      {error && (
                        <div role="alert" style={{ color: '#e53e3e', fontSize: '0.85rem' }}>
                          Something went wrong. Please try again, or email <a href="mailto:info@bhuiyanworkforce.com" style={{ color: '#e53e3e', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>.
                        </div>
                      )}
                      <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                        {submitting ? tr('cf.sending') : tr('gd.get_btn', { country: guide.country })}
                      </button>
                    </form>
                  </>
                )}
              </div>

              <div style={{ marginTop: 20, background: 'var(--off-white)', borderRadius: 'var(--radius)', padding: 20, border: '1px solid var(--gray-100)', maxHeight: 340, overflowY: 'auto' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-500)', marginBottom: 12 }}>{tr('gd.other_guides')}</div>
                {Object.entries(COUNTRY_GUIDES).map(([s, g]) => [s, [g.flag, g.country]])
                  .filter(([s]) => s !== slug)
                  .map(([s, [flag, en]]) => (
                    <Link key={s} to={`/employer-guide/${s}`} style={{ display: 'block', color: 'var(--gold)', fontSize: '0.85rem', padding: '6px 0', textDecoration: 'none', borderBottom: '1px solid var(--gray-100)' }}>
                      {flag} {countryName(urlLang, s, en)} {arrow}
                    </Link>
                  ))
                }
                <Link to="/employer-guide" style={{ display: 'block', color: 'var(--gray-500)', fontSize: '0.8rem', marginTop: 10, textDecoration: 'none' }}>
                  {tr('gd.view_all')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
