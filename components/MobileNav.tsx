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
];

export default function MobileNav({ currentSection, onSectionChange }: MobileNavProps) {
  return (
    <div className="mobile-swipe-menu md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 z-40">
      <div className="nav-scroll-container flex justify-around py-2 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`mobile-nav-btn ${
              currentSection === section.id ? 'active' : ''
            }`}
          >
            <i className={`fas ${section.icon} mobile-icon text-xl`}></i>
            <span className="text-xs mt-1">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

