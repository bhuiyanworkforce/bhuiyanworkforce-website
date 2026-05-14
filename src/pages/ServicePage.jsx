import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getService, SERVICES } from '../data/services';

export default function ServicePage() {
  const { slug } = useParams();
  const service  = getService(slug);

  useEffect(() => {
    if (!service) return;

    const title = `${service.name} Workers from Bangladesh — Bhuiyan Workforce Ltd.`;
    const description = `Hire skilled Bangladeshi ${service.name.toLowerCase()} workers. ${service.shortDesc} BMET-compliant, fast deployment to ${service.countries?.slice(0, 3).join(', ')} and more.`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://bhuiyanworkforce.com/services/${slug}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://bhuiyanworkforce.com/services/${slug}`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.shortDesc,
      url: `https://bhuiyanworkforce.com/services/${slug}`,
      provider: {
        '@type': 'Organization',
        name: 'Bhuiyan Workforce Ltd.',
        url: 'https://bhuiyanworkforce.com',
      },
      areaServed: service.countries,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bhuiyanworkforce.com/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://bhuiyanworkforce.com/#services' },
          { '@type': 'ListItem', position: 3, name: service.name, item: `https://bhuiyanworkforce.com/services/${slug}` },
        ],
      },
    };

    let script = document.querySelector('#jsonld-service');
    if (!script) {
      script = document.createElement('script');
      script.id = 'jsonld-service';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => { document.querySelector('#jsonld-service')?.remove(); };
  }, [service, slug]);

  if (!service) return <Navigate to="/" replace />;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/#services">Services</Link><span>›</span>
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
              <div className="service-detail-image">
                <img src={service.image.replace('q=80', 'q=80&fm=webp')} alt={`${service.name} workers`} loading="lazy" decoding="async" />
              </div>

              <div className="service-sidebar">
                <h3>Ready to Hire?</h3>
                <p>Tell us your worker count, required trades, destination country, and timeline. We'll respond within 24 hours.</p>
                <Link
                  to="/#contact"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Workers →
                </Link>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ marginBottom: 8, fontSize: '0.82rem' }}>Or reach us directly:</p>
                  <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: 6 }}>
                    💬 WhatsApp: +880 1864 567912
                  </a>
                  <a href="mailto:info@bhuiyanworkforce.com"
                    style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
                    ✉️ info@bhuiyanworkforce.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="prose">
              <h2>Overview</h2>
              {service.overview.split('\n\n').map((para) => <p key={para.slice(0, 40)}>{para}</p>)}

              <h2>Roles &amp; Skills We Supply</h2>
              <ul>{service.roles.map(r => <li key={r}>{r}</li>)}</ul>

              <h2>Countries Deployed</h2>
              <p>We currently deploy {service.name.toLowerCase()} to the following destinations:</p>
              <div className="countries-deployed">
                {service.countries.map(c => <span key={c} className="country-tag">{c}</span>)}
              </div>

              <h2>Hiring Process</h2>
              <p>Our end-to-end process ensures you receive compliant, prepared workers with minimal administrative burden:</p>
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
            <h2 className="section-title">Other Services</h2>
            <p className="section-subtitle">Explore our other workforce categories.</p>
          </div>
          <div className="services-grid">
            {SERVICES.filter(s => s.slug !== slug).slice(0, 3).map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="service-card">
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.shortDesc}</p>
                <span className="service-card-link">View details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
