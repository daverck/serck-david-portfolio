import type { EmployerDetails } from './types/resume';
import type { Language } from './context/LanguageContext';

const defaultSiteUrl = 'https://daverck.github.io/serck-david-portfolio';
export const SEO_SITE_URL = (import.meta.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/+$/, '');
const socialImage = `${SEO_SITE_URL}/og-preview.png`;

export interface SeoMetadata {
  lang: Language;
  title: string;
  description: string;
  canonical: string;
  alternates: Record<Language, string>;
  image: string;
  structuredData: Record<string, unknown>;
}

function localizedPath(pathname: string, lang: Language): string {
  const suffix = pathname
    .replace(/^\/(?:fr|en)(?=\/|$)/, '')
    .replace(/^\/+|\/+$/g, '');
  return suffix ? `/${lang}/${suffix}/` : `/${lang}/`;
}

function shortenDescription(description: string): string {
  const normalized = description.replace(/\s+/g, ' ').trim();
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157).trimEnd()}...`;
}

export function createSeoMetadata(
  lang: Language,
  pathname: string,
  employer?: EmployerDetails
): SeoMetadata {
  const title = employer
    ? lang === 'fr'
      ? `${employer.position} chez ${employer.name} | David Serck`
      : `${employer.position} at ${employer.name} | David Serck`
    : lang === 'fr'
      ? 'David Serck | Développeur Full-Stack en Belgique'
      : 'David Serck | Full-Stack Developer in Belgium';
  const description = shortenDescription(
    employer
      ? lang === 'fr'
        ? `${employer.tagline} Découvrez les projets de David Serck chez ${employer.name}.`
        : `${employer.tagline} Explore David Serck's projects at ${employer.name}.`
      : lang === 'fr'
        ? 'Portfolio de David Serck, développeur full-stack en Belgique : projets Angular, Python, Java/Spring, cloud et IoT.'
        : "Portfolio of David Serck, a full-stack developer in Belgium, featuring Angular, Python, Java/Spring, cloud, and IoT projects."
  );
  const canonical = `${SEO_SITE_URL}${localizedPath(pathname, lang)}`;
  const alternates = {
    fr: `${SEO_SITE_URL}${localizedPath(pathname, 'fr')}`,
    en: `${SEO_SITE_URL}${localizedPath(pathname, 'en')}`,
  };
  const personId = `${SEO_SITE_URL}/#person`;
  const websiteId = `${SEO_SITE_URL}/#website`;

  return {
    lang,
    title,
    description,
    canonical,
    alternates,
    image: socialImage,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': personId,
          name: 'David Serck',
          jobTitle: lang === 'fr' ? 'Développeur Full-Stack' : 'Full-Stack Developer',
          url: alternates.fr,
          image: socialImage,
          sameAs: ['https://linkedin.com/in/serck-david', 'https://github.com/daverck'],
          knowsLanguage: ['fr', 'en'],
        },
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: alternates.fr,
          name: 'David Serck — Portfolio',
          inLanguage: ['fr', 'en'],
          author: { '@id': personId },
        },
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          inLanguage: lang,
          isPartOf: { '@id': websiteId },
          about: { '@id': personId },
          ...(employer
            ? {
                about: [
                  { '@id': personId },
                  { '@type': 'Organization', name: employer.name, url: employer.websiteUrl },
                ],
              }
            : {}),
        },
      ],
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function renderSeoTags(metadata: SeoMetadata): string {
  const tags = [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`,
    `<link rel="alternate" hreflang="fr-BE" href="${escapeHtml(metadata.alternates.fr)}" />`,
    `<link rel="alternate" hreflang="en" href="${escapeHtml(metadata.alternates.en)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(metadata.alternates.fr)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${escapeHtml(metadata.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(metadata.image)}" />`,
    `<meta property="og:image:secure_url" content="${escapeHtml(metadata.image)}" />`,
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(metadata.title)}" />`,
    '<meta property="og:site_name" content="David Serck Portfolio" />',
    `<meta property="og:locale" content="${metadata.lang === 'fr' ? 'fr_BE' : 'en_US'}" />`,
    `<meta property="og:locale:alternate" content="${metadata.lang === 'fr' ? 'en_US' : 'fr_BE'}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(metadata.image)}" />`,
    `<script id="seo-jsonld" type="application/ld+json">${JSON.stringify(metadata.structuredData).replace(/</g, '\\u003c')}</script>`,
  ];

  return tags.join('\n    ');
}

export function applySeoMetadata(metadata: SeoMetadata): void {
  document.documentElement.lang = metadata.lang;
  document.title = metadata.title;

  const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  const upsertLink = (rel: string, href: string, hreflang?: string) => {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]`;
    let element = document.head.querySelector<HTMLLinkElement>(selector);
    if (!element) {
      element = document.createElement('link');
      element.rel = rel;
      if (hreflang) element.hreflang = hreflang;
      document.head.appendChild(element);
    }
    element.href = href;
  };

  upsertMeta('name', 'description', metadata.description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', metadata.canonical);
  upsertMeta('property', 'og:title', metadata.title);
  upsertMeta('property', 'og:description', metadata.description);
  upsertMeta('property', 'og:image', metadata.image);
  upsertMeta('property', 'og:image:secure_url', metadata.image);
  upsertMeta('property', 'og:image:type', 'image/png');
  upsertMeta('property', 'og:image:width', '1200');
  upsertMeta('property', 'og:image:height', '630');
  upsertMeta('property', 'og:image:alt', metadata.title);
  upsertMeta('property', 'og:site_name', 'David Serck Portfolio');
  upsertMeta('property', 'og:locale', metadata.lang === 'fr' ? 'fr_BE' : 'en_US');
  upsertMeta('property', 'og:locale:alternate', metadata.lang === 'fr' ? 'en_US' : 'fr_BE');
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', metadata.title);
  upsertMeta('name', 'twitter:description', metadata.description);
  upsertMeta('name', 'twitter:image', metadata.image);
  upsertLink('canonical', metadata.canonical);
  upsertLink('alternate', metadata.alternates.fr, 'fr-BE');
  upsertLink('alternate', metadata.alternates.en, 'en');
  upsertLink('alternate', metadata.alternates.fr, 'x-default');

  let structuredData = document.head.querySelector<HTMLScriptElement>('#seo-jsonld');
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.id = 'seo-jsonld';
    structuredData.type = 'application/ld+json';
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify(metadata.structuredData);
}
