import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline';
import { HealthKicksShowcase } from '../components/sections/HealthKicksShowcase';
import { Skills } from '../components/sections/Skills';
import { Education } from '../components/sections/Education';
import { Contact } from '../components/sections/Contact';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <ExperienceTimeline />
      <Skills />
      <Education />
      <HealthKicksShowcase />
      <Contact />
    </div>
  );
};

