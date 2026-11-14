import { createElement, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDirectory = join(process.cwd(), 'dist');
const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const [{ AppRoutes }, seo, employerData] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('/src/seo.ts'),
    vite.ssrLoadModule('/src/data/employers.ts'),
  ]);
  const template = await readFile(join(outputDirectory, 'index.html'), 'utf8');
  const basePath = vite.config.base === '/' ? '' : vite.config.base.replace(/\/$/, '');
  const routes = ['fr', 'en'].flatMap(lang => [
    { lang, pathname: `/${lang}/` },
    ...employerData.getEmployersList(lang).map(employer => ({
      lang,
      pathname: `/${lang}/experience/${employer.slug}/`,
    })),
  ]);

  for (const route of routes) {
    const location = `${basePath}${route.pathname}`;
    const markup = renderToString(
      createElement(
        StrictMode,
        null,
        createElement(
          StaticRouter,
          { location, basename: basePath || undefined },
          createElement(AppRoutes)
        )
      )
    );
    const employerSlug = route.pathname.match(/\/experience\/([^/]+)/)?.[1];
    const employer = employerSlug
      ? employerData.getEmployerBySlug(employerSlug, route.lang)
      : undefined;
    const metadata = seo.createSeoMetadata(route.lang, route.pathname, employer);
    const prerenderedHtml = renderPage(template, markup, metadata, route.lang, seo.renderSeoTags);
    const relativeDirectory = route.pathname.replace(/^\/|\/$/g, '');
    const pageDirectory = join(outputDirectory, relativeDirectory);

    await mkdir(pageDirectory, { recursive: true });
    await writeFile(join(pageDirectory, 'index.html'), prerenderedHtml, 'utf8');
  }
} finally {
  await vite.close();
}
function renderPage(template, markup, metadata, lang, renderSeoTags) {
  const cleanTemplate = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["'](?:canonical|alternate)["'][^>]*>\s*/gi, '')
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<html\s+lang=["'][^"']*["']/, `<html lang="${lang}"`);
  const withMetadata = cleanTemplate.replace(
    '</head>',
    `    ${renderSeoTags(metadata)}\n  </head>`
  );
  const withMarkup = withMetadata.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="true">${markup}</div>`
  );

  if (withMarkup === withMetadata) {
    throw new Error('Could not find the root element in the Vite HTML template.');
  }
  return withMarkup;
}
