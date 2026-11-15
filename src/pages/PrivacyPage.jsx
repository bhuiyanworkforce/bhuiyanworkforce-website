import React from 'react';
import { Link } from '../i18n/router';
import Tx from '../i18n/Tx';

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}><Tx>Privacy Policy</Tx></span>
            </div>
            <h1><Tx>Privacy Policy</Tx></h1>
            <p><Tx>How Bhuiyan Workforce Ltd. collects, uses, and protects your personal information.</Tx></p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }} className="prose">
            <p style={{ color: 'var(--gray-500)', marginBottom: 32, fontSize: '0.875rem' }}>
              <Tx>Last updated: November 2026</Tx>
            </p>

            <h2><Tx>1. Who We Are</Tx></h2>
            <p><Tx>Bhuiyan Workforce Ltd. ("we", "us", "our") is a Bangladesh-based international manpower recruitment company. Our registered office is in Brahmanbaria, Bangladesh. Our website is bhuiyanworkforce.com.</Tx></p>
            <p><Tx>For all privacy-related enquiries, contact us at</Tx> <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>.</p>

            <h2><Tx>2. Who This Policy Applies To</Tx></h2>
            <p><Tx>This Privacy Policy applies to:</Tx></p>
            <ul>
              <li><strong>Employers</strong> <Tx>— companies and individuals who contact us to source workers</Tx></li>
              <li><strong><Tx>Worker candidates</Tx></strong> <Tx>— individuals who register interest in overseas employment opportunities</Tx></li>
              <li><strong><Tx>Website visitors</Tx></strong> <Tx>— anyone who browses bhuiyanworkforce.com</Tx></li>
            </ul>

            <h2><Tx>3. Information We Collect</Tx></h2>
            <p><Tx>We collect information in the following ways:</Tx></p>
            <ul>
              <li><strong><Tx>Contact form submissions</Tx></strong> <Tx>— name, company name, email address, and your message</Tx></li>
              <li><strong><Tx>Direct communications</Tx></strong> <Tx>— emails, WhatsApp messages, and phone calls you initiate with us</Tx></li>
              <li><strong><Tx>Worker candidate registrations</Tx></strong> <Tx>— name, date of birth, nationality, passport details, trade qualifications, work experience, and supporting documents such as certificates and photographs</Tx></li>
              <li><strong><Tx>Technical data</Tx></strong> <Tx>— IP address, browser type, and pages visited, collected automatically when you use our website</Tx></li>
            </ul>
            <p><Tx>Worker candidates apply through an online form on this website. Documents you upload there, such as your CV, passport copy and certificates, are sent to our team by email and pass through our hosting provider's servers (Cloudflare) on the way. Before you can submit the form you are asked to confirm that you have read this policy and consent to this processing, and we keep a record of the time you gave that consent together with your application.</Tx></p>
            <p><Tx>We do not collect payment information. All financial transactions related to our services are conducted offline.</Tx></p>

            <h2><Tx>4. How We Use Your Information</Tx></h2>
            <p><Tx>We use the information we collect to:</Tx></p>
            <ul>
              <li><Tx>Respond to employer enquiries and prepare recruitment proposals</Tx></li>
              <li><Tx>Match worker candidates with suitable employer opportunities</Tx></li>
              <li><Tx>Process BMET registration, visa applications, medical clearances, and other deployment documentation</Tx></li>
              <li><Tx>Communicate with you about the status of an active recruitment or deployment</Tx></li>
              <li><Tx>Comply with legal obligations under Bangladeshi law and the laws of destination countries</Tx></li>
              <li><Tx>Improve our website and services based on usage patterns</Tx></li>
            </ul>
            <p><Tx>We do not sell, rent, or trade your personal data to any third party for commercial purposes.</Tx></p>

            <h2><Tx>5. Data Sharing</Tx></h2>
            <p><Tx>We may share your personal data only in the following circumstances:</Tx></p>
            <ul>
              <li><strong><Tx>With employers</Tx></strong> <Tx>— worker candidate profiles are shared with prospective employers only after the candidate has been informed and has consented</Tx></li>
              <li><strong><Tx>With government authorities</Tx></strong> <Tx>— BMET, Bangladesh embassies, destination-country immigration authorities, and GAMCA-approved medical centres, as required by law during the deployment process</Tx></li>
              <li><strong><Tx>With service providers</Tx></strong> <Tx>— third-party providers who assist us in operating our website and communications, bound by confidentiality obligations</Tx></li>
              <li><strong><Tx>When required by law</Tx></strong> <Tx>— in response to a lawful request from a court, government authority, or regulatory body in Bangladesh</Tx></li>
            </ul>

            <h2><Tx>6. Cookies and Tracking</Tx></h2>
            <p><Tx>Our website uses minimal cookies necessary for basic functionality. We do not use advertising cookies or third-party tracking pixels. Technical data such as page visits may be logged by our hosting provider (Cloudflare) for security and performance purposes. You can disable cookies in your browser settings without affecting your ability to use the website.</Tx></p>

            <h2><Tx>7. Data Retention</Tx></h2>
            <ul>
              <li><strong><Tx>Contact form enquiries</Tx></strong> <Tx>— retained for up to 24 months from the date of submission</Tx></li>
              <li><strong><Tx>Worker candidate profiles</Tx></strong> <Tx>— retained for up to 3 years, or until the candidate requests deletion</Tx></li>
              <li><strong><Tx>Deployment documentation</Tx></strong> <Tx>— retained for up to 7 years where required by Bangladeshi law or the laws of the destination country</Tx></li>
              <li><strong><Tx>Technical/website logs</Tx></strong> <Tx>— retained for up to 90 days</Tx></li>
            </ul>

            <h2><Tx>8. Your Rights</Tx></h2>
            <p><Tx>You have the right to:</Tx></p>
            <ul>
              <li><strong>Access</strong> <Tx>— request a copy of the personal data we hold about you</Tx></li>
              <li><strong>Correction</strong> <Tx>— request that inaccurate or incomplete data be corrected</Tx></li>
              <li><strong>Deletion</strong> <Tx>— request that your personal data be deleted, subject to our legal obligations to retain certain records</Tx></li>
              <li><strong>Objection</strong> <Tx>— object to our use of your data for any purpose other than legal compliance</Tx></li>
            </ul>
            <p><Tx>To exercise any of these rights, email us at</Tx> <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a><Tx>. We will respond within 30 days.</Tx></p>

            <h2><Tx>9. GDPR — Additional Rights for EU/EEA Data Subjects</Tx></h2>
            <p><Tx>If you are located in the European Union or European Economic Area, the General Data Protection Regulation (GDPR) gives you additional rights beyond those listed in Section 8, and requires us to disclose the following:</Tx></p>
            <ul>
              <li><strong><Tx>Legal basis for processing</Tx></strong> <Tx>— we process your data based on your consent (when you submit a contact or application form), our legitimate interest in operating a recruitment business, and, where applicable, the performance of a contract with you or your employer</Tx></li>
              <li><strong><Tx>Data Controller</Tx></strong> <Tx>— Bhuiyan Workforce Ltd. is the data controller for personal data submitted through this website</Tx></li>
              <li><strong><Tx>Right to restriction of processing</Tx></strong> <Tx>— you may request that we limit how we use your data while a dispute about its accuracy or our right to use it is resolved</Tx></li>
              <li><strong><Tx>Right to data portability</Tx></strong> <Tx>— you may request your data in a structured, commonly used, machine-readable format</Tx></li>
              <li><strong><Tx>Right to withdraw consent</Tx></strong> <Tx>— where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of processing carried out before withdrawal</Tx></li>
              <li><strong><Tx>Right to lodge a complaint</Tx></strong> <Tx>— you have the right to lodge a complaint with the data protection supervisory authority in your EU/EEA country of residence</Tx></li>
            </ul>
            <p><Tx>To exercise any GDPR right, email us at</Tx> <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a><Tx>. We aim to respond to GDPR requests within 30 days, consistent with regulatory timelines.</Tx></p>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}><Tx>This section is provided as a good-faith disclosure and does not constitute legal advice. We recommend consulting a qualified data protection professional for guidance specific to your circumstances.</Tx></p>

            <h2><Tx>10. Data Security</Tx></h2>
            <p><Tx>We implement appropriate technical and organisational measures to protect your personal data from unauthorised access, loss, or disclosure. These include encrypted email transmission, restricted access to candidate records, and secure cloud storage. No method of transmission over the internet is 100% secure; however, we take all reasonable steps to protect your information.</Tx></p>

            <h2><Tx>11. International Data Transfers</Tx></h2>
            <p><Tx>As an international recruitment agency, we necessarily transfer personal data across borders — for example, sharing a worker's documents with an employer in Saudi Arabia or submitting visa applications to European embassies. We do this only where necessary for the recruitment process and in accordance with applicable law.</Tx></p>

            <h2><Tx>12. Governing Law</Tx></h2>
            <p><Tx>This Privacy Policy is governed by the laws of Bangladesh, including applicable Bangladeshi cyber-security and data protection laws and regulations. Any disputes arising from this policy shall be subject to the jurisdiction of the courts of Bangladesh.</Tx></p>

            <h2><Tx>13. Changes to This Policy</Tx></h2>
            <p><Tx>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the updated version on this page with a revised "last updated" date. Continued use of the website after any update constitutes acceptance of the revised policy.</Tx></p>

            <h2><Tx>14. Contact</Tx></h2>
            <p><Tx>For any privacy-related questions, requests, or complaints, please contact us:</Tx></p>
            <ul>
              <li><Tx>Email:</Tx> <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a></li>
              <li><Tx>WhatsApp:</Tx> <a href="https://wa.me/8801864567912" style={{ color: 'var(--navy)', fontWeight: 600 }}>+880 1864 567912</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
