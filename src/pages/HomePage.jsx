import React from 'react';
import GallerySection from '../sections/GallerySection.jsx';
import ProductsSection from '../sections/ProductsSection.jsx';
import ContactSection from '../sections/ContactSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function HomePage() {
  return (
    <NotificationProvider>
      <GallerySection />
      <ContactSection />
    </NotificationProvider>
  );
}
