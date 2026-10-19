import React from 'react';
import { Link } from 'react-router-dom';
import './HormaAnchaBlock.css';

// Resumen para papás. La versión larga está en /horma-ancha.
export default function HormaAnchaBlock({ full = false }) {
  return (
    <section className="hab">
      <div className="hab__inner container">
        <div className="hab__text">
          <p className="eyebrow">Horma ancha (barefoot)</p>
          <h2>Un zapato con la forma del pie, no al revés.</h2>
          <p className="hab__lead">
            El pie de los chicos todavía se está formando: el arco se arma con los años y los huesos son blandos.
            Un zapato angosto o corto le va dando forma al pie mientras crece. La horma ancha deja que el pie crezca como es.
          </p>
          <div className="hab__vs">
            <div><strong>Clásica</strong>La horma de siempre, con la puntera que se angosta hacia adelante.</div>
            <div><strong>Ancha</strong>Puntera con lugar para los cinco dedos, suela fina y flexible, sin taco.</div>
          </div>

          {full && (
            <div className="hab__evid">
              <h3 className="hab__why">Por qué anCHA</h3>
              <div>
                <b>Hacemos nuestras propias suelas</b>
                <p>anCHA diseña y fabrica bases de TR para calzado barefoot en Caseros, Buenos Aires. La horma ancha de KRAFT lleva esa misma base.</p>
              </div>
              <div>
                <b>Matrices propias, pensadas para chicos</b>
                <p>Las suelas de niño salen de matrices hechas para nosotros, con la forma ancha y la flexibilidad que necesita un pie que crece.</p>
              </div>
              <div>
                <b>Experiencia en barefoot</b>
                <p>Antes de KRAFT, anCHA ya hacía calzado barefoot para adultos y provee bases a otras marcas del país.</p>
              </div>
              <div>
                <b>Industria Argentina</b>
                <p>Producimos acá, con talleres de la zona, y reponemos talles durante todo el ciclo lectivo.</p>
              </div>
            </div>
          )}

          {!full && <Link to="/horma-ancha" className="btn btn--yellow hab__more">Por qué anCHA →</Link>}
        </div>
        <div className="hab__img"><img src="/images/elastico-ancha-arriba.jpg" alt="Zapatilla de horma ancha vista desde arriba: puntera amplia y redondeada" loading="lazy" /></div>
      </div>
    </section>
  );
}
