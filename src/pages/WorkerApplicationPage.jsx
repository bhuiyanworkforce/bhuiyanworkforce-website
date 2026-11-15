import React, { useState } from 'react';
import { Link } from '../i18n/router';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import Tx from '../i18n/Tx';
import { tx } from '../i18n/extra.js';

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

// File rules. The worker checks the same limits (worker/contact-form-guard.js).
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 12 * 1024 * 1024;
const FILE_EXTENSIONS = {
  cvFile: ['pdf', 'doc', 'docx'],
  passportFile: ['pdf', 'jpg', 'jpeg', 'png'],
  certFile: ['pdf', 'jpg', 'jpeg', 'png'],
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
  'Chefs & Hospitality', 'Security Guards',
  'Cleaning & Housekeeping', 'Farm & Garden', 'Warehouse & Logistics',
  'Factory & Manufacturing', 'Retail & Supermarket Staff',
  'Painting & Finishing', 'Steel Fixing & Reinforcement',
  'Scaffolding & Formwork', 'Landscaping & Groundskeeping',
  'Mason & Bricklaying', 'Electrical Helpers & Cable Pullers',
  'Laundry & Linen Services', 'Food Processing & Packing',
  'Fishery & Aquaculture', 'Caregiving & Elderly Support', 'Other',
];

const COUNTRIES = [
  'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Jordan',
  'Malaysia', 'Singapore', 'Maldives',
  'Poland', 'Romania', 'Serbia', 'Portugal', 'Greece', 'Hungary', 'Croatia',
  'Czech Republic', 'Lithuania', 'Latvia', 'Estonia', 'Bulgaria', 'Cyprus',
  'Slovakia', 'Bosnia and Herzegovina', 'Montenegro', 'Slovenia', 'North Macedonia', 'Italy',
  'Armenia', 'Georgia', 'Seychelles', 'Mauritius', 'Open to Any Country',
];

export default function WorkerApplicationPage() {
  const [fields,     setFields]     = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState(false);
  const [step,       setStep]       = useState(1);
  const [consent,    setConsent]    = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [fileError, setFileError] = useState('');
  const { lang }                    = useLang();

  const handleChange = ({ target: { name, value } }) =>
    setFields(p => ({ ...p, [name]: value }));

  const handleFile = (field) => (e) => {
    const file = e.target.files[0];
    setFileError('');
    if (!file) { setFields(p => ({ ...p, [field]: null })); return; }

    const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
    if (!FILE_EXTENSIONS[field].includes(ext)) {
      setFileError(`${file.name}: please upload a ${FILE_EXTENSIONS[field].join(', ').toUpperCase()} file.`);
      e.target.value = '';
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(`${file.name} is larger than 5 MB. Please choose a smaller file.`);
      e.target.value = '';
      return;
    }
    const others = ['cvFile', 'passportFile', 'certFile']
      .filter(k => k !== field)
      .reduce((sum, k) => sum + (fields[k] ? fields[k].size : 0), 0);
    if (others + file.size > MAX_TOTAL_BYTES) {
      setFileError('Your files together are over 12 MB. Please choose smaller files or compress the images.');
      e.target.value = '';
      return;
    }
    setFields(p => ({ ...p, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) { setConsentError(true); return; }
    const consentAt = new Date().toISOString();
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

CONSENT
The applicant accepted the Privacy Policy and consented to processing of their data, including uploaded documents, on ${consentAt}.
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
        formType: 'worker_application',
        consent: true,
        consentAt,
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
          <Tx>Thank you,</Tx> <strong style={{ color: 'var(--gold)' }}>{fields.fullName}</strong><Tx>. We have received your application and will review it within 3–5 working days. If shortlisted, our team will contact you directly.</Tx>
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
            <div className="label-tag" style={{ marginBottom: 16 }}><Tx>For Workers</Tx></div>
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
                      <label htmlFor="wa-fullName" style={labelStyle}><Tx>Full Name (as in passport) *</Tx></label>
                      <input id="wa-fullName" style={inputStyle} name="fullName" value={fields.fullName} onChange={handleChange} required placeholder={tx(lang, "Mohammad Rafiqul Islam")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-dateOfBirth" style={labelStyle}><Tx>Date of Birth *</Tx></label>
                      <input id="wa-dateOfBirth" style={inputStyle} type="date" name="dateOfBirth" value={fields.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-nationality" style={labelStyle}>Nationality</label>
                      <input id="wa-nationality" style={inputStyle} name="nationality" value={fields.nationality} onChange={handleChange} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-phone" style={labelStyle}><Tx>Phone / WhatsApp *</Tx></label>
                      <input id="wa-phone" style={inputStyle} type="tel" name="phone" value={fields.phone} onChange={handleChange} required placeholder={tx(lang, "+880 17XX XXX XXX")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-email" style={labelStyle}><Tx>Email Address</Tx></label>
                      <input id="wa-email" style={inputStyle} type="email" name="email" value={fields.email} onChange={handleChange} placeholder="optional" />
                    </div>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-address" style={labelStyle}><Tx>Home Address (District/Division) *</Tx></label>
                      <input id="wa-address" style={inputStyle} name="address" value={fields.address} onChange={handleChange} required placeholder={tx(lang, "e.g. Brahmanbaria, Chittagong Division")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-passportNumber" style={labelStyle}><Tx>Passport Number</Tx></label>
                      <input id="wa-passportNumber" style={inputStyle} name="passportNumber" value={fields.passportNumber} onChange={handleChange} placeholder="A1234567" />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-passportExpiry" style={labelStyle}><Tx>Passport Expiry Date</Tx></label>
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
                      <label htmlFor="wa-tradeCategory" style={labelStyle}><Tx>Trade Category *</Tx></label>
                      <select id="wa-tradeCategory" style={inputStyle} name="tradeCategory" value={fields.tradeCategory} onChange={handleChange} required>
                        <option value="">{tx(lang, "Select category…")}</option>
                        {TRADE_CATEGORIES.map(t => <option key={t} value={t}>{tx(lang, t)}</option>)}
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-specificRole" style={labelStyle}><Tx>Specific Role / Trade *</Tx></label>
                      <input id="wa-specificRole" style={inputStyle} name="specificRole" value={fields.specificRole} onChange={handleChange} required placeholder={tx(lang, "e.g. Mason, Welder, Chef de Partie")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-experienceYears" style={labelStyle}><Tx>Years of Experience *</Tx></label>
                      <select id="wa-experienceYears" style={inputStyle} name="experienceYears" value={fields.experienceYears} onChange={handleChange} required>
                        <option value="">{tx(lang, "Select…")}</option>
                        <option value="Less than 1 year">{tx(lang, "Less than 1 year")}</option>
                        <option value="1–2 years">{tx(lang, "1–2 years")}</option>
                        <option value="3–5 years">{tx(lang, "3–5 years")}</option>
                        <option value="6–10 years">{tx(lang, "6–10 years")}</option>
                        <option value="10+ years">{tx(lang, "10+ years")}</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-preferredCountry" style={labelStyle}><Tx>Preferred Country *</Tx></label>
                      <select id="wa-preferredCountry" style={inputStyle} name="preferredCountry" value={fields.preferredCountry} onChange={handleChange} required>
                        <option value="">{tx(lang, "Select country…")}</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{tx(lang, c)}</option>)}
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-availableDate" style={labelStyle}><Tx>Available From</Tx></label>
                      <input id="wa-availableDate" style={inputStyle} type="date" name="availableDate" value={fields.availableDate} onChange={handleChange} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-education" style={labelStyle}><Tx>Education Level</Tx></label>
                      <select id="wa-education" style={inputStyle} name="education" value={fields.education} onChange={handleChange}>
                        <option value="">{tx(lang, "Select…")}</option>
                        <option value="No formal education">{tx(lang, "No formal education")}</option>
                        <option value="Primary (Class 1–5)">{tx(lang, "Primary (Class 1–5)")}</option>
                        <option value="JSC / Class 8">{tx(lang, "JSC / Class 8")}</option>
                        <option value="SSC / Class 10">{tx(lang, "SSC / Class 10")}</option>
                        <option value="HSC / Class 12">{tx(lang, "HSC / Class 12")}</option>
                        <option value="Diploma / Vocational">{tx(lang, "Diploma / Vocational")}</option>
                        <option value="Bachelor's Degree">{tx(lang, "Bachelor's Degree")}</option>
                        <option value="Master's Degree or above">{tx(lang, "Master's Degree or above")}</option>
                      </select>
                    </div>
                    <div style={{ ...groupStyle, gridColumn: '1 / -1' }}>
                      <label htmlFor="wa-languages" style={labelStyle}><Tx>Languages Spoken</Tx></label>
                      <input id="wa-languages" style={inputStyle} name="languages" value={fields.languages} onChange={handleChange} placeholder={tx(lang, "e.g. Bengali, English (basic), Arabic (basic)")} />
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasMedical" style={labelStyle}><Tx>Medical Fitness Certificate?</Tx></label>
                      <select id="wa-hasMedical" style={inputStyle} name="hasMedical" value={fields.hasMedical} onChange={handleChange}>
                        <option value="">{tx(lang, "Select…")}</option>
                        <option value="Yes — valid certificate">{tx(lang, "Yes — valid certificate")}</option>
                        <option value="No — not yet obtained">{tx(lang, "No — not yet obtained")}</option>
                        <option value="Expired — needs renewal">{tx(lang, "Expired — needs renewal")}</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasTradeTest" style={labelStyle}><Tx>Trade Test Certificate?</Tx></label>
                      <select id="wa-hasTradeTest" style={inputStyle} name="hasTradeTest" value={fields.hasTradeTest} onChange={handleChange}>
                        <option value="">{tx(lang, "Select…")}</option>
                        <option value="Yes — certified">{tx(lang, "Yes — certified")}</option>
                        <option value="No — not yet tested">{tx(lang, "No — not yet tested")}</option>
                        <option value="In progress">{tx(lang, "In progress")}</option>
                      </select>
                    </div>
                    <div style={groupStyle}>
                      <label htmlFor="wa-hasBMET" style={labelStyle}><Tx>BMET Smart Card?</Tx></label>
                      <select id="wa-hasBMET" style={inputStyle} name="hasBMET" value={fields.hasBMET} onChange={handleChange}>
                        <option value="">{tx(lang, "Select…")}</option>
                        <option value="Yes — registered">{tx(lang, "Yes — registered")}</option>
                        <option value="No — not yet registered">{tx(lang, "No — not yet registered")}</option>
                        <option value="In progress">{tx(lang, "In progress")}</option>
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
                      <label htmlFor="wa-cvFile" style={labelStyle}><Tx>Upload CV / Resume (PDF or Word, max 5MB)</Tx></label>
                      <input id="wa-cvFile" type="file" accept=".pdf,.doc,.docx" onChange={handleFile('cvFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.cvFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.cvFile.name}</span>}
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-passportFile" style={labelStyle}><Tx>Upload Passport Copy (PDF or image, max 5MB)</Tx></label>
                      <input id="wa-passportFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile('passportFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.passportFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.passportFile.name}</span>}
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-certFile" style={labelStyle}><Tx>Upload Trade/Skills Certificate (optional)</Tx></label>
                      <input id="wa-certFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile('certFile')}
                        style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }} />
                      {fields.certFile && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✓ {fields.certFile.name}</span>}
                    </div>

                    {fileError && (
                      <div role="alert" style={{ color: '#e53e3e', background: '#fff5f5', padding: '12px 16px', borderRadius: 8, border: '1px solid #fed7d7', fontSize: '0.875rem' }}>
                        {fileError}
                      </div>
                    )}

                    <div style={{ background: 'var(--off-white)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: '0.82rem', color: 'var(--gray-500)', display: 'flex', gap: 10 }}>
                      <span><Tx>📎</Tx></span>
                      <span><Tx>All uploaded files (CV, passport copy, certificate) will be sent as email attachments for our team to review.</Tx></span>
                    </div>

                    <div style={groupStyle}>
                      <label htmlFor="wa-coverLetter" style={labelStyle}><Tx>Additional Information / Cover Letter</Tx></label>
                      <textarea id="wa-coverLetter" style={{ ...inputStyle, resize: 'vertical' }} rows={5}
                        name="coverLetter" value={fields.coverLetter} onChange={handleChange}
                        placeholder={tx(lang, "Tell us about your experience, previous overseas employment, skills, and why you want to work abroad…")} />
                    </div>

                    <div style={{ background: 'var(--off-white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: 20, fontSize: '0.82rem', color: 'var(--gray-500)', lineHeight: 1.65 }}>
                      <strong style={{ color: 'var(--navy)' }}><Tx>Important:</Tx></strong> <Tx>By submitting this application, you confirm that all information provided is accurate. Bhuiyan Workforce Ltd. will contact shortlisted candidates within 3–5 working days. Submission does not guarantee placement. We handle your data in accordance with our</Tx> <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}><Tx>Privacy Policy</Tx></a>.
                    </div>

                    <div>
                      <label htmlFor="wa-consent" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--navy)', lineHeight: 1.6, cursor: 'pointer' }}>
                        <input
                          id="wa-consent" type="checkbox" checked={consent} required
                          aria-describedby={consentError ? 'wa-consent-error' : undefined}
                          onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(false); }}
                          style={{ marginTop: 4, width: 20, height: 20, flexShrink: 0 }}
                        />
                        <span>
                          <Tx>I have read the</Tx> <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 600 }}><Tx>Privacy Policy</Tx></a> <Tx>and I consent to Bhuiyan Workforce Ltd. processing my personal data, including my passport copy and the other documents I upload, to assess my application and arrange recruitment. I understand that my profile is shared with an employer only after I have been informed and have agreed.</Tx> <span className="required">*</span>
                        </span>
                      </label>
                      {consentError && (
                        <div id="wa-consent-error" role="alert" style={{ color: '#e53e3e', fontSize: '0.82rem', marginTop: 8 }}>
                          <Tx>Please tick the box above to submit your application.</Tx>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div style={{ color: '#e53e3e', background: '#fff5f5', padding: '12px 16px', borderRadius: 8, border: '1px solid #fed7d7', fontSize: '0.875rem' }}>
                        <Tx>Something went wrong. Please call us on</Tx> <a href="tel:+8801864567912" style={{ color: '#e53e3e', fontWeight: 600 }}>+880 1864 567912</a> <Tx>or email</Tx> <a href="mailto:info@bhuiyanworkforce.com" style={{ color: '#e53e3e', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>.
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
