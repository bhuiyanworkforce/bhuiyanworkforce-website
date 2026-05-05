import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPost, POSTS } from '../data/posts';

function renderInlineBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, pi) =>
    pi % 2 === 1 ? <strong key={pi} style={{ color: 'var(--navy)' }}>{part}</strong> : part
  );
}

// Simple markdown-like renderer for the post content
function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--navy)', margin: '40px 0 16px', fontWeight: 700 }}>
          {line.replaceAll('## ', '')}
        </h2>
      );
    } else if (line.startsWith('**') && line.endsWith('**') && !line.slice(2,-2).includes('**')) {
      elements.push(
        <p key={key++} style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
          {renderInlineBold(line)}
        </p>
      );
    } else if (line.startsWith('- ')) {
      // Collect consecutive list items
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        const itemLine = lines[i].trim().replace('- ', '');
        // Handle bold inside list items
        items.push(
          <li key={`bullet-${i}`} style={{ padding: '5px 0 5px 24px', position: 'relative', fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 700 }}>→</span>
            {renderInlineBold(itemLine)}
          </li>
        );
        i++;
      }
      i--; // step back one since the for loop will increment
      elements.push(<ul key={key++} style={{ listStyle: 'none', marginBottom: 20 }}>{items}</ul>);
    } else if (/^\d+\./.test(line)) {
      // Numbered list - collect items
      const items = [];
      while (i < lines.length && /^\d+\./.test(lines[i].trim())) {
        const itemLine = lines[i].trim().replace(/^\d+\.\s*/, '');
        items.push(
          <li key={`numbered-${i}`} style={{ padding: '8px 0 8px 16px', fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
            {renderInlineBold(itemLine)}
          </li>
        );
        i++;
      }
      i--;
      elements.push(
        <ol key={key++} style={{ marginBottom: 20, paddingLeft: 20 }}>{items}</ol>
      );
    } else {
      // Regular paragraph — handle inline bold
      elements.push(
        <p key={key++} style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 16, fontSize: '0.97rem' }}>
          {renderInlineBold(line)}
        </p>
      );
    }
  }
  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const otherPosts = POSTS.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/blog">Blog</Link><span>›</span>
              <span style={{ color: 'var(--gold)' }}>{post.tag}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 100 }}>
                {post.tag}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{post.date}</span>
            </div>
            <h1 style={{ maxWidth: 800 }}>{post.title}</h1>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'start' }}>

            {/* Article content */}
            <article>
              <p style={{ fontSize: '1.1rem', color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--gray-100)', fontStyle: 'italic' }}>
                {post.excerpt}
              </p>
              {renderContent(post.content)}

              {/* Back to blog */}
              <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--gray-100)' }}>
                <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--navy)', fontWeight: 600, fontSize: '0.9rem' }}>
                  ← Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: 100 }}>
              {/* CTA box */}
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 28 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1.15rem', marginBottom: 10 }}>
                  Need Workers?
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 20 }}>
                  Bhuiyan Workforce Ltd. supplies skilled workers across 25 countries. Get in touch for a free consultation.
                </p>
                <Link to="/#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Contact Us →
                </Link>
                <a href="https://wa.me/8801864567912" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
                  💬 WhatsApp Us
                </a>
              </div>

              {/* Other posts */}
              <div>
                <h4 style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)', marginBottom: 16 }}>
                  More Articles
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {otherPosts.map(p => (
                    <Link key={p.slug} to={`/blog/${p.slug}`}
                      style={{ display: 'flex', gap: 12, padding: '12px', background: 'var(--off-white)', borderRadius: 'var(--radius)', textDecoration: 'none', transition: 'all 0.25s', border: '1px solid var(--gray-100)' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-100)'}
                    >
                      <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{p.icon}</span>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.tag}</span>
                        <p style={{ fontSize: '0.82rem', color: 'var(--navy)', fontWeight: 600, lineHeight: 1.4, marginTop: 2 }}>{p.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}
