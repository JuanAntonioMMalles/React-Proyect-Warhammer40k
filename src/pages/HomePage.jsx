import React from 'react';
import FactionsSection from '../sections/FactionsSection.jsx';
import GallerySection from '../sections/GallerySection.jsx';
import ProductsSection from '../sections/ProductsSection.jsx';
import ContactSection from '../sections/ContactSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function HomePage() {
  return (
    <NotificationProvider>
      <FactionsSection />
      <GallerySection />
      <ProductsSection />
      <ContactSection />
    </NotificationProvider>
  );
}
