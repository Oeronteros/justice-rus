'use client';

import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';
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
    <header className="bg-gradient-to-r from-[#0f151c]/95 via-[#0c1218]/95 to-[#0a1016]/95 backdrop-blur-xl border-b border-[#2a3a47]/60 shadow-2xl shadow-black/40 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative">
            <div className="seal-ring">
              <div className="seal-core">
                <i className="fas fa-skull text-white text-lg"></i>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#120d0a]"></div>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold font-orbitron text-[#e6eff5] drop-shadow">
              Demonic Cult
            </h1>
            <p className="text-sm text-[#b7c9d6] font-roboto">Justice Mobile - Wuxia Order</p>
            <span className="wuxia-tag mt-2 block">
              <i className="fas fa-eye"></i>
              Клятва: Кровь - Тишина - Победа
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`nav-btn px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                currentSection === section
                  ? 'is-active bg-gradient-to-r from-[#182734]/90 to-[#244057]/80 border border-[#8fb9cc]/40 shadow-lg shadow-black/40'
                  : 'bg-[#0f1419]/70 hover:bg-[#141c24]/80 border border-[#23303b]/70 hover:border-[#8fb9cc]/30'
              }`}
            >
              <span className="mr-2 inline-flex text-[#8fb9cc]">
                <WuxiaIcon id={section} className="w-4 h-4" />
              </span>
              <span>{sectionLabels[language][section]}</span>
            </button>
          ))}

          <select
            id="langSwitch"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="ml-3 bg-[#0f1419]/80 border border-[#23303b]/70 text-[#e6eff5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a90b0]/40 transition-all font-medium"
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <button
            onClick={handleRefresh}
            className="ml-3 bg-[#0f1419]/80 hover:bg-[#18222c]/90 border border-[#23303b]/70 hover:border-[#8fb9cc]/40 p-3 rounded-xl transition-all"
            title="Refresh data"
          >
            <i className="fas fa-sync-alt text-lg"></i>
          </button>

          <button
            onClick={onLogout}
            className="ml-3 bg-gradient-to-r from-[#254b63]/80 to-[#3a6f8f]/80 hover:from-[#2d5974]/90 hover:to-[#4681a3]/90 border border-[#8fb9cc]/40 p-3 rounded-xl transition-all shadow-lg shadow-black/30"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt text-lg"></i>
          </button>
        </nav>
      </div>
    </header>
  );
}
