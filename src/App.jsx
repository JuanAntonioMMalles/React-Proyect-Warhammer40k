import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import FactionPage from './pages/FactionPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import CookiesPage from './pages/CookiesPage.jsx';
import TermsPage from './pages/TermsPage.jsx';

export default function App() {
  return (
    <ProductsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/factions" element={<FactionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductFormPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  );
}
