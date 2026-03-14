'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import autoAnimate from '@formkit/auto-animate';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';
import { mobileGroupedNavItems, mobilePrimaryNavItems, mobileSecondaryNavItems } from '@/lib/nav';
import WuxiaIcon from '../WuxiaIcons';

interface MobileNavProps {
  currentSection: Section;
  language: Language;
  onNavPrefetch?: (section: Section) => void;
}

export default function MobileNav({ currentSection, language, onNavPrefetch }: MobileNavProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const primaryItems = useMemo(() => mobilePrimaryNavItems, []);
  const secondaryItems = useMemo(
    () => mobileSecondaryNavItems.filter((item) => !primaryItems.some((primaryItem) => primaryItem.section === item.section)),
    [primaryItems]
  );
  const isMoreActive = secondaryItems.some((item) => item.section === currentSection);
  const moreLabel = language === 'ru' ? 'Еще' : language === 'zh' ? '更多' : 'More';
  const quickNavLabel = language === 'ru' ? 'Быстрая навигация' : language === 'zh' ? '快捷导航' : 'Quick navigation';
  const moreNavLabel = language === 'ru' ? 'Дополнительная навигация' : language === 'zh' ? '更多导航' : 'More navigation';
  const groupLabels = {
    core: language === 'ru' ? 'Кабинет' : language === 'zh' ? '个人区' : 'Profile zone',
    guild: language === 'ru' ? 'Гильдия' : language === 'zh' ? '公会' : 'Guild',
    command: language === 'ru' ? 'Управление' : language === 'zh' ? '管理' : 'Command',
    tools: language === 'ru' ? 'Инструменты' : language === 'zh' ? '工具' : 'Tools',
  } as const;

  useEffect(() => {
    if (!sheetRef.current) return;
    autoAnimate(sheetRef.current, { duration: 220, easing: 'ease-out' });
  }, []);

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 px-[max(12px,env(safe-area-inset-left))] pb-[max(10px,env(safe-area-inset-bottom))] pr-[max(12px,env(safe-area-inset-right))]">
      <AnimatePresence>
        {isMoreOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="mobile-nav-sheet mobile-nav-frame mobile-nav-sheet--enhanced mb-3"
            aria-label={moreNavLabel}
          >
            <div className="mobile-nav-sheet-stack" ref={sheetRef}>
              {mobileGroupedNavItems.map((group) => (
                <section key={group.key} className="mobile-nav-group">
                  <div className="mobile-nav-group__label">{groupLabels[group.key]}</div>
                  <div className="mobile-nav-sheet-grid">
                    {group.items.map((item) => (
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
                </section>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <nav
        className="wuxia-dock mobile-nav-dock bg-gradient-to-t from-[#0a1118]/96 to-[#111d27]/88 backdrop-blur-xl border border-[#223544]/60 shadow-2xl shadow-black/45"
        aria-label={quickNavLabel}
      >
        <LayoutGroup id="mobile-bottom-nav">
          <div className="flex items-center justify-between gap-1.5 no-scrollbar">
            {primaryItems.map((item) => {
              const isActive = currentSection === item.section;

              return (
                <Link
                  key={item.section}
                  href={item.href}
                  onClick={() => setIsMoreOpen(false)}
                  onTouchStart={() => onNavPrefetch?.(item.section)}
                  onMouseEnter={() => onNavPrefetch?.(item.section)}
                  onFocus={() => onNavPrefetch?.(item.section)}
                  className={`nav-chip mobile-nav-link flex flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${isActive ? 'is-active' : ''}`}
                  aria-label={sectionLabels[language][item.section]}
                  aria-current={isActive ? 'page' : undefined}
                  title={sectionLabels[language][item.section]}
                >
                  {isActive ? <motion.span layoutId="mobile-bottom-active" className="mobile-nav-link__active" transition={{ type: 'spring', stiffness: 420, damping: 32 }} /> : null}
                  <span className="mobile-nav-link__content">
                    <span className="mb-1 dc-accent">
                      <WuxiaIcon name={item.icon} className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-semibold leading-none tracking-[0.01em] whitespace-nowrap sm:text-[11px]">
                      {sectionLabels[language][item.section]}
                    </span>
                  </span>
                </Link>
              );
            })}

            <button
              type="button"
              className={`nav-chip mobile-nav-link mobile-nav-more flex flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${isMoreOpen || isMoreActive ? 'is-active' : ''}`}
              onClick={() => setIsMoreOpen((value) => !value)}
              aria-expanded={isMoreOpen}
              aria-label={moreLabel}
              title={moreLabel}
            >
              {isMoreOpen || isMoreActive ? <motion.span layoutId="mobile-bottom-active" className="mobile-nav-link__active" transition={{ type: 'spring', stiffness: 420, damping: 32 }} /> : null}
              <span className="mobile-nav-link__content">
                <span className="mb-1 dc-accent">
                  <WuxiaIcon name="dots" className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-semibold leading-none tracking-[0.01em] whitespace-nowrap sm:text-[11px]">{moreLabel}</span>
              </span>
            </button>
          </div>
        </LayoutGroup>
      </nav>
    </div>
  );
}
