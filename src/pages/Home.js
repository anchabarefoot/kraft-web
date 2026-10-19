import React from 'react';
import { Link } from 'react-router-dom';
import { escolar } from '../data/products';
import ProductCard from '../components/ProductCard';
import HormaAnchaBlock from '../components/HormaAnchaBlock';
import './Home.css';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner container">
          <div>
            <p className="eyebrow">Ciclo lectivo 2027</p>
            <h1>Zapatillas de cole que <span className="hl">llegan a diciembre.</span></h1>
            <p className="hero__lead">Calzado escolar para chicos en horma clásica o ancha, con suela de TR flexible. Hecho en Argentina.</p>
            <div className="hero__ctas">
              <a href="#modelos" className="btn btn--black">Ver modelos</a>
              <Link to="/talles" className="btn">Encontrá su talle</Link>
            </div>
          </div>
          <div className="hero__mascot">
            <img src="/images/logo_kraft.png" alt="Isologo KRAFT" />
            <span className="hero__sticker">Talles 22 al 34</span>
          </div>
        </div>
      </section>

      <section className="section" id="modelos">
        <div className="container">
          <p className="eyebrow">Línea escolar</p>
          <h2>Tres modelos, dos hormas.</h2>
          <div className="home__grid">
            {escolar.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section home__why">
        <div className="container">
          <p className="eyebrow">Por qué KRAFT</p>
          <h2>Pensado para el recreo.</h2>
          <div className="why">
            <div><h3>Suela que flexiona</h3><p>Base de TR que acompaña el paso y aguanta patio, escalera y educación física.</p></div>
            <div><h3>Dos hormas</h3><p>Clásica, la de siempre. Ancha, con lugar para los cinco dedos.</p></div>
            <div><h3>Hecho acá</h3><p>Fabricado en Argentina por Grupo anCHA, con reposición de talles todo el año.</p></div>
          </div>
        </div>
      </section>

      <HormaAnchaBlock />

      <section className="section">
        <div className="container home__duo">
          <Link to="/talles" className="duo duo--line">
            <p className="eyebrow">Guía de talles</p>
            <h3>Medí el pie y te decimos el talle.</h3>
            <span className="duo__go">Calcular →</span>
          </Link>
          <Link to="/cambios" className="duo duo--yellow">
            <p className="eyebrow">Cambios</p>
            <h3>¿No le quedó? Lo cambiamos.</h3>
            <span className="duo__go">Pedir un cambio →</span>
          </Link>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container home__b2b">
          <div>
            <p className="eyebrow">Comercios y colegios</p>
            <h2>Vendé KRAFT en tu local.</h2>
            <p>Venta por mayor a zapaterías, uniformerías y cooperadoras escolares, con curva de talles para el inicio de clases.</p>
          </div>
          <Link to="/comercios" className="btn btn--yellow">Quiero vender KRAFT</Link>
        </div>
      </section>
    </>
  );
}
