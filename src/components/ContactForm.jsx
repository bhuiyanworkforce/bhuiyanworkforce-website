import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

const EMPTY = { name: '', company: '', email: '', service: '', serviceOther: '', message: '', attachment: null, hp_phone: '' };

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function validate(f, tr) {
  const e = {};
  if (!f.name.trim())    e.name    = tr('cf.err_name');
  if (!f.email.trim())   e.email   = tr('cf.err_email_req');
  else if (!f.email.includes('@') || !f.email.includes('.') || f.email.indexOf('@') === 0 || f.email.lastIndexOf('.') < f.email.indexOf('@'))
                         e.email   = tr('cf.err_email_bad');
  if (!f.message.trim()) e.message = tr('cf.err_msg_req');
  else if (f.message.trim().length < 20)
                         e.message = tr('cf.err_msg_short');
  return e;
}

export default function ContactForm() {
  const { lang } = useLang();
  const tr = (key) => t(key, lang);
  const [fields,      setFields]      = useState(EMPTY);
  const [errors,      setErrors]      = useState({});
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFields(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: this field is invisible to real users. If it's filled,
    // the submission is almost certainly from a bot — pretend success and stop.
    if (fields.hp_phone) {
      setSubmitted(true);
      setFields(EMPTY);
      return;
    }

    const errs = validate(fields, tr);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setServerError(false);

    try {
      const serviceLabel = fields.service === 'Other' && fields.serviceOther
        ? `Other: ${fields.serviceOther}`
        : fields.service || 'Not specified';

      const payload = {
        name:    fields.name,
        email:   fields.email,
        company: fields.company || 'Not provided',
        service: serviceLabel,
        message: fields.message,
        formType: 'contact',
      };

      // Convert attachment to base64 if provided
      if (fields.attachment) {
        const b64 = await toBase64(fields.attachment);
        payload.attachments = [{
          filename: fields.attachment.name,
          content:  b64,
          type:     fields.attachment.type || 'application/octet-stream',
        }];
      }

      const res = await fetch('https://contact-form.bhuiyanrezaul71.workers.dev', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && (data.success !== false)) { setSubmitted(true); setFields(EMPTY); }
      else setServerError(true);
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <div className="form-success">
      <div className="form-success-icon">✓</div>
      <h3>{tr('cf.success_title')}</h3>
      <p>{tr('cf.success_text')}</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — hidden from real users, catches basic spam bots */}
      <input
        type="text"
        name="hp_phone"
        value={fields.hp_phone}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
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
        <label htmlFor="f-name">{tr('cf.name')} <span className="required">*</span></label>
        <input id="f-name" name="name" value={fields.name} onChange={handleChange} placeholder={tr('cf.name_ph')} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="f-email">{tr('cf.email')} <span className="required">*</span></label>
        <input id="f-email" name="email" type="email" dir="ltr" value={fields.email} onChange={handleChange} placeholder="you@company.com" />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="f-company">{tr('cf.company')}</label>
        <input id="f-company" name="company" value={fields.company} onChange={handleChange} placeholder={tr('cf.company_ph')} />
      </div>

      <div className="form-group">
        <label htmlFor="f-service">{tr('cf.service')}</label>
        <select id="f-service" name="service" value={fields.service} onChange={handleChange}>
          {/* option values stay English: they are sent to the Worker as the service label */}
          <option value="">{tr('cf.service_ph')}</option>
          <option value="Founding Employer Partner Programme">{tr('cf.founding')}</option>
          {SERVICES.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
          <option value="Other">{tr('cf.other')}</option>
        </select>
      </div>

      {fields.service === 'Other' && (
        <div className="form-group">
          <label htmlFor="f-serviceOther">{tr('cf.specify')}</label>
          <input id="f-serviceOther" name="serviceOther" value={fields.serviceOther} onChange={handleChange} placeholder={tr('cf.specify_ph')} />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="f-message">{tr('cf.message')} <span className="required">*</span></label>
        <textarea
          id="f-message" name="message" rows={5}
          value={fields.message} onChange={handleChange}
          placeholder={tr('cf.message_ph')}
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="f-attachment">
          {tr('cf.attach')}{' '}
          <span style={{ color: 'var(--gray-500)', fontWeight: 400 }}>{tr('cf.optional')}</span>
        </label>
        <input
          id="f-attachment"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={e => {
            const file = e.target.files[0];
            if (file && file.size > 5 * 1024 * 1024) {
              alert(tr('cf.file_big'));
              e.target.value = '';
              return;
            }
            setFields(p => ({ ...p, attachment: file || null }));
          }}
          style={{ padding: '10px 0', fontSize: '0.875rem', color: 'var(--gray-500)' }}
        />
        <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{tr('cf.file_hint')}</span>
      </div>

      <div className="form-submit-row">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? tr('cf.sending') : tr('cf.send')}
        </button>
      </div>
    </form>
  );
}
