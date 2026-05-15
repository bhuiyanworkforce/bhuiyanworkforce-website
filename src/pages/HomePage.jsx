import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
const WorldMap = lazy(() => import('../components/WorldMap'));
import { SERVICES } from '../data/services';
import { COUNTRIES } from '../data/countries';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

const go = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Founding slots remaining — update this number as slots fill
const FOUNDING_SLOTS_REMAINING = 10;

export default function HomePage() {
  const { lang } = useLang();

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">{t('home_eyebrow', lang)}</div>
              <h1 className="hero-title">
                {t('home_title1', lang)}
                <span>{t('home_title2', lang)}</span>
              </h1>
              <p className="hero-desc">{t('home_desc', lang)}</p>
              <div className="hero-actions">
                <button className="btn btn-primary"   onClick={() => go('contact')}>{t('home_find_workers', lang)}</button>
                <button className="btn btn-secondary" onClick={() => go('services')}>{t('home_our_services', lang)}</button>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75&fm=webp&auto=compress"
                alt="Construction workers on a job site"
                className="hero-image-main"
                fetchPriority="high"
                decoding="async"
                width="800"
                height="534"
              />
              <div className="hero-badge">
                <div className="num">25+</div>
                <div className="lbl">{t('home_stats_countries', lang)}</div>
              </div>
              <div className="hero-flags">
                <span>20</span> {t('home_stats_sectors', lang)}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">Scroll</div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-band" aria-label="Key statistics">
        <div className="container">
          <div className="stats-grid">
            {[
              { num: '25+',       label: t('home_stats_countries', lang) },
              { num: '20',        label: t('home_stats_sectors', lang) },
              { num: '24h',       label: t('home_stats_response', lang) },
              { num: 'Oct 2026',  label: t('home_stats_bmet', lang) },
            ].map(s => (
              <div className="stat-item" key={s.label}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES DECK CTA ── */}
      <section style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '32px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: '2.2rem', flexShrink: 0 }}>📄</span>
              <div>
                <div className="label-tag" style={{ marginBottom: 6 }}>For Employers</div>
                <p style={{ color: 'var(--white)', fontWeight: 600, margin: '0 0 4px', fontSize: '1rem' }}>
                  Download Our Capabilities Deck
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', margin: 0 }}>
                  Full overview of services, destinations, recruitment process &amp; team — ready to share with your procurement or HR team.
                </p>
              </div>
            </div>
<a 
  href="/capabilities.pdf" 
  download="Bhuiyan_Workforce_Capabilities.pdf"
  className="btn btn-primary" 
  style={{ flexShrink: 0 }}
>
  View &amp; Print Capabilities →
</a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-header">
            <div className="label-tag">{t('home_services_tag', lang)}</div>
            <h2 className="section-title">{t('home_services_title', lang)}</h2>
            <p className="section-subtitle">{t('home_services_sub', lang)}</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="service-card">
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.shortDesc}</p>
                <span className="service-card-link">{t('common_view_det', lang)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTRIES ── */}
      <section className="section countries">
        <div className="container">
          <div className="section-header">
            <div className="label-tag">{t('home_countries_tag', lang)}</div>
            <h2 className="section-title">{t('home_countries_title', lang)}</h2>
            <p className="section-subtitle">{t('home_countries_sub', lang)}</p>
          </div>
          <div className="countries-map-visual">
            <Suspense fallback={<div style={{ height: 500, background: '#060f1e', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Loading map…</div>}>
              <WorldMap countries={COUNTRIES} />
            </Suspense>
            <div className="countries-grid" style={{ marginTop: 32 }}>
              {COUNTRIES.map(c => (
                <Link key={c.slug} to={`/countries/${c.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="country-chip" style={{ cursor: 'pointer' }}>
                    <span className="flag" aria-hidden="true">{c.flag}</span>
                    {c.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/countries" className="btn btn-outline">
              {t('home_view_countries', lang)}
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="section how-we-work">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center' }}>
            <div className="label-tag">{t('home_process_tag', lang)}</div>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>{t('home_process_title', lang)}</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)', margin: '12px auto 0' }}>
              {t('home_process_sub', lang)}
            </p>
          </div>

          <div className="process-steps">
            {[
              { n: '01', title: 'Enquiry & Brief',    desc: 'Tell us your requirements: trade category, worker count, destination, timeline. We respond within 24 hours.' },
              { n: '02', title: 'Candidate Matching', desc: 'We screen our database, conduct trade tests, and present a verified shortlist within 7 working days of licence activation.' },
              { n: '03', title: 'Documentation',      desc: 'We manage BMET registration, visas, medical clearances, and all government approvals end-to-end.' },
              { n: '04', title: 'Deployment',         desc: 'Workers depart with full documentation, pre-departure training completed, and briefed on your standards.' },
            ].map(step => (
              <div className="process-step" key={step.n}>
                <div className="process-step-num" aria-hidden="true">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="trust-badges">
            {[
              { icon: '🏛️', title: 'BMET Registration',       body: 'All workers are sourced and screened to full BMET standards. Our recruiting licence activates October 2026 — built compliance-first from day one.' },
              { icon: '🩺', title: 'GAMCA Medical Cleared',   body: 'Every worker undergoes a full GAMCA medical fitness test before departure for Gulf destinations.' },
              { icon: '📋', title: 'Transparent Contracts',   body: 'Workers receive a verified employment contract in Bengali before they sign, clearly stating salary, hours, accommodation, and contract duration.' },
            ].map(b => (
              <div className="trust-badge" key={b.title}>
                <span className="trust-badge-icon" aria-hidden="true">{b.icon}</span>
                <div><h4>{b.title}</h4><p>{b.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section why-us" id="why-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-image">
              <img
                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&q=80"
                alt="Professional business meeting"
              />
              <div className="why-image-overlay">
                {[
                  { num: '25+', lbl: 'Deploy Countries' },
                  { num: '24h', lbl: 'Response Time' },
                  { num: '20',  lbl: 'Trade Categories' },
                ].map(s => (
                  <div className="why-image-stat" key={s.lbl}>
                    <div className="num">{s.num}</div>
                    <div className="lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="label-tag">Why Choose Bhuiyan</div>
              <h2 className="section-title" style={{ marginBottom: 32 }}>Recruitment Done Right</h2>
              <div className="why-features">
                {[
                  { icon: '✅', title: 'End-to-End Compliance',   body: 'We handle every step: BMET clearance, GAMCA medicals, visa processing, and contracts. Workers are ready to work on day one.' },
                  { icon: '⚡', title: 'Fast Mobilisation',        body: 'Our pre-registered database means we can present a qualified shortlist within 7 working days of licence activation.' },
                  { icon: '🔍', title: 'Verified Skills',          body: 'Every candidate undergoes a practical trade test and background check. You only see workers who genuinely meet the requirements.' },
                  { icon: '🤝', title: 'Ethical by Design',        body: 'We follow ILO ethical recruitment principles: zero worker-paid fees, transparent contracts in their language, and welfare follow-up post-deployment.' },
                  { icon: '🌍', title: 'Destination Expertise',    body: 'With deployment corridors across 25 countries, we understand the specific documentation and regulatory requirements of each market.' },
                ].map(f => (
                  <div className="why-feature" key={f.title}>
                    <div className="why-feature-icon" aria-hidden="true">{f.icon}</div>
                    <div><h4>{f.title}</h4><p>{f.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDING EMPLOYER PROGRAM ── */}
      <section style={{ background: 'var(--off-white)', borderTop: '4px solid var(--gold)', borderBottom: '1px solid var(--gray-100)', padding: '64px 0' }} id="founding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="label-tag" style={{ marginBottom: 16 }}>{t('founding_tag', lang)}</div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>{t('founding_title', lang)}</h2>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 32 }}>
                {t('founding_desc', lang)}
              </p>
              <button className="btn btn-primary" onClick={() => go('contact')}>
                {t('founding_cta', lang)}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Slot counter */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 8 }}>Slots Available</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1 }}>{FOUNDING_SLOTS_REMAINING}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 4 }}>{t('founding_slots', lang)}</div>
                </div>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>🏆</div>
              </div>
              {/* Benefits */}
              {[
                { icon: '⚡', text: 'Priority mobilisation — first in queue when licence activates' },
                { icon: '📋', text: 'Guaranteed shortlist within 7 working days of licence activation' },
                { icon: '🤝', text: 'Direct line to the founder for your first placement' },
                { icon: '🔒', text: 'No obligation — reserve your slot, review when ready' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: 'var(--white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>{b.icon}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--navy)', fontWeight: 500, lineHeight: 1.5 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div>
              <h2>Ready to Fill Your Vacancies?</h2>
              <p>Tell us your requirements and we'll have a shortlist ready within the week.</p>
            </div>
            <button className="btn btn-navy" onClick={() => go('contact')} style={{ flexShrink: 0 }}>
              {t('common_contact', lang)} →
            </button>
          </div>
        </div>
      </section>

      {/* ── WORKER CTA ── */}
      <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: '3rem', flexShrink: 0 }}>👷</span>
              <div>
                <div className="label-tag" style={{ marginBottom: 8 }}>For Workers</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1.3rem', margin: '0 0 6px' }}>
                  Looking for Work Abroad?
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', margin: 0 }}>
                  Register your interest in international employment. Our team reviews all applications and contacts shortlisted candidates within 3–5 working days.
                </p>
              </div>
            </div>
            <Link to="/apply" className="btn btn-primary" style={{ flexShrink: 0 }}>
              {t('nav_apply', lang)} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section contact" id="contact">
        <div className="container">
          <div className="section-header">
            <div className="label-tag">Get In Touch</div>
            <h2 className="section-title">Start Your Recruitment</h2>
            <p className="section-subtitle">Send us your requirements and we'll respond within 24 hours.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3>Contact Details</h3>
              <p>We welcome enquiries from employers, recruitment agents, and government bodies. For urgent requirements, WhatsApp or call us directly.</p>
              <div className="contact-items">
                {[
                  { icon: '📍', label: 'Office Address', content: (
                    <span>Kawtoli, Brahmanbaria, Bangladesh — 3400</span>
                  )},
                  { icon: '✉️', label: 'General Enquiries', content: (
                    <a href="mailto:info@bhuiyanworkforce.com">info@bhuiyanworkforce.com</a>
                  )},
                  { icon: '🤝', label: 'Partnerships & Companies', content: (
                    <a href="mailto:partnerships@bhuiyanworkforce.com">partnerships@bhuiyanworkforce.com</a>
                  )},
                  { icon: '👤', label: 'Founder & CEO', content: (
                    <a href="mailto:Rezaul@bhuiyanworkforce.com">Rezaul@bhuiyanworkforce.com</a>
                  )},
                  { icon: '👷', label: 'For Workers (Careers)', content: (
                    <>
                      <a href="mailto:careers@bhuiyanworkforce.com">careers@bhuiyanworkforce.com</a>
                      <a href="https://wa.me/8801978356710" target="_blank" rel="noopener noreferrer">WhatsApp: +880 1978 356710</a>
                    </>
                  )},
                  { icon: '📞', label: 'Phone (Employers)', content: <a href="tel:+8801864567912">+880 1864 567912</a> },
                  { icon: '💬', label: 'WhatsApp (Employers)', content: <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a> },
                  { icon: '🕐', label: 'Response Time', content: <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--navy)' }}>Within 24 hours, 7 days a week</span> },
                ].map(item => (
                  <div className="contact-item" key={item.label}>
                    <div className="contact-item-icon" aria-hidden="true">{item.icon}</div>
                    <div className="contact-item-content">
                      <div className="label">{item.label}</div>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
