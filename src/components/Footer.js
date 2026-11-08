import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_LABEL, MAIL, waLink } from '../contacto';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__inner container">
        <div className="foot__brand">
          <img src="/images/logo_kraft.png" alt="KRAFT" />
          <p>Calzado escolar para chicos.<br />Una marca de <strong>Grupo anCHA</strong> · Industria Argentina</p>
        </div>
        <nav className="foot__links">
          <Link to="/">Escolar</Link>
          <Link to="/urbano">Urbano</Link>
          <Link to="/horma-ancha">Por qué anCHA</Link>
          <Link to="/talles">Guía de talles</Link>
          <Link to="/cambios">Cambios y devoluciones</Link>
          <Link to="/comercios">Revendé KRAFT</Link>
        </nav>
        <div className="foot__contact">
          <p className="eyebrow">Contacto</p>
          <a href="https://instagram.com/kraftescolar" target="_blank" rel="noreferrer">Instagram @kraftescolar</a>
          <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp {WHATSAPP_LABEL}</a>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
          <Link to="/cambios?arrepentimiento=1" className="foot__regret">Botón de arrepentimiento</Link>
        </div>
      </div>
    </footer>
  );
}
