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
                <span>3+</span> {t('home_stats_years', lang)}
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
              { num: '3+',  label: t('home_stats_years', lang) },
              { num: '25+', label: t('home_stats_countries', lang) },
              { num: '100+',label: t('home_stats_workers', lang) },
              { num: '11',   label: t('home_stats_sectors', lang) },
            ].map(s => (
              <div className="stat-item" key={s.label}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
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
            <div style={{ marginBottom: 32 }}>
              <Suspense fallback={<div style={{ height: 340, background: '#0a1628', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Loading map…</div>}>
                <WorldMap countries={COUNTRIES} />
              </Suspense>
            </div>
            <div className="countries-grid">
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
              { n: '02', title: 'Candidate Matching', desc: 'We screen our database, conduct trade tests, and present a verified shortlist within 5–10 working days.' },
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
              { icon: '🏛️', title: 'BMET Registered',        body: 'All workers are registered with Bangladesh\'s Bureau of Manpower, Employment and Training. Every deployment is fully documented and legally compliant.' },
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
                  { num: '100%', lbl: 'BMET Compliant' },
                  { num: '24h',  lbl: 'Response Time' },
                  { num: '11',    lbl: 'Sectors Covered' },
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
                  { icon: '⚡', title: 'Fast Mobilisation',        body: 'Our pre-registered database means we can present a qualified shortlist within 5–10 working days for most trade categories.' },
                  { icon: '🔍', title: 'Verified Skills',          body: 'Every candidate undergoes a practical trade test and background check. You only see workers who genuinely meet the requirements.' },
                  { icon: '🤝', title: 'Ethical Recruitment',      body: 'We follow all applicable Bangladesh government regulations and maintain transparent recruitment practices.' },
                  { icon: '🌍', title: 'Destination Expertise',    body: 'With deployments across 25 countries, we understand the specific documentation and regulatory requirements of each market.' },
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

      {/* ── LEAD MAGNET ── */}
      <section style={{ background: 'var(--off-white)', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: '3rem', flexShrink: 0 }}>📘</span>
              <div>
                <div className="label-tag" style={{ marginBottom: 8 }}>Free Download</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.3rem', margin: '0 0 6px' }}>
                  The Employer's Complete Guide to Recruiting from Bangladesh
                </h3>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', margin: 0 }}>
                  Visa timelines, legal compliance, trade testing, mobilisation guides — all in one free resource.
                </p>
              </div>
            </div>
            <Link to="/employer-guide" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Download Free Guide →
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
