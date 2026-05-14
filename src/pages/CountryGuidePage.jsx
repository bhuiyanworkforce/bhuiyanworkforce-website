import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getCountryGuide } from '../data/countryGuides';
import { getCountry } from '../data/countries';

export default function CountryGuidePage() {
  const { slug } = useParams();
  const guide = getCountryGuide(slug);
  const country = getCountry(slug);
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields]  = useState({ name: '', company: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!guide) return;

    const title = `Employer's Guide: Recruiting from Bangladesh to ${guide.country} — Bhuiyan Workforce Ltd.`;
    const description = `Complete employer guide for hiring Bangladeshi workers for ${guide.country}. Covers recruitment process, visa requirements, documentation, and employer obligations. BMET-compliant.`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://bhuiyanworkforce.com/employer-guide/${slug}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://bhuiyanworkforce.com/employer-guide/${slug}`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      url: `https://bhuiyanworkforce.com/employer-guide/${slug}`,
      author: {
        '@type': 'Organization',
        name: 'Bhuiyan Workforce Ltd.',
        url: 'https://bhuiyanworkforce.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bhuiyan Workforce Ltd.',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bhuiyanworkforce.com/logo.png',
        },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bhuiyanworkforce.com/' },
          { '@type': 'ListItem', position: 2, name: "Employer's Guide", item: 'https://bhuiyanworkforce.com/employer-guide' },
          { '@type': 'ListItem', position: 3, name: guide.country, item: `https://bhuiyanworkforce.com/employer-guide/${slug}` },
        ],
      },
    };

    let script = document.querySelector('#jsonld-guide');
    if (!script) {
      script = document.createElement('script');
      script.id = 'jsonld-guide';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => { document.querySelector('#jsonld-guide')?.remove(); };
  }, [guide, slug]);

  if (!guide) return <Navigate to="/employer-guide" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('https://contact-form.bhuiyanrezaul71.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name, email: fields.email,
          company: fields.company,
          service: `Country Guide Request — ${guide.country}`,
          message: `Requested the employer guide for ${guide.country}.`,
        }),
      });
      setSubmitted(true);
    } catch { setSubmitted(true); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/employer-guide">Employer's Guide</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{guide.country}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: '3rem' }}>{guide.flag}</span>
              <div>
                <div className="label-tag" style={{ marginBottom: 6 }}>Employer's Guide</div>
                <h1 style={{ margin: 0 }}>Recruiting from Bangladesh to {guide.country}</h1>
              </div>
            </div>
            <p>{guide.intro}</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Guide Content */}
            <div>
              {guide.sections.map((section, i) => (
                <div key={section.title} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < guide.sections.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: 16 }}>
                    {section.title}
                  </h2>
                  {section.content.split('\n').map((line, j) => (
                    line.trim() ? (
                      <p key={`line-${i}-${j}`} style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 8 }}>
                        {line}
                      </p>
                    ) : null
                  ))}
                </div>
              ))}

              {country && (
                <div style={{ background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius-lg)', padding: 28, marginTop: 16 }}>
                  <h3 style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
                    {guide.flag} Full {guide.country} Deployment Details
                  </h3>
                  <p style={{ color: 'var(--gray-500)', marginBottom: 20, fontSize: '0.9rem' }}>
                    View complete visa requirements, document checklist, salary ranges, and step-by-step deployment process for {guide.country}.
                  </p>
                  <Link to={`/countries/${slug}`} className="btn btn-primary">
                    View {guide.country} Country Page →
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
                    <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', marginBottom: 8, fontSize: '1.2rem' }}>Request Received!</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      Our team will be in touch within 24 hours with a tailored proposal for {guide.country}.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="label-tag" style={{ marginBottom: 12 }}>Get a Proposal</div>
                    <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 8 }}>
                      Recruit for {guide.country}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: 24, lineHeight: 1.6 }}>
                      Tell us your requirements and we'll send a tailored recruitment proposal within 24 hours.
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div>
                        <label htmlFor="cg-name" style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Your Name</label>
                        <input id="cg-name" type="text" required placeholder="Your Name"
                          value={fields.name}
                          onChange={e => setFields(p => ({ ...p, name: e.target.value }))}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cg-company" style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Company Name</label>
                        <input id="cg-company" type="text" required placeholder="Company Name"
                          value={fields.company}
                          onChange={e => setFields(p => ({ ...p, company: e.target.value }))}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cg-email" style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Work Email</label>
                        <input id="cg-email" type="email" required placeholder="Work Email"
                          value={fields.email}
                          onChange={e => setFields(p => ({ ...p, email: e.target.value }))}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                        {submitting ? 'Sending…' : `Get ${guide.country} Proposal →`}
                      </button>
                    </form>
                  </>
                )}
              </div>

              <div style={{ marginTop: 20, background: 'var(--off-white)', borderRadius: 'var(--radius)', padding: 20, border: '1px solid var(--gray-100)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-500)', marginBottom: 12 }}>Other Country Guides</div>
                {Object.entries({ 'saudi-arabia': '🇸🇦 Saudi Arabia', 'uae': '🇦🇪 UAE', 'poland': '🇵🇱 Poland' })
                  .filter(([s]) => s !== slug)
                  .map(([s, label]) => (
                    <Link key={s} to={`/employer-guide/${s}`} style={{ display: 'block', color: 'var(--gold)', fontSize: '0.85rem', padding: '6px 0', textDecoration: 'none', borderBottom: '1px solid var(--gray-100)' }}>
                      {label} →
                    </Link>
                  ))
                }
                <Link to="/employer-guide" style={{ display: 'block', color: 'var(--gray-500)', fontSize: '0.8rem', marginTop: 10, textDecoration: 'none' }}>
                  View all guides →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
