import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { EmployerDetailPage } from './pages/EmployerDetailPage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience/:slug" element={<EmployerDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
