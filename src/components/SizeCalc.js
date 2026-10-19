import React, { useState } from 'react';
import './SizeCalc.css';

// Tabla orientativa: talle 22 = 14,0 cm y cada talle suma 2/3 cm.
// Ajustar con las medidas reales de la horma cuando estén.
export const TABLA = Array.from({ length: 13 }, (_, i) => ({ talle: String(22 + i), cm: 14 + i * (2 / 3) }));
export const MARGEN_CM = 0.5;

export const talleParaPie = cm => {
  if (Number.isNaN(cm) || cm < 12) return null;
  return TABLA.find(t => t.cm >= cm + MARGEN_CM)?.talle || 'mayor';
};

const fmt = n => n.toFixed(1).replace('.', ',');

export default function SizeCalc({ compact = false, onPick }) {
  const [val, setVal] = useState('18');
  const cm = parseFloat(String(val).replace(',', '.'));
  const talle = talleParaPie(cm);

  let result;
  if (val === '' || Number.isNaN(cm)) result = <>Ingresá una medida<small>Por ejemplo: 18</small></>;
  else if (talle === null) result = <>Menos de talle 22<small>Todavía no fabricamos ese talle</small></>;
  else if (talle === 'mayor') result = <>Más de talle 34<small>Escribinos y te asesoramos</small></>;
  else result = <>Talle {talle}<small>Para un pie de {fmt(cm)} cm, con medio centímetro para crecer</small></>;

  return (
    <div className={`sc ${compact ? 'sc--compact' : ''}`}>
      {!compact && (
        <div className="sc__tbl">
          <table>
            <thead><tr><th>Talle</th><th>Largo del pie</th></tr></thead>
            <tbody>
              {TABLA.map(t => (
                <tr key={t.talle} className={t.talle === talle ? 'hit' : ''}><td>{t.talle}</td><td>{fmt(t.cm)} cm</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="sc__calc">
        <label htmlFor={compact ? 'sc-cm-c' : 'sc-cm'}>Largo del pie en cm</label>
        <div className="sc__row">
          <input id={compact ? 'sc-cm-c' : 'sc-cm'} type="number" inputMode="decimal" step="0.1" min="10" max="26"
            value={val} onChange={e => setVal(e.target.value)} />
          <span>cm</span>
        </div>
        <p className="sc__result" aria-live="polite">{result}</p>
        {onPick && talle && talle !== 'mayor' && (
          <button className="btn btn--yellow sc__pick" onClick={() => onPick(talle)}>Elegir talle {talle}</button>
        )}
        <p className="sc__tip">Parado sobre una hoja, marcá el talón y la punta del dedo más largo, y medí la distancia.</p>
        {!compact && <p className="draft-note">Tabla orientativa, a confirmar con la horma.</p>}
      </div>
    </div>
  );
}
