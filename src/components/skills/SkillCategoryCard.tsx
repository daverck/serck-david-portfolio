import React from 'react';
import { ResumeSkillItem } from '../../types/resume';
import { Server, Layout as LayoutIcon, Cloud, Database, Cpu, Layers } from 'lucide-react';

interface SkillCategoryCardProps {
  category: ResumeSkillItem;
}

const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('backend')) return <Server className="w-5 h-5 text-indigo-500" />;
  if (lower.includes('frontend')) return <LayoutIcon className="w-5 h-5 text-teal-500" />;
  if (lower.includes('devops') || lower.includes('cloud')) return <Cloud className="w-5 h-5 text-sky-500" />;
  if (lower.includes('database') || lower.includes('données') || lower === 'db') return <Database className="w-5 h-5 text-amber-500" />;
  if (lower.includes('ai') || lower.includes('intelligence')) return <Cpu className="w-5 h-5 text-purple-500" />;
  return <Layers className="w-5 h-5 text-slate-500" />;
};

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-500/10 group-hover:scale-105 transition-all">
          {getCategoryIcon(category.name)}
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg">
          {category.name}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {category.keywords.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 hover:border-brand-500/50 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

