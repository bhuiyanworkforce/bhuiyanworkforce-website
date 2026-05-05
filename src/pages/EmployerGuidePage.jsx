import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GUIDE_CONTENTS = [
  { icon: '📋', title: 'Understanding BMET & Emigration Clearance', desc: 'Step-by-step explanation of the Bangladesh Manpower Bureau process every worker must complete.' },
  { icon: '🌍', title: 'Country-by-Country Visa Requirements', desc: 'Gulf, Europe, and Southeast Asia visa timelines, fees, and documentation requirements at a glance.' },
  { icon: '⚖️', title: 'Legal Compliance Checklist', desc: 'What every employer must provide to stay compliant with Bangladesh labour export regulations.' },
  { icon: '💼', title: 'Trade Testing & Skills Verification', desc: 'How Bangladeshi workers are trade-tested and what certifications to expect.' },
  { icon: '📄', title: 'Employment Contract Standards', desc: 'What a compliant employment contract must include for each destination country.' },
  { icon: '🚀', title: 'Mobilisation Timeline Guide', desc: 'Realistic timelines from first contact to workers arriving on site — by country and trade category.' },
];

export default function EmployerGuidePage() {
  const [fields, setFields] = useState({ name: '', company: '', email: '', country: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = ({ target: { name, value } }) => setFields(p => ({ ...p, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.company) return;
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch('https://contact-form.bhuiyanrezaul71.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          company: fields.company,
          service: 'Employer Guide Download Request',
          message: `Employer Guide download requested.\nCountry of interest: ${fields.country || 'Not specified'}`,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch { setError(true); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>Employer's Guide</span>
            </div>
            <div className="label-tag" style={{ marginBottom: 16 }}>Free Download</div>
            <h1>The Employer's Complete Guide to Recruiting from Bangladesh</h1>
            <p>Everything international employers need to know — visa requirements, legal compliance, trade testing, mobilisation timelines, and more. Written by our recruitment specialists.</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

            {/* Left — What's inside */}
            <div>
              <div className="label-tag" style={{ marginBottom: 16 }}>What's Inside</div>
              <h2 className="section-title" style={{ marginBottom: 32 }}>6 Chapters of Expert Guidance</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {GUIDE_CONTENTS.map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 16, padding: '20px', background: 'var(--off-white)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <h4 style={{ color: 'var(--navy)', marginBottom: 6, fontSize: '0.95rem', fontWeight: 600 }}>{item.title}</h4>
                      <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div style={{ position: 'sticky', top: 100 }}>
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: 40, border: '1px solid rgba(201,168,76,0.2)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                    <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>Guide on Its Way!</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.7 }}>
                      Thank you, <strong style={{ color: 'var(--gold)' }}>{fields.name}</strong>. Our team will email the guide to <strong style={{ color: 'var(--gold)' }}>{fields.email}</strong> within the next few hours.
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                      In the meantime, explore our <Link to="/countries" style={{ color: 'var(--gold)' }}>country guides</Link> for detailed visa and deployment information.
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: 28 }}>
                      <div className="label-tag" style={{ marginBottom: 12 }}>Free Resource</div>
                      <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 8 }}>Get the Free Guide</h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.65 }}>Complete the form and we'll email you the guide directly. No spam — ever.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div>
                        <label htmlFor="eg-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                        <input
                          id="eg-name" type="text" name="name" value={fields.name} onChange={handleChange} required
                          placeholder="Ahmad Al-Rashid"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="eg-company" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Name *</label>
                        <input
                          id="eg-company" type="text" name="company" value={fields.company} onChange={handleChange} required
                          placeholder="Al-Rashid Construction LLC"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="eg-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Work Email *</label>
                        <input
                          id="eg-email" type="email" name="email" value={fields.email} onChange={handleChange} required
                          placeholder="you@company.com"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="eg-country" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Country of Interest</label>
                        <select
                          id="eg-country" name="country" value={fields.country} onChange={handleChange}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(30,50,80,0.9)', color: fields.country ? 'var(--white)' : 'rgba(255,255,255,0.4)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        >
                          <option value="">Select destination…</option>
                          <optgroup label="Gulf">
                            <option>Saudi Arabia</option><option>UAE</option><option>Qatar</option>
                            <option>Kuwait</option><option>Oman</option><option>Bahrain</option>
                          </optgroup>
                          <optgroup label="Europe">
                            <option>Poland</option><option>Romania</option><option>Portugal</option>
                            <option>Italy</option><option>Germany</option><option>Other Europe</option>
                          </optgroup>
                          <optgroup label="Southeast Asia">
                            <option>Malaysia</option><option>Singapore</option><option>Maldives</option>
                          </optgroup>
                          <option>Multiple Countries</option>
                        </select>
                      </div>

                      {error && (
                        <p style={{ color: '#fc8181', fontSize: '0.8rem', margin: 0 }}>
                          Something went wrong. Please email <a href="mailto:info@bhuiyanworkforce.com" style={{ color: '#fc8181' }}>info@bhuiyanworkforce.com</a> directly.
                        </p>
                      )}

                      <button
                        type="submit" disabled={submitting}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
                      >
                        {submitting ? 'Sending…' : 'Send Me the Free Guide →'}
                      </button>

                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', textAlign: 'center', margin: 0 }}>
                        By submitting, you agree to receive occasional recruitment insights from Bhuiyan Workforce. Unsubscribe anytime.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
