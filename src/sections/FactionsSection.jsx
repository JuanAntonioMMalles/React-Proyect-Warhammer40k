import React from 'react';
import { useTranslation } from 'react-i18next';

import factions from '../data/factions.json';

export default function FactionsSection() {
  const { t } = useTranslation();
  return (
    <section id="factions">
      <h2 className="main-title">{t('sections.factionsTitle')}</h2>
      <div className="factions-grid">
        {factions.map((f) => (
          <div className="faction-card" key={f.id}>
            <img src={f.img} alt={t(`factionsContent.${f.id}.alt`)} className="faction-image" />
            <div className="faction-content">
              <h3 className="faction-title">{t(`factionsContent.${f.id}.title`)}</h3>
              <p className="faction-description">{t(`factionsContent.${f.id}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
