export interface ResumeWebsite {
  url: string;
  label?: string;
  inlineLink?: boolean;
}

export interface ResumePicture {
  hidden: boolean;
  fit: string;
  url: string;
  size: number;
  rotation?: number;
  aspectRatio?: number;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  shadowColor?: string;
  shadowWidth?: number;
}

export interface ResumeBasics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: ResumeWebsite;
  customFields?: Array<{ id: string; label: string; value: string }>;
}

export interface ResumeSummary {
  title: string;
  icon?: string;
  columns?: number;
  hidden?: boolean;
  keepTogether?: boolean;
  startOnNewPage?: boolean;
  content: string;
}

export interface ResumeSocialProfile {
  id: string;
  hidden?: boolean;
  icon?: string;
  iconColor?: string;
  network: string;
  username: string;
  website: ResumeWebsite;
}

export interface ResumeExperienceItem {
  id: string;
  hidden?: boolean;
  company: string;
  position: string;
  location: string;
  period: string;
  website: ResumeWebsite;
  description: string;
  roles?: string[];
}

export interface ResumeEducationItem {
  id: string;
  hidden?: boolean;
  school: string;
  degree: string;
  area: string;
  grade: string;
  location: string;
  period: string;
  website: ResumeWebsite;
  description: string;
}

export interface ResumeProjectItem {
  id: string;
  hidden?: boolean;
  name?: string;
  company?: string;
  position?: string;
  period: string;
  website: ResumeWebsite;
  description: string;
  roles?: string[];
}

export interface ResumeSkillItem {
  id: string;
  hidden?: boolean;
  icon?: string;
  iconColor?: string;
  name: string;
  proficiency?: string;
  level?: number;
  keywords: string[];
}

export interface ResumeLanguageItem {
  id: string;
  hidden?: boolean;
  language: string;
  fluency?: string;
  level: number;
}

export interface ResumeInterestItem {
  id: string;
  hidden?: boolean;
  icon?: string;
  iconColor?: string;
  name: string;
  keywords?: string[];
}

export interface ResumeCustomSection {
  id: string;
  title: string;
  icon?: string;
  columns?: number;
  hidden?: boolean;
  keepTogether?: boolean;
  startOnNewPage?: boolean;
  type: string;
  items: ResumeProjectItem[];
}

export interface ResumeData {
  picture: ResumePicture;
  basics: ResumeBasics;
  summary: ResumeSummary;
  sections: {
    profiles: {
      title: string;
      hidden?: boolean;
      items: ResumeSocialProfile[];
    };
    experience: {
      title: string;
      hidden?: boolean;
      items: ResumeExperienceItem[];
    };
    education: {
      title: string;
      hidden?: boolean;
      items: ResumeEducationItem[];
    };
    projects: {
      title: string;
      hidden?: boolean;
      items: ResumeProjectItem[];
    };
    skills: {
      title: string;
      hidden?: boolean;
      items: ResumeSkillItem[];
    };
    languages: {
      title: string;
      hidden?: boolean;
      items: ResumeLanguageItem[];
    };
    interests?: {
      title: string;
      hidden?: boolean;
      items: ResumeInterestItem[];
    };
  };
  customSections: ResumeCustomSection[];
}

// Slugs et types spécifiques pour les pages employeurs
export type EmployerSlug = 'konekto' | 'dstny' | 'mba';

export interface ParsedProject {
  id: string;
  title: string;
  period: string;
  url?: string;
  context?: string;
  achievements?: string[];
  tasks?: string[];
  techStack?: string[];
  rawDescription: string;
}

export interface EmployerDetails {
  slug: EmployerSlug;
  name: string;
  fullName: string;
  position: string;
  period: string;
  location: string;
  websiteUrl: string;
  overviewHtml: string;
  tagline: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  projects: ParsedProject[];
  keyHighlights: string[];
}
