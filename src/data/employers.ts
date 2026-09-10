import rawResumeData from './resume.json';
import { ResumeData, EmployerSlug, EmployerDetails, ParsedProject, ResumeProjectItem } from '../types/resume';

export const resumeData = rawResumeData as unknown as ResumeData;

function parseProject(item: ResumeProjectItem): ParsedProject {
  const title = item.name || item.company || 'Projet';
  const rawDescription = item.description || '';
  
  // Extraire les technologies depuis la section Technical environment si présente
  let techStack: string[] = [];
  const techMatch = rawDescription.match(/<h4>(?:Technical [Ee]nvironment(?: and [Tt]ools)?|Environnement technique)[^<]*:?<\/h4>\s*<p>(.*?)<\/p>/i);
  if (techMatch && techMatch[1]) {
    techStack = techMatch[1]
      .split(/[,•+&]|\band\b|\bet\b/i)
      .map(t => t.replace(/<[^>]*>/g, '').trim())
      .filter(t => t.length > 0 && t.length < 35);
  }

  // Si pas trouvé avec regex standard, essayer de deviner quelques technos clés ou conserver les fragments
  if (techStack.length === 0) {
    const knownTechs = [
      'Angular', 'React', 'TypeScript', 'Java', 'Spring Boot', 'Python', 'FastAPI',
      'Tornado', 'C#', '.NET Core', 'SQL Server', 'T-SQL', 'Docker', 'GitLab CI',
      'Ansible', 'Keycloak', 'PEPPOL', 'UBL', 'CockroachDB', 'Redis', 'OpenAI API',
      'YOLO', 'Flutter', 'Dart', 'iText', 'wkhtmltopdf', 'PostgreSQL', 'Jenkins'
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

export const employersList: EmployerDetails[] = [
  {
    slug: 'konekto',
    name: 'Konekto',
    fullName: 'Konekto',
    position: 'Full-Stack Developer',
    period: 'Mars 2024 - Avril 2026',
    location: 'Bruxelles / Wavre, Belgique',
    websiteUrl: 'https://konekto.be',
    overviewHtml: resumeData.sections.experience.items.find(i => i.company.toLowerCase().includes('konekto'))?.description || '',
    tagline: 'Facturation électronique PEPPOL/UBL, migrations Angular 21 / Spring Boot 4.0.1, et intégrations IA (YOLO & OpenAI).',
    accentColor: '#0d9488', // Teal
    badgeBg: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30',
    badgeText: 'Konekto (2024 - 2026)',
    keyHighlights: [
      'Facturation électronique PEPPOL (format UBL) & validation budgétaire',
      'Système de pointage RH automatisé avec secrétariat social & exports iText',
      'Migrations techniques vers Java 21, Spring Boot 4.0.1 et Angular 21',
      'Intégration d\'IA : computer vision YOLO (retail seconde main) et ChatGPT (optimisation plannings)',
      'Authentification unifiée et gestion fine des habilitations avec Keycloak'
    ],
    projects: (resumeData.customSections.find(s => s.id === 'ucavvtmvs72zt1df8hb4xxg8')?.items || []).map(parseProject)
  },
  {
    slug: 'dstny',
    name: 'Dstny',
    fullName: 'Dstny (Entreprise Télécom & Cloud)',
    position: 'Cloud Developer',
    period: '2021 - 2024',
    location: 'Wavre, Belgique',
    websiteUrl: 'https://www.dstny.be',
    overviewHtml: resumeData.sections.experience.items.find(i => i.company.toLowerCase().includes('dstny'))?.description || '',
    tagline: 'Architecture d\'APIs distribuées Python à haute disponibilité, télécom SIP/PBX, CockroachDB & interfaces d\'administration React.',
    accentColor: '#0284c7', // Sky blue
    badgeBg: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30',
    badgeText: 'Dstny (2021 - 2024)',
    keyHighlights: [
      'Serveur de lookup de numéros de téléphone haute performance avec CockroachDB & cache Redis',
      'APIs Python Tornado pour la gestion des abonnés, clusters, pbx et calendriers',
      'Plateforme d\'administration React pour relier les abonnés à Teams, Zoom et SIP providers',
      'Intégration aux serveurs Asterisk via protocoles AMI & ARI',
      'Observabilité avec OpenTelemetry, tests automatisés Gitlab CI et déploiements Ansible'
    ],
    projects: (resumeData.customSections.find(s => s.id === 'qcsv9azb26fi6yz6rrefha6c')?.items || []).map(parseProject)
  },
  {
    slug: 'mba',
    name: 'Micro Belgium Application',
    fullName: 'Micro Belgium Application (Fiduciaire & Logiciels de gestion)',
    position: 'Junior Developer',
    period: '2017 - 2020',
    location: 'Wavre, Belgique',
    websiteUrl: '',
    overviewHtml: resumeData.sections.experience.items.find(i => i.company.toLowerCase().includes('micro belgium'))?.description || '',
    tagline: 'Automatisation de flux comptables, dématérialisation e-fff & CODA, procédures stockées SQL Server complexes et développement .NET.',
    accentColor: '#4f46e5', // Indigo
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
    badgeText: 'MBA (2017 - 2020)',
    keyHighlights: [
      'Import automatique des factures électroniques belges (e-fff) dans Winbooks',
      'Génération automatisée de relevés de compte bancaires CODA en PDF avec wkhtmltopdf',
      'Générateur de procédures de synchronisation de fichiers .dbf vers SQL Server',
      'Synchronisation multi-bases de données d\'écoles vers Google Classroom, Groupes et Drupal',
      'Transcription vocale à la demande avec Google Speech-to-Text intégrée à C# .NET Core MVC'
    ],
    projects: (resumeData.sections.projects?.items || []).map(parseProject)
  }
];

export function getEmployerBySlug(slug: string): EmployerDetails | undefined {
  return employersList.find(e => e.slug === slug.toLowerCase());
}

export function getNextEmployer(slug: EmployerSlug): EmployerDetails {
  const currentIndex = employersList.findIndex(e => e.slug === slug);
  const nextIndex = (currentIndex + 1) % employersList.length;
  return employersList[nextIndex];
}

export function getPrevEmployer(slug: EmployerSlug): EmployerDetails {
  const currentIndex = employersList.findIndex(e => e.slug === slug);
  const prevIndex = (currentIndex - 1 + employersList.length) % employersList.length;
  return employersList[prevIndex];
}
