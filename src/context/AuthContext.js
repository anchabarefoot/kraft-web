import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// Ingreso con cuenta de Google. Necesita REACT_APP_GOOGLE_CLIENT_ID en Vercel.
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kraft-user')); } catch { return null; }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('kraft-user', JSON.stringify(user));
      else localStorage.removeItem('kraft-user');
    } catch { /* sin almacenamiento */ }
  }, [user]);

  const loginWithGoogle = credentialResponse => {
    const d = jwtDecode(credentialResponse.credential);
    setUser({ name: d.name, email: d.email, picture: d.picture });
  };
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
export const googleEnabled = Boolean(process.env.REACT_APP_GOOGLE_CLIENT_ID);
