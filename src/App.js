import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingBuy from './components/FloatingBuy';
import Home from './pages/Home';
import Urbano from './pages/Urbano';
import ProductPage from './pages/ProductPage';
import HormaAncha from './pages/HormaAncha';
import Talles from './pages/Talles';
import Returns from './pages/Returns';
import Cart from './pages/Cart';
import Comercios from './pages/Comercios';
import NotFound from './pages/NotFound';

// Google Client ID: Vercel > Settings > Environment Variables > REACT_APP_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollTop />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/urbano" element={<Urbano />} />
                <Route path="/escolar/:id" element={<ProductPage />} />
                <Route path="/horma-ancha" element={<HormaAncha />} />
                <Route path="/talles" element={<Talles />} />
                <Route path="/cambios" element={<Returns />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/comercios" element={<Comercios />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingBuy />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
