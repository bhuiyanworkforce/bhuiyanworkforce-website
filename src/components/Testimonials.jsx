import React from 'react';
import { Link } from 'react-router-dom';

// Replace this entire section with the Founding Employer Program call-to-action
// until real testimonials are available
export default function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="label-tag">Founding Employer Program</div>
          <h2 className="section-title">Be the First to Work With Us</h2>
          <p className="section-subtitle">
            We are accepting 10 founding employer partners ahead of our BMET licence activation in October 2026.
            Founding partners receive priority mobilisation and a guaranteed first shortlist within 7 working days of licence activation.
          </p>
        </div>

        <div className="testimonials-wrapper">
          <div className="testimonial-card" style={{ padding: '40px 40px 36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
              {[
                { icon: '⚡', title: 'Priority Mobilisation', desc: 'First in queue the moment our licence activates in October 2026.' },
                { icon: '📋', title: '7-Day Shortlist Guarantee', desc: 'A verified shortlist of candidates delivered within 7 working days of licence activation.' },
                { icon: '👤', title: 'Direct Founder Access', desc: 'Your first placement handled personally by MD Rezaul Kabir Bhuiyan.' },
                { icon: '🔒', title: 'Zero Obligation', desc: 'Reserve your slot now. Review when the licence is active. No commitment until you\'re ready.' },
              ].map(b => (
                <div key={b.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem', marginBottom: 4 }}>{b.title}</div>
                    <div style={{ color: 'var(--gray-500)', fontSize: '0.82rem', lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderTop: '1px solid var(--gray-100)', paddingTop: 24 }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: 6 }}>Slots Available</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1 }}>10</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>of 10 founding slots remaining</span>
                </div>
              </div>
              <Link to="/#contact" className="btn btn-primary" onClick={() => {
                const el = document.getElementById('contact');
                if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
              }}>
                Reserve a Founding Slot →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
