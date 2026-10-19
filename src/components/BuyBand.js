import React from 'react';
import scrollToModelos from '../scrollToModelos';
import './BuyBand.css';

// Banda de llamado a comprar con pincelada negra
export default function BuyBand({ title, text, cta = 'Comprar ahora', href = '#modelos' }) {
  return (
    <section className="bb">
      <div className="bb__inner container">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <a href={href} onClick={href === '#modelos' ? scrollToModelos : undefined} className="btn btn--brush btn--lg">{cta}</a>
      </div>
    </section>
  );
}
