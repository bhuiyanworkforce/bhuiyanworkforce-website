import React, { useState } from 'react';

const EMPTY = { name: '', company: '', email: '', service: '', serviceOther: '', message: '', attachment: null };

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function validate(f) {
  const e = {};
  if (!f.name.trim())    e.name    = 'Your name is required.';
  if (!f.email.trim())   e.email   = 'Email address is required.';
  else if (!f.email.includes('@') || !f.email.includes('.') || f.email.indexOf('@') === 0 || f.email.lastIndexOf('.') < f.email.indexOf('@'))
                         e.email   = 'Please enter a valid email address.';
  if (!f.message.trim()) e.message = 'Please describe your requirements.';
  else if (f.message.trim().length < 20)
                         e.message = 'Too short — please add more detail (min 20 characters).';
  return e;
}

export default function ContactForm() {
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
    const errs = validate(fields);
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
      <h3>Message Sent!</h3>
      <p>Thank you for reaching out. We'll get back to you within one business day.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="form-error-banner">
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:info@bhuiyanworkforce.com" style={{ color: '#e53e3e', fontWeight: 600 }}>
            info@bhuiyanworkforce.com
          </a>{' '}directly.
        </div>
      )}

      <div className="form-group">
        <label htmlFor="f-name">Your Name <span className="required">*</span></label>
        <input id="f-name" name="name" value={fields.name} onChange={handleChange} placeholder="e.g. Ahmed Al-Rashid" />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="f-email">Email Address <span className="required">*</span></label>
        <input id="f-email" name="email" type="email" value={fields.email} onChange={handleChange} placeholder="you@company.com" />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="f-company">Company / Organisation</label>
        <input id="f-company" name="company" value={fields.company} onChange={handleChange} placeholder="Your company name (optional)" />
      </div>

      <div className="form-group">
        <label htmlFor="f-service">Service Required</label>
        <select id="f-service" name="service" value={fields.service} onChange={handleChange}>
          <option value="">— Select a service —</option>
          <option>Construction & Engineering</option>
          <option>Driving & Logistics</option>
          <option>Hospitality & Catering</option>
          <option>Agriculture & Horticulture</option>
          <option>Warehouse & Logistics</option>
          <option>Manufacturing & Production</option>
          <option>Oil & Gas</option>
          <option>Healthcare & Medical</option>
          <option>Security Services</option>
          <option>Cleaning & Housekeeping</option>
          <option>Retail</option>
          <option>Other</option>
        </select>
      </div>

      {fields.service === 'Other' && (
        <div className="form-group">
          <label htmlFor="f-serviceOther">Please specify</label>
          <input id="f-serviceOther" name="serviceOther" value={fields.serviceOther} onChange={handleChange} placeholder="Describe the service you need" />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="f-message">Your Requirements <span className="required">*</span></label>
        <textarea
          id="f-message" name="message" rows={5}
          value={fields.message} onChange={handleChange}
          placeholder="Please describe your workforce requirements — number of workers, roles, destination country, timeline, etc."
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="f-attachment">
          Attach Job Description / Demand Letter{' '}
          <span style={{ color: 'var(--gray-500)', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="f-attachment"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={e => {
            const file = e.target.files[0];
            if (file && file.size > 5 * 1024 * 1024) {
              alert('File is too large. Maximum size is 5MB.');
              e.target.value = '';
              return;
            }
            setFields(p => ({ ...p, attachment: file || null }));
          }}
          style={{ padding: '10px 0', fontSize: '0.875rem', color: 'var(--gray-500)' }}
        />
        <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>PDF, Word, or image — max 5MB</span>
      </div>

      <div className="form-submit-row">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Message →'}
        </button>
      </div>
    </form>
  );
}
