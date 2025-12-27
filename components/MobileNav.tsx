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
    <div className="wuxia-dock md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a1118]/95 to-[#111d27]/85 backdrop-blur-xl border-t border-[#223544]/60 z-40 shadow-2xl shadow-black/40">
      <div className="flex justify-around py-3 px-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className={`nav-chip flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
              currentSection === section
                ? 'is-active bg-gradient-to-b from-[#142636]/90 to-[#1d3b52]/80 border border-[#8fb9cc]/40 shadow-lg shadow-black/40'
                : 'bg-[#0b141d]/60 hover:bg-[#172230]/80 border border-[#223140]/50'
            }`}
          >
            <span className="mb-1 text-[#8fb9cc]">
              <WuxiaIcon id={section} className="w-5 h-5" />
            </span>
            <span className="text-xs font-medium">{sectionLabels[language][section]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
