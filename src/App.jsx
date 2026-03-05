import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import FactionPage from './pages/FactionPage.jsx';

export default function App() {
  return (
    <ProductsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/factions" element={<FactionPage />} />
          <Route path="/products" element={<ProductFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  );
}
