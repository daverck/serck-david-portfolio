import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Header } from './Header';
import { AmbientBackground } from './AmbientBackground';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const timer = setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="relative flex flex-col min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <AmbientBackground />
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
    </div>
  );
};

