import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { EmployerDetailPage } from './pages/EmployerDetailPage';

const NotFoundRedirect: React.FC = () => {
  const { lang } = useLanguage();
  return <Navigate to={`/?lang=${lang}`} replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience/:slug" element={<EmployerDetailPage />} />
            <Route path="*" element={<NotFoundRedirect />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
