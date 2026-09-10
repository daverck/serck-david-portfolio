import React from 'react';

interface RichHtmlProps {
  html: string;
  className?: string;
}

export const RichHtml: React.FC<RichHtmlProps> = ({ html, className = '' }) => {
  if (!html) return null;
  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
