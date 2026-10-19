import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

// Cada renglón del carrito se identifica por modelo + horma + color + talle
export const lineKey = i => [i.id, i.horma, i.color, i.size].join('|');

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const k = lineKey(action.item);
      const exists = state.items.find(i => lineKey(i) === k);
      if (exists) return { items: state.items.map(i => lineKey(i) === k ? { ...i, qty: i.qty + 1 } : i) };
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE': return { items: state.items.filter(i => lineKey(i) !== action.key) };
    case 'QTY': return { items: state.items.map(i => lineKey(i) === action.key ? { ...i, qty: action.qty } : i) };
    case 'CLEAR': return { items: [] };
    default: return state;
  }
};

const load = () => {
  try { return JSON.parse(localStorage.getItem('kraft-cart')) || { items: [] }; }
  catch { return { items: [] }; }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => {
    try { localStorage.setItem('kraft-cart', JSON.stringify(state)); } catch { /* sin almacenamiento */ }
  }, [state]);

  const add = item => dispatch({ type: 'ADD', item });
  const remove = key => dispatch({ type: 'REMOVE', key });
  const setQty = (key, qty) => dispatch({ type: 'QTY', key, qty });
  const clear = () => dispatch({ type: 'CLEAR' });
  const total = state.items.reduce((a, i) => a + i.price * i.qty, 0);
  const count = state.items.reduce((a, i) => a + i.qty, 0);
  return (
    <CartContext.Provider value={{ items: state.items, add, remove, setQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
