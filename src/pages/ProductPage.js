import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { escolar, COLORS, HORMAS, getImages, getPrice, formatPrice } from '../data/products';
import SizeCalc from '../components/SizeCalc';
import NotFound from './NotFound';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const product = escolar.find(p => p.id === id);
  const { add } = useCart();

  const hParam = params.get('horma');
  const horma = product?.hormas.includes(hParam) ? hParam : product?.hormas[0];
  const [color, setColor] = useState(product?.colors[0]);
  const [size, setSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  if (!product) return <NotFound />;

  const imgs = getImages(product, horma, color);
  const price = getPrice(product, horma);

  const setHorma = h => { setParams({ horma: h }, { replace: true }); setActiveImg(0); };

  const handleAdd = () => {
    if (!size) { setSizeError(true); return; }
    add({ id: product.id, name: product.name, horma, color, size, price, image: imgs[0] || null });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pp container">
      <div className="pp__gallery">
        <div className="pp__main">
          {imgs[activeImg]
            ? <img src={imgs[activeImg]} alt={`${product.name}, horma ${HORMAS[horma].label}`} />
            : <span className="pp__empty">Foto de la horma {HORMAS[horma].label.toLowerCase()} en producción</span>}
        </div>
        {imgs.length > 1 && (
          <div className="pp__thumbs">
            {imgs.map((src, i) => (
              <button key={src} className={i === activeImg ? 'active' : ''} onClick={() => setActiveImg(i)} aria-label={`Foto ${i + 1}`}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pp__info">
        <Link to="/" className="pp__back">← Línea escolar</Link>
        <p className="eyebrow">{product.sub}</p>
        <h1>{product.name}</h1>
        <p className="pp__price">{formatPrice(price)}</p>
        <p className="pp__desc">{product.description}</p>

        <div className="pp__block">
          <p className="pp__label">Horma: <strong>{HORMAS[horma].label}</strong></p>
          <div className="pp__opts">
            {product.hormas.map(h => (
              <button key={h} aria-pressed={horma === h} onClick={() => setHorma(h)}>{HORMAS[h].label}</button>
            ))}
          </div>
          <p className="pp__hint">{HORMAS[horma].desc} <Link to="/horma-ancha">¿Cuál elijo?</Link></p>
        </div>

        <div className="pp__block">
          <p className="pp__label">Color: <strong>{COLORS[color].label}</strong></p>
          <div className="pp__colors">
            {product.colors.map(c => (
              <button key={c} aria-pressed={color === c} style={{ background: COLORS[c].hex }}
                title={COLORS[c].label} aria-label={COLORS[c].label} onClick={() => { setColor(c); setActiveImg(0); }} />
            ))}
          </div>
        </div>

        <div className="pp__block">
          <p className={`pp__label ${sizeError ? 'error' : ''}`}>{sizeError ? 'Elegí un talle' : 'Talle'}</p>
          <div className="pp__sizes">
            {product.sizes.map(s => (
              <button key={s} aria-pressed={size === s} onClick={() => { setSize(s); setSizeError(false); }}>{s}</button>
            ))}
          </div>
          <button className="pp__calc-toggle" onClick={() => setShowCalc(v => !v)}>
            {showCalc ? 'Cerrar' : '¿No sabés el talle? Medí el pie'}
          </button>
          {showCalc && <SizeCalc compact onPick={t => { setSize(t); setSizeError(false); }} />}
        </div>

        <button data-buy-anchor id="pp-add" className={`btn btn--brush btn--lg pp__add ${added ? 'added' : ''}`} onClick={handleAdd} disabled={price == null}>
          {price == null ? 'Precio próximamente' : added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
        </button>
        {added && <Link to="/carrito" className="pp__go">Ir al carrito y pagar con Mercado Pago →</Link>}

        <ul className="pp__facts">
          <li>Suela de TR flexible</li>
          <li>Cambio de talle dentro de los 30 días</li>
          <li>Industria Argentina</li>
        </ul>
      </div>
    </div>
  );
}
