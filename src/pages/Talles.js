import React from 'react';
import SizeCalc from '../components/SizeCalc';

export default function Talles() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Guía de talles</p>
        <h2>Medí el pie y te decimos el talle.</h2>
        <p style={{ color: 'var(--soft)', maxWidth: '56ch', marginTop: 12, marginBottom: 28 }}>
          Los talles de KRAFT son simples, del 22 al 34. Medí los dos pies a la tarde, que es cuando están más hinchados, y usá la medida del más largo.
        </p>
        <SizeCalc />
      </div>
    </section>
  );
}
