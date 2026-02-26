import React from 'react';
import { useTranslation } from 'react-i18next';

import items from '../data/gallery.json';

export default function GallerySection() {
  const { t } = useTranslation();
  return (
    <section id="gallery">
      <h2 className="main-title">{t('sections.galleryTitle')}</h2>
      <div className="gallery-grid">
        {items.map((it) => (
          <div className="gallery-item" key={it.title}>
            <img src={it.img} alt={it.title} />
            <div className="gallery-overlay">
              <h3>{it.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
