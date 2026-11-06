import React from 'react';
import { Link } from 'react-router-dom';
import HormaAnchaBlock from '../components/HormaAnchaBlock';

export default function HormaAncha() {
  return (
    <>
      <HormaAnchaBlock full />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
          <p className="eyebrow">Clásica o ancha, en los tres modelos</p>
          <h2>Acordonado, Elástico y Lona.</h2>
          <p style={{ color: 'var(--soft)', maxWidth: '52ch' }}>Elegís el modelo que pide el colegio y la versión que mejor le queda al pie de tu hijo.</p>
          <Link to="/" className="btn btn--brush btn--lg">Comprar ahora</Link>
        </div>
      </section>
    </>
  );
}
