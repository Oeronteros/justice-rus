'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Section } from '@/types';
import { Language, portalCopy } from '@/lib/i18n';
import WuxiaIcon, { type IconName } from './WuxiaIcons';

interface HeaderProps {
  currentSection: Section;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

type NavItem = {
  section: Section;
  href: string;
  icon: IconName;
};

const navItems: NavItem[] = [
  { section: 'about', href: '/', icon: 'about' },
  { section: 'news', href: '/news', icon: 'news' },
  { section: 'registration', href: '/members', icon: 'registration' },
  { section: 'schedule', href: '/schedule', icon: 'schedule' },
  { section: 'pvp', href: '/pvp', icon: 'sword' },
  { section: 'guides', href: '/guides', icon: 'guides' },
  { section: 'help', href: '/help', icon: 'help' },
  { section: 'absences', href: '/absences', icon: 'absences' },
  { section: 'calculator', href: '/calculator', icon: 'calculator' },
  { section: 'profile', href: '/profile', icon: 'profile' },
];

export default function Header({
  currentSection,
  onLogout,
  language,
  onLanguageChange,
}: HeaderProps) {
  const [headerCompact, setHeaderCompact] = useState(false);
  const [marchThemeEnabled, setMarchThemeEnabled] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

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
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('theme-march-8');
    if (stored === '1') {
      setMarchThemeEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.body.classList.toggle('theme-march8', marchThemeEnabled);
    window.localStorage.setItem('theme-march-8', marchThemeEnabled ? '1' : '0');
  }, [marchThemeEnabled]);

  const labels = useMemo(() => {
    if (language === 'ru') {
      return {
        brandSubtitle: 'Гильдия · Justice Mobile',
        activeSection: 'Раздел',
        about: 'О нас',
        news: 'Новости',
        registration: 'Участники',
        schedule: 'Расписание',
        pvp: 'PvP',
        guides: 'Гайды',
        help: 'Помощь',
        absences: 'Отсутствия',
        calculator: 'Калькулятор DPS',
        profile: 'Кабинет',
        refresh: 'Обновить данные',
        logout: 'Выйти',
        marchTheme: '8 Марта',
        languageSwitcher: 'Язык интерфейса',
      };
    }

    if (language === 'zh') {
      return {
        brandSubtitle: '公会 · Justice Mobile',
        activeSection: '当前',
        about: '关于',
        news: '公告',
        registration: '成员',
        schedule: '日程',
        pvp: 'PvP',
        guides: '攻略',
        help: '求助',
        absences: '请假',
        calculator: 'DPS 计算器',
        profile: '个人页',
        refresh: '刷新数据',
        logout: '退出',
        marchTheme: '3月8日',
        languageSwitcher: '界面语言',
      };
    }

    return {
      brandSubtitle: 'Guild · Justice Mobile',
      activeSection: 'Section',
      about: 'About',
      news: 'News',
      registration: 'Members',
      schedule: 'Schedule',
      pvp: 'PvP',
      guides: 'Guides',
      help: 'Help',
      absences: 'Absences',
      calculator: 'DPS Calculator',
      profile: 'Profile',
      refresh: 'Refresh data',
      logout: 'Logout',
      marchTheme: 'March 8',
      languageSwitcher: 'Interface language',
    };
  }, [language]);

  const orderLabels = useMemo(() => {
    return {
      about: labels.about,
      news: labels.news,
      registration: labels.registration,
      schedule: labels.schedule,
      pvp: labels.pvp,
      guides: labels.guides,
      help: labels.help,
      absences: labels.absences,
      calculator: labels.calculator,
      profile: labels.profile,
    };
  }, [labels]);

  const sectionLabel = orderLabels[currentSection];

  return (
    <header className={`dc-header sticky top-0 z-40 ${headerCompact ? 'dc-header--compact' : ''}`}>
      <div className={`max-w-7xl mx-auto px-6 ${headerCompact ? 'py-2.5' : 'py-3.5'}`}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 text-left group">
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
                Silent Moonfall
              </h1>
              <p className="text-sm dc-muted font-roboto whitespace-nowrap">{labels.brandSubtitle}</p>
              <div className="dc-header-oath flex flex-wrap items-center gap-2 mt-2">
                <span className="wuxia-tag wuxia-tag-compact">
                  <WuxiaIcon name="eye" className="w-4 h-4" />
                  <span className="wuxia-tag-text">{portalCopy[language].oath}</span>
                </span>
                <span className="wuxia-tag wuxia-tag-compact">
                  <WuxiaIcon name="seal" className="w-4 h-4" />
                  <span className="wuxia-tag-text">{labels.activeSection}: {sectionLabel}</span>
                </span>
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
            <select
              id="langSwitch"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              aria-label={labels.languageSwitcher}
              className="dc-select rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a90b0]/40 transition-all font-medium"
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
              <option value="zh">简体中文</option>
            </select>

            <button
              type="button"
              onClick={() => setMarchThemeEnabled((value) => !value)}
              className={`dc-season-badge rounded-xl px-4 py-2 text-sm font-medium transition-all ${marchThemeEnabled ? 'border-[#f6b7c8]/70 text-[#ffeaf0]' : ''}`}
              title={labels.marchTheme}
            >
              {labels.marchTheme}
            </button>

            <button
              onClick={handleRefresh}
              className="dc-icon-btn p-2.5 rounded-xl"
              title={labels.refresh}
              aria-label={labels.refresh}
            >
              <WuxiaIcon name="refresh" className="w-5 h-5" />
            </button>

            <button
              onClick={onLogout}
              className="dc-icon-btn dc-icon-btn-accent p-2.5 rounded-xl"
              title={labels.logout}
              aria-label={labels.logout}
            >
              <WuxiaIcon name="logout" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="hidden md:block mt-2">
          <div className={`dc-order ${headerCompact ? 'dc-order--compact' : 'dc-order--full'}`}>
            {navItems.map((item) => (
              <Link
                key={item.section}
                href={item.href}
                className={`dc-order-step ${currentSection === item.section ? 'is-active' : ''}`}
                aria-label={orderLabels[item.section]}
                aria-current={currentSection === item.section ? 'page' : undefined}
                title={orderLabels[item.section]}
              >
                <span className="dc-order-dot dc-accent">
                  <WuxiaIcon name={item.icon} className="w-4 h-4" />
                </span>
                <span className="dc-order-label">{orderLabels[item.section]}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
