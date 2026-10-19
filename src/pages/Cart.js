import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart, lineKey } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { COLORS, HORMAS, formatPrice } from '../data/products';
import './Cart.css';

// Envío: a confirmar
const ENVIO = 3500;
const ENVIO_GRATIS_DESDE = 80000;

export default function Cart() {
  const { items, remove, setQty, clear, total } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mpError, setMpError] = useState('');
  const [searchParams] = useSearchParams();
  const pago = searchParams.get('pago');

  const shipping = total >= ENVIO_GRATIS_DESDE ? 0 : ENVIO;
  const grandTotal = total + shipping;

  const handleMercadoPago = async () => {
    setLoading(true);
    setMpError('');
    try {
      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: `${i.id}-${i.horma}-${i.color}-${i.size}`,
            name: i.name,
            horma: HORMAS[i.horma]?.label,
            color: COLORS[i.color]?.label,
            size: i.size,
            price: i.price,
            qty: i.qty,
          })),
          shipping,
          payer: user ? { email: user.email, name: user.name } : undefined,
        }),
      });
      const data = await res.json();
      if (data.init_point) window.location.href = data.init_point;
      else setMpError('No pudimos conectar con Mercado Pago. Probá de nuevo en un rato.');
    } catch {
      setMpError('No pudimos conectar con Mercado Pago. Probá de nuevo en un rato.');
    } finally {
      setLoading(false);
    }
  };

  if (pago === 'ok') return (
    <Status icon="✓" title="¡Pago confirmado!" text="Tu pedido está en preparación. En 24 a 48 hs hábiles te mandamos el seguimiento del envío.">
      <Link to="/" className="btn btn--yellow" onClick={clear}>Seguir comprando</Link>
    </Status>
  );
  if (pago === 'pendiente') return (
    <Status icon="…" title="Pago pendiente" text="Mercado Pago todavía está procesando el pago. Te avisamos cuando se acredite.">
      <Link to="/" className="btn">Volver al inicio</Link>
    </Status>
  );
  if (pago === 'error') return (
    <Status icon="×" title="No se pudo hacer el pago" text="No se cobró nada. Podés probar de nuevo con otro medio de pago.">
      <Link to="/carrito" className="btn btn--yellow">Volver al carrito</Link>
    </Status>
  );

  if (items.length === 0) return (
    <Status icon="0" title="Tu carrito está vacío" text="Elegí modelo, horma y talle, y lo sumás acá.">
      <Link to="/" className="btn btn--yellow">Ver modelos</Link>
    </Status>
  );

  return (
    <div className="cart container">
      <div className="cart__head">
        <h1>Carrito</h1>
        <span>{items.reduce((a, i) => a + i.qty, 0)} pares</span>
      </div>

      <div className="cart__layout">
        <div className="cart__items">
          {items.map(item => {
            const k = lineKey(item);
            return (
              <div key={k} className="cart__row">
                <div className="cart__img">{item.image && <img src={item.image} alt="" />}</div>
                <div className="cart__info">
                  <h3>{item.name}</h3>
                  <p>Horma {HORMAS[item.horma]?.label.toLowerCase()} · {COLORS[item.color]?.label} · Talle {item.size}</p>
                  <p className="cart__unit">{formatPrice(item.price)} c/u</p>
                </div>
                <div className="cart__right">
                  <div className="cart__qty">
                    <button aria-label="Restar" onClick={() => item.qty > 1 ? setQty(k, item.qty - 1) : remove(k)}>−</button>
                    <span>{item.qty}</span>
                    <button aria-label="Sumar" onClick={() => setQty(k, item.qty + 1)}>+</button>
                  </div>
                  <p className="cart__price">{formatPrice(item.price * item.qty)}</p>
                  <button className="cart__del" onClick={() => remove(k)}>Quitar</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="cart__summary">
          <h2>Resumen</h2>
          <div className="cart__line"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="cart__line"><span>Envío</span><span>{shipping ? formatPrice(shipping) : 'Gratis'}</span></div>
          {shipping > 0 && <p className="cart__note">Envío gratis desde {formatPrice(ENVIO_GRATIS_DESDE)}</p>}
          <div className="cart__line cart__line--total"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
          <button className="btn btn--mp cart__pay" onClick={handleMercadoPago} disabled={loading}>
            {loading ? 'Abriendo Mercado Pago…' : 'Pagar con Mercado Pago'}
          </button>
          {mpError && <p className="cart__error">{mpError}</p>}
          <p className="cart__note">Tarjeta, transferencia o efectivo. El pago lo procesa Mercado Pago.</p>
          <button className="cart__clear" onClick={clear}>Vaciar carrito</button>
        </aside>
      </div>
    </div>
  );
}

function Status({ icon, title, text, children }) {
  return (
    <div className="cart-status container">
      <div className="cart-status__icon">{icon}</div>
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
    </div>
  );
}
