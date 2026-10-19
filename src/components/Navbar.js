import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SignInSheet from './SignInSheet';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Escolar', end: true },
  { to: '/urbano', label: 'Urbano', badge: 'Pronto' },
  { to: '/horma-ancha', label: 'Horma ancha' },
  { to: '/talles', label: 'Talles' },
  { to: '/cambios', label: 'Cambios' },
];

export default function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <header className="nav">
      <div className="nav__inner container">
        <button className="nav__burger" onClick={() => setMenuOpen(v => !v)} aria-label="Menú" aria-expanded={menuOpen}>
          <span className={menuOpen ? 'open' : ''} /><span className={menuOpen ? 'open' : ''} />
        </button>

        <Link to="/" className="nav__brand" aria-label="KRAFT, inicio">
          <img src="/images/logo_star.png" alt="" />
          <span>KRAFT</span>
        </Link>

        <nav className="nav__links">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>
              {l.label}{l.badge && <small>{l.badge}</small>}
            </NavLink>
          ))}
        </nav>

        <div className="nav__acts">
          <button className="nav__signin" onClick={() => setSignIn(true)}>
            {user ? (user.picture ? <img src={user.picture} alt="" referrerPolicy="no-referrer" /> : user.name.split(' ')[0]) : 'Ingresar'}
          </button>
          <Link to="/carrito" className="nav__cart" aria-label={`Carrito, ${count} productos`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && <span className="nav__badge">{count}</span>}
          </Link>
        </div>
      </div>

      <div className={`nav__drawer ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(l => (
          <NavLink key={l.to} to={l.to} end={l.end} className="nav__dlink">
            {l.label}{l.badge && <small>{l.badge}</small>}
          </NavLink>
        ))}
        <NavLink to="/comercios" className="nav__dlink">Comercios</NavLink>
        <NavLink to="/carrito" className="nav__dlink">Carrito {count > 0 && `(${count})`}</NavLink>
      </div>

      {signIn && <SignInSheet onClose={() => setSignIn(false)} />}
    </header>
  );
}
