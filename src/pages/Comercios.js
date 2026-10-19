import React from 'react';

export default function Comercios() {
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: 20, maxWidth: 760 }}>
        <p className="eyebrow">Comercios y colegios</p>
        <h2>Vendé KRAFT en tu local.</h2>
        <p style={{ color: 'var(--soft)' }}>
          Venta por mayor a zapaterías, uniformerías y cooperadoras escolares. Armamos curva de talles del 22 al 34
          para el inicio de clases, en horma clásica y ancha.
        </p>
        <div style={{ background: 'var(--yellow)', color: 'var(--black)', borderRadius: 20, padding: 28, display: 'grid', gap: 8, border: '2px solid var(--black)' }}>
          <h3 style={{ fontSize: 26 }}>Escribinos</h3>
          <p>Instagram: <a href="https://instagram.com/kraftescolar" target="_blank" rel="noreferrer" style={{ fontWeight: 600, textDecoration: 'underline' }}>@kraftescolar</a></p>
          <p className="draft-note">WhatsApp y mail a completar.</p>
        </div>
      </div>
    </section>
  );
}
