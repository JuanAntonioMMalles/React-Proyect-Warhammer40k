import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const PRODUCTS_STORAGE_KEY = 'warhammer_products';

const defaultProducts = [
  {
    id: 1,
    name: 'Ultramarines Primaris Captain',
    category: 'miniaturas',
    price: 32.5,
    description: 'Ultramarines Primaris Captain in Mk X armor with a power sword.',
    stock: 15,
  },
  {
    id: 2,
    name: 'Codex: Space Marines 10th Edition',
    category: 'libros',
    price: 45.0,
    description: 'Full rules supplement for Space Marines in the 10th Edition.',
    stock: 8,
  },
  {
    id: 3,
    name: 'Warhammer 40,000: Space Marine 2',
    category: 'videojuegos',
    price: 59.99,
    description: 'Third-person action game set in the Warhammer 40,000 universe.',
    stock: 25,
  },
];

const ProductsContext = createContext(null);

function nextId(products) {
  return products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useLocalStorage(PRODUCTS_STORAGE_KEY, defaultProducts);

  const getById = useCallback(
    (id) => products.find((p) => p.id === Number(id)),
    [products]
  );

  const add = useCallback(
    (data) => {
      const newProduct = { id: nextId(products), ...data };
      setProducts([...products, newProduct]);
      return newProduct;
    },
    [products, setProducts]
  );

  const update = useCallback(
    (id, data) => {
      const numId = Number(id);
      const idx = products.findIndex((p) => p.id === numId);
      if (idx === -1) return null;
      const updated = { id: numId, ...data };
      const copy = products.slice();
      copy[idx] = updated;
      setProducts(copy);
      return updated;
    },
    [products, setProducts]
  );

  const remove = useCallback(
    (id) => {
      const numId = Number(id);
      const exists = products.some((p) => p.id === numId);
      if (!exists) return false;
      setProducts(products.filter((p) => p.id !== numId));
      return true;
    },
    [products, setProducts]
  );

  const api = useMemo(() => ({ products, getById, add, update, remove }), [products, getById, add, update, remove]);

  return <ProductsContext.Provider value={api}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
