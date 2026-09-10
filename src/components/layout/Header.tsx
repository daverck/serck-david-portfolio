import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ThemeToggle } from '../common/ThemeToggle';
import { Menu, X, Briefcase, ChevronDown } from 'lucide-react';
import { employersList } from '../../data/employers';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
    setExperienceDropdownOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/70 dark:border-slate-800/70 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            DS
          </div>
          <div>
            <span className="block font-bold text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              David Serck
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">
              Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isHome
                ? 'text-brand-600 dark:text-brand-400 bg-teal-50 dark:bg-teal-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Accueil
          </Link>

          {/* Expériences Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setExperienceDropdownOpen(true)}
            onMouseLeave={() => setExperienceDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setExperienceDropdownOpen(prev => !prev)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/experience')
                  ? 'text-brand-600 dark:text-brand-400 bg-teal-50 dark:bg-teal-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-0.5" />
              <span>Expériences</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {experienceDropdownOpen && (
              <div className="absolute left-0 mt-1 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Détail par employeur
                </div>
                {employersList.map(emp => (
                  <Link
                    key={emp.slug}
                    to={`/experience/${emp.slug}`}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      location.pathname === `/experience/${emp.slug}`
                        ? 'bg-teal-50 dark:bg-teal-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{emp.name}</span>
                      <span className="text-xs text-slate-400">{emp.period.split('-')[0].trim()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick links to Home sections */}
          <a
            href="/#skills"
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            Compétences
          </a>
          <a
            href="/#education"
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            Formations
          </a>
          <a
            href="/#contact"
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            Contact
          </a>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </nav>

        {/* Mobile menu trigger & ThemeToggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Ouvrir le menu de navigation"
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <Link
            to="/"
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Accueil
          </Link>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Pages Employeurs
            </span>
            <div className="mt-1 space-y-1 pl-2">
              {employersList.map(emp => (
                <Link
                  key={emp.slug}
                  to={`/experience/${emp.slug}`}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    location.pathname === `/experience/${emp.slug}`
                      ? 'bg-teal-50 dark:bg-teal-950/50 text-brand-600 dark:text-brand-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {emp.name} ({emp.period})
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 space-y-1">
            <a
              href="/#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Compétences
            </a>
            <a
              href="/#education"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Formations
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

