import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDirectory = join(process.cwd(), 'dist');
const pages = [];

for (const language of ['fr', 'en']) {
  const languageDirectory = join(outputDirectory, language);
  for (const file of await findIndexFiles(languageDirectory)) {
    const html = await readFile(file, 'utf8');
    const canonical = readLink(html, 'canonical');
    const alternates = {
      fr: readLink(html, 'alternate', 'fr-BE'),
      en: readLink(html, 'alternate', 'en'),
      default: readLink(html, 'alternate', 'x-default'),
    };

    pages.push({ canonical, alternates });
  }
}

if (pages.length === 0) {
  throw new Error('No prerendered localized pages were found for the sitemap.');
}

const frenchHomepage = pages.find(page => /\/fr\/$/.test(page.canonical));
if (!frenchHomepage) {
  throw new Error('The French homepage is missing from the prerendered output.');
}
const siteUrl = frenchHomepage.canonical.replace(/\/fr\/$/, '');
const urls = pages.map(page => [
  '  <url>',
  `    <loc>${escapeXml(page.canonical)}</loc>`,
  `    <xhtml:link rel="alternate" hreflang="fr-BE" href="${escapeXml(page.alternates.fr)}" />`,
  `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(page.alternates.en)}" />`,
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(page.alternates.default)}" />`,
  '  </url>',
].join('\n'));
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls,
  '</urlset>',
  '',
].join('\n');

await Promise.all([
  writeFile(join(outputDirectory, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(
    join(outputDirectory, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
    'utf8'
  ),
]);

async function findIndexFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter(entry => entry.isDirectory())
      .map(entry => findIndexFiles(join(directory, entry.name)))
  );
  const indexFiles = entries
    .filter(entry => entry.isFile() && entry.name === 'index.html')
    .map(entry => join(directory, entry.name));

  return [...indexFiles, ...nested.flat()];
}

function readLink(html, rel, hreflang) {
  const languageAttribute = hreflang ? ` hreflang="${hreflang}"` : '';
  const match = html.match(
    new RegExp(`<link rel="${rel}"${languageAttribute} href="([^"]+)"`)
  );
  if (!match) {
    throw new Error(`Missing ${rel}${hreflang ? ` ${hreflang}` : ''} link in prerendered page.`);
  }
  return match[1];
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
