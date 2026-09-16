import rawResumeEn from './resume.en.json';
import rawResumeFr from './resume.fr.json';
import { ResumeData, EmployerSlug, EmployerDetails, ParsedProject, ResumeProjectItem } from '../types/resume';
import { translations, TranslationKey } from '../locales';

export const resumeDataEn = rawResumeEn as unknown as ResumeData;
export const resumeDataFr = rawResumeFr as unknown as ResumeData;

// Fallback image pour le français si vide
if (!resumeDataFr.picture.url && resumeDataEn.picture.url) {
  resumeDataFr.picture.url = resumeDataEn.picture.url;
}

// Par défaut
export const resumeData = resumeDataFr;

function parseProject(item: ResumeProjectItem): ParsedProject {
  const title = item.name || item.company || 'Projet';
  const rawDescription = item.description || '';
  
  // Extraire les technologies depuis la section Technical environment / Environnement technique
  let techStack: string[] = [];
  const techMatch = rawDescription.match(/<h4>(?:Technical [Ee]nvironment(?: and [Tt]ools)?|Environnement technique(?: et outils)?)[^<]*:?<\/h4>\s*<p>(.*?)<\/p>/i);
  if (techMatch && techMatch[1]) {
    techStack = techMatch[1]
      .split(/[,•+&]|\band\b|\bet\b|\bavec\b/i)
      .map(t => t.replace(/<[^>]*>/g, '').trim())
      .filter(t => t.length > 0 && t.length < 35);
  }

  // Si pas trouvé avec regex standard, scanner les mots-clés reconnus
  if (techStack.length === 0) {
    const knownTechs = [
      'Angular', 'React', 'TypeScript', 'Java', 'Spring Boot', 'Python', 'FastAPI',
      'Tornado', 'C#', '.NET Core', '.Net Core', 'SQL Server', 'T-SQL', 'Docker', 'GitLab CI',
      'Ansible', 'Keycloak', 'PEPPOL', 'UBL', 'CockroachDB', 'Redis', 'OpenAI API',
      'YOLO', 'Flutter', 'Dart', 'iText', 'wkhtmltopdf', 'PostgreSQL', 'Jenkins', 'Kong', 'MobX'
    ];
    techStack = knownTechs.filter(tech => 
      new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(rawDescription)
    );
  }

  return {
    id: item.id,
    title,
    period: item.period || '',
    url: item.website?.url || undefined,
    techStack: Array.from(new Set(techStack)),
    rawDescription,
  };
}

export function getEmployersList(lang: 'fr' | 'en' = 'fr'): EmployerDetails[] {
  const data = lang === 'fr' ? resumeDataFr : resumeDataEn;
  const t = (key: TranslationKey): string => translations[lang][key] || translations.fr[key];

  const konektoExp = data.sections.experience.items.find(i => i.company.toLowerCase().includes('konekto'));
  const dstnyExp = data.sections.experience.items.find(i => i.company.toLowerCase().includes('dstny'));
  const mbaExp = data.sections.experience.items.find(i => i.company.toLowerCase().includes('micro belgium'));

  const konektoProjects = (data.customSections.find(s => s.id === 'ucavvtmvs72zt1df8hb4xxg8')?.items || []).map(parseProject);
  const dstnyProjects = (data.customSections.find(s => s.id === 'qcsv9azb26fi6yz6rrefha6c')?.items || []).map(parseProject);
  const mbaProjects = (data.sections.projects?.items || []).map(parseProject);

  return [
    {
      slug: 'konekto',
      name: 'Konekto',
      fullName: t('employer.konekto.fullName'),
      position: t('employer.konekto.position'),
      period: t('employer.konekto.period'),
      location: t('employer.konekto.location'),
      websiteUrl: 'https://konekto.be',
      overviewHtml: konektoExp?.description || '',
      tagline: t('employer.konekto.tagline'),
      accentColor: '#0d9488',
      badgeBg: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30',
      badgeText: 'Konekto',
      keyHighlights: [
        t('employer.konekto.highlight1'),
        t('employer.konekto.highlight2'),
        t('employer.konekto.highlight3'),
        t('employer.konekto.highlight4'),
        t('employer.konekto.highlight5'),
      ],
      projects: konektoProjects
    },
    {
      slug: 'dstny',
      name: 'Dstny',
      fullName: t('employer.dstny.fullName'),
      position: t('employer.dstny.position'),
      period: t('employer.dstny.period'),
      location: t('employer.dstny.location'),
      websiteUrl: 'https://www.dstny.be',
      overviewHtml: dstnyExp?.description || '',
      tagline: t('employer.dstny.tagline'),
      accentColor: '#0284c7',
      badgeBg: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30',
      badgeText: 'Dstny',
      keyHighlights: [
        t('employer.dstny.highlight1'),
        t('employer.dstny.highlight2'),
        t('employer.dstny.highlight3'),
        t('employer.dstny.highlight4'),
        t('employer.dstny.highlight5'),
      ],
      projects: dstnyProjects
    },
    {
      slug: 'mba',
      name: 'Micro Belgium Application',
      fullName: t('employer.mba.fullName'),
      position: t('employer.mba.position'),
      period: t('employer.mba.period'),
      location: t('employer.mba.location'),
      websiteUrl: 'https://mba.be/',
      overviewHtml: mbaExp?.description || '',
      tagline: t('employer.mba.tagline'),
      accentColor: '#4f46e5',
      badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      badgeText: 'MBA',
      keyHighlights: [
        t('employer.mba.highlight1'),
        t('employer.mba.highlight2'),
        t('employer.mba.highlight3'),
        t('employer.mba.highlight4'),
        t('employer.mba.highlight5'),
      ],
      projects: mbaProjects
    }
  ];
}

export const employersList = getEmployersList('fr');

export function getEmployerBySlug(slug: string, lang: 'fr' | 'en' = 'fr'): EmployerDetails | undefined {
  return getEmployersList(lang).find(e => e.slug === slug.toLowerCase());
}

export function getNextEmployer(slug: EmployerSlug, lang: 'fr' | 'en' = 'fr'): EmployerDetails {
  const list = getEmployersList(lang);
  const currentIndex = list.findIndex(e => e.slug === slug);
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
}

export function getPrevEmployer(slug: EmployerSlug, lang: 'fr' | 'en' = 'fr'): EmployerDetails {
  const list = getEmployersList(lang);
  const currentIndex = list.findIndex(e => e.slug === slug);
  const prevIndex = (currentIndex - 1 + list.length) % list.length;
  return list[prevIndex];
}
