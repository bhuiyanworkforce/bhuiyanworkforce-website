import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES, COUNTRY_REGIONS } from '../data/countries';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

export default function CountriesPage() {
  const [activeRegion, setActiveRegion] = useState('All');
  const { lang } = useLang();

  const regions = ['All', ...COUNTRY_REGIONS];
  const filtered = activeRegion === 'All'
    ? COUNTRIES
    : COUNTRIES.filter(c => c.region === activeRegion);

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="label-tag" style={{ marginBottom: 16 }}>Global Reach</div>
            <h1>{t('countries_hero_h1', lang)}</h1>
            <p>{t('countries_hero_sub', lang)}</p>
          </div>
        </div>
      </div>

      {/* Region Filter */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 72, zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 0', scrollbarWidth: 'none' }}>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  border: activeRegion === r ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.15)',
                  background: activeRegion === r ? 'var(--gold)' : 'transparent',
                  color: activeRegion === r ? 'var(--navy)' : 'rgba(255,255,255,0.7)',
                  fontWeight: activeRegion === r ? 700 : 400,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Countries Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filtered.map(country => (
              <Link
                key={country.slug}
                to={`/countries/${country.slug}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.querySelector('.service-card').style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.querySelector('.service-card').style.transform = 'translateY(0)'}
              >
                <div className="service-card" style={{ height: '100%', cursor: 'pointer', transition: 'all 0.25s ease' }}>
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{country.flag}</span>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 4 }}>{country.region}</div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{country.name}</h3>
                    </div>
                  </div>

                  {/* Top 3 sectors */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {country.topSectors.slice(0, 3).map(s => (
                      <span key={s} style={{ padding: '3px 10px', background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 999, fontSize: '0.72rem', color: 'var(--gray-500)', fontWeight: 500 }}>
                        {s}
                      </span>
                    ))}
                    {country.topSectors.length > 3 && (
                      <span style={{ padding: '3px 10px', background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 999, fontSize: '0.72rem', color: 'var(--gray-500)' }}>
                        +{country.topSectors.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    <div style={{ background: 'var(--off-white)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 4 }}>Processing</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{country.processingTime}</div>
                    </div>
                    <div style={{ background: 'var(--off-white)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 4 }}>Visa Type</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{country.visaType.split(' ')[0]} {country.visaType.split(' ')[1]}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{country.documents.length} documents required</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom note */}
          <div style={{ marginTop: 56, textAlign: 'center', padding: '32px', background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-100)' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-body)', marginBottom: 16 }}>
              Don't see your target country? We may still be able to help.
            </p>
            <Link to="/#contact" className="btn btn-primary">Contact Us to Discuss →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
