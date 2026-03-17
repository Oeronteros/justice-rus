'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import autoAnimate from '@formkit/auto-animate';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import * as stylex from '@stylexjs/stylex';
import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';
import { mobileGroupedNavItems, mobilePrimaryNavItems, mobileSecondaryNavItems } from '@/lib/nav';
import WuxiaIcon from '../WuxiaIcons';
import { mergeStylexProps } from '@/lib/stylex/utils';
import { shellStyles } from './Shell.stylex';

interface MobileNavProps {
  currentSection: Section;
  language: Language;
  onNavPrefetch?: (section: Section) => void;
}

export default function MobileNav({ currentSection, language, onNavPrefetch }: MobileNavProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const menuOpenedAtRef = useRef(0);

  const closeMoreMenu = () => setIsMoreOpen(false);

  const toggleMoreMenu = () => {
    setIsMoreOpen((value) => {
      if (!value) {
        menuOpenedAtRef.current = Date.now();
      }

      return !value;
    });
  };

  const closeViaScrim = () => {
    if (Date.now() - menuOpenedAtRef.current < 140) {
      return;
    }

    closeMoreMenu();
  };

  const navPrefetchProps = (section: Section) => ({
    onTouchStart: () => onNavPrefetch?.(section),
    onMouseEnter: () => onNavPrefetch?.(section),
    onFocus: () => onNavPrefetch?.(section),
  });

  const primaryItems = useMemo(() => mobilePrimaryNavItems, []);
  const secondaryItems = useMemo(
    () => mobileSecondaryNavItems.filter((item) => !primaryItems.some((primaryItem) => primaryItem.section === item.section)),
    [primaryItems]
  );
  const isMoreActive = secondaryItems.some((item) => item.section === currentSection);
  const moreLabel = language === 'ru' ? 'Еще' : language === 'zh' ? '更多' : 'More';
  const quickNavLabel = language === 'ru' ? 'Быстрая навигация' : language === 'zh' ? '快捷导航' : 'Quick navigation';
  const moreNavLabel = language === 'ru' ? 'Дополнительная навигация' : language === 'zh' ? '更多导航' : 'More navigation';
  const quickNavHint = language === 'ru' ? 'Главные маршруты всегда под пальцем' : language === 'zh' ? '核心入口保持在拇指范围内' : 'Core routes stay under your thumb';
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


  useEffect(() => {
    if (!isMoreOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMoreOpen]);

  return (
    <div {...stylex.props(shellStyles.mobileNavRoot)}>
      <AnimatePresence>
        {isMoreOpen ? (
          <>
            <motion.button
              type="button"
              aria-label={moreNavLabel}
              onClick={closeViaScrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              {...stylex.props(shellStyles.mobileSheetScrim)}
            />
            <motion.nav
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              {...stylex.props(shellStyles.mobileSheetFrame)}
              aria-label={moreNavLabel}
            >
              <div {...stylex.props(shellStyles.mobileSheetStack)} ref={sheetRef}>
                <div {...stylex.props(shellStyles.mobileSheetHeader)}>
                  <span {...stylex.props(shellStyles.mobileSheetTitle)}>{moreNavLabel}</span>
                  <span {...stylex.props(shellStyles.mobileSheetHint)}>{quickNavHint}</span>
                </div>
                {mobileGroupedNavItems.map((group) => (
                  <section key={group.key} {...stylex.props(shellStyles.mobileGroup)}>
                    <div {...stylex.props(shellStyles.groupLabel)}>{groupLabels[group.key]}</div>
                    <div {...stylex.props(shellStyles.mobileSheetGrid)}>
                      {group.items.map((item) => (
                        <Link
                          key={item.section}
                          href={item.href}
                          {...navPrefetchProps(item.section)}
                          {...stylex.props(shellStyles.mobileSheetLink, currentSection === item.section && shellStyles.mobileSheetLinkActive)}
                          aria-label={sectionLabels[language][item.section]}
                          aria-current={currentSection === item.section ? 'page' : undefined}
                          title={sectionLabels[language][item.section]}
                          onClick={closeMoreMenu}
                        >
                          <span {...mergeStylexProps(stylex.props(shellStyles.mobileSheetIcon), 'dc-accent')}>
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
          </>
        ) : null}
      </AnimatePresence>

      <nav
        {...stylex.props(shellStyles.mobileDock)}
        aria-label={quickNavLabel}
      >
        <div {...stylex.props(shellStyles.mobileDockMeta)}>
          <span {...stylex.props(shellStyles.mobileDockKicker)}>{quickNavLabel}</span>
          <span {...stylex.props(shellStyles.mobileDockHint)}>{quickNavHint}</span>
        </div>
        <LayoutGroup id="mobile-bottom-nav">
          <div {...stylex.props(shellStyles.mobileDockInner)}>
            {primaryItems.map((item) => {
              const isActive = currentSection === item.section;

              return (
                <Link
                  key={item.section}
                  href={item.href}
                  {...navPrefetchProps(item.section)}
                  {...stylex.props(shellStyles.mobileChip, isActive && shellStyles.mobileChipActive)}
                  aria-label={sectionLabels[language][item.section]}
                  aria-current={isActive ? 'page' : undefined}
                  title={sectionLabels[language][item.section]}
                  onClick={closeMoreMenu}
                >
                  {isActive ? <motion.span layoutId="mobile-bottom-active" {...stylex.props(shellStyles.navActiveIndicator)} transition={{ type: 'spring', stiffness: 420, damping: 32 }} /> : null}
                  <span {...stylex.props(shellStyles.mobileLinkContent)}>
                    <span className="dc-accent">
                      <WuxiaIcon name={item.icon} className="w-5 h-5" />
                    </span>
                    <span {...stylex.props(shellStyles.mobileLabel)}>
                      {sectionLabels[language][item.section]}
                    </span>
                  </span>
                </Link>
              );
            })}

            <button
              type="button"
              {...stylex.props(shellStyles.mobileChip, shellStyles.mobileMore, (isMoreOpen || isMoreActive) && shellStyles.mobileChipActive)}
              onClick={toggleMoreMenu}
              aria-expanded={isMoreOpen}
              aria-label={moreLabel}
              title={moreLabel}
            >
              {isMoreOpen || isMoreActive ? <motion.span layoutId="mobile-bottom-active" {...stylex.props(shellStyles.navActiveIndicator)} transition={{ type: 'spring', stiffness: 420, damping: 32 }} /> : null}
              <span {...stylex.props(shellStyles.mobileLinkContent)}>
                <span className="dc-accent">
                  <WuxiaIcon name="dots" className="w-5 h-5" />
                </span>
                <span {...stylex.props(shellStyles.mobileLabel)}>{moreLabel}</span>
              </span>
            </button>
          </div>
        </LayoutGroup>
      </nav>
    </div>
  );
}
