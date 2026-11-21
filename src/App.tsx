import React, { useEffect, useState } from 'react';
import { AppRoute } from './config/links';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { RiderPage } from './components/RiderPage';
import { PartnerPage } from './components/PartnerPage';
import { LegalPages } from './components/LegalPages';
import { AdminPage } from './components/AdminPage';
import { Footer } from './components/Footer';

const VALID_ROUTES: AppRoute[] = [
  '/',
  '/rider',
  '/partner',
  '/privacy-policy',
  '/terms',
  '/refund-policy',
  '/delete-account',
  '/support',
  '/admin',
];

function resolveRoute(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return VALID_ROUTES.includes(clean as AppRoute) ? (clean as AppRoute) : '/';
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => resolveRoute(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(resolveRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: AppRoute) => {
    if (to !== route) {
      window.history.pushState({}, '', to);
      setRoute(to);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar route={route} navigate={navigate} />

      <div className="flex-1">
        {route === '/' && <HomePage navigate={navigate} />}
        {route === '/rider' && <RiderPage />}
        {route === '/partner' && <PartnerPage />}
        {route === '/admin' && <AdminPage />}
        {route !== '/' && route !== '/rider' && route !== '/partner' && route !== '/admin' && (
          <LegalPages route={route} />
        )}
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
