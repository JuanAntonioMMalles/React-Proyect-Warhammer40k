import React from 'react';
import ProductsSection from '../sections/ProductsSection.jsx';
import { NotificationProvider } from '../components/Notification.jsx';

export default function ProductsPage() {
    return (
        <NotificationProvider>
            <ProductsSection />
        </NotificationProvider>
    );
}
