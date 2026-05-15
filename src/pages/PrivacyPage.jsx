import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  useEffect(() => {
    const title = 'Privacy Policy — Bhuiyan Workforce Ltd.';
    const description = 'How Bhuiyan Workforce Ltd. collects, uses, and protects your personal information in accordance with Bangladesh law.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://bhuiyanworkforce.com/privacy');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = 'https://bhuiyanworkforce.com/privacy';
  }, []);

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
              Last updated: May 2026
            </p>

            <h2>1. Who We Are</h2>
            <p>Bhuiyan Workforce Ltd. ("we", "us", "our") is a Bangladesh-based international manpower recruitment company. Our registered office is in Brahmanbaria, Bangladesh. Our website is bhuiyanworkforce.com.</p>
            <p>For all privacy-related enquiries, contact us at <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>.</p>

            <h2>2. Who This Policy Applies To</h2>
            <p>This Privacy Policy applies to:</p>
            <ul>
              <li><strong>Employers</strong> — companies and individuals who contact us to source workers</li>
              <li><strong>Worker candidates</strong> — individuals who register interest in overseas employment opportunities</li>
              <li><strong>Website visitors</strong> — anyone who browses bhuiyanworkforce.com</li>
            </ul>

            <h2>3. Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul>
              <li><strong>Contact form submissions</strong> — name, company name, email address, and your message</li>
              <li><strong>Direct communications</strong> — emails, WhatsApp messages, and phone calls you initiate with us</li>
              <li><strong>Worker candidate registrations</strong> — name, date of birth, nationality, passport details, trade qualifications, work experience, and supporting documents such as certificates and photographs</li>
              <li><strong>Technical data</strong> — IP address, browser type, and pages visited, collected automatically when you use our website</li>
            </ul>
            <p>We do not collect payment information. All financial transactions related to our services are conducted offline.</p>

            <h2>4. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to employer enquiries and prepare recruitment proposals</li>
              <li>Match worker candidates with suitable employer opportunities</li>
              <li>Process BMET registration, visa applications, medical clearances, and other deployment documentation</li>
              <li>Communicate with you about the status of an active recruitment or deployment</li>
              <li>Comply with legal obligations under Bangladeshi law and the laws of destination countries</li>
              <li>Improve our website and services based on usage patterns</li>
            </ul>
            <p>We do not sell, rent, or trade your personal data to any third party for commercial purposes.</p>

            <h2>5. Data Sharing</h2>
            <p>We may share your personal data only in the following circumstances:</p>
            <ul>
              <li><strong>With employers</strong> — worker candidate profiles are shared with prospective employers only after the candidate has been informed and has consented</li>
              <li><strong>With government authorities</strong> — BMET, Bangladesh embassies, destination-country immigration authorities, and GAMCA-approved medical centres, as required by law during the deployment process</li>
              <li><strong>With service providers</strong> — third-party providers who assist us in operating our website and communications, bound by confidentiality obligations</li>
              <li><strong>When required by law</strong> — in response to a lawful request from a court, government authority, or regulatory body in Bangladesh</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>Our website uses minimal cookies necessary for basic functionality. We do not use advertising cookies or third-party tracking pixels. Technical data such as page visits may be logged by our hosting provider (Cloudflare) for security and performance purposes. You can disable cookies in your browser settings without affecting your ability to use the website.</p>

            <h2>7. Data Retention</h2>
            <ul>
              <li><strong>Contact form enquiries</strong> — retained for up to 24 months from the date of submission</li>
              <li><strong>Worker candidate profiles</strong> — retained for up to 3 years, or until the candidate requests deletion</li>
              <li><strong>Deployment documentation</strong> — retained for up to 7 years where required by Bangladeshi law or the laws of the destination country</li>
              <li><strong>Technical/website logs</strong> — retained for up to 90 days</li>
            </ul>

            <h2>8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Correction</strong> — request that inaccurate or incomplete data be corrected</li>
              <li><strong>Deletion</strong> — request that your personal data be deleted, subject to our legal obligations to retain certain records</li>
              <li><strong>Objection</strong> — object to our use of your data for any purpose other than legal compliance</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>. We will respond within 30 days.</p>

            <h2>9. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data from unauthorised access, loss, or disclosure. These include encrypted email transmission, restricted access to candidate records, and secure cloud storage. No method of transmission over the internet is 100% secure; however, we take all reasonable steps to protect your information.</p>

            <h2>10. International Data Transfers</h2>
            <p>As an international recruitment agency, we necessarily transfer personal data across borders — for example, sharing a worker's documents with an employer in Saudi Arabia or submitting visa applications to European embassies. We do this only where necessary for the recruitment process and in accordance with applicable law.</p>

            <h2>11. Governing Law</h2>
            <p>This Privacy Policy is governed by the laws of Bangladesh, including the Digital Security Act 2018 and any applicable data protection regulations. Any disputes arising from this policy shall be subject to the jurisdiction of the courts of Bangladesh.</p>

            <h2>12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the updated version on this page with a revised "last updated" date. Continued use of the website after any update constitutes acceptance of the revised policy.</p>

            <h2>13. Contact</h2>
            <p>For any privacy-related questions, requests, or complaints, please contact us:</p>
            <ul>
              <li>Email: <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/8801864567912" style={{ color: 'var(--navy)', fontWeight: 600 }}>+880 1864 567912</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
