import React from 'react';
import { Link } from '../i18n/router';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { pageContent } from '../content/pages';

export default function AboutPage() {
  const { lang, urlLang } = useLang();
  const c = pageContent('about', urlLang);
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">{t('common_home', lang)}</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{t('nav_about', lang)}</span>
            </div>
            <h1>{t('about_hero_h1', lang)}</h1>
            <p>{t('about_hero_sub', lang)}</p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="about-mission-grid">
            <div className="about-mission-img">
              <img src="/about-illustration.svg" alt={c.imgAlt} loading="lazy" decoding="async" />
            </div>
            <div>
              <div className="label-tag">{t('about_story_tag', lang)}</div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>{t('about_story_h2', lang)}</h2>
              {c.story.map((p, i) => (
                <p key={i} style={{ color: 'var(--gray-500)', lineHeight: 1.75, marginBottom: i < c.story.length - 1 ? 16 : 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-off-white">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center' }}>
            <div className="label-tag">{t('about_values_tag', lang)}</div>
            <h2 className="section-title">{t('about_values_h2', lang)}</h2>
          </div>
          <div className="values-grid">
            {c.values.map(v => (
              <div className="value-card" key={v.title}>
                <div className="value-icon" aria-hidden="true">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="label-tag">{t('about_team_tag', lang)}</div>
            <h2 className="section-title">{t('about_team_h2', lang)}</h2>
            <p className="section-subtitle">{c.teamIntro}</p>
          </div>
          <div className="team-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {c.team.map(m => (
              <div className="team-card" key={m.name}>
                <div className="team-avatar">
                  {m.photo
                    ? <img src={m.photo} alt={m.name} loading="lazy" decoding="async" />
                    : <span>{m.initials}</span>
                  }
                </div>
                <h4><bdi dir="ltr">{m.name}</bdi></h4>
                <p style={{ fontWeight: 600, color: 'var(--gold)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{m.role}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Partners */}
      <section className="section bg-off-white">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center' }}>
            <div className="label-tag">{c.partnersTag}</div>
            <h2 className="section-title">{c.partnersTitle}</h2>
            <p className="section-subtitle" style={{ maxWidth: 680, margin: '12px auto 0' }}>
              {c.partnersSub}
            </p>
          </div>
          <div className="values-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 40 }}>
            {c.partners.map(p => (
              <div className="value-card" key={p.country}>
                <div className="value-icon" aria-hidden="true" style={{ fontSize: '2rem' }}>{p.flag}</div>
                <p style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{p.region}</p>
                <h3 style={{ marginBottom: 10 }}>{p.country}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div>
              <h2>{c.ctaTitle}</h2>
              <p>{c.ctaDesc}</p>
            </div>
            <Link to="/#contact" className="btn btn-navy">{c.ctaBtn}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
