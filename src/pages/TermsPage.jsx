import React from 'react';
import TermsSection from '../sections/TermsSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function TermsPage() {
    return (
        <NotificationProvider>
            <TermsSection />
        </NotificationProvider>
    );
}
