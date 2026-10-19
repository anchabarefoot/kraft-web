import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import scrollToModelos from '../scrollToModelos';
import './FloatingBuy.css';

// Botón flotante "Comprar" con pincelada; aparece al bajar en las páginas de contenido
const OCULTO_EN = ['/carrito', '/cambios'];

export default function FloatingBuy() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [pathname]);

  if (OCULTO_EN.includes(pathname) || pathname.startsWith('/escolar/')) return null;

  return (
    <Link to="/" onClick={e => { if (document.getElementById('modelos')) scrollToModelos(e); else setTimeout(() => scrollToModelos(), 120); }}
      className={`btn btn--brush fbuy ${visible ? 'fbuy--on' : ''}`} aria-hidden={!visible} tabIndex={visible ? 0 : -1}>
      Comprar
    </Link>
  );
}
