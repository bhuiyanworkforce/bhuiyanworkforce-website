import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

export default function AboutPage() {
  const { lang } = useLang();
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
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=75&fm=webp&auto=compress" alt="Team meeting" loading="lazy" decoding="async" />
            </div>
            <div>
              <div className="label-tag">{t('about_story_tag', lang)}</div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>{t('about_story_h2', lang)}</h2>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.75, marginBottom: 16 }}>
                Bhuiyan Workforce Ltd. was founded with a straightforward mission: to create transparent, ethical pathways for skilled Bangladeshi workers to access legitimate international employment — while giving overseas employers a reliable, fully compliant recruitment partner.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.75, marginBottom: 16 }}>
                Bangladesh has one of the world's most capable overseas workforces, with millions of citizens working abroad in construction, manufacturing, logistics, and hospitality. Too often, those workers have been exploited by unregulated brokers. We exist to be different.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.75 }}>
                Since our founding, we have deployed workers to 25+ countries across the Gulf, Southeast Asia, East Asia, and Europe — with every placement BMET-registered and fully documented.
              </p>
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
            {[
              { icon: '⚖️', title: 'Ethical Recruitment',    body: 'Workers receive honest, verified job offers in their own language before they commit to anything.' },
              { icon: '🏛️', title: 'Regulatory Compliance',  body: 'Every placement is registered with BMET. Every worker has passed a GAMCA medical. We maintain complete documentation for every deployment.' },
              { icon: '🔍', title: 'Skills Verification',    body: 'Practical trade tests and independent reference checks ensure you receive workers with the skills they claim.' },
              { icon: '🤝', title: 'Long-Term Relationships', body: 'We measure success not by transaction volume but by how many employers return for their next requirement.' },
              { icon: '🌍', title: 'Destination Knowledge',   body: 'Understanding local labour law, visa categories, and cultural context at each destination reduces friction and delays.' },
              { icon: '📣', title: 'Transparency',            body: 'Employers receive clear timelines, honest candidate availability assessments, and a fully itemised cost breakdown before committing to anything.' },
            ].map(v => (
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
            <p className="section-subtitle">Our team combines recruitment expertise, immigration knowledge, and deep sector understanding across all six service categories.</p>
          </div>
          <div className="team-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              {
                photo: '/team-rezaul.webp',
                name: 'MD Rezaul Kabir Bhuiyan',
                role: 'Founder & CEO',
                body: 'Visionary founder with 10+ years in international manpower export. Leads all strategic partnerships and business development.',
              },
              {
                photo: '/team-asraful.webp',
                name: 'Asraful Kabir Bhuiyan',
                role: 'Business Development Manager',
                body: 'Drives employer relationships and new market expansion across Gulf, European, and Asian markets.',
              },
              {
                photo: '/team-kishor.webp',
                name: 'Kishor Kumar',
                role: 'Compliance & Documentation Manager',
                body: 'Ensures every deployment meets BMET, GAMCA, and destination-country legal requirements. Expert in overseas employment documentation.',
              },
              {
                photo: null,
                initials: 'AB',
                name: 'Akhi Begum',
                role: 'Head of Operations',
                body: 'Oversees day-to-day recruitment operations, candidate processing, and ensures every deployment meets compliance standards.',
              },
            ].map(m => (
              <div className="team-card" key={m.name}>
                <div className="team-avatar">
                  {m.photo
                    ? <img src={m.photo} alt={m.name} loading="lazy" decoding="async" />
                    : <span>{m.initials}</span>
                  }
                </div>
                <h4>{m.name}</h4>
                <p style={{ fontWeight: 600, color: 'var(--gold)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{m.role}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{m.body}</p>
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
              <h2>Work With Us</h2>
              <p>We're always happy to discuss your manpower requirements — no obligation.</p>
            </div>
            <Link to="/#contact" className="btn btn-navy">Get In Touch →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
