import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">{t('error.lostInWarp')}</h2>
                <p className="not-found-description">
                    {t('error.lostInWarpDesc')}
                </p>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/')}
                >
                    {t('error.returnHome')}
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
