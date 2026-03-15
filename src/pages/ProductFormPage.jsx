import React from 'react';
import ProductFormSection from '../sections/ProductFormSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function ProductFormPage() {
  return (
    <NotificationProvider>
      <ProductFormSection />
    </NotificationProvider>
  );
}
