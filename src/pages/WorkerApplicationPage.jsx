import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

const EMPTY = {
  fullName: '', dateOfBirth: '', nationality: 'Bangladeshi',
  phone: '', email: '', address: '',
  passportNumber: '', passportExpiry: '',
  tradeCategory: '', specificRole: '', experienceYears: '',
  preferredCountry: '', availableDate: '',
  education: '', languages: '',
  hasMedical: '', hasTradeTest: '', hasBMET: '',
  coverLetter: '',
  cvFile: null, passportFile: null, certFile: null,
};

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const TRADE_CATEGORIES = [
  'Construction & Engineering', 'Oil & Gas', 'Drivers & Transport',
  'Chefs & Hospitality', 'Healthcare & Nursing', 'Security Guards',
  'Cleaning & Housekeeping', 'Farm & Garden', 'Warehouse & Logistics',
  'Factory & Manufacturing', 'Retail & Supermarket Staff', 'Other',
];

const COUNTRIES = [
  'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Jordan',
  'Malaysia', 'Singapore', 'Maldives',
  'Poland', 'Romania', 'Italy', 'Portugal', 'Greece', 'Hungary', 'Croatia',
  'Czech Republic', 'Lithuania', 'Latvia', 'Estonia', 'Bulgaria', 'Cyprus',
  'Russia', 'Slovakia', 'Open to Any Country',
];

export default function WorkerApplicationPage() {
  const [fields,     setFields]     = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState(false);
  const [step,       setStep]       = useState(1);
  const { lang }                    = useLang();

  const handleChange = ({ target: { name, value } }) =>
    setFields(p => ({ ...p, [name]: value }));

  const handleFile = (field) => (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File too large — max 5MB');
      e.target.value = '';
      return;
    }
    setFields(p => ({ ...p, [field]: file || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      const messageBody = `
=== WORKER APPLICATION ===

PERSONAL DETAILS
Name: ${fields.fullName}
Date of Birth: ${fields.dateOfBirth}
Nationality: ${fields.nationality}
Phone: ${fields.phone}
Email: ${fields.email || 'Not provided'}
Address: ${fields.address}

PASSPORT
Passport Number: ${fields.passportNumber || 'Not provided'}
Passport Expiry: ${fields.passportExpiry || 'Not provided'}

PROFESSIONAL DETAILS
Trade Category: ${fields.tradeCategory}
Specific Role: ${fields.specificRole}
Years of Experience: ${fields.experienceYears}
Preferred Country: ${fields.preferredCountry}
Available From: ${fields.availableDate}

QUALIFICATIONS
Education Level: ${fields.education}
Languages Spoken: ${fields.languages}
Medical Fitness Certificate: ${fields.hasMedical}
Trade Test Certificate: ${fields.hasTradeTest}
BMET Smart Card: ${fields.hasBMET}

COVER LETTER / ADDITIONAL INFO
${fields.coverLetter || 'Not provided'}
      `.trim();

      // Build attachments array — all 3 files
      const attachments = [];

      if (fields.cvFile) {
        attachments.push({
          filename: fields.cvFile.name,
          content: await toBase64(fields.cvFile),
          type: fields.cvFile.type || 'application/octet-stream',
        });
      }
      if (fields.passportFile) {
        attachments.push({
          filename: fields.passportFile.name,
          content: await toBase64(fields.passportFile),
          type: fields.passportFile.type || 'application/octet-stream',
        });
      }
      if (fields.certFile) {
        attachments.push({
          filename: fields.certFile.name,
          content: await toBase64(fields.certFile),
          type: fields.certFile.type || 'application/octet-stream',
        });
      }

      const payload = {
        name:    fields.fullName,
        email:   fields.email || 'no-reply@bhuiyanworkforce.com',
        company: `Worker Application — ${fields.tradeCategory}`,
        service: fields.tradeCategory,
        message: messageBody,
        attachments, // array of all uploaded files
      };

      const res = await fetch('https://contact-form.bhuiyanrezaul71.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success !== false) setSubmitted(true);
      else setError(true);
    } catch { setError(true); }
    finally { setSubmitting(false); }
  };

  if (submitted) return (
    <div className="page-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 24 }}>✅</div>
        <h1 style={{ marginBottom: 16 }}>{t('apply_success_h1', lang)}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
          Thank you, <strong style={{ color: 'var(--gold)' }}>{fields.fullName}</strong>. We have received your application and will review it within 3–5 working days. If shortlisted, our team will contact you directly.
        </p>
        <Link to="/" className="btn btn-primary">{t('apply_back_home', lang)}</Link>
      </div>
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: '1px solid var(--gray-100)', background: 'var(--white)',
    color: 'var(--navy)', fontSize: '0.9rem', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit',
  };
  const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--gray-700)', marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: '0.05em',
  };
  const groupStyle = { display: 'flex', flexDirection: 'column', gap: 6 };

  const steps = [t('apply_step1', lang), t('apply_step2', lang), t('apply_step3', lang)];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">{t('common_home', lang)}</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{t('nav_apply', lang)}</span>
            </div>
            <div className="label-tag" style={{ marginBottom: 16 }}>For Workers</div>
            <h1>{t('apply_hero_h1', lang)}</h1>
            <p>{t('apply_hero_sub', lang)}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 0 }}>
            {steps.map((label, i) => (
              <button key={label} type="button" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', padding: 0 }}
                onClick={() => setStep(i + 1)}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: (step > i || step === i + 1) ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                  color: step >= i + 1 ? 'var(--navy)' : 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.8rem', color: step === i + 1 ? 'var(--white)' : 'rgba(255,255,255,0.4)', fontWeight: step === i + 1 ? 600 : 400 }}>
                  {label}
                </span>
                {i < 2 && <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

              {/* Step 1: Personal */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 32 }}>{t('apply_step1', lang)}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-fullName" style={labelStyle}>Full Name (as in passport) *</label>
                      <input id="wa-fullName" style={inputStyle} name="fullName" value={fields.fullName} onChange={handleChange} required placeholder="Mohammad Rafiqul Islam" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-dateOfBirth" style={labelStyle}>Date of Birth *</label>
                      <input id="wa-dateOfBirth" style={inputStyle} type="date" name="dateOfBirth" value={fields.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-nationality" style={labelStyle}>Nationality</label>
                      <input id="wa-nationality" style={inputStyle} name="nationality" value={fields.nationality} onChange={handleChange} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-phone" style={labelStyle}>Phone / WhatsApp *</label>
                      <input id="wa-phone" style={inputStyle} type="tel" name="phone" value={fields.phone} onChange={handleChange} required placeholder="+880 17XX XXX XXX" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-email" style={labelStyle}>Email Address</label>
                      <input id="wa-email" style={inputStyle} type="email" name="email" value={fields.email} onChange={handleChange} placeholder="optional" />
                    </div>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-address" style={labelStyle}>Home Address (District/Division) *</label>
                      <input id="wa-address" style={inputStyle} name="address" value={fields.address} onChange={handleChange} required placeholder="e.g. Brahmanbaria, Chittagong Division" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-passportNumber" style={labelStyle}>Passport Number</label>
                      <input id="wa-passportNumber" style={inputStyle} name="passportNumber" value={fields.passportNumber} onChange={handleChange} placeholder="A1234567" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-passportExpiry" style={labelStyle}>Passport Expiry Date</label>
                      <input id="wa-passportExpiry" style={inputStyle} type="date" name="passportExpiry" value={fields.passportExpiry} onChange={handleChange} />
                    </div>
                  </div>
                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}
                      disabled={!fields.fullName || !fields.dateOfBirth || !fields.phone || !fields.address}>
                      {t('apply_step2', lang)} →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Professional */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 32 }}>{t('apply_step2', lang)}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={groupStyle}>
                      <label htmlFor="wa-tradeCategory" style={labelStyle}>Trade Category *</label>
                      <select id="wa-tradeCategory" style={inputStyle} name="tradeCategory" value={fields.tradeCategory} onChange={handleChange} required>
                        <option value="">Select category…</option>
                        {TRADE_CATEGORIES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-specificRole" style={labelStyle}>Specific Role / Trade *</label>
                      <input id="wa-specificRole" style={inputStyle} name="specificRole" value={fields.specificRole} onChange={handleChange} required placeholder="e.g. Mason, Welder, Chef de Partie" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-experienceYears" style={labelStyle}>Years of Experience *</label>
                      <select id="wa-experienceYears" style={inputStyle} name="experienceYears" value={fields.experienceYears} onChange={handleChange} required>
                        <option value="">Select…</option>
                        <option>Less than 1 year</option>
                        <option>1–2 years</option>
                        <option>3–5 years</option>
                        <option>6–10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-preferredCountry" style={labelStyle}>Preferred Country *</label>
                      <select id="wa-preferredCountry" style={inputStyle} name="preferredCountry" value={fields.preferredCountry} onChange={handleChange} required>
                        <option value="">Select country…</option>
                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-availableDate" style={labelStyle}>Available From</label>
                      <input id="wa-availableDate" style={inputStyle} type="date" name="availableDate" value={fields.availableDate} onChange={handleChange} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-education" style={labelStyle}>Education Level</label>
                      <select id="wa-education" style={inputStyle} name="education" value={fields.education} onChange={handleChange}>
                        <option value="">Select…</option>
                        <option>No formal education</option>
                        <option>Primary (Class 1–5)</option>
                        <option>JSC / Class 8</option>
                        <option>SSC / Class 10</option>
                        <option>HSC / Class 12</option>
                        <option>Diploma / Vocational</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree or above</option>
                      </select>
                    </div>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-languages" style={labelStyle}>Languages Spoken</label>
                      <input id="wa-languages" style={inputStyle} name="languages" value={fields.languages} onChange={handleChange} placeholder="e.g. Bengali, English (basic), Arabic (basic)" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasMedical" style={labelStyle}>Medical Fitness Certificate?</label>
                      <select id="wa-hasMedical" style={inputStyle} name="hasMedical" value={fields.hasMedical} onChange={handleChange}>
                        <option value="">Select…</option>
                        <option>Yes — valid certificate</option>
                        <option>No — not yet obtained</option>
                        <option>Expired — needs renewal</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasTradeTest" style={labelStyle}>Trade Test Certificate?</label>
                      <select id="wa-hasTradeTest" style={inputStyle} name="hasTradeTest" value={fields.hasTradeTest} onChange={handleChange}>
                        <option value="">Select…</option>
                        <option>Yes — certified</option>
                        <option>No — not yet tested</option>
                        <option>In progress</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasBMET" style={labelStyle}>BMET Smart Card?</label>
                      <select id="wa-hasBMET" style={inputStyle} name="hasBMET" value={fields.hasBMET} onChange={handleChange}>
                        <option value="">Select…</option>
                        <option>Yes — registered</option>
                        <option>No — not yet registered</option>
                        <option>In progress</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>{t('common_back', lang)}</button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)}
                      disabled={!fields.tradeCategory || !fields.specificRole || !fields.experienceYears || !fields.preferredCountry}>
                      {t('apply_step3', lang)} →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Documents & Submit */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 32 }}>{t('apply_step3', lang)}</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={groupStyle}>
                      <label htmlFor="wa-cvFile" style={labelStyle}>Upload CV / Resume (PDF or Word, max 5MB)</label>
                      <input id="wa-cvFile" type="file" accept=".pdf,.doc,.docx" onChange={handleFile('cvFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.cvFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.cvFile.name}</span>}
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-passportFile" style={labelStyle}>Upload Passport Copy (PDF or image, max 5MB)</label>
                      <input id="wa-passportFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile('passportFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.passportFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.passportFile.name}</span>}
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-certFile" style={labelStyle}>Upload Trade/Skills Certificate (optional)</label>
                      <input id="wa-certFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile('certFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.certFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.certFile.name}</span>}
                    </div>

                    <div style={{ background: 'var(--off-white)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: '0.82rem', color: 'var(--gray-500)', display: 'flex', gap: 10 }}>
                      <span>📎</span>
                      <span>All uploaded files (CV, passport copy, certificate) will be sent as email attachments for our team to review.</span>
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-coverLetter" style={labelStyle}>Additional Information / Cover Letter</label>
                      <textarea id="wa-coverLetter" style={{ ...inputStyle, resize: 'vertical' }} rows={5}
                        name="coverLetter" value={fields.coverLetter} onChange={handleChange}
                        placeholder="Tell us about your experience, previous overseas employment, skills, and why you want to work abroad…" />
                    </div>

                    <div style={{ background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: 20, fontSize: '0.82rem', color: 'var(--gray-500)', lineHeight: 1.65 }}>
                      <strong style={{ color: 'var(--navy)' }}>Important:</strong> By submitting this application, you confirm that all information provided is accurate. Bhuiyan Workforce Ltd. will contact shortlisted candidates within 3–5 working days. Submission does not guarantee placement. We handle your data in accordance with our <Link to="/privacy" style={{ color: 'var(--gold)' }}>Privacy Policy</Link>.
                    </div>

                    {error && (
                      <div style={{ color: '#e53e3e', background: '#fff5f5', padding: '12px 16px', borderRadius: 8, border: '1px solid #fed7d7', fontSize: '0.875rem' }}>
                        Something went wrong. Please call us on <a href="tel:+8801864567912" style={{ color: '#e53e3e', fontWeight: 600 }}>+880 1864 567912</a> or email <a href="mailto:info@bhuiyanworkforce.com" style={{ color: '#e53e3e', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>.
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>{t('common_back', lang)}</button>
                    <button type="submit" className="btn btn-primary" disabled={submitting} style={{ minWidth: 180 }}>
                      {submitting ? t('apply_submitting', lang) : t('apply_submit', lang)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
