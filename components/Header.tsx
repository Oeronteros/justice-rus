'use client';

import { useEffect, useMemo, useState } from 'react';
import { Section } from '@/types';
import { Language, portalCopy } from '@/lib/i18n';
import { NEWYEAR_STORAGE_KEY, resolveNewYearEnabled } from '@/lib/seasonal';
import WuxiaIcon from './WuxiaIcons';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

type OrderStep = 'about' | 'news' | 'registration' | 'schedule' | 'guides' | 'help' | 'absences' | 'calculator';

export default function Header({
  currentSection,
  onSectionChange,
  onLogout,
  language,
  onLanguageChange,
}: HeaderProps) {
  const [newYearMode, setNewYearMode] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [activeOrderStep, setActiveOrderStep] = useState<OrderStep>('registration');

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

  const seasonalBadge = useMemo(() => {
    if (!newYearMode) return null;

    // Просто зимняя тема без новогодних надписей
    if (language === 'ru') return 'Зима';
    return 'Winter';
  }, [language, newYearMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const threshold = 72;
    let frame = 0;

    const update = () => {
      setHeaderCompact(window.scrollY > threshold);
      frame = 0;
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    if (currentSection === 'about') {
      setActiveOrderStep('about');
      return;
    }
    if (currentSection === 'news') {
      setActiveOrderStep('news');
      return;
    }
    if (currentSection === 'registration') {
      setActiveOrderStep('registration');
      return;
    }
    if (currentSection === 'schedule') {
      setActiveOrderStep('schedule');
      return;
    }
    if (currentSection === 'guides') {
      setActiveOrderStep('guides');
      return;
    }
    if (currentSection === 'help') {
      setActiveOrderStep('help');
      return;
    }
    if (currentSection === 'absences') {
      setActiveOrderStep('absences');
      return;
    }
    if (currentSection === 'calculator') {
      setActiveOrderStep('calculator');
      return;
    }

    setActiveOrderStep('about');
  }, [currentSection]);

  const toggleNewYearMode = () => {
    const next = !newYearMode;
    setNewYearMode(next);

    if (typeof window !== 'undefined') {
      localStorage.setItem(NEWYEAR_STORAGE_KEY, next ? 'on' : 'off');
    }

    document.body.classList.toggle('dc-season-newyear', next);
  };

  const scrollToMain = () => {
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => {
      document.getElementById('portal-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const goToSection = (section: Section) => {
    onSectionChange(section);
    scrollToMain();
  };

  const goToAbout = () => {
    goToSection('about');
  };

  const goToNews = () => {
    goToSection('news');
  };

  const goToRegistration = () => {
    goToSection('registration');
  };

  const goToSchedule = () => {
    goToSection('schedule');
  };

  const goToGuides = () => {
    goToSection('guides');
  };

  const goToHelp = () => {
    goToSection('help');
  };

  const goToAbsences = () => {
    goToSection('absences');
  };

  const goToCalculator = () => {
    goToSection('calculator');
  };

  const orderLabels = useMemo(() => {
    if (language === 'ru') {
      return {
        about: 'О нас',
        news: 'Новости',
        registration: 'Участники',
        schedule: 'Расписание',
        guides: 'Гайды',
        help: 'Помощь',
        absences: 'Отсутствия',
        calculator: 'Калькулятор',
      };
    }

    return {
      about: 'About',
      news: 'News',
      registration: 'Members',
      schedule: 'Schedule',
      guides: 'Guides',
      help: 'Help',
      absences: 'Absences',
      calculator: 'Calculator',
    };
  }, [language]);

  return (
    <header className={`dc-header sticky top-0 z-40 ${headerCompact ? 'dc-header--compact' : ''}`}>
      <div className={`max-w-7xl mx-auto px-6 ${headerCompact ? 'py-2.5' : 'py-3.5'}`}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <button
            type="button"
            onClick={() => goToSection('about')}
            className="flex items-center gap-4 text-left group"
            title={language === 'ru' ? 'О нас' : 'About'}
          >
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
                Cult
              </h1>
              <p className="text-sm dc-muted font-roboto whitespace-nowrap">Game Community · Justice Mobile</p>
              <span className="dc-header-oath wuxia-tag wuxia-tag-compact mt-1.5 block">
                <WuxiaIcon name="eye" className="w-4 h-4" />
                <span className="wuxia-tag-text">{portalCopy[language].oath}</span>
              </span>
            </div>
          </button>

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
              title={language === 'ru' ? 'Зимняя тема' : 'Winter theme'}
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

        <nav className="hidden md:block mt-2">
          <div className={`dc-order ${headerCompact ? 'dc-order--compact' : 'dc-order--full'}`}>
            <button
              type="button"
              onClick={goToAbout}
              className={`dc-order-step ${activeOrderStep === 'about' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="about" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.about}</span>
            </button>

            <button
              type="button"
              onClick={goToNews}
              className={`dc-order-step ${activeOrderStep === 'news' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="news" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.news}</span>
            </button>

            <button
              type="button"
              onClick={goToRegistration}
              className={`dc-order-step ${activeOrderStep === 'registration' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="registration" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.registration}</span>
            </button>

            <button
              type="button"
              onClick={goToSchedule}
              className={`dc-order-step ${activeOrderStep === 'schedule' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="schedule" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.schedule}</span>
            </button>

            <button
              type="button"
              onClick={goToGuides}
              className={`dc-order-step ${activeOrderStep === 'guides' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="guides" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.guides}</span>
            </button>

            <button
              type="button"
              onClick={goToHelp}
              className={`dc-order-step ${activeOrderStep === 'help' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="help" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.help}</span>
            </button>

            <button
              type="button"
              onClick={goToAbsences}
              className={`dc-order-step ${activeOrderStep === 'absences' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="absences" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.absences}</span>
            </button>

            <button
              type="button"
              onClick={goToCalculator}
              className={`dc-order-step ${activeOrderStep === 'calculator' ? 'is-active' : ''}`}
            >
              <span className="dc-order-dot dc-accent">
                <WuxiaIcon name="calculator" className="w-4 h-4" />
              </span>
              <span className="dc-order-label">{orderLabels.calculator}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
