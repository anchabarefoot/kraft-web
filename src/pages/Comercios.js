import React from 'react';

const IG = 'https://instagram.com/kraftescolar';

// Reventa: cualquiera puede sumarse. También venta por cantidad.
export default function Comercios() {
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: 22, maxWidth: 760 }}>
        <p className="eyebrow">Revendé KRAFT</p>
        <h2>Vendé KRAFT y ganá con cada par.</h2>
        <p style={{ color: 'var(--soft)' }}>
          Sumate a la red de revendedores. Comprás a precio de reventa, lo ofrecés a quien quieras y la ganancia es tuya.
        </p>
        <ol style={{ listStyle: 'none', display: 'grid', gap: 14 }}>
          {[
            ['1', 'Te sumás', 'Escribinos y te pasamos la lista de precios de reventa.'],
            ['2', 'Armás tu pedido', 'Te ayudamos a arrancar con tu primer pedido.'],
            ['3', 'Vendés y ganás', 'Entregás los pares y te quedás con la diferencia.'],
          ].map(([n, t, d]) => (
            <li key={n} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <b style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'var(--black)', color: 'var(--yellow)', fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: 22, display: 'grid', placeItems: 'center', paddingTop: 4 }}>{n}</b>
              <span><strong>{t}.</strong> {d}</span>
            </li>
          ))}
        </ol>
        <p style={{ color: 'var(--soft)' }}>¿Querés comprar en cantidad para tu negocio? También vendemos por mayor.</p>
        <div style={{ background: 'var(--yellow)', color: 'var(--black)', borderRadius: 20, padding: 28, display: 'grid', gap: 8, border: '2px solid var(--black)' }}>
          <h3 style={{ fontSize: 26 }}>Quiero sumarme</h3>
          <p>Escribinos por Instagram a <a href={IG} target="_blank" rel="noreferrer" style={{ fontWeight: 600, textDecoration: 'underline' }}>@kraftescolar</a></p>
          <p className="draft-note">WhatsApp y mail a completar.</p>
        </div>
      </div>
    </section>
  );
}
