import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
      <div>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>404</div>
        <h1 style={{ margin: '1rem 0 0.5rem' }}>Page Not Found</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">← Back to Home</Link>
      </div>
    </section>
  );
}
