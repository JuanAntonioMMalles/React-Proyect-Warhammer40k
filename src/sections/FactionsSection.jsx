import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function FactionsSection({
  titleKey = 'sections.factionsTitle',
  showFilter = true,
  limit = null,
  defaultCategory = 'all'
}) {
  const { t } = useTranslation();

  const [factions, setFactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  useEffect(() => {
    const fetchFactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Factions'));
        const data = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data()
        }));
        setFactions(data);
      } catch (error) {
        console.error('Error loading factions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactions();
  }, []);

  const filteredFactions = factions.filter((faction) => {
    if (selectedCategory === 'all') return true;
    return faction.category === selectedCategory;
  });

  const visibleFactions = limit
    ? filteredFactions.slice(0, limit)
    : filteredFactions;

  if (loading) {
    return <p>{t('common.loading', 'Loading...')}</p>;
  }

  return (
    <section id="factions">
      <h2 className="main-title">{t(titleKey)}</h2>

      {showFilter && (
        <div className="factions-filter">
          <button onClick={() => setSelectedCategory('all')}>
            {t('categories.all', 'All')}
          </button>
          <button onClick={() => setSelectedCategory('imperium')}>
            {t('categories.imperium', 'Imperium')}
          </button>
          <button onClick={() => setSelectedCategory('chaos')}>
            {t('categories.chaos', 'Chaos')}
          </button>
          <button onClick={() => setSelectedCategory('xenos')}>
            {t('categories.xenos', 'Xenos')}
          </button>
        </div>
      )}

      <div className="factions-grid">
        {visibleFactions.map((f) => (
          <div className="faction-card" key={f.docId || f.id}>
            <img
              src={f.img}
              alt={t(`factionsContent.${f.id}.alt`)}
              className="faction-image"
            />
            <div className="faction-content">
              <h3 className="faction-title">
                {t(`factionsContent.${f.id}.title`)}
              </h3>
              <p className="faction-description">
                {t(`factionsContent.${f.id}.desc`)}
              </p>
              <span className="faction-category">
                {t(`categories.${f.category}`)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}