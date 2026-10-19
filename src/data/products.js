// ─── Catálogo KRAFT ──────────────────────────────────────────────────────────
// Para cambiar precios: editar PRECIOS. Un precio en null muestra
// "Precio próximamente" y no deja agregar al carrito.

export const PRECIOS = {
  acordonado: { clasica: null, ancha: null },
  elastico:   { clasica: null, ancha: null },
  lona:       { clasica: null, ancha: null },
};

export const COLORS = {
  negro:  { label: 'Negro',  hex: '#141414' },
  blanco: { label: 'Blanco', hex: '#F4F4F0' },
};

export const HORMAS = {
  clasica: { label: 'Clásica', desc: 'La horma de siempre.' },
  ancha:   { label: 'Ancha (barefoot)', desc: 'Lugar para los cinco dedos, suela fina y flexible, sin taco.' },
};

// Talles simples (no binumerales)
export const SIZES = ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34'];

// images[horma][color] → lista de fotos. Si falta, se usa images[horma].todos.
export const escolar = [
  {
    id: 'acordonado',
    name: 'Acordonado',
    sub: 'Cordones',
    line: 'escolar',
    description: 'Cuero liso con perforado lateral. El que piden la mayoría de los colegios.',
    colors: ['negro', 'blanco'],
    hormas: ['clasica', 'ancha'],
    sizes: SIZES,
    images: {
      clasica: {
        negro:  ['/images/acordonado-negro.jpg', '/images/acordonado-suela-alta.jpg'],
        blanco: ['/images/acordonado-blanco.jpg', '/images/acordonado-suela-alta.jpg'],
      },
      ancha: { todos: ['/images/lona-negro.jpg'] },
    },
  },
  {
    id: 'elastico',
    name: 'Elástico',
    sub: 'Sin cordones',
    line: 'escolar',
    description: 'Elástico y abrojo: se lo ponen y se lo sacan solos, sin atar. Ideal para jardín y primer ciclo.',
    colors: ['negro', 'blanco'],
    hormas: ['clasica', 'ancha'],
    sizes: SIZES,
    images: {
      clasica: { todos: ['/images/elastico-clasica.jpg'] },
      ancha:   { todos: ['/images/elastico-ancha-lado.jpg', '/images/elastico-ancha-arriba.jpg'] },
    },
  },
  {
    id: 'lona',
    name: 'Lona',
    sub: 'Tela liviana',
    line: 'escolar',
    description: 'Liviana y fresca, con suela blanca plana. Para educación física y los días de calor.',
    colors: ['negro'],
    hormas: ['clasica', 'ancha'],
    sizes: SIZES,
    images: {
      clasica: { todos: ['/images/lona-negro.jpg'] },
      ancha: {},
    },
  },
];

export const urbano = [
  { id: 'urbana', name: 'Zapatilla urbana', sub: 'Unisex', description: 'Lona con abrojo o cordón, para todos los días.' },
  { id: 'botita', name: 'Botita', sub: 'Unisex', description: 'Caña media para el invierno.' },
  { id: 'sandalia', name: 'Sandalia', sub: 'Unisex', description: 'Abierta, con abrojo, para el verano.' },
];

export const getImages = (product, horma, color) => {
  const h = product.images?.[horma] || {};
  return h[color] || h.todos || [];
};

export const getPrice = (product, horma) => PRECIOS[product.id]?.[horma] ?? null;

export const formatPrice = n =>
  n == null ? 'Precio próximamente' : '$' + Math.round(n).toLocaleString('es-AR');
