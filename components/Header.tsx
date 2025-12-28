'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

type OrderStep = 'registration' | 'schedule' | 'guides' | 'help' | 'absences' | 'more';

const moreSections: Section[] = ['about', 'news', 'calculator'];

export default function Header({
  currentSection,
  onSectionChange,
  onLogout,
  language,
  onLanguageChange,
}: HeaderProps) {
  const [newYearMode, setNewYearMode] = useState(false);
  const [ticker, setTicker] = useState(0);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [activeOrderStep, setActiveOrderStep] = useState<OrderStep>('registration');
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

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

    setActiveOrderStep('more');
  }, [currentSection]);

  useEffect(() => {
    if (!moreOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!moreRef.current) return;
      if (!moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moreOpen]);

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
    setMoreOpen(false);
    onSectionChange(section);
    scrollToMain();
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

  const orderLabels = useMemo(() => {
    if (language === 'ru') {
      return {
        registration: 'Участники',
        schedule: 'Расписание',
        guides: 'Гайды',
        help: 'Помощь',
        absences: 'Отсутствия',
        more: 'Ещё',
      };
    }

    return {
      registration: 'Members',
      schedule: 'Schedule',
      guides: 'Guides',
      help: 'Help',
      absences: 'Absences',
      more: 'More',
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
                Demonic Cult
              </h1>
              <p className="text-sm dc-muted font-roboto whitespace-nowrap">Justice Mobile · Wuxia Order</p>
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

        <nav className="hidden md:block mt-2">
          <div className={`dc-order ${headerCompact ? 'dc-order--compact' : 'dc-order--full'}`}>
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

            <div ref={moreRef} className="dc-more">
              <button
                type="button"
                className={`dc-order-step dc-more-trigger ${moreOpen ? 'is-open' : ''} ${activeOrderStep === 'more' ? 'is-active' : ''}`}
                onClick={() => setMoreOpen((v) => !v)}
              >
                <span className="dc-order-dot dc-accent">
                  <WuxiaIcon name="dots" className="w-4 h-4" />
                </span>
                <span className="dc-order-label">{orderLabels.more}</span>
              </button>

              {moreOpen && (
                <div className="dc-more-menu" role="menu">
                  {moreSections.map((section) => (
                    <button
                      key={section}
                      type="button"
                      className="dc-more-item"
                      role="menuitem"
                      onClick={() => goToSection(section)}
                    >
                      <span className="dc-accent inline-flex">
                        <WuxiaIcon name={section} className="w-4 h-4" />
                      </span>
                      <span>{sectionLabels[language][section]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
