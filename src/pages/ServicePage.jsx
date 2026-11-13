import React from 'react';
import { useParams, Link, Navigate } from '../i18n/router';
import { getService, SERVICES } from '../data/services';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { localizeService } from '../content/index.js';

export default function ServicePage() {
  const { slug } = useParams();
  const { lang, arrow } = useLang();
  const service  = localizeService(getService(slug), lang);
  const tr = (key, vars) => t(key, lang, vars);

  if (!service) return <Navigate to="/" replace />;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">{tr('common_home')}</Link><span>›</span>
              <Link to="/#services">{tr('nav_services')}</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{service.name}</span>
            </div>
            <div style={{ fontSize: '3rem', marginBottom: 16 }} aria-hidden="true">{service.icon}</div>
            <h1>{service.name}</h1>
            <p>{service.shortDesc}</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="service-detail-grid">

            {/* Left column */}
            <div>
              {/* Five services (welding, plumbing/HVAC, heavy equipment, marine, domestic) have no image
                  in the data file; without this guard the page crashes instead of rendering. */}
              {service.image && (
                <div className="service-detail-image">
                  <img src={service.image.replace('q=80', 'q=80&fm=webp')} alt={tr('sv.workers_alt', { name: service.name })} loading="lazy" decoding="async" />
                </div>
              )}

              <div className="service-sidebar">
                <h3>{tr('sv.ready_title')}</h3>
                <p>{tr('sv.ready_text')}</p>
                <Link
                  to="/#contact"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {tr('sv.request')}
                </Link>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ marginBottom: 8, fontSize: '0.82rem' }}>{tr('sv.reach')}</p>
                  <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: 6 }}>
                    💬 WhatsApp: <bdi dir="ltr">+880 1864 567912</bdi>
                  </a>
                  <a href="mailto:info@bhuiyanworkforce.com"
                    style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
                    ✉️ <bdi dir="ltr">info@bhuiyanworkforce.com</bdi>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="prose">
              <h2>{tr('sv.overview')}</h2>
              {service.overview.split('\n\n').map((para) => <p key={para.slice(0, 40)}>{para}</p>)}

              <h2>{tr('sv.roles')}</h2>
              <ul>{service.roles.map(r => <li key={r}>{r}</li>)}</ul>

              <h2>{tr('sv.countries')}</h2>
              <p>{tr('sv.countries_intro', { name: service.name.toLowerCase() })}</p>
              <div className="countries-deployed">
                {service.countries.map(c => <span key={c} className="country-tag">{c}</span>)}
              </div>

              <h2>{tr('sv.process')}</h2>
              <p>{tr('sv.process_intro')}</p>
              <ol className="process-list">
                {service.process.map(step => (
                  <li key={step.title}>
                    <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: 4 }}>{step.title}</strong>
                    {step.desc}
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="section bg-off-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{tr('sv.other')}</h2>
            <p className="section-subtitle">{tr('sv.other_sub')}</p>
          </div>
          <div className="services-grid">
            {SERVICES.filter(s => s.slug !== slug).slice(0, 3).map(s => localizeService(s, lang)).map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="service-card">
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.shortDesc}</p>
                <span className="service-card-link">{tr('common_view_det')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
