'use client';

import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';
import WuxiaIcon from './WuxiaIcons';

interface MobileNavProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  language: Language;
}

const sections: Section[] = [
  'registration',
  'schedule',
  'help',
  'news',
  'guides',
  'absences',
  'calculator',
];

export default function MobileNav({ currentSection, onSectionChange, language }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0b09]/95 to-[#1a120e]/85 backdrop-blur-xl border-t border-[#3b2a1f]/60 z-40 shadow-2xl shadow-black/40">
      <div className="flex justify-around py-3 px-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
              currentSection === section
                ? 'bg-gradient-to-b from-[#2b1516]/90 to-[#4b1a1f]/80 border border-[#d6b36a]/40 shadow-lg shadow-black/40'
                : 'bg-[#120d0c]/60 hover:bg-[#1f1413]/80 border border-[#2a1b1a]/50'
            }`}
          >
            <span className="mb-1 text-[#d6b36a]">
              <WuxiaIcon id={section} className="w-5 h-5" />
            </span>
            <span className="text-xs font-medium">{sectionLabels[language][section]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
