'use client';

import { Section } from '@/types';

interface MobileNavProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

const sections: { id: Section; label: string; icon: string }[] = [
  { id: 'registration', label: 'Registration', icon: 'fa-users' },
  { id: 'schedule', label: 'Schedule', icon: 'fa-calendar-alt' },
  { id: 'help', label: 'Help', icon: 'fa-hands-helping' },
  { id: 'news', label: 'News', icon: 'fa-newspaper' },
  { id: 'guides', label: 'Guides', icon: 'fa-graduation-cap' },
  { id: 'absences', label: 'Absences', icon: 'fa-calendar-times' },
  { id: 'calculator', label: 'Calculator', icon: 'fa-calculator' },
];

export default function MobileNav({ currentSection, onSectionChange }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-black/70 backdrop-blur-xl border-t border-red-900/30 z-40 shadow-2xl shadow-red-900/20">
      <div className="flex justify-around py-3 px-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
              currentSection === section.id
                ? 'bg-gradient-to-b from-red-700/50 to-purple-700/50 border border-red-500/50 shadow-lg shadow-red-900/30'
                : 'bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/30'
            }`}
          >
            <i className={`fas ${section.icon} text-xl mb-1`}></i>
            <span className="text-xs font-medium">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

