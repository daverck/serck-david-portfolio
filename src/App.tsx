import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { EmployerDetailPage } from './pages/EmployerDetailPage';
import { SeoMetadata } from './components/common/SeoMetadata';

const NotFoundRedirect: React.FC = () => {
  const { lang } = useLanguage();
  return <Navigate to={`/${lang}/`} replace />;
};

const LocalizedLayout: React.FC = () => {
  const { pathname } = useLocation();
  const lang = pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'fr';
  return (
    <LanguageProvider initialLanguage={lang}>
      <ToastProvider>
        <SeoMetadata />
        <Layout>
          <Outlet />
        </Layout>
      </ToastProvider>
    </LanguageProvider>
  );
};

const LegacyRedirect: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestedLanguage = params.get('lang');
  const language =
    requestedLanguage === 'fr' || requestedLanguage === 'en'
      ? requestedLanguage
      : getPreferredLanguage();
  params.delete('lang');

  const oldPath = location.pathname.replace(/\/+$/, '');
  const destination = oldPath ? `/${language}${oldPath}/` : `/${language}/`;

  return (
    <Navigate
      to={{
        pathname: destination,
        search: params.toString() ? `?${params.toString()}` : '',
        hash: location.hash,
      }}
      replace
    />
  );
};

function getPreferredLanguage(): 'fr' | 'en' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language');
    if (saved === 'fr' || saved === 'en') return saved;
    return navigator.language.slice(0, 2) === 'en' ? 'en' : 'fr';
  }
  return 'fr';
}

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<LocalizedLayout />}>
      <Route path="/fr" element={<HomePage />} />
      <Route path="/fr/experience/:slug" element={<EmployerDetailPage />} />
      <Route path="/fr/*" element={<NotFoundRedirect />} />
      <Route path="/en" element={<HomePage />} />
      <Route path="/en/experience/:slug" element={<EmployerDetailPage />} />
      <Route path="/en/*" element={<NotFoundRedirect />} />
    </Route>
    <Route path="*" element={<LegacyRedirect />} />
  </Routes>
);

export const App: React.FC = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
