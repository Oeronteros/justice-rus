'use client';

import { useEffect, useMemo, useState } from 'react';
import { Section } from '@/types';
import { Language, portalCopy, sectionLabels } from '@/lib/i18n';
import { formatCountdownParts, NEWYEAR_STORAGE_KEY, resolveNewYearEnabled } from '@/lib/seasonal';
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
  const [newYearMode, setNewYearMode] = useState(false);
  const [ticker, setTicker] = useState(0);

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(NEWYEAR_STORAGE_KEY);
    const enabled = resolveNewYearEnabled(new Date(), stored);
    setNewYearMode(enabled);
    document.body.classList.toggle('dc-season-newyear', enabled);
  }, []);

  useEffect(() => {
    if (!newYearMode) return;
    const interval = window.setInterval(() => setTicker((t) => (t + 1) % 10_000), 1000);
    return () => window.clearInterval(interval);
  }, [newYearMode]);

  const seasonalBadge = useMemo(() => {
    if (!newYearMode) return null;

    const now = new Date();
    if (now.getMonth() === 11) {
      const target = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
      const diff = target.getTime() - now.getTime();
      const { days, hours, minutes } = formatCountdownParts(diff);

      if (language === 'ru') return `До Нового года: ${days}д ${hours}ч ${minutes}м`;
      return `New Year in: ${days}d ${hours}h ${minutes}m`;
    }

    if (now.getMonth() === 0 && now.getDate() <= 7) {
      if (language === 'ru') return 'С Новым годом!';
      return 'Happy New Year!';
    }

    if (language === 'ru') return 'Зимний ритуал';
    return 'Winter rite';
  }, [language, newYearMode, ticker]);

  const toggleNewYearMode = () => {
    const next = !newYearMode;
    setNewYearMode(next);

    if (typeof window !== 'undefined') {
      localStorage.setItem(NEWYEAR_STORAGE_KEY, next ? 'on' : 'off');
    }

    document.body.classList.toggle('dc-season-newyear', next);
  };

  return (
    <header className="dc-header sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
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
            <p className="text-sm dc-muted font-roboto whitespace-nowrap">Justice Mobile · Wuxia Order</p>
            <span className="wuxia-tag wuxia-tag-compact mt-2 block">
              <WuxiaIcon name="eye" className="w-4 h-4" />
              <span className="wuxia-tag-text">{portalCopy[language].oath}</span>
            </span>
          </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
            {seasonalBadge && (
              <div className="dc-season-badge hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl">
                <span className="dc-accent inline-flex">
                  <WuxiaIcon name="sparkle" className="w-4 h-4" />
                </span>
                <span>{seasonalBadge}</span>
              </div>
            )}

            <select
              id="langSwitch"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="dc-select rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a90b0]/40 transition-all font-medium"
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>

            <button
              onClick={toggleNewYearMode}
              className={`dc-icon-btn p-2.5 rounded-xl ${newYearMode ? 'dc-icon-btn-active' : ''}`}
              title={language === 'ru' ? 'Новогодний режим' : 'New Year mode'}
            >
              <WuxiaIcon name="snowflake" className="w-5 h-5" />
            </button>

            <button
              onClick={handleRefresh}
              className="dc-icon-btn p-2.5 rounded-xl"
              title="Refresh data"
            >
              <WuxiaIcon name="refresh" className="w-5 h-5" />
            </button>

            <button
              onClick={onLogout}
              className="dc-icon-btn dc-icon-btn-accent p-2.5 rounded-xl"
              title="Logout"
            >
              <WuxiaIcon name="logout" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="wuxia-nav hidden md:block mt-3">
          <div className="wuxia-nav-scroll">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => onSectionChange(section)}
                className={`nav-btn px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                  currentSection === section ? 'is-active' : ''
                }`}
              >
                <span className="mr-2 inline-flex dc-accent">
                  <WuxiaIcon name={section} className="w-4 h-4" />
                </span>
                <span>{sectionLabels[language][section]}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
