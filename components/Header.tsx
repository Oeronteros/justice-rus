'use client';

import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
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

export default function Header({
  currentSection,
  onSectionChange,
  onLogout,
  language,
  onLanguageChange,
}: HeaderProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border-b border-red-900/30 shadow-2xl shadow-red-900/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
              <i className="fas fa-skull text-white text-lg"></i>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400">
              Cult Game Community
            </h1>
            <p className="text-sm text-gray-400 font-roboto">Justice Mobile Guild</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`nav-btn px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                currentSection === section.id
                  ? 'bg-gradient-to-r from-red-700/50 to-purple-700/50 border border-red-500/50 shadow-lg shadow-red-900/30'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-red-500/30'
              }`}
            >
              <i className={`fas ${section.icon} mr-2`}></i>
              <span>{sectionLabels[language][section.id]}</span>
            </button>
          ))}

          <select
            id="langSwitch"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="ml-3 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all font-medium"
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <button
            onClick={handleRefresh}
            className="ml-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-red-500/30 p-3 rounded-xl transition-all"
            title="Refresh data"
          >
            <i className="fas fa-sync-alt text-lg"></i>
          </button>

          <button
            onClick={onLogout}
            className="ml-3 bg-gradient-to-r from-red-800/70 to-red-900/70 hover:from-red-700/70 hover:to-red-800/70 border border-red-700/50 p-3 rounded-xl transition-all shadow-lg shadow-red-900/20"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt text-lg"></i>
          </button>
        </nav>
      </div>
    </header>
  );
}
