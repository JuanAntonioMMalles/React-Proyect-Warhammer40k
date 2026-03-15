import React from 'react';
import ContactSection from '../sections/ContactSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function ContactPage() {
    return (
        <NotificationProvider>
            <ContactSection />
        </NotificationProvider>
    );
}
