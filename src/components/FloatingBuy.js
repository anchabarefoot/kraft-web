import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import scrollToModelos from '../scrollToModelos';
import './FloatingBuy.css';

// "Comprar" flotante con pincelada. Aparece cuando el botón principal de compra
// de la página (marcado con data-buy-anchor) queda arriba, fuera de la pantalla.
// En páginas sin ese botón aparece apenas se baja un poco.
const OCULTO_EN = ['/carrito', '/cambios'];

export default function FloatingBuy() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const enFicha = pathname.startsWith('/escolar/');

  useEffect(() => {
    setVisible(false);
    const check = () => {
      const anchor = document.querySelector('[data-buy-anchor]');
      if (anchor) setVisible(anchor.getBoundingClientRect().bottom < 0);
      else setVisible(window.scrollY > 200);
    };
    const t = setTimeout(check, 50);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { clearTimeout(t); window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [pathname]);

  if (OCULTO_EN.includes(pathname)) return null;

  const onClick = e => {
    if (enFicha) {
      e.preventDefault();
      const add = document.getElementById('pp-add');
      add?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => add?.focus({ preventScroll: true }), 400);
      return;
    }
    if (document.getElementById('modelos')) scrollToModelos(e);
    else setTimeout(() => scrollToModelos(), 150);
  };

  return (
    <Link to={enFicha ? pathname : '/'} onClick={onClick}
      className={`btn btn--brush fbuy ${visible ? 'fbuy--on' : ''}`} aria-hidden={!visible} tabIndex={visible ? 0 : -1}>
      Comprar
    </Link>
  );
}
