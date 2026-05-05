import React from 'react';
import { Link } from 'react-router-dom';
import { LogoSVG } from './Logo';

export default function Footer() {
  const goContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else globalThis.location.href = '/#contact';
  };

  return (<>
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <LogoSVG variant="light" width={160} />
            <p style={{ marginTop: 16 }}>Connecting skilled Bangladeshi workers with employers across 25 countries. Trusted, compliant, and transparent recruitment since 2021.</p>
            <div className="social-links" style={{ marginTop: 20 }}>
              <a href="https://linkedin.com/company/bhuiyan-workforce" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              <a href="https://www.facebook.com/share/1GjrNbPYvf/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
              <a href="https://wa.me/8801864567912" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">W</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/construction">Construction</Link></li>
              <li><Link to="/services/drivers">Drivers &amp; Transport</Link></li>
              <li><Link to="/services/hospitality">Chefs &amp; Hospitality</Link></li>
              <li><Link to="/services/farm-garden">Farm &amp; Garden</Link></li>
              <li><Link to="/services/warehouse">Warehouse &amp; Logistics</Link></li>
              <li><Link to="/services/factory">Factory &amp; Manufacturing</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><button onClick={goContact}>Contact</button></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/countries">Countries</Link></li>
              <li><Link to="/employer-guide">Employer's Guide</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@bhuiyanworkforce.com">info@bhuiyanworkforce.com</a></li>
              <li><a href="mailto:partnerships@bhuiyanworkforce.com">partnerships@bhuiyanworkforce.com</a></li>
              <li><a href="mailto:careers@bhuiyanworkforce.com">careers@bhuiyanworkforce.com</a></li>
              <li><a href="tel:+8801864567912">+880 1864 567912</a></li>
              <li><a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer">WhatsApp (Employers)</a></li>
              <li><a href="https://wa.me/8801978356710" target="_blank" rel="noopener noreferrer">WhatsApp (Workers)</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bhuiyan Workforce Ltd. All rights reserved. Registered in Bangladesh.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>

    {/* Sticky Contact Buttons */}
    <div style={{ position: 'fixed', bottom: 24, right: 20, zIndex: 999, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Call Button */}
      <a
        href="tel:+8801864567912"
        aria-label="Call us"
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--navy)', color: 'var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(8,30,63,0.4)',
          textDecoration: 'none', transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/8801864567912"
        target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          textDecoration: 'none', transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  </>
  );
}
