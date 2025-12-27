'use client';

import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';

interface MobileNavProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  language: Language;
}

const sections: { id: Section; icon: string }[] = [
  { id: 'registration', icon: 'fa-users' },
  { id: 'schedule', icon: 'fa-calendar-alt' },
  { id: 'help', icon: 'fa-hands-helping' },
  { id: 'news', icon: 'fa-newspaper' },
  { id: 'guides', icon: 'fa-graduation-cap' },
  { id: 'absences', icon: 'fa-calendar-times' },
  { id: 'calculator', icon: 'fa-calculator' },
];

export default function MobileNav({ currentSection, onSectionChange, language }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0b09]/95 to-[#1a120e]/85 backdrop-blur-xl border-t border-[#3b2a1f]/60 z-40 shadow-2xl shadow-black/40">
      <div className="flex justify-around py-3 px-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
              currentSection === section.id
                ? 'bg-gradient-to-b from-[#3a261a]/90 to-[#5a3a28]/80 border border-[#c88b5e]/40 shadow-lg shadow-black/40'
                : 'bg-[#17110d]/60 hover:bg-[#24180f]/80 border border-[#2b1e15]/50'
            }`}
          >
            <i className={`fas ${section.icon} text-xl mb-1`}></i>
            <span className="text-xs font-medium">{sectionLabels[language][section.id]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
