'use client';

import { Section } from '@/types';
import { Language, portalCopy, sectionLabels } from '@/lib/i18n';
import WuxiaIcon from './WuxiaIcons';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
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
    <header className="dc-header sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative">
            <div className="seal-ring">
              <div className="seal-core">
                <WuxiaIcon name="skull" className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#5fd1d4] rounded-full border-2 border-[#0a1118]"></div>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold font-orbitron dc-text drop-shadow">
              Demonic Cult
            </h1>
            <p className="text-sm dc-muted font-roboto">Justice Mobile - Wuxia Order</p>
            <span className="wuxia-tag mt-2 block">
              <WuxiaIcon name="eye" className="w-4 h-4" />
              {portalCopy[language].oath}
            </span>
          </div>
        </div>

        <nav className="wuxia-nav flex flex-wrap items-center justify-center gap-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`nav-btn px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                currentSection === section ? 'is-active' : ''
              }`}
            >
              <span className="mr-2 inline-flex dc-accent">
                <WuxiaIcon name={section} className="w-4 h-4" />
              </span>
              <span>{sectionLabels[language][section]}</span>
            </button>
          ))}

          <select
            id="langSwitch"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="dc-select ml-3 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a90b0]/40 transition-all font-medium"
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <button
            onClick={handleRefresh}
            className="dc-icon-btn ml-3 p-3 rounded-xl"
            title="Refresh data"
          >
            <WuxiaIcon name="refresh" className="w-5 h-5" />
          </button>

          <button
            onClick={onLogout}
            className="dc-icon-btn dc-icon-btn-accent ml-3 p-3 rounded-xl"
            title="Logout"
          >
            <WuxiaIcon name="logout" className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </header>
  );
}
