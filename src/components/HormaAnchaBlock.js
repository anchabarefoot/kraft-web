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
              <div>
                <b>Lugar para el dedo gordo</b>
                <p>En Austria midieron a 858 chicos de jardín: la mayoría usaba zapatos cortos, y los que tenían el calzado más corto mostraban el dedo gordo más torcido hacia adentro.</p>
                <a href="https://bmcmusculoskeletdisord.biomedcentral.com/articles/10.1186/1471-2474-10-159" target="_blank" rel="noreferrer">Klein y otros, 2009</a>
              </div>
              <div>
                <b>Un arco que se forma solo</b>
                <p>En un estudio con 810 chicos y adolescentes, los que crecieron más tiempo descalzos tenían arcos más altos que los que usaban calzado todo el día.</p>
                <a href="https://www.nature.com/articles/s41598-017-07868-4" target="_blank" rel="noreferrer">Hollander y otros, 2017</a>
              </div>
              <div>
                <b>El pie plano en los chicos es normal</b>
                <p>En 1.851 escolares de 3 a 12 años, el pie plano era más común en los más chicos y bajaba con la edad. Después de la edad, el calzado era lo que más influía.</p>
                <a href="https://www.elsevier.es/es-revista-revista-espanola-cirugia-ortopedica-traumatologia-129-articulo-desarrollo-morfologia-huella-plantar-ninos-S1888441503761438" target="_blank" rel="noreferrer">Revista Española de Cirugía Ortopédica</a>
              </div>
              <p className="hab__disc">No reemplaza la consulta con el pediatra o el traumatólogo. Si tu hijo usa plantillas o tiene indicación médica, consultalo antes de cambiar de calzado.</p>
            </div>
          )}

          {!full && <Link to="/horma-ancha" className="btn btn--yellow hab__more">Qué dicen los estudios →</Link>}
        </div>
        <div className="hab__img"><img src="/images/elastico-ancha-arriba.jpg" alt="Zapatilla de horma ancha vista desde arriba: puntera amplia y redondeada" loading="lazy" /></div>
      </div>
    </section>
  );
}
