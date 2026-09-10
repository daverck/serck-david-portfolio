import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: Array<{ label: string; to?: string }>;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 py-3">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Accueil</span>
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
