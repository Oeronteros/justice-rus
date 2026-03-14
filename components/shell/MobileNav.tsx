'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';
import { mobilePrimaryNavItems, mobileSecondaryNavItems } from '@/lib/nav';
import WuxiaIcon from '../WuxiaIcons';

interface MobileNavProps {
  currentSection: Section;
  language: Language;
  onNavPrefetch?: (section: Section) => void;
}

export default function MobileNav({ currentSection, language, onNavPrefetch }: MobileNavProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const primaryItems = useMemo(() => mobilePrimaryNavItems, []);
  const secondaryItems = useMemo(
    () => mobileSecondaryNavItems.filter((item) => !primaryItems.some((primaryItem) => primaryItem.section === item.section)),
    [primaryItems]
  );
  const isMoreActive = secondaryItems.some((item) => item.section === currentSection);
  const moreLabel = language === 'ru' ? 'Еще' : language === 'zh' ? '更多' : 'More';
  const quickNavLabel = language === 'ru' ? 'Быстрая навигация' : language === 'zh' ? '快捷导航' : 'Quick navigation';
  const moreNavLabel = language === 'ru' ? 'Дополнительная навигация' : language === 'zh' ? '更多导航' : 'More navigation';

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 px-[max(12px,env(safe-area-inset-left))] pb-[max(10px,env(safe-area-inset-bottom))] pr-[max(12px,env(safe-area-inset-right))]">
      {isMoreOpen ? (
        <nav className="mobile-nav-sheet mobile-nav-frame mb-3" aria-label={moreNavLabel}>
          <div className="mobile-nav-sheet-grid">
            {secondaryItems.map((item) => (
              <Link
                key={item.section}
                href={item.href}
                onClick={() => setIsMoreOpen(false)}
                onTouchStart={() => onNavPrefetch?.(item.section)}
                onMouseEnter={() => onNavPrefetch?.(item.section)}
                onFocus={() => onNavPrefetch?.(item.section)}
                className={`mobile-nav-sheet-link ${currentSection === item.section ? 'is-active' : ''}`}
                aria-label={sectionLabels[language][item.section]}
                aria-current={currentSection === item.section ? 'page' : undefined}
                title={sectionLabels[language][item.section]}
              >
                <span className="mobile-nav-sheet-icon dc-accent">
                  <WuxiaIcon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">{sectionLabels[language][item.section]}</span>
              </Link>
            ))}
          </div>
        </nav>
      ) : null}

      <nav
        className="wuxia-dock mobile-nav-dock bg-gradient-to-t from-[#0a1118]/96 to-[#111d27]/88 backdrop-blur-xl border border-[#223544]/60 shadow-2xl shadow-black/45"
        aria-label={quickNavLabel}
      >
        <div className="flex items-center justify-between gap-1.5 no-scrollbar">
          {primaryItems.map((item) => (
            <Link
              key={item.section}
              href={item.href}
              onClick={() => setIsMoreOpen(false)}
              onTouchStart={() => onNavPrefetch?.(item.section)}
              onMouseEnter={() => onNavPrefetch?.(item.section)}
              onFocus={() => onNavPrefetch?.(item.section)}
              className={`nav-chip mobile-nav-link flex flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                currentSection === item.section ? 'is-active' : ''
              }`}
              aria-label={sectionLabels[language][item.section]}
              aria-current={currentSection === item.section ? 'page' : undefined}
              title={sectionLabels[language][item.section]}
            >
              <span className="mb-1 dc-accent">
                <WuxiaIcon name={item.icon} className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-semibold leading-none tracking-[0.01em] whitespace-nowrap sm:text-[11px]">
                {sectionLabels[language][item.section]}
              </span>
            </Link>
          ))}

          <button
            type="button"
            className={`nav-chip mobile-nav-link mobile-nav-more flex flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
              isMoreOpen || isMoreActive ? 'is-active' : ''
            }`}
            onClick={() => setIsMoreOpen((value) => !value)}
            aria-expanded={isMoreOpen}
            aria-label={moreLabel}
            title={moreLabel}
          >
            <span className="mb-1 dc-accent">
              <WuxiaIcon name="dots" className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-semibold leading-none tracking-[0.01em] whitespace-nowrap sm:text-[11px]">{moreLabel}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
