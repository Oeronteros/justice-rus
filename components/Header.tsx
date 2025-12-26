'use client';

import { Section } from '@/types';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  onLogout: () => void;
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

export default function Header({ currentSection, onSectionChange, onLogout }: HeaderProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-lg shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center">
            <i className="fas fa-skull text-white"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold">Cult Game Community</h1>
            <p className="text-xs text-gray-400">Justice Mobile Guild</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`nav-btn px-4 py-2 rounded-lg transition ${
                currentSection === section.id ? 'active' : ''
              }`}
            >
              <i className={`fas ${section.icon} mr-2`}></i>
              <span>{section.label}</span>
            </button>
          ))}

          <select
            id="langSwitch"
            className="ml-2 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600"
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <button
            onClick={handleRefresh}
            className="ml-2 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition"
            title="Refresh data"
          >
            <i className="fas fa-sync-alt"></i>
          </button>

          <button
            onClick={onLogout}
            className="ml-2 bg-red-800 hover:bg-red-700 p-2 rounded-lg transition"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </nav>
      </div>
    </header>
  );
}

