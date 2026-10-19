// Baja hasta la grilla de modelos sin depender del # del enlace
export default function scrollToModelos(e) {
  const el = document.getElementById('modelos');
  if (!el) return; // si no estamos en el inicio, el enlace sigue su curso
  if (e) e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth' });
}
