'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Section } from '@/types';
import { headerCopy, Language, portalCopy, sectionLabels } from '@/lib/i18n';
import { desktopPrimaryNavItems, desktopSecondaryNavItems } from '@/lib/nav';
import WuxiaIcon from '../WuxiaIcons';

interface HeaderProps {
  currentSection: Section;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onNavPrefetch?: (section: Section) => void;
}

export default function Header({
  currentSection,
  onLogout,
  language,
  onLanguageChange,
  onNavPrefetch,
}: HeaderProps) {
  const [headerCompact, setHeaderCompact] = useState(false);

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

  const labels = useMemo(() => headerCopy[language], [language]);

  const orderLabels = useMemo(() => {
    return sectionLabels[language];
  }, [language]);
  const primaryNavLabel = language === 'ru' ? 'Основная навигация' : language === 'zh' ? '主导航' : 'Primary navigation';

  const sectionLabel = orderLabels[currentSection];

  return (
    <header className={`dc-header sticky top-0 z-40 ${headerCompact ? 'dc-header--compact' : ''}`}>
      <div className={`dc-header-panel max-w-7xl mx-auto px-4 sm:px-6 ${headerCompact ? 'py-2.5' : 'py-3 sm:py-3.5'}`}>
        <div className="dc-header-top flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <Link href="/" className="dc-brand-block flex min-w-0 items-start gap-3 sm:items-center sm:gap-4 text-left group">
            <div className="relative shrink-0">
              <div className="seal-ring">
                <div className="seal-core">
                  <WuxiaIcon name="skull" className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 hidden sm:block w-4 h-4 bg-[#5fd1d4] rounded-full border-2 border-[#0a1118]"></div>
            </div>
            <div className="min-w-0 text-left">
              <h1 className="text-[1.9rem] sm:text-2xl font-bold font-orbitron dc-text drop-shadow leading-none">
                Silent Moonfall
              </h1>
              <p className="mt-1 text-xs sm:text-sm dc-muted font-roboto leading-snug sm:whitespace-nowrap">{labels.brandSubtitle}</p>
              <div className="dc-header-oath hidden sm:flex flex-wrap items-center gap-2 mt-2">
                <span className="wuxia-tag wuxia-tag-compact">
                  <WuxiaIcon name="eye" className="w-4 h-4" />
                  <span className="wuxia-tag-text">{portalCopy[language].oath}</span>
                </span>
                <span className="wuxia-tag wuxia-tag-compact">
                  <WuxiaIcon name="seal" className="w-4 h-4" />
                  <span className="wuxia-tag-text">{labels.activeSection}: {sectionLabel}</span>
                </span>
              </div>
              <div className="sm:hidden mt-2">
                <span className="wuxia-tag wuxia-tag-compact">
                  <WuxiaIcon name="seal" className="w-4 h-4" />
                  <span className="wuxia-tag-text">{sectionLabel}</span>
                </span>
              </div>
            </div>
          </Link>

          <div className="dc-toolbar flex w-full sm:w-auto flex-wrap items-center justify-between sm:justify-end gap-2">
            <select
              id="langSwitch"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              aria-label={labels.languageSwitcher}
              className="dc-select min-w-[102px] flex-1 sm:flex-none rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a90b0]/40 transition-all font-medium"
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
              <option value="zh">简体中文</option>
            </select>

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

        <nav className="hidden md:block mt-3" aria-label={primaryNavLabel}>
          <div className="dc-nav-shell">
            <div className="dc-nav-stack">
              <div className={`dc-order dc-nav-scroll ${headerCompact ? 'dc-order--compact' : 'dc-order--full'}`}>
                {desktopPrimaryNavItems.map((item) => (
                  <Link
                    key={item.section}
                    href={item.href}
                    onMouseEnter={() => onNavPrefetch?.(item.section)}
                    onFocus={() => onNavPrefetch?.(item.section)}
                    onTouchStart={() => onNavPrefetch?.(item.section)}
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

              <div className="dc-order dc-nav-scroll dc-order--secondary" aria-label={language === 'ru' ? 'Дополнительные разделы' : language === 'zh' ? '附加分区' : 'Additional sections'}>
                {desktopSecondaryNavItems.map((item) => (
                  <Link
                    key={item.section}
                    href={item.href}
                    onMouseEnter={() => onNavPrefetch?.(item.section)}
                    onFocus={() => onNavPrefetch?.(item.section)}
                    onTouchStart={() => onNavPrefetch?.(item.section)}
                    className={`dc-order-step dc-order-step--secondary ${currentSection === item.section ? 'is-active' : ''}`}
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
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
