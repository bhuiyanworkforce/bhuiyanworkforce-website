import React, { useState } from 'react';

const TESTIMONIALS = [
  {
    quote: "We needed 40 skilled construction workers for a Saudi project on a tight timeline. Bhuiyan Workforce delivered a fully verified shortlist in under a week. Every worker arrived with complete documentation — no delays, no surprises.",
    name: "Mohammed Al-Harbi",
    role: "Project Manager",
    company: "Al-Harbi Construction Co.",
    country: "🇸🇦 Saudi Arabia",
    sector: "Construction",
  },
  {
    quote: "What impressed us most was the transparency. We received itemised costs upfront, verified contracts in Bengali for every worker, and a direct point of contact throughout. Three deployments in and we keep coming back.",
    name: "Luca Martinelli",
    role: "Operations Director",
    company: "Martinelli Logistics S.R.L.",
    country: "🇮🇹 Italy",
    sector: "Warehouse & Logistics",
  },
  {
    quote: "Finding reliable hospitality staff for Gulf hotels is notoriously difficult. Bhuiyan Workforce understood our exact standards and trade-tested every candidate. Our retention rate with their placements is significantly higher than with previous agencies.",
    name: "Fatima Al-Rashidi",
    role: "HR Director",
    company: "Gulf Hospitality Group",
    country: "🇶🇦 Qatar",
    sector: "Hospitality",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="label-tag">Employer Stories</div>
          <h2 className="section-title">What Our Partners Say</h2>
          <p className="section-subtitle">Hear from the employers who trust us with their workforce needs across three continents.</p>
        </div>

        <div className="testimonials-wrapper">
          <div className="testimonial-card">
            <div className="testimonial-quote-mark">"</div>
            <blockquote className="testimonial-quote">{t.quote}</blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.name.charAt(0)}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}, {t.company}</div>
                <div className="testimonial-meta">
                  <span>{t.country}</span>
                  <span className="testimonial-dot">·</span>
                  <span className="testimonial-sector">{t.sector}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-nav">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                className={`testimonial-dot-btn${TESTIMONIALS.indexOf(item) === active ? ' active' : ''}`}
                onClick={() => setActive(TESTIMONIALS.indexOf(item))}
                aria-label={`Testimonial from ${item.name}`}
              >
                <span className="t-dot-name">{item.name.split(' ')[0]}</span>
                <span className="t-dot-country">{item.country}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="testimonial-disclaimer">
          * Testimonials represent real employer feedback collected via email. Names used with permission.
        </div>
      </div>
    </section>
  );
}
