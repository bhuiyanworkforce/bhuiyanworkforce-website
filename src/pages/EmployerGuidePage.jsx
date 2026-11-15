import React, { useState } from 'react';
import { Link } from '../i18n/router';
import Tx from '../i18n/Tx';
import { useLang } from '../i18n/LanguageContext';
import { tx } from '../i18n/extra.js';

const GUIDE_CONTENTS = [
  { icon: '📋', title: 'Understanding BMET & Emigration Clearance', desc: 'Step-by-step explanation of the Bangladesh Manpower Bureau process every worker must complete.' },
  { icon: '🌍', title: 'Country-by-Country Visa Requirements', desc: 'Visa timelines, fees, and documentation requirements for the Middle East, Europe, Asia, and Africa at a glance.' },
  { icon: '⚖️', title: 'Legal Compliance Checklist', desc: 'What every employer must provide to stay compliant with Bangladesh labour export regulations.' },
  { icon: '💼', title: 'Trade Testing & Skills Verification', desc: 'How Bangladeshi workers are trade-tested and what certifications to expect.' },
  { icon: '📄', title: 'Employment Contract Standards', desc: 'What a compliant employment contract must include for each destination country.' },
  { icon: '🚀', title: 'Mobilisation Timeline Guide', desc: 'Realistic timelines from first contact to workers arriving on site — by country and trade category.' },
];

export default function EmployerGuidePage() {
  const { lang } = useLang();
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
          formType: 'employer_guide',
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
              <span style={{ color: 'var(--gold)' }}><Tx>Employer's Guide</Tx></span>
            </div>
            <div className="label-tag" style={{ marginBottom: 16 }}><Tx>Free Download</Tx></div>
            <h1><Tx>The Employer's Complete Guide to Recruiting from Bangladesh</Tx></h1>
            <p><Tx>Everything international employers need to know — visa requirements, legal compliance, trade testing, mobilisation timelines, and more. Written by our recruitment specialists.</Tx></p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

            {/* Left — What's inside */}
            <div>
              <div className="label-tag" style={{ marginBottom: 16 }}><Tx>What's Inside</Tx></div>
              <h2 className="section-title" style={{ marginBottom: 32 }}><Tx>6 Chapters of Expert Guidance</Tx></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {GUIDE_CONTENTS.map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 16, padding: '20px', background: 'var(--off-white)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <h4 style={{ color: 'var(--navy)', marginBottom: 6, fontSize: '0.95rem', fontWeight: 600 }}><Tx>{item.title}</Tx></h4>
                      <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}><Tx>{item.desc}</Tx></p>
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
                    <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', marginBottom: 12 }}><Tx>Guide on Its Way!</Tx></h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.7 }}>
                      <Tx>Thank you,</Tx> <strong style={{ color: 'var(--gold)' }}>{fields.name}</strong><Tx>. Our team will email the guide to</Tx> <strong style={{ color: 'var(--gold)' }}>{fields.email}</strong> <Tx>within the next few hours.</Tx>
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                      <Tx>In the meantime, explore our</Tx> <Link to="/countries" style={{ color: 'var(--gold)' }}><Tx>country guides</Tx></Link> <Tx>for detailed visa and deployment information.</Tx>
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: 28 }}>
                      <div className="label-tag" style={{ marginBottom: 12 }}><Tx>Free Resource</Tx></div>
                      <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 8 }}><Tx>Get the Free Guide</Tx></h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.65 }}><Tx>Complete the form and we'll email you the guide directly. No spam — ever.</Tx></p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div>
                        <label htmlFor="eg-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Tx>Full Name *</Tx></label>
                        <input
                          id="eg-name" type="text" name="name" value={fields.name} onChange={handleChange} required
                          placeholder={tx(lang, "Ahmad Al-Rashid")}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="eg-company" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Tx>Company Name *</Tx></label>
                        <input
                          id="eg-company" type="text" name="company" value={fields.company} onChange={handleChange} required
                          placeholder={tx(lang, "Al-Rashid Construction LLC")}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="eg-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Tx>Work Email *</Tx></label>
                        <input
                          id="eg-email" type="email" name="email" value={fields.email} onChange={handleChange} required
                          placeholder="you@company.com"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="eg-country" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Tx>Country of Interest</Tx></label>
                        <select
                          id="eg-country" name="country" value={fields.country} onChange={handleChange}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(30,50,80,0.9)', color: fields.country ? 'var(--white)' : 'rgba(255,255,255,0.4)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                        >
                          <option value="">{tx(lang, "Select destination…")}</option>
                          <optgroup label={tx(lang, "Gulf")}>
                            <option value="Saudi Arabia">{tx(lang, "Saudi Arabia")}</option><option value="UAE">{tx(lang, "UAE")}</option><option value="Qatar">{tx(lang, "Qatar")}</option>
                            <option value="Kuwait">{tx(lang, "Kuwait")}</option><option value="Oman">{tx(lang, "Oman")}</option><option value="Bahrain">{tx(lang, "Bahrain")}</option>
                          </optgroup>
                          <optgroup label={tx(lang, "Europe")}>
                            <option value="Poland">{tx(lang, "Poland")}</option><option value="Romania">{tx(lang, "Romania")}</option><option value="Portugal">{tx(lang, "Portugal")}</option>
                            <option value="Serbia">{tx(lang, "Serbia")}</option><option value="Germany">{tx(lang, "Germany")}</option><option value="Other Europe">{tx(lang, "Other Europe")}</option>
                          </optgroup>
                          <optgroup label={tx(lang, "Southeast Asia")}>
                            <option value="Malaysia">{tx(lang, "Malaysia")}</option><option value="Singapore">{tx(lang, "Singapore")}</option><option value="Maldives">{tx(lang, "Maldives")}</option>
                          </optgroup>
                          <option value="Multiple Countries">{tx(lang, "Multiple Countries")}</option>
                        </select>
                      </div>

                      {error && (
                        <p style={{ color: '#fc8181', fontSize: '0.8rem', margin: 0 }}>
                          <Tx>Something went wrong. Please email</Tx> <a href="mailto:info@bhuiyanworkforce.com" style={{ color: '#fc8181' }}>info@bhuiyanworkforce.com</a> <Tx>directly.</Tx>
                        </p>
                      )}

                      <button
                        type="submit" disabled={submitting}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
                      >
                        {submitting ? tx(lang, 'Sending…') : tx(lang, 'Send Me the Free Guide →')}
                      </button>

                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', textAlign: 'center', margin: 0 }}>
                        <Tx>By submitting, you agree to receive occasional recruitment insights from Bhuiyan Workforce. Unsubscribe anytime.</Tx>
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
