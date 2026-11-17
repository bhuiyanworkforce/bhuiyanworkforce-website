import React, { useState } from 'react';
import { Link } from '../i18n/router';
import { POSTS } from '../data/posts';
import { useLang } from '../i18n/LanguageContext';
import { localizePost } from '../content/index.js';
import Tx from '../i18n/Tx';
import { tx } from '../i18n/extra.js';
import { StaticPageLocalizer } from '../i18n/staticPageText.js';

export default function BlogPage() {
  const { lang } = useLang();
  const localizedPosts = POSTS.map(p => localizePost(p, lang));
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', ...new Set(localizedPosts.map(p => p.tag))];

  const filtered = localizedPosts.filter(post =>
    (activeTag === 'All' || post.tag === activeTag) &&
    (post.title.toLowerCase().includes(search.toLowerCase()) ||
     post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
     post.tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <StaticPageLocalizer locale={lang} file="src/pages/BlogPage.jsx">
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>Blog</span>
            </div>
            <h1><Tx>Insights &amp; Resources</Tx></h1>
            <p><Tx>Practical guidance for employers recruiting overseas workers, and for Bangladeshi workers navigating international employment.</Tx></p>
            {/* Search */}
            <div style={{ marginTop: 24, maxWidth: 480 }}>
              <input
                type="text"
                placeholder={tx(lang, "Search articles… e.g. Saudi visa, construction, BMET")}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tag Filter */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 0', scrollbarWidth: 'none' }}>
            {tags.map(tg => (
              <button
                key={tg}
                onClick={() => setActiveTag(tg)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  border: activeTag === tg ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.15)',
                  background: activeTag === tg ? 'var(--gold)' : 'transparent',
                  color: activeTag === tg ? 'var(--navy)' : 'rgba(255,255,255,0.7)',
                  fontWeight: activeTag === tg ? 700 : 400,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {tg}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="label-tag"><Tx>Latest Articles</Tx></div>
            <h2 className="section-title"><Tx>From the Bhuiyan Workforce Ltd. Blog</Tx></h2>
            <p className="section-subtitle"><Tx>Industry news, compliance updates, and practical guides for employers and workers.</Tx></p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-500)' }}>
              <Tx>No articles found</Tx>{search ? ` ${tx(lang, 'for')} "${search}"` : ''}{activeTag !== 'All' ? ` ${tx(lang, 'in')} "${activeTag}"` : ''} <Tx>— try different keywords or filters.</Tx>
            </div>
          ) : (
          <div className="blog-grid">
            {filtered.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card" style={{ textDecoration: 'none' }}>
                <div className="blog-card-img" aria-hidden="true">{post.icon}</div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span
                      className="blog-tag"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTag(post.tag); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ cursor: 'pointer' }}
                    >
                      {post.tag}
                    </span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-read-more"><Tx>Read article →</Tx></span>
                </div>
              </Link>
            ))}
          </div>
          )}

          <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: 40, textAlign: 'center', marginTop: 64, border: '1px solid var(--gray-100)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 10, fontSize: '1.4rem' }}>
              <Tx>Stay Up to Date</Tx>
            </h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: 24, fontSize: '0.9rem' }}>
              <Tx>Follow us on LinkedIn or WhatsApp for the latest recruitment news, compliance updates, and destination guides.</Tx>
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://www.linkedin.com/company/bhuiyan-workforce-ltd/" target="_blank" rel="noopener noreferrer" className="btn btn-navy"><Tx>Follow on LinkedIn</Tx></a>
              <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Tx>WhatsApp Updates</Tx></a>
            </div>
          </div>
        </div>
      </section>
    </StaticPageLocalizer>
  );
}
