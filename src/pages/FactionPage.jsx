import React from 'react';
import FactionsSection from '../sections/FactionsSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function FactionPage() {
    return (
        <NotificationProvider>
            <FactionsSection />
        </NotificationProvider>
    );
}
