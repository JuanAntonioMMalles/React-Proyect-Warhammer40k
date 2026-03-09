import React from 'react';
import CookiesSection from '../sections/CookiesSection.jsx';


export default function CookiesPage() {
    return (
        <NotificationProvider>
            <CookiesSection />
        </NotificationProvider>
    );
}
