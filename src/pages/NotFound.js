import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: 16, justifyItems: 'center', textAlign: 'center' }}>
        <img src="/images/logo_star.png" alt="" style={{ width: 120 }} />
        <h2>Esta página se fue al recreo.</h2>
        <p style={{ color: 'var(--soft)' }}>El enlace no existe o cambió de lugar.</p>
        <Link to="/" className="btn btn--yellow">Volver al inicio</Link>
      </div>
    </section>
  );
}
