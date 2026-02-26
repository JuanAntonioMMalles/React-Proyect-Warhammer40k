import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ScrollToHash from './ScrollToHash.jsx';

export default function Layout() {
  return (
    <div id="main-container">
      <Header />
      <ScrollToHash />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
