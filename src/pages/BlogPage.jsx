import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { POSTS } from '../data/posts';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const filtered = POSTS.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    (post.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>Blog</span>
            </div>
            <h1>Insights &amp; Resources</h1>
            <p>Practical guidance for employers recruiting overseas workers, and for Bangladeshi workers navigating international employment.</p>
            {/* Search */}
            <div style={{ marginTop: 24, maxWidth: 480 }}>
              <input
                type="text"
                placeholder="Search articles… e.g. Saudi visa, construction, BMET"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="label-tag">Latest Articles</div>
            <h2 className="section-title">From the Bhuiyan Workforce Ltd. Blog</h2>
            <p className="section-subtitle">Industry news, compliance updates, and practical guides for employers and workers.</p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-500)' }}>
              No articles found for "<strong>{search}</strong>" — try different keywords.
            </div>
          ) : (
          <div className="blog-grid">
            {filtered.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card" style={{ textDecoration: 'none' }}>
                <div className="blog-card-img" aria-hidden="true">{post.icon}</div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span className="blog-tag">{post.tag}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-read-more">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
          )}

          <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: 40, textAlign: 'center', marginTop: 64, border: '1px solid var(--gray-100)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 10, fontSize: '1.4rem' }}>
              Stay Up to Date
            </h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: 24, fontSize: '0.9rem' }}>
              Follow us on LinkedIn or WhatsApp for the latest recruitment news, compliance updates, and destination guides.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://linkedin.com/company/bhuiyan-workforce" target="_blank" rel="noopener noreferrer" className="btn btn-navy">Follow on LinkedIn</a>
              <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp Updates</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
