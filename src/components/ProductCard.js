import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS, HORMAS, getImages, getPrice, formatPrice } from '../data/products';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [horma, setHorma] = useState(product.hormas[0]);
  const color = product.colors[0];
  const imgs = getImages(product, horma, color);
  const price = getPrice(product, horma);
  const to = `/escolar/${product.id}?horma=${horma}`;

  return (
    <article className="pc">
      <Link to={to} className="pc__img">
        {imgs[0]
          ? <img src={imgs[0]} alt={`${product.name} horma ${HORMAS[horma].label.toLowerCase()}`} loading="lazy" />
          : <span className="pc__empty">Foto en producción</span>}
      </Link>
      <div className="pc__body">
        <p className="pc__sub">{product.sub}</p>
        <h3><Link to={to}>{product.name}</Link></h3>
        <p className="pc__desc">{product.description}</p>
        <div className="pc__row">
          <div className="pc__swatches">
            {product.colors.map(c => <span key={c} style={{ background: COLORS[c].hex }} title={COLORS[c].label} />)}
          </div>
        </div>
        <div className="pc__hormas" role="group" aria-label="Horma">
          <span>Horma</span>
          {product.hormas.map(h => (
            <button key={h} aria-pressed={horma === h} onClick={() => setHorma(h)}>{HORMAS[h].label}</button>
          ))}
        </div>
        <div className="pc__foot">
          <p className="pc__price">{formatPrice(price)}<small>Talles 22 al 34</small></p>
          <Link to={to} className="btn btn--brush">Comprar</Link>
        </div>
      </div>
    </article>
  );
}
