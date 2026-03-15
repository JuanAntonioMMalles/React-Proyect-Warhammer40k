import React from 'react';
import GallerySection from '../sections/GallerySection.jsx';
import FactionsSection from '../sections/FactionsSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';
import NewsCrud from '../sections/NewsCrud.jsx';

export default function HomePage() {
  return (
    <NotificationProvider>
      <FactionsSection
        titleKey="sections.factionsTitle"
        showFilter={true}
        limit={12}
        defaultCategory="all"
      />
      <GallerySection />
      <NewsCrud />

    </NotificationProvider>
  );
}