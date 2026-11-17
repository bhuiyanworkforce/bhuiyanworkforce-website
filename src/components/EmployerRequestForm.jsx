import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { COUNTRIES } from '../data/countries';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { countryName, localizeService } from '../content';

// Structured "Request workers" enquiry for employers. It goes to the same Worker endpoint as the
// general contact form (formType 'contact'), so the Worker needs no change: the structured answers
// are written into the message in English, whatever language the visitor used, so the email you
// receive always reads the same way.

const ENDPOINT = 'https://contact-form.bhuiyanrezaul71.workers.dev';
const EMPTY = {
  name: '', company: '', email: '', phone: '', trade: '', headcount: '', country: '',
  salary: '', accommodation: '', start: '', notes: '', hp_phone: '',
};
const ACCOMMODATION = [
  ['Yes', 'er.accom_yes'],
  ['No', 'er.accom_no'],
  ['To be discussed', 'er.accom_tbd'],
];

function validate(f, tr) {
  const e = {};
  if (!f.name.trim()) e.name = tr('cf.err_name');
  if (!f.email.trim()) e.email = tr('cf.err_email_req');
  else if (!f.email.includes('@') || !f.email.includes('.') || f.email.indexOf('@') === 0 || f.email.lastIndexOf('.') < f.email.indexOf('@'))
    e.email = tr('cf.err_email_bad');
  if (!f.trade) e.trade = tr('er.err_trade');
  const n = Number(f.headcount);
  if (!Number.isInteger(n) || n < 1 || n > 100000) e.headcount = tr('er.err_headcount');
  if (!f.country) e.country = tr('er.err_country');
  return e;
}

export default function EmployerRequestForm() {
  const { lang, urlLang } = useLang();
  const tr = (key) => t(key, lang);
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fields.hp_phone) { // honeypot: bots fill the hidden field
      setSubmitted(true);
      setFields(EMPTY);
      return;
    }
    const errs = validate(fields, tr);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setServerError(false);
    try {
      const message = [
        'EMPLOYER WORKER REQUEST',
        '',
        `Trade / role: ${fields.trade}`,
        `Number of workers: ${Number(fields.headcount)}`,
        `Destination country: ${fields.country}`,
        `Monthly salary offered: ${fields.salary.trim() || 'Not specified'}`,
        `Accommodation provided: ${fields.accommodation || 'Not specified'}`,
        `Planned start date: ${fields.start.trim() || 'Not specified'}`,
        `WhatsApp / phone: ${fields.phone.trim() || 'Not provided'}`,
        '',
        'Other requirements:',
        fields.notes.trim() || 'None',
      ].join('\n');

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          company: fields.company || 'Not provided',
          service: `Employer request: ${fields.trade}`,
          message,
          formType: 'contact',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success !== false) { setSubmitted(true); setFields(EMPTY); }
      else setServerError(true);
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3>{tr('cf.success_title')}</h3>
        <p>{tr('cf.success_text')}</p>
      </div>
    );
  }

  const two = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="text" name="hp_phone" value={fields.hp_phone} onChange={handleChange}
        tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', pointerEvents: 'none' }}
      />

      {serverError && (
        <div className="form-error-banner">
          {tr('cf.error_before')}{' '}
          <a href="mailto:info@bhuiyanworkforce.com" style={{ color: '#e53e3e', fontWeight: 600 }}>
            <bdi dir="ltr">info@bhuiyanworkforce.com</bdi>
          </a>{' '}{tr('cf.error_after')}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="er-trade">{tr('er.trade')} <span className="required">*</span></label>
        <select id="er-trade" name="trade" value={fields.trade} onChange={handleChange}>
          {/* option values stay English: they go into the email you receive */}
          <option value="">{tr('er.trade_ph')}</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.name}>{localizeService(s, urlLang).name}</option>)}
        </select>
        {errors.trade && <span className="field-error">{errors.trade}</span>}
      </div>

      <div style={two}>
        <div className="form-group">
          <label htmlFor="er-headcount">{tr('er.headcount')} <span className="required">*</span></label>
          <input id="er-headcount" name="headcount" type="number" inputMode="numeric" min="1" dir="ltr"
            value={fields.headcount} onChange={handleChange} placeholder="20" />
          {errors.headcount && <span className="field-error">{errors.headcount}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="er-country">{tr('er.country')} <span className="required">*</span></label>
          <select id="er-country" name="country" value={fields.country} onChange={handleChange}>
            <option value="">{tr('er.country_ph')}</option>
            {COUNTRIES.map((c) => <option key={c.slug} value={c.name}>{countryName(urlLang, c.slug, c.name)}</option>)}
          </select>
          {errors.country && <span className="field-error">{errors.country}</span>}
        </div>
      </div>

      <div style={two}>
        <div className="form-group">
          <label htmlFor="er-salary">{tr('er.salary')}</label>
          <input id="er-salary" name="salary" value={fields.salary} onChange={handleChange} placeholder={tr('er.salary_ph')} />
        </div>
        <div className="form-group">
          <label htmlFor="er-accommodation">{tr('er.accom')}</label>
          <select id="er-accommodation" name="accommodation" value={fields.accommodation} onChange={handleChange}>
            <option value="">{tr('er.accom_ph')}</option>
            {ACCOMMODATION.map(([value, key]) => <option key={value} value={value}>{tr(key)}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="er-start">{tr('er.start')}</label>
        <input id="er-start" name="start" value={fields.start} onChange={handleChange} placeholder={tr('er.start_ph')} />
      </div>

      <div className="form-group">
        <label htmlFor="er-name">{tr('cf.name')} <span className="required">*</span></label>
        <input id="er-name" name="name" value={fields.name} onChange={handleChange} placeholder={tr('cf.name_ph')} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="er-company">{tr('cf.company')}</label>
        <input id="er-company" name="company" value={fields.company} onChange={handleChange} placeholder={tr('cf.company_ph')} />
      </div>

      <div style={two}>
        <div className="form-group">
          <label htmlFor="er-email">{tr('cf.email')} <span className="required">*</span></label>
          <input id="er-email" name="email" type="email" dir="ltr" value={fields.email} onChange={handleChange} placeholder="you@company.com" />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="er-phone">{tr('er.phone')}</label>
          <input id="er-phone" name="phone" type="tel" dir="ltr" value={fields.phone} onChange={handleChange} placeholder="+48 …" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="er-notes">{tr('er.notes')}</label>
        <textarea id="er-notes" name="notes" rows={3} value={fields.notes} onChange={handleChange} />
      </div>

      <div className="form-submit-row">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? tr('cf.sending') : tr('er.send')}
        </button>
      </div>
      <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginTop: 10 }}>{tr('er.note')}</p>
    </form>
  );
}
