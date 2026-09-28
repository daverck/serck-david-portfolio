import React from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: Array<{ label: string; to?: string }>;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { t, lang } = useLanguage();

  return (
    <nav aria-label={t('common.breadcrumb')} className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 py-3">
      <Link
        to={`/?lang=${lang}`}
        className="inline-flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>{t('nav.home')}</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

