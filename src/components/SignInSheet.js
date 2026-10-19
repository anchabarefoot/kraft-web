import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { useAuth, googleEnabled } from '../context/AuthContext';
import './SignInSheet.css';

export default function SignInSheet({ onClose }) {
  const { user, loginWithGoogle, logout } = useAuth();

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="sis" role="dialog" aria-modal="true" aria-labelledby="sis-title" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sis__panel">
        {user ? (
          <>
            <div className="sis__user">
              {user.picture && <img src={user.picture} alt="" referrerPolicy="no-referrer" />}
              <div><h3 id="sis-title">Hola, {user.name.split(' ')[0]}</h3><p>{user.email}</p></div>
            </div>
            <Link to="/cambios" className="btn btn--yellow" onClick={onClose}>Pedir un cambio</Link>
            <button className="btn" onClick={() => { logout(); onClose(); }}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <h3 id="sis-title">Ingresá a tu cuenta</h3>
            <p className="sis__desc">Con tu cuenta de Google pedís cambios sin cargar tus datos cada vez.</p>
            {googleEnabled ? (
              <div className="sis__google">
                <GoogleLogin onSuccess={r => { loginWithGoogle(r); onClose(); }} text="continue_with" shape="pill" size="large" locale="es" />
              </div>
            ) : (
              <p className="draft-note">El ingreso con Google se activa al cargar REACT_APP_GOOGLE_CLIENT_ID en Vercel.</p>
            )}
          </>
        )}
        <button className="sis__close" onClick={onClose} aria-label="Cerrar">×</button>
      </div>
    </div>
  );
}
