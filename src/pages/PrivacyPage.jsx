import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>Privacy Policy</span>
            </div>
            <h1>Privacy Policy</h1>
            <p>How Bhuiyan Workforce Ltd. collects, uses, and protects your personal information.</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }} className="prose">
            <p style={{ color: 'var(--gray-500)', marginBottom: 32, fontSize: '0.875rem' }}>
              Last updated: January 2025
            </p>

            <h2>1. Who We Are</h2>
            <p>Bhuiyan Workforce Ltd. ("we", "us", "our") is a manpower recruitment company based in Bangladesh. Our website is bhuiyanworkforce.com. For privacy enquiries, contact us at <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>.</p>

            <h2>2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>Contact form submissions (name, company, email, and message)</li>
              <li>Email correspondence and WhatsApp communications</li>
              <li>Worker candidate information (CV, trade certificates, passport details) provided when registering interest</li>
            </ul>
            <p>We do not use cookies for tracking or analytics beyond what is strictly necessary to operate the website.</p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to enquiries submitted via the contact form or email</li>
              <li>Match worker candidates with appropriate employer opportunities</li>
              <li>Process deployment documentation as part of our recruitment service</li>
              <li>Send relevant updates if you have opted in to communications</li>
            </ul>
            <p>We do not sell your personal data to third parties. We do not use your data for advertising purposes.</p>

            <h2>4. Data Sharing</h2>
            <p>We may share personal data with:</p>
            <ul>
              <li>Employers seeking workers, where a candidate has consented to their profile being shared</li>
              <li>Government authorities (BMET, embassies, immigration bodies) as required by law during the deployment process</li>
              <li>Our email and communication service providers, who process data on our behalf under data processing agreements</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>Contact form submissions are retained for up to 24 months. Worker candidate profiles are retained for up to 3 years or until a candidate requests deletion. Deployment documentation may be retained for longer periods where required by Bangladeshi law.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, email us at <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>. We will respond within 30 days.</p>

            <h2>7. Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data, including secure email transmission and restricted access to candidate records.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will post the updated version on this page with a revised "last updated" date.</p>

            <h2>9. Contact</h2>
            <p>For any privacy-related questions or requests, please contact us at <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a> or via WhatsApp at +880 1864 567912.</p>
          </div>
        </div>
      </section>
    </>
  );
}
