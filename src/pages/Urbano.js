import React from 'react';
import { urbano } from '../data/products';
import './Home.css';
import './Urbano.css';

export default function Urbano() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner container">
          <div>
            <p className="eyebrow">Próximamente</p>
            <h1>Para después del timbre: <span className="hl">KRAFT Urbano.</span></h1>
            <p className="hero__lead">Calzado de todos los días para chicos: plaza, cumple y fin de semana. Misma suela y las mismas dos hormas, con más color.</p>
            <div className="hero__ctas">
              <a href="https://instagram.com/kraftescolar" target="_blank" rel="noreferrer" className="btn btn--black">Avisame cuando salga</a>
            </div>
          </div>
          <div className="hero__mascot">
            <img src="/images/logo_kraft.png" alt="Isologo KRAFT" />
            <span className="hero__sticker">En camino</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Lo que se viene</p>
          <h2>Línea urbana.</h2>
          <div className="urb__grid">
            {urbano.map(p => (
              <article key={p.id} className="urb__card">
                <span className="urb__soon">Pronto</span>
                <p className="eyebrow">{p.sub}</p>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
