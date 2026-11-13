import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { getEmployerBySlug } from '../../data/employers';
import { applySeoMetadata, createSeoMetadata } from '../../seo';

export const SeoMetadata: React.FC = () => {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const employerSlug = pathname.match(/\/experience\/([^/]+)/)?.[1];
  const employer = useMemo(
    () => (employerSlug ? getEmployerBySlug(employerSlug, lang) : undefined),
    [employerSlug, lang]
  );
  const metadata = useMemo(
    () => createSeoMetadata(lang, pathname, employer),
    [lang, pathname, employer]
  );

  useEffect(() => {
    applySeoMetadata(metadata);
  }, [metadata]);

  return null;
};
