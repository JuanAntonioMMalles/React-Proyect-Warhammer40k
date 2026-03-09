import React from 'react';
import GallerySection from '../sections/GallerySection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function HomePage() {
  return (
    <NotificationProvider>
      <GallerySection />
    </NotificationProvider>
  );
}
