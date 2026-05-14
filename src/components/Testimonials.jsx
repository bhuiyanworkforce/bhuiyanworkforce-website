import React from 'react';

export default function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="label-tag">Employer Stories</div>
          <h2 className="section-title">What Our Partners Say</h2>
          <p className="section-subtitle">We are actively building our deployment track record. Verified employer testimonials will be published as placements are completed and partners give their consent to be featured.</p>
        </div>

        <div className="testimonials-wrapper">
          <div className="testimonial-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🤝</div>
            <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 16px' }}>
              Client testimonials will be published as we build our deployment track record. We are committed to featuring only verified, genuine feedback from real employer partners.
            </p>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>
              Are you an employer who has worked with us? <a href="mailto:partnerships@bhuiyanworkforce.com" style={{ color: 'var(--gold)' }}>Contact us to share your experience →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
