// Datos de contacto de KRAFT (cambiar acá y se actualiza en toda la página)
export const WHATSAPP = '5491133977252';
export const WHATSAPP_LABEL = '11 3397-7252';
export const MAIL = 'vivi.ancha@gmail.com';
export const INSTAGRAM = 'kraftescolar';
export const waLink = (texto = '') => `https://wa.me/${WHATSAPP}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
