import React from 'react';
import { WHATSAPP_LABEL, MAIL, INSTAGRAM, waLink } from '../contacto';
import { formatPrice } from '../data/products';

// ─── Esquema de reventa (provisorio, cambiar acá) ────────────────────────────
const PRECIO_PAR = 70000;
const MINIMO = 6;
const ESCALONES = [
  { pares: '6 a 11 pares', desc: 25 },
  { pares: '12 a 23 pares', desc: 30 },
  { pares: '24 pares o más', desc: 35 },
];
const REFERIDO = { pct: 5, meses: 3 };

const box = { border: '1.5px solid var(--rule)', borderRadius: 20, padding: 24, display: 'grid', gap: 12 };
const num = { flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'var(--black)', color: 'var(--yellow)', fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: 22, display: 'grid', placeItems: 'center', paddingTop: 4 };
const th = { textAlign: 'left', padding: '10px 12px', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', background: 'var(--black)', color: 'var(--yellow)' };
const td = { padding: '12px', borderTop: '1px solid var(--rule)' };

export default function Comercios() {
  const ganaMin = PRECIO_PAR * ESCALONES[0].desc / 100;
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: 26, maxWidth: 780 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <p className="eyebrow">Revendé KRAFT</p>
          <h2>Vendé KRAFT y ganá con cada par.</h2>
          <p style={{ color: 'var(--soft)' }}>
            Sumate a la red de revendedores. Comprás a precio de reventa, lo ofrecés a quien quieras y la ganancia es tuya.
          </p>
        </div>

        <ol style={{ listStyle: 'none', display: 'grid', gap: 14 }}>
          {[
            ['1', 'Te sumás', 'Escribinos y te pasamos la lista de precios de reventa.'],
            ['2', 'Armás tu pedido', `Desde ${MINIMO} pares, combinando modelos, colores y talles.`],
            ['3', 'Vendés y ganás', 'Entregás los pares y te quedás con la diferencia.'],
          ].map(([n, t, d]) => (
            <li key={n} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <b style={num}>{n}</b><span><strong>{t}.</strong> {d}</span>
            </li>
          ))}
        </ol>

        <div style={box}>
          <h3 style={{ fontSize: 26 }}>Cuánto ganás</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <thead><tr><th style={th}>Tu pedido</th><th style={th}>Descuento</th><th style={th}>Ganás por par</th></tr></thead>
              <tbody>
                {ESCALONES.map(e => (
                  <tr key={e.pares}>
                    <td style={td}>{e.pares}</td>
                    <td style={td}><strong>{e.desc}%</strong></td>
                    <td style={td}>{formatPrice(PRECIO_PAR * e.desc / 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: 'var(--soft)', fontSize: 14 }}>
            Ejemplo: con {MINIMO} pares a {formatPrice(PRECIO_PAR)} ganás {formatPrice(ganaMin * MINIMO)}.
          </p>
        </div>

        <div style={{ ...box, background: 'color-mix(in srgb, var(--yellow) 22%, var(--bg))', border: 0 }}>
          <h3 style={{ fontSize: 26 }}>Recomendá y ganá más</h3>
          <p>Si sumás a alguien a la red, ganás un <strong>{REFERIDO.pct}%</strong> de todo lo que compre durante sus primeros <strong>{REFERIDO.meses} meses</strong>.</p>
        </div>

        <ul style={{ display: 'grid', gap: 6, paddingLeft: 18, color: 'var(--soft)', fontSize: 14 }}>
          <li>Pagás una parte al hacer el pedido y el resto a los 15 días.</li>
          <li>Te prestamos un muestrario para que prueben los talles.</li>
          <li>Campaña especial de vuelta a clases, en enero y febrero.</li>
          <li>¿Querés comprar en cantidad para tu negocio? También vendemos por mayor.</li>
        </ul>

        <div style={{ background: 'var(--yellow)', color: 'var(--black)', borderRadius: 20, padding: 28, display: 'grid', gap: 12, border: '2px solid var(--black)', justifyItems: 'start' }}>
          <h3 style={{ fontSize: 26 }}>Quiero sumarme</h3>
          <a href={waLink('Hola, quiero sumarme a la red de revendedores KRAFT')} target="_blank" rel="noreferrer" className="btn btn--black">WhatsApp {WHATSAPP_LABEL}</a>
          <p>Mail: <a href={`mailto:${MAIL}`} style={{ fontWeight: 600, textDecoration: 'underline' }}>{MAIL}</a></p>
          <p>Instagram: <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer" style={{ fontWeight: 600, textDecoration: 'underline' }}>@{INSTAGRAM}</a></p>
        </div>
      </div>
    </section>
  );
}
