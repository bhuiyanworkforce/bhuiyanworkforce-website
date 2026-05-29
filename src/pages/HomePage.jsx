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
  else globalThis.location.href = '/#' + id;
};

const FOUNDING_SLOTS_REMAINING = 10;

/* ── Particle Field ─────────────────────────────────────────────────────── */
function ParticleField() {
  const particles = React.useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 2,
    dur: 4 + Math.random() * 6,
    delay: Math.random() * 4,
  })), []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: '50%',
          background: 'rgba(201,168,76,0.55)',
          animation: `particleFloat ${p.dur}s ${p.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
      <style>{`
        @keyframes particleFloat {
          from { transform: translateY(0) translateX(0); opacity: 0.1; }
          to   { transform: translateY(-16px) translateX(8px); opacity: 0.45; }
        }
        @keyframes heroStreak {
          0%   { transform: scaleX(0); opacity: 0; transform-origin: left; }
          60%  { opacity: 1; }
          100% { transform: scaleX(1); opacity: 0.7; transform-origin: left; }
        }
        @keyframes heroStagger {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        .hero-left-item { opacity: 0; animation: heroStagger 0.7s ease forwards; }
        .hero-left-item:nth-child(1) { animation-delay: 0.1s; }
        .hero-left-item:nth-child(2) { animation-delay: 0.25s; }
        .hero-left-item:nth-child(3) { animation-delay: 0.4s; }
        .hero-left-item:nth-child(4) { animation-delay: 0.55s; }
        .hero-left-item:nth-child(5) { animation-delay: 0.7s; }
        .hero-right-anim { opacity: 0; animation: heroStagger 0.8s 0.5s ease forwards; }
        .hero-streak-line {
          position: absolute; top: 28%; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.6) 40%, rgba(232,201,122,0.9) 65%, transparent);
          transform: scaleX(0); transform-origin: left;
          animation: heroStreak 1.6s 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .bw-pulse-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0;
          animation: bwPulse 2s ease-in-out infinite;
        }
        @keyframes bwPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        .bw-stat-glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 18px 14px; text-align: center;
        }
        .bw-stat-glass .num { font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; color: var(--gold); line-height: 1; }
        .bw-stat-glass .lbl { font-size: 0.62rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); margin-top: 6px; }
        .bw-hero-img-card {
          border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(201,168,76,0.2);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
          animation: imageFloat 6s ease-in-out infinite;
        }
        .bw-badge-tr {
          position: absolute; top: -16px; right: -16px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          border-radius: 14px; padding: 12px 18px; text-align: center;
        }
        .bw-badge-bl {
          position: absolute; bottom: -16px; left: -16px;
          background: rgba(8,25,46,0.92); border: 1px solid rgba(201,168,76,0.25);
          border-radius: 14px; padding: 12px 18px; text-align: center;
          backdrop-filter: blur(8px);
        }
        .bw-badge-tr .num, .bw-badge-bl .num {
          font-family: var(--font-display); font-size: 1.5rem; font-weight: 900; line-height: 1;
        }
        .bw-badge-tr .num { color: var(--navy); }
        .bw-badge-bl .num { color: var(--gold); }
        .bw-badge-tr .lbl, .bw-badge-bl .lbl {
          font-size: 0.55rem; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px;
        }
        .bw-badge-tr .lbl { color: rgba(15,39,68,0.8); }
        .bw-badge-bl .lbl { color: rgba(255,255,255,0.5); }
        .bw-founding-strip {
          background: linear-gradient(135deg, #c9a84c, #b8942a, #d4af5a);
          position: relative; overflow: hidden; padding: 28px 0;
        }
        .bw-founding-strip::before {
          content: ''; position: absolute; inset: 0;
          background: repeating-linear-gradient(45deg, transparent 20px, rgba(255,255,255,0.04) 21px);
        }
        .bw-founding-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; position: relative; flex-wrap: wrap;
        }
        .bw-limited-badge {
          background: rgba(15,39,68,0.85); color: var(--gold);
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 4px; white-space: nowrap;
        }
        .bw-founding-btn {
          background: var(--navy); color: var(--gold); border: none;
          padding: 11px 24px; border-radius: 8px; font-family: var(--font-body);
          font-weight: 700; font-size: 0.88rem; cursor: pointer; white-space: nowrap;
          transition: background 0.2s;
        }
        .bw-founding-btn:hover { background: var(--navy-light); }
        .bw-founding-benefit {
          display: flex; align-items: flex-start; gap: 14px;
          background: white; border: 1px solid var(--gray-100);
          border-radius: var(--radius); padding: 16px 20px;
        }
        .bw-worker-cta {
          background: var(--navy); border-top: 1px solid rgba(255,255,255,0.06); padding: 48px 0;
        }
        @media (max-width: 900px) {
          .bw-hero-right { display: none !important; }
          .bw-hero-grid { grid-template-columns: 1fr !important; }
          .bw-founding-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLang();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero" style={{ position: 'relative' }}>
        {/* Subtle gold streak */}
        <div className="hero-streak-line" />
        <ParticleField />

        <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="bw-hero-grid hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="hero-left-item hero-eyebrow">{t('home_eyebrow', lang)}</div>

              <h1 className="hero-left-item hero-title">
                {t('home_title1', lang)}<br />
                <span>{t('home_title2', lang)}</span>
              </h1>

              <div className="hero-left-item">
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 100, padding: '7px 16px',
                  fontSize: '0.72rem', color: 'var(--gold-light)',
                }}>
                  <span className="bw-pulse-dot" />
                  {t('home_stats_bmet', lang)}
                </div>
              </div>

              <p className="hero-left-item hero-desc">{t('home_desc', lang)}</p>

              <div className="hero-left-item hero-actions">
                <button className="btn btn-primary" onClick={() => go('contact')}>
                  {t('home_find_workers', lang)}
                </button>
                <button className="btn btn-secondary" onClick={() => go('services')}>
                  {t('home_our_services', lang)}
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="bw-hero-right hero-right-anim" style={{ position: 'relative' }}>
              <div className="bw-hero-img-card" style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75&fm=webp&auto=compress"
                  alt="Construction workers on a job site"
                  style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
                  fetchPriority="high"
                  decoding="async"
                  width="800"
                  height="380"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(8,25,46,0.85) 0%, transparent 50%)',
                }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.08em' }}>
                    // verified deployment
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                    25+ destination countries · 20 trade categories
                  </div>
                </div>
                <div className="bw-badge-tr">
                  <div className="num">24h</div>
                  <div className="lbl">Response</div>
                </div>
                <div className="bw-badge-bl">
                  <div className="num">7</div>
                  <div className="lbl">Day Shortlist</div>
                </div>
              </div>

              {/* Mini stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 32 }}>
                {[
                  { num: '25+', lbl: t('home_stats_countries', lang) },
                  { num: '20',  lbl: t('home_stats_sectors', lang) },
                  { num: '100%', lbl: 'Ethical' },
                ].map(s => (
                  <div className="bw-stat-glass" key={s.lbl}>
                    <div className="num">{s.num}</div>
                    <div className="lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">Scroll</div>
      </section>

      {/* ── FOUNDING EMPLOYER STRIP ──────────────────────────────────────────── */}
      <div className="bw-founding-strip">
        <div className="container">
          <div className="bw-founding-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span className="bw-limited-badge">Limited</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}>
                  {t('founding_tag', lang)} — {FOUNDING_SLOTS_REMAINING} slots remaining
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(15,39,68,0.7)', marginTop: 2 }}>
                  Priority mobilisation · Direct founder access · No obligation
                </div>
              </div>
            </div>
            <button className="bw-founding-btn" onClick={() => go('contact')}>
              {t('founding_cta', lang)} →
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS BAND ───────────────────────────────────────────────────────── */}
      <section className="stats-band" aria-label="Key statistics">
        <div className="container">
          <div className="stats-grid">
            {[
              { num: '25+', label: t('home_stats_countries', lang) },
              { num: '20',  label: t('home_stats_sectors', lang) },
              { num: '24h', label: t('home_stats_response', lang) },
              { num: 'Oct 2026', label: 'BMET Licence' },
            ].map(s => (
              <div className="stat-item" key={s.label}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES DECK CTA ────────────────────────────────────────────── */}
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
              Download Capabilities PDF →
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-header">
            <div className="label-tag">{t('home_services_tag', lang)}</div>
            <h2 className="section-title">{t('home_services_title', lang)}</h2>
            <p className="section-subtitle">{t('home_services_sub', lang)}</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => {
              // Convert Google Drive uc?export=view URLs to thumbnail URLs that load in browsers
              const imgSrc = s.image
                ? s.image.replace('https://drive.google.com/uc?export=view&id=', 'https://lh3.googleusercontent.com/d/')
                : null;
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
                  {imgSrc && (
                    <div style={{ width: '100%', height: 180, overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src={imgSrc}
                        alt={s.name}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  )}
                  <div style={{ padding: '28px 28px 24px' }}>
                    <div className="service-icon" aria-hidden="true">{s.icon}</div>
                    <h3>{s.name}</h3>
                    <p>{s.shortDesc}</p>
                    <span className="service-card-link">{t('common_view_det', lang)} →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COUNTRIES ────────────────────────────────────────────────────────── */}
      <section className="section countries">
        <div className="container">
          <div className="section-header">
            <div className="label-tag">{t('home_countries_tag', lang)}</div>
            <h2 className="section-title">{t('home_countries_title', lang)}</h2>
            <p className="section-subtitle">{t('home_countries_sub', lang)}</p>
          </div>
          <div className="countries-map-visual">
            <Suspense fallback={
              <div style={{ height: 500, background: '#060f1e', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>
                Loading map…
              </div>
            }>
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

      {/* ── HOW WE WORK ──────────────────────────────────────────────────────── */}
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
              { icon: '🏛️', title: 'BMET Registration',     body: 'All workers are sourced and screened to full BMET standards. Our recruiting licence activates October 2026 — built compliance-first from day one.' },
              { icon: '🩺', title: 'GAMCA Medical Cleared', body: 'Every worker undergoes a full GAMCA medical fitness test before departure for Gulf destinations.' },
              { icon: '📋', title: 'Transparent Contracts', body: 'Workers receive a verified employment contract in Bengali before they sign, clearly stating salary, hours, accommodation, and contract duration.' },
            ].map(b => (
              <div className="trust-badge" key={b.title}>
                <span className="trust-badge-icon" aria-hidden="true">{b.icon}</span>
                <div><h4>{b.title}</h4><p>{b.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────────── */}
      <section className="section why-us" id="why-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-image">
              <img
                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&q=80"
                alt="Professional business meeting"
                loading="lazy"
              />
              <div className="why-image-overlay">
                {[
                  { num: '25+', lbl: 'Deploy Countries' },
                  { num: '24h', lbl: t('home_stats_response', lang) },
                  { num: '20',  lbl: t('home_stats_sectors', lang) },
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
                  { icon: '✅', title: 'End-to-End Compliance',  body: 'We handle every step: BMET clearance, GAMCA medicals, visa processing, and contracts. Workers are ready to work on day one.' },
                  { icon: '⚡', title: 'Fast Mobilisation',       body: 'Our pre-registered database means we can present a qualified shortlist within 7 working days of licence activation.' },
                  { icon: '🔍', title: 'Verified Skills',         body: 'Every candidate undergoes a practical trade test and background check. You only see workers who genuinely meet the requirements.' },
                  { icon: '🤝', title: 'Ethical by Design',       body: 'We follow ILO ethical recruitment principles: zero worker-paid fees, transparent contracts in their language, and welfare follow-up post-deployment.' },
                  { icon: '🌍', title: 'Destination Expertise',   body: 'With deployment corridors across 25 countries, we understand the specific documentation and regulatory requirements of each market.' },
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

      {/* ── FOUNDING EMPLOYER PROGRAMME ──────────────────────────────────────── */}
      <section
        style={{ background: 'var(--off-white)', borderTop: '4px solid var(--gold)', borderBottom: '1px solid var(--gray-100)', padding: '64px 0' }}
        id="founding"
      >
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
              <div style={{
                background: 'var(--white)', border: '1px solid var(--gray-100)',
                borderRadius: 'var(--radius)', padding: '28px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 8 }}>
                    Slots Available
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>
                    {FOUNDING_SLOTS_REMAINING}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 4 }}>
                    {t('founding_slots', lang)}
                  </div>
                </div>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                  🏆
                </div>
              </div>
              {/* Benefits */}
              {[
                { icon: '⚡', text: 'Priority mobilisation — first in queue when licence activates' },
                { icon: '📋', text: 'Guaranteed shortlist within 7 working days of licence activation' },
                { icon: '🤝', text: 'Direct line to the founder for your first placement' },
                { icon: '🔒', text: 'No obligation — reserve your slot, review when ready' },
              ].map(b => (
                <div key={b.text} className="bw-founding-benefit">
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>{b.icon}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--navy)', fontWeight: 500, lineHeight: 1.5 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────────── */}
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

      {/* ── WORKER CTA ───────────────────────────────────────────────────────── */}
      <section className="bw-worker-cta">
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

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
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
                  { icon: '📍', label: 'Office Address', content: <span>Kawtoli, Brahmanbaria, Bangladesh — 3400</span> },
                  { icon: '✉️', label: 'General Enquiries', content: <a href="mailto:info@bhuiyanworkforce.com">info@bhuiyanworkforce.com</a> },
                  { icon: '🤝', label: 'Partnerships & Companies', content: <a href="mailto:partnerships@bhuiyanworkforce.com">partnerships@bhuiyanworkforce.com</a> },
                  { icon: '👤', label: 'Founder & CEO', content: <a href="mailto:Rezaul@bhuiyanworkforce.com">Rezaul@bhuiyanworkforce.com</a> },
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

            {/* Real ContactForm — keeps Cloudflare Worker endpoint, file upload, validation */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
