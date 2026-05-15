import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  useEffect(() => {
    const title = 'Terms of Service — Bhuiyan Workforce Ltd.';
    const description = 'Terms and conditions governing use of the Bhuiyan Workforce Ltd. website and recruitment services, governed by the laws of Bangladesh.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://bhuiyanworkforce.com/terms');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = 'https://bhuiyanworkforce.com/terms';
  }, []);

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
              Last updated: May 2026
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the bhuiyanworkforce.com website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the website. These terms apply to all visitors, employers, and worker candidates who access our website or engage with our services.</p>

            <h2>2. About Bhuiyan Workforce Ltd.</h2>
            <p>Bhuiyan Workforce Ltd. is a Bangladesh-based international manpower recruitment company. We connect skilled Bangladeshi workers with employers across 25+ countries in the Gulf, Europe, and Southeast Asia. Our recruitment and deployment services are governed by separate written service agreements between Bhuiyan Workforce Ltd. and the engaging employer.</p>

            <h2>3. Website Use</h2>
            <p>You may use this website for lawful purposes only. You agree not to:</p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations in Bangladesh or your jurisdiction</li>
              <li>Submit false, misleading, or fraudulent information through any form on the website</li>
              <li>Impersonate any person, company, or organisation</li>
              <li>Attempt to gain unauthorised access to any part of the website, our servers, or any connected systems</li>
              <li>Use automated tools, scrapers, or bots to extract content from the website without our written permission</li>
              <li>Transmit unsolicited commercial communications (spam) through any channel on the website</li>
              <li>Upload or transmit any content that is harmful, offensive, defamatory, or infringes on the rights of others</li>
            </ul>

            <h2>4. Employer Enquiries</h2>
            <p>Employers may submit recruitment enquiries through our contact form, email, or WhatsApp. Submitting an enquiry does not constitute a binding contract or guarantee of service. We will respond to genuine enquiries within 24 hours but reserve the right to decline any enquiry at our sole discretion.</p>
            <p>Any formal recruitment engagement will be subject to a separate written service agreement specifying the scope of services, fees, timelines, and obligations of both parties. No recruitment fees or service charges are collected through this website — all payments are handled offline under the terms of that agreement.</p>

            <h2>5. Worker Candidate Registrations</h2>
            <p>Worker candidates who register interest in overseas employment through this website consent to their information being held on our candidate database and, where a suitable opportunity arises, being shared with prospective employers. Registering interest does not guarantee placement or employment. Bhuiyan Workforce Ltd. acts as a recruitment intermediary and is not itself the employer.</p>
            <p>Candidates are responsible for ensuring all information and documents submitted are accurate and genuine. Submission of fraudulent documents is a criminal offence under Bangladeshi law and will result in immediate disqualification and may be reported to the relevant authorities.</p>

            <h2>6. Accuracy of Information</h2>
            <p>We endeavour to keep all information on this website accurate, current, and complete. However, we make no warranties — express or implied — regarding the accuracy, completeness, or fitness for purpose of any content. Country-specific information including visa types, processing times, salary ranges, and government fees are indicative and subject to change without notice. Employers and candidates should verify all regulatory requirements with the relevant authorities before proceeding.</p>

            <h2>7. Fees and Payments</h2>
            <p>All service fees charged by Bhuiyan Workforce Ltd. are agreed in writing prior to commencement of any recruitment engagement. We do not charge worker candidates any fees in violation of the BMET fee schedule or the laws of the destination country. No payments are processed through this website.</p>

            <h2>8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, Bhuiyan Workforce Ltd. shall not be liable for:</p>
            <ul>
              <li>Any indirect, incidental, special, or consequential damages arising from your use of or inability to use this website</li>
              <li>Any reliance placed on information published on this website</li>
              <li>Any interruption, suspension, or termination of the website or its services</li>
              <li>Actions or omissions of employers, workers, government authorities, or other third parties involved in the recruitment and deployment process</li>
            </ul>
            <p>Our total liability to you for any claim arising from these terms or your use of the website shall not exceed BDT 10,000 (ten thousand Bangladeshi Taka).</p>

            <h2>9. Intellectual Property</h2>
            <p>All content on this website — including the Bhuiyan Workforce Ltd. name, logo, text, graphics, page layouts, and data — is the intellectual property of Bhuiyan Workforce Ltd. and is protected under applicable Bangladeshi and international intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written permission.</p>
            <p>You may share links to pages on our website and quote brief excerpts for non-commercial informational purposes, provided appropriate attribution is given.</p>

            <h2>10. Third-Party Links and Services</h2>
            <p>This website contains links to third-party platforms including WhatsApp, LinkedIn, and Facebook. These links are provided for convenience only. We are not responsible for the content, privacy practices, or terms of service of any third-party website. Accessing third-party links is at your own risk.</p>

            <h2>11. Anti-Fraud and Impersonation Warning</h2>
            <p>Bhuiyan Workforce Ltd. only communicates through official channels: info@bhuiyanworkforce.com, careers@bhuiyanworkforce.com, and the phone numbers listed on this website. We do not offer jobs via unsolicited WhatsApp messages, social media direct messages, or unofficial websites. If you receive a suspicious communication claiming to be from us, please report it to <a href="mailto:info@bhuiyanworkforce.com" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@bhuiyanworkforce.com</a> immediately.</p>

            <h2>12. Governing Law and Jurisdiction</h2>
            <p>These Terms of Service are governed by and construed in accordance with the laws of the People's Republic of Bangladesh, including but not limited to the Contract Act 1872, the Information and Communication Technology Act 2006, and the Digital Security Act 2018. Any dispute, claim, or controversy arising out of or relating to these terms or your use of the website shall be subject to the exclusive jurisdiction of the competent courts of Dhaka, Bangladesh.</p>

            <h2>13. Changes to These Terms</h2>
            <p>We reserve the right to update or modify these Terms of Service at any time. Changes will be posted on this page with a revised "last updated" date. Continued use of the website following the posting of any changes constitutes your acceptance of the revised terms. We encourage you to review this page periodically.</p>

            <h2>14. Severability</h2>
            <p>If any provision of these Terms of Service is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, that provision shall be severed from the remaining terms, which shall continue in full force and effect.</p>

            <h2>15. Contact</h2>
            <p>For any questions regarding these terms, please contact us:</p>
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
