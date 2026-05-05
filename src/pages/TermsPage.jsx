import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>Terms of Service</span>
            </div>
            <h1>Terms of Service</h1>
            <p>The terms and conditions governing use of the Bhuiyan Workforce Ltd. website and services.</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }} className="prose">
            <p style={{ color: 'var(--gray-500)', marginBottom: 32, fontSize: '0.875rem' }}>
              Last updated: January 2025
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the bhuiyanworkforce.com website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.</p>

            <h2>2. About Our Services</h2>
            <p>Bhuiyan Workforce Ltd. provides international manpower recruitment services, connecting employers with skilled Bangladeshi workers. Our services include candidate sourcing, documentation support, and deployment coordination. The specific terms of any recruitment engagement are governed by a separate service agreement between Bhuiyan Workforce Ltd. and the employer.</p>

            <h2>3. Website Use</h2>
            <p>You may use this website for lawful purposes only. You must not:</p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Submit false or misleading information via the contact form</li>
              <li>Attempt to gain unauthorised access to any part of the website or its related systems</li>
              <li>Use the website to transmit unsolicited commercial communications</li>
            </ul>

            <h2>4. Contact Form Submissions</h2>
            <p>Submitting an enquiry via the contact form does not constitute a binding contract or guarantee of service. We will respond to genuine enquiries within 24 hours but reserve the right to decline any enquiry at our discretion.</p>

            <h2>5. Accuracy of Information</h2>
            <p>We endeavour to keep the information on this website accurate and up to date. However, we make no warranties regarding the completeness or accuracy of the content. Country lists, timelines, and statistics are indicative and subject to change.</p>

            <h2>6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Bhuiyan Workforce Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on its content.</p>

            <h2>7. Third-Party Links</h2>
            <p>This website may contain links to third-party websites (such as WhatsApp, LinkedIn, or Facebook). We are not responsible for the content or privacy practices of those sites.</p>

            <h2>8. Intellectual Property</h2>
            <p>All content on this website, including the Bhuiyan Workforce Ltd. logo, text, and design, is the property of Bhuiyan Workforce Ltd. and may not be reproduced without written permission.</p>

            <h2>9. Governing Law</h2>
            <p>These Terms of Service are governed by the laws of Bangladesh. Any disputes arising from these terms shall be subject to the jurisdiction of the courts of Bangladesh.</p>

            <h2>10. Changes to These Terms</h2>
            <p>We may update these Terms of Service at any time. Continued use of the website following any changes constitutes your acceptance of the revised terms.</p>

            <h2>11. Contact</h2>
            <p>For any questions regarding these terms, please contact us at <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
