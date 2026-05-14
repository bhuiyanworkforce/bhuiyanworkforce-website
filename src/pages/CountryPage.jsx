import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getCountry } from '../data/countries';

export default function CountryPage() {
  const { slug } = useParams();
  const country = getCountry(slug);

  useEffect(() => {
    if (!country) return;

    const title = `Hire Workers for ${country.name} — Bhuiyan Workforce Ltd.`;
    const description = `Deploy skilled Bangladeshi workers to ${country.name}. BMET-compliant recruitment covering ${country.topSectors?.slice(0, 3).join(', ')}. Fast mobilisation, full documentation support.`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://bhuiyanworkforce.com/countries/${slug}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://bhuiyanworkforce.com/countries/${slug}`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: `https://bhuiyanworkforce.com/countries/${slug}`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bhuiyanworkforce.com/' },
          { '@type': 'ListItem', position: 2, name: 'Countries', item: 'https://bhuiyanworkforce.com/countries' },
          { '@type': 'ListItem', position: 3, name: country.name, item: `https://bhuiyanworkforce.com/countries/${slug}` },
        ],
      },
    };

    let script = document.querySelector('#jsonld-country');
    if (!script) {
      script = document.createElement('script');
      script.id = 'jsonld-country';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => { document.querySelector('#jsonld-country')?.remove(); };
  }, [country, slug]);

  if (!country) return <Navigate to="/countries" replace />;

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/countries">Countries</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{country.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: '3rem' }}>{country.flag}</span>
              <div>
                <div className="label-tag" style={{ marginBottom: 6 }}>{country.region}</div>
                <h1 style={{ margin: 0 }}>Working in {country.name}</h1>
              </div>
            </div>
            <p>{country.overview}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section style={{ background: 'var(--navy)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { label: 'Capital', value: country.capital },
              { label: 'Currency', value: country.currency },
              { label: 'Visa Type', value: country.visaType },
              { label: 'Processing Time', value: country.processingTime },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center', padding: '20px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 8, fontWeight: 600 }}>{stat.label}</div>
                <div style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.3 }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Left Column */}
            <div>
              <div style={{ marginBottom: 48 }}>
                <div className="label-tag" style={{ marginBottom: 16 }}>Most In-Demand</div>
                <h2 className="section-title" style={{ marginBottom: 24 }}>Top Sectors for Bangladeshi Workers</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {country.topSectors.map((sector, i) => (
                    <div key={sector} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'var(--off-white)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-100)' }}>
                      <div style={{ width: 28, height: 28, background: 'var(--navy)', color: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontWeight: 500, color: 'var(--navy)', fontSize: '0.95rem' }}>{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 48 }}>
                <div className="label-tag" style={{ marginBottom: 16 }}>Financials</div>
                <h2 className="section-title" style={{ marginBottom: 24 }}>Salary Range & Visa Fees</h2>
                <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 16, border: '1px solid var(--gray-100)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 8 }}>Typical Salary Range</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4 }}>{country.salaryRange}</div>
                </div>
                <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid rgba(201,168,76,0.2)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 8 }}>Government Visa Fee</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.4 }}>{country.visaFee}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>* This is the official government visa fee only. Our service charges are separate and discussed directly with you.</div>
                </div>
              </div>

              <div>
                <div className="label-tag" style={{ marginBottom: 16 }}>Important Notes</div>
                <h2 className="section-title" style={{ marginBottom: 20 }}>What You Need to Know</h2>
                <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                  <p style={{ color: 'var(--text-body)', lineHeight: 1.75, margin: 0 }}>{country.notes}</p>
                </div>
                {country.flag_detail && (
                  <div style={{ marginTop: 16, background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>💡</span>
                    <p style={{ color: 'var(--gray-700)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{country.flag_detail}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div style={{ marginBottom: 48 }}>
                <div className="label-tag" style={{ marginBottom: 16 }}>Step by Step</div>
                <h2 className="section-title" style={{ marginBottom: 24 }}>Deployment Process</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {country.process.map((step, i) => (
                    <div key={step.title} style={{ display: 'flex', gap: 16, paddingBottom: 24, position: 'relative' }}>
                      {i < country.process.length - 1 && (
                        <div style={{ position: 'absolute', left: 20, top: 44, bottom: 0, width: 2, background: 'var(--gray-100)' }} />
                      )}
                      <div style={{ width: 40, height: 40, background: 'var(--navy)', color: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0, fontFamily: 'var(--font-display)', zIndex: 1 }}>{i + 1}</div>
                      <div style={{ paddingTop: 8 }}>
                        <h4 style={{ color: 'var(--navy)', marginBottom: 6, fontSize: '1rem', fontWeight: 600 }}>{step.title}</h4>
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="label-tag" style={{ marginBottom: 16 }}>Checklist</div>
                <h2 className="section-title" style={{ marginBottom: 24 }}>Required Documents</h2>
                <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--gray-100)' }}>
                  {country.documents.map(doc => (
                    <div key={doc} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.5 }}>{doc}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--navy)', borderRadius: 'var(--radius)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0 }}>ℹ️</span>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>Bhuiyan Workforce handles the preparation and attestation of all documents on your behalf. Additional documents may be required depending on the specific employer and role.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div>
              <h2>Ready to Deploy Workers to {country.name}?</h2>
              <p>Contact us with your requirements and we'll prepare a detailed proposal within 24 hours.</p>
            </div>
            <Link to="/#contact" className="btn btn-navy">Get In Touch →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
