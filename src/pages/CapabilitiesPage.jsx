import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';

const PROCESS_STEPS = [
  { n: '01', title: 'Requirement Intake', desc: 'We collect detailed job descriptions, skill requirements, visa quotas, salary ranges, and deployment timelines from the client employer.' },
  { n: '02', title: 'Candidate Sourcing', desc: 'We leverage our Bangladesh-wide network of trade professionals, referral partners, and candidate databases to shortlist qualified applicants.' },
  { n: '03', title: 'Screening & Testing', desc: 'Every candidate undergoes trade skill tests, structured interviews, and thorough background verification before being presented to the client.' },
  { n: '04', title: 'Medical Clearance', desc: 'Workers complete mandatory medical fitness examinations at government-approved centres to meet destination country health requirements.' },
  { n: '05', title: 'Documentation & Visa', desc: 'We manage all documentation: passport validation, visa applications, attestation, BMET clearance, and pre-departure orientation.' },
  { n: '06', title: 'Deployment', desc: 'Workers are fully briefed, oriented on destination country norms, and deployed on schedule. Post-arrival follow-up is conducted.' },
];

const WHY_US = [
  { icon: '🎯', title: 'Direct Talent Access', desc: "Tap into Bangladesh's large, motivated labor pool across all major trade and service sectors." },
  { icon: '✅', title: 'Pre-Screened Workers', desc: 'Every candidate is skills-tested, medically cleared, and document-ready before deployment.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Active deployment coverage across 25 countries spanning Middle East, Asia, and Europe.' },
  { icon: '👤', title: 'Dedicated Support', desc: 'Clients receive a dedicated account contact for seamless communication end-to-end.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Streamlined process from requirement submission to worker deployment.' },
  { icon: '📋', title: 'Full Compliance', desc: 'All placements are fully compliant with BMET regulations and destination-country immigration requirements.' },
];

const DESTINATIONS = [
  { region: 'Middle East (7)', countries: 'Saudi Arabia · United Arab Emirates · Qatar · Kuwait · Oman · Bahrain · Jordan' },
  { region: 'Asia Pacific (3)', countries: 'Malaysia · Singapore · Maldives' },
  { region: 'Europe (15)', countries: 'Italy · Portugal · Greece · Slovakia · Latvia · Cyprus · Estonia · Lithuania · Poland · Czech Republic · Bulgaria · Bosnia and Herzegovina · Hungary · Croatia · Romania' },
];

export default function CapabilitiesPage() {
  return (
    <>
      {/* Screen-only hero */}
      <div className="page-hero no-print" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>Capabilities</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div className="label-tag" style={{ marginBottom: 12 }}>For Employers</div>
                <h1 style={{ marginBottom: 12 }}>Bhuiyan Workforce Ltd.</h1>
                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Capabilities & Company Overview</p>
              </div>
              <button onClick={() => globalThis.print()} className="btn btn-primary" style={{ flexShrink: 0 }}>
                🖨️ Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Cover Header — print only */}
      <div className="print-cover-header print-only">
        <div className="print-cover-logo">BHUIYAN WORKFORCE LTD.</div>
        <div className="print-cover-tagline">Capabilities & Company Overview</div>
        <div className="print-cover-meta">bhuiyanworkforce.com · info@bhuiyanworkforce.com · +880 1864 567912</div>
      </div>

      {/* Printable Content */}
      <div id="capabilities-print">

        {/* Intro Band */}
        <div className="intro-band">
          <div className="container">
            <p className="intro-text">
              Connecting Bangladesh's skilled workforce to the world — <strong>25 countries</strong> across Middle East, Asia &amp; Europe.
            </p>
          </div>
        </div>

        {/* About */}
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="about-grid">
              <div>
                <div className="label-tag" style={{ marginBottom: 16 }}>Who We Are</div>
                <h2 className="section-title">About Bhuiyan Workforce Ltd.</h2>
              </div>
              <div>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 16 }}>
                  Bhuiyan Workforce Ltd. is a Bangladesh-based manpower recruitment and export company founded by MD Rezaul Kabir Bhuiyan. We specialise in sourcing, rigorously screening, and deploying skilled, semi-skilled, and general workers to international employers across the Middle East, Asia, and Europe.
                </p>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
                  Built on the principles of transparency, reliability, and ethical recruitment, we act as a dedicated bridge between global labour demand and Bangladesh's large, hardworking, and talent-rich workforce. Our recruitment licence and formal registration are currently in process, positioning us to begin formal placements shortly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Worker Categories */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="label-tag">What We Supply</div>
              <h2 className="section-title">Worker Categories</h2>
              <p className="section-subtitle">Skilled, semi-skilled, and specialist workers across all major trade and service sectors.</p>
            </div>
            <div className="services-grid">
              {SERVICES.map(service => (
                <Link key={service.slug} to={`/services/${service.slug}`} className="service-card-link">
                  <div className="service-card">
                    <div className="service-icon">{service.icon}</div>
                    <h4 className="service-name">{service.name}</h4>
                    <p className="service-desc">{service.shortDesc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Deployment Destinations */}
        <section className="destinations-section">
          <div className="container">
            <div className="section-header">
              <div className="label-tag">Global Reach</div>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>Deployment Destinations — 25 Countries</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {DESTINATIONS.map(d => (
                <div key={d.region} className="destination-row">
                  <div className="destination-region">{d.region}</div>
                  <div className="destination-countries">{d.countries}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recruitment Process */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="label-tag">How It Works</div>
              <h2 className="section-title">Our Recruitment Process</h2>
              <p className="section-subtitle">A structured, transparent 6-step process from requirement intake to worker deployment.</p>
            </div>
            <div className="process-grid">
              {PROCESS_STEPS.map(step => (
                <div key={step.n} className="process-step">
                  <div className="process-number">{step.n}</div>
                  <div>
                    <h4 className="process-title">{step.title}</h4>
                    <p className="process-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-section">
          <div className="container">
            <div className="section-header">
              <div className="label-tag">Our Advantage</div>
              <h2 className="section-title">Why Choose Bhuiyan Workforce?</h2>
            </div>
            <div className="why-grid">
              {WHY_US.map(item => (
                <div key={item.title} className="why-card">
                  <div className="why-icon">{item.icon}</div>
                  <h4 className="why-title">{item.title}</h4>
                  <p className="why-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <section className="contact-footer-section">
          <div className="container">
            <div className="contact-grid">
              {[
                { label: 'Partnerships', value: 'partnerships@bhuiyanworkforce.com', href: 'mailto:partnerships@bhuiyanworkforce.com' },
                { label: 'General Enquiry', value: 'info@bhuiyanworkforce.com', href: 'mailto:info@bhuiyanworkforce.com' },
                { label: 'Mobile / WhatsApp', value: '+880 1864 567912', href: 'tel:+8801864567912' },
                { label: 'Website', value: 'www.bhuiyanworkforce.com', href: 'https://bhuiyanworkforce.com' },
              ].map(item => (
                <div key={item.label} className="contact-card">
                  <div className="contact-label">{item.label}</div>
                  <a href={item.href} className="contact-value">{item.value}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share Link Banner — screen only */}
        <div className="no-print" style={{ background: 'var(--off-white)', borderTop: '1px solid var(--gray-100)', padding: '24px 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--gray-500)' }}>
              Share this capabilities page:{' '}
              <strong style={{ color: 'var(--navy)', marginLeft: 8 }}>bhuiyanworkforce.com/capabilities</strong>
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => { navigator.clipboard.writeText('https://bhuiyanworkforce.com/capabilities'); alert('Link copied!'); }}
                className="btn btn-outline"
                style={{ fontSize: '0.8rem', padding: '8px 16px' }}
              >📋 Copy Link</button>
              <button onClick={() => globalThis.print()} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                🖨️ Print / PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── SCREEN LAYOUT CLASSES ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          align-items: start;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .service-card-link { text-decoration: none; }
        .service-card {
          padding: 20px 22px;
          border-radius: var(--radius);
          border: 1px solid var(--gray-100);
          background: var(--white);
          border-top: 3px solid var(--gold);
          height: 100%;
          transition: box-shadow 0.2s ease;
        }
        .service-card:hover { box-shadow: 0 4px 20px rgba(8,30,63,0.1); }
        .service-icon { font-size: 1.5rem; margin-bottom: 10px; }
        .service-name { color: var(--gold); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .service-desc { color: var(--gray-500); font-size: 0.82rem; line-height: 1.6; margin: 0; }

        .destinations-section { background: var(--navy); padding: 64px 0; }
        .destination-row { display: grid; grid-template-columns: 200px 1fr; gap: 24px; padding: 20px 28px; background: rgba(255,255,255,0.04); border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.08); align-items: center; }
        .destination-region { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gold); background: rgba(201,168,76,0.1); padding: 6px 14px; border-radius: 4px; text-align: center; }
        .destination-countries { color: rgba(255,255,255,0.8); font-size: 0.9rem; line-height: 1.6; }

        .process-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .process-step { display: flex; gap: 20px; padding: 24px; background: var(--off-white); border-radius: var(--radius); border: 1px solid var(--gray-100); }
        .process-number { width: 44px; height: 44px; background: var(--navy); color: var(--gold); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; flex-shrink: 0; }
        .process-title { color: var(--navy); font-weight: 600; margin-bottom: 6px; font-size: 0.95rem; }
        .process-desc { color: var(--gray-500); font-size: 0.85rem; line-height: 1.65; margin: 0; }

        .why-section { background: var(--off-white); padding: 64px 0; }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .why-card { padding: 24px; background: var(--white); border-radius: var(--radius); border: 1px solid var(--gray-100); }
        .why-icon { font-size: 1.75rem; margin-bottom: 12px; }
        .why-title { color: var(--navy); font-weight: 600; margin-bottom: 8px; }
        .why-desc { color: var(--gray-500); font-size: 0.85rem; line-height: 1.65; margin: 0; }

        .contact-footer-section { background: var(--navy); padding: 48px 0; }
        .contact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
        .contact-card { padding: 20px 16px; background: rgba(255,255,255,0.04); border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.08); }
        .contact-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin-bottom: 10px; }
        .contact-value { color: var(--white); font-size: 0.82rem; text-decoration: none; line-height: 1.4; display: block; word-break: break-word; }

        .intro-band { background: var(--off-white); border-top: 4px solid var(--gold); border-bottom: 1px solid var(--gray-100); padding: 32px 0; }
        .intro-text { font-size: 1.1rem; color: var(--navy); font-weight: 500; text-align: center; max-width: 780px; margin: 0 auto; line-height: 1.7; }

        /* ── PRINT ONLY ELEMENTS ── */
        .print-only { display: none; }

        /* ── PRINT STYLES ── */
        @media print {
          /* Hide screen-only elements */
          .no-print,
          header, footer, nav,
          .page-hero,
          .breadcrumb { display: none !important; }

          /* Show print-only elements */
          .print-only { display: block !important; }

          /* Page setup */
          @page {
            margin: 16mm 14mm;
            size: A4;
          }

          body {
            background: #fff !important;
            color: #1a1a2e !important;
            font-size: 10pt;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Cover header */
          .print-cover-header {
            text-align: center;
            padding: 24pt 0 18pt;
            border-bottom: 3pt solid #c9a84c;
            margin-bottom: 20pt;
          }
          .print-cover-logo {
            font-size: 22pt;
            font-weight: 900;
            color: #081e3f;
            letter-spacing: 0.05em;
          }
          .print-cover-tagline {
            font-size: 12pt;
            color: #c9a84c;
            margin-top: 4pt;
            font-weight: 600;
          }
          .print-cover-meta {
            font-size: 9pt;
            color: #555;
            margin-top: 8pt;
          }

          /* Intro band */
          .intro-band {
            background: #f8f7f4 !important;
            border-top: 3pt solid #c9a84c !important;
            border-bottom: 1pt solid #e0e0e0 !important;
            padding: 14pt 0 !important;
            margin-bottom: 0 !important;
          }
          .intro-text {
            font-size: 10.5pt !important;
            color: #081e3f !important;
          }

          /* Section spacing */
          .section { padding: 20pt 0 !important; }
          .section-header { margin-bottom: 14pt !important; }
          .section-title { font-size: 14pt !important; color: #081e3f !important; }
          .section-subtitle { font-size: 9pt !important; color: #555 !important; }
          .label-tag {
            background: rgba(201,168,76,0.15) !important;
            color: #c9a84c !important;
            font-size: 7pt !important;
            padding: 3pt 8pt !important;
          }

          /* About grid */
          .about-grid {
            grid-template-columns: 1fr 2fr !important;
            gap: 24pt !important;
          }

          /* Services grid — 3 cols */
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10pt !important;
          }
          .service-card {
            padding: 10pt 12pt !important;
            border: 1pt solid #e0e0e0 !important;
            border-top: 2.5pt solid #c9a84c !important;
            box-shadow: none !important;
            page-break-inside: avoid;
          }
          .service-card:hover { box-shadow: none !important; }
          .service-icon { font-size: 14pt !important; margin-bottom: 5pt !important; }
          .service-name { font-size: 7.5pt !important; color: #c9a84c !important; }
          .service-desc { font-size: 7pt !important; color: #555 !important; }

          /* Destinations — dark bg becomes light */
          .destinations-section {
            background: #081e3f !important;
            padding: 20pt 0 !important;
          }
          .destination-row {
            background: rgba(255,255,255,0.06) !important;
            border: 1pt solid rgba(255,255,255,0.12) !important;
            padding: 10pt 16pt !important;
            gap: 16pt !important;
            page-break-inside: avoid;
          }
          .destination-region {
            background: rgba(201,168,76,0.2) !important;
            color: #c9a84c !important;
            font-size: 7.5pt !important;
            padding: 4pt 8pt !important;
          }
          .destination-countries {
            color: rgba(255,255,255,0.85) !important;
            font-size: 8.5pt !important;
          }

          /* Process grid — 2 cols */
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10pt !important;
          }
          .process-step {
            padding: 12pt !important;
            gap: 12pt !important;
            background: #f8f7f4 !important;
            border: 1pt solid #e0e0e0 !important;
            page-break-inside: avoid;
          }
          .process-number {
            width: 30pt !important;
            height: 30pt !important;
            background: #081e3f !important;
            color: #c9a84c !important;
            font-size: 8pt !important;
            border-radius: 5pt !important;
          }
          .process-title { font-size: 9pt !important; color: #081e3f !important; }
          .process-desc { font-size: 7.5pt !important; }

          /* Why us */
          .why-section {
            background: #f8f7f4 !important;
            padding: 20pt 0 !important;
          }
          .why-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10pt !important;
          }
          .why-card {
            padding: 12pt !important;
            background: #fff !important;
            border: 1pt solid #e0e0e0 !important;
            page-break-inside: avoid;
          }
          .why-icon { font-size: 14pt !important; margin-bottom: 6pt !important; }
          .why-title { font-size: 9pt !important; color: #081e3f !important; }
          .why-desc { font-size: 7.5pt !important; }

          /* Contact footer */
          .contact-footer-section {
            background: #081e3f !important;
            padding: 20pt 0 !important;
          }
          .contact-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 10pt !important;
          }
          .contact-card {
            padding: 10pt 8pt !important;
            background: rgba(255,255,255,0.06) !important;
            border: 1pt solid rgba(255,255,255,0.12) !important;
          }
          .contact-label { font-size: 6.5pt !important; color: #c9a84c !important; }
          .contact-value { font-size: 7.5pt !important; color: #fff !important; }

          /* Page breaks */
          .destinations-section { page-break-before: always; }
          .contact-footer-section { page-break-before: avoid; }
        }
      `}</style>
    </>
  );
}
