import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className = '',
  showIcon = true,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors ${className}`}
    >
      <span>{children}</span>
      {showIcon && <ExternalLinkIcon className="w-3.5 h-3.5 inline-block opacity-70 shrink-0" />}
    </a>
  );
};
