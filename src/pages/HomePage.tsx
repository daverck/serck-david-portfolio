import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Skills } from '../components/sections/Skills';
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline';
import { Education } from '../components/sections/Education';
import { Contact } from '../components/sections/Contact';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Hero />
      <ExperienceTimeline />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
};
