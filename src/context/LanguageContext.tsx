import React, { createContext, useContext, useState, useEffect } from 'react';
import { resumeDataFr, resumeDataEn, getEmployersList } from '../data/employers';
import { ResumeData, EmployerDetails } from '../types/resume';
import cvFr from '../data/cv-serck-david-francais.pdf';
import cvEn from '../data/cv-serck-david.pdf';

export type Language = 'fr' | 'en';

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.experience': 'Expériences',
    'nav.experienceDropdown': 'Détail par employeur',
    'nav.skills': 'Compétences',
    'nav.education': 'Formations',
    'nav.contact': 'Contact',
    'nav.mobileTitle': 'Pages Employeurs',

    // Hero
    'hero.available': 'Disponible immédiatement pour de nouveaux défis',
    'hero.greeting': 'Bonjour, je suis',
    'hero.explore': 'Explorer mon parcours',
    'hero.contactMe': 'Me contacter',
    'hero.downloadCv': 'Télécharger mon CV',
    'hero.expYears': "6+ Ans d'exp.",
    'hero.spec': 'Angular • Python • Java',

    // Skills
    'skills.badge': 'Stack & Compétences',
    'skills.title': 'Technologies & Écosystèmes maîtrisés',
    'skills.subtitle': '6 années passées à architecturer et fiabiliser des backends robustes, concevoir des interfaces réactives et automatiser les déploiements.',
    'skills.all': 'Toutes',

    // Experience
    'exp.badge': 'Parcours Professionnel',
    'exp.title': 'Expériences & Réalisations',
    'exp.subtitle': 'Découvrez le détail des projets techniques menés auprès de chacun de mes employeurs. Cliquez sur une entreprise pour accéder à sa page dédiée.',
    'exp.highlights': "Points d'orgue & Réalisations clés",
    'exp.keyProjects': 'projets clés',
    'exp.desc': 'Architecture, missions, solutions et technologies détaillées.',
    'exp.viewPage': 'Voir la page',

    // Education
    'edu.badge': 'Parcours Académique',
    'edu.title': 'Diplômes & Formations',
    'edu.languages': 'Langues',
    'edu.profile': 'Profil & Démarche',
    'edu.profileDesc': "Passionné par le code propre, l'architecture logicielle pérenne, et l'apprentissage continu (IA générative, architectures distribuées, UI moderne).",
    'edu.hobbies': 'Loisirs :',

    // Contact
    'contact.badge': 'Prise de Contact',
    'contact.title': 'Échangeons sur votre projet ou votre équipe',
    'contact.subtitle': 'Actuellement disponible immédiatement pour des missions Full-Stack (Angular, Python, Java/Spring) en CDI ou mission longue en Belgique ou en remote partiel.',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Téléphone',
    'contact.locationLabel': 'Localisation',
    'contact.sendDirect': 'Envoyer un message direct',
    'contact.linkedin': 'Profil LinkedIn',
    'contact.github': 'Profil GitHub',
    'contact.mailSubject': 'Contact depuis votre portfolio',

    // Footer
    'footer.rights': 'Tous droits réservés.',
    'footer.deployedWith': 'Déployé avec',
    'footer.builtWith': 'Développé avec React 19 & Vite 8',

    // Employer Detail
    'detail.breadcrumbExp': 'Expériences',
    'detail.officialSite': 'Site officiel',
    'detail.synthesis': 'Synthèse des responsabilités & périmètre',
    'detail.projectsTitle': 'Projets & Missions chez',
    'detail.showing': 'Affichage de',
    'detail.on': 'sur',
    'detail.projectsSuffix': 'projet(s)',
    'detail.searchPlaceholder': 'Rechercher un projet...',
    'detail.allTechs': 'Toutes technologies',
    'detail.noProject': 'Aucun projet ne correspond à vos critères de recherche.',
    'detail.resetFilters': 'Réinitialiser les filtres',
    'detail.prevEmployer': 'Employeur précédent',
    'detail.nextEmployer': 'Employeur suivant',
    'detail.backToOverview': "Retour à la vue d'ensemble de toutes les expériences",
    'detail.notFoundTitle': 'Employeur introuvable',
    'detail.notFoundDesc': "L'expérience demandée n'existe pas ou le lien est erroné.",
    'detail.backHome': "Retourner à l'accueil",
    'detail.onlineRef': 'En ligne / Référence',
    'detail.viewProject': 'Voir le projet',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'nav.experienceDropdown': 'Detail by employer',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.mobileTitle': 'Employer Pages',

    // Hero
    'hero.available': 'Available immediately for new opportunities',
    'hero.greeting': 'Hello, I am',
    'hero.explore': 'Explore my background',
    'hero.contactMe': 'Get in touch',
    'hero.downloadCv': 'Download CV',
    'hero.expYears': '6+ Years exp.',
    'hero.spec': 'Angular • Python • Java',

    // Skills
    'skills.badge': 'Stack & Skills',
    'skills.title': 'Mastered Technologies & Ecosystems',
    'skills.subtitle': '6 years architecting robust backends, crafting responsive interfaces, and automating deployments.',
    'skills.all': 'All',

    // Experience
    'exp.badge': 'Career Path',
    'exp.title': 'Experience & Achievements',
    'exp.subtitle': 'Explore detailed technical projects delivered for each employer. Click on any company to access its dedicated page.',
    'exp.highlights': 'Key Highlights & Achievements',
    'exp.keyProjects': 'key projects',
    'exp.desc': 'Architecture, missions, solutions, and detailed tech stack.',
    'exp.viewPage': 'View page',

    // Education
    'edu.badge': 'Academic Background',
    'edu.title': 'Degrees & Certifications',
    'edu.languages': 'Languages',
    'edu.profile': 'Profile & Mindset',
    'edu.profileDesc': 'Passionate about clean code, sustainable software architecture, and continuous learning (generative AI, distributed systems, modern UI).',
    'edu.hobbies': 'Hobbies:',

    // Contact
    'contact.badge': 'Get in Touch',
    'contact.title': "Let's talk about your project or team",
    'contact.subtitle': 'Currently available immediately for Full-Stack roles (Angular, Python, Java/Spring) for permanent positions or long-term contracts in Belgium or hybrid remote.',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Phone',
    'contact.locationLabel': 'Location',
    'contact.sendDirect': 'Send direct message',
    'contact.linkedin': 'LinkedIn Profile',
    'contact.github': 'GitHub Profile',
    'contact.mailSubject': 'Contact from your portfolio',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.deployedWith': 'Deployed with',
    'footer.builtWith': 'Built with React 19 & Vite 8',

    // Employer Detail
    'detail.breadcrumbExp': 'Experience',
    'detail.officialSite': 'Official website',
    'detail.synthesis': 'Scope of responsibilities & summary',
    'detail.projectsTitle': 'Projects & Missions at',
    'detail.showing': 'Showing',
    'detail.on': 'of',
    'detail.projectsSuffix': 'project(s)',
    'detail.searchPlaceholder': 'Search a project...',
    'detail.allTechs': 'All technologies',
    'detail.noProject': 'No project matches your search criteria.',
    'detail.resetFilters': 'Reset filters',
    'detail.prevEmployer': 'Previous employer',
    'detail.nextEmployer': 'Next employer',
    'detail.backToOverview': 'Back to all experiences overview',
    'detail.notFoundTitle': 'Employer not found',
    'detail.notFoundDesc': 'The requested experience does not exist or the link is invalid.',
    'detail.backHome': 'Return to home',
    'detail.onlineRef': 'Live / Reference',
    'detail.viewProject': 'View project',
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  resume: ResumeData;
  employers: EmployerDetails[];
  cvUrl: string;
  cvFileName: string;
  t: (key: keyof typeof translations['fr']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'fr' || saved === 'en') return saved;
      // Préférer le français par défaut ou détection navigateur
      const browserLang = navigator.language.slice(0, 2);
      return browserLang === 'en' ? 'en' : 'fr';
    }
    return 'fr';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
  };

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const resume = lang === 'fr' ? resumeDataFr : resumeDataEn;
  const employers = getEmployersList(lang);
  const cvUrl = lang === 'fr' ? cvFr : cvEn;
  const cvFileName = lang === 'fr' ? 'cv-serck-david-francais.pdf' : 'cv-serck-david.pdf';

  const t = (key: keyof typeof translations['fr']): string => {
    return translations[lang][key] || translations['fr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, resume, employers, cvUrl, cvFileName, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
