'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import autoAnimate from '@formkit/auto-animate';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import * as stylex from '@stylexjs/stylex';
import { Section } from '@/types';
import { headerCopy, Language, sectionLabels } from '@/lib/i18n';
import { mobileGroupedNavItems, mobilePrimaryNavItems, mobileSecondaryNavItems } from '@/lib/nav';
import WuxiaIcon from '../WuxiaIcons';
import { shellStyles } from './Shell.stylex';

interface MobileNavProps {
  currentSection: Section;
  language: Language;
  onNavPrefetch?: (section: Section) => void;
}

export default function MobileNav({ currentSection, language, onNavPrefetch }: MobileNavProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuOpenedAtRef = useRef(0);
  const bodyScrollStateRef = useRef({
    scrollY: 0,
    bodyOverflow: '',
    bodyPosition: '',
    bodyTop: '',
    bodyWidth: '',
    bodyTouchAction: '',
    bodyPaddingRight: '',
    htmlOverscroll: '',
  });
  const prefersReducedMotion = useReducedMotion();
  const moreSheetId = useId();

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
  const labels = useMemo(() => headerCopy[language], [language]);
  const orderLabels = useMemo(() => sectionLabels[language], [language]);
  const isMoreActive = secondaryItems.some((item) => item.section === currentSection);
  const currentSectionLabel = orderLabels[currentSection];
  const moreLabel = language === 'ru' ? 'Еще' : language === 'zh' ? '更多' : 'More';
  const quickNavLabel = language === 'ru' ? 'Быстрая навигация' : language === 'zh' ? '快捷导航' : 'Quick navigation';
  const moreNavLabel = language === 'ru' ? 'Дополнительная навигация' : language === 'zh' ? '更多导航' : 'More navigation';
  const quickNavHint = language === 'ru' ? 'Главные маршруты всегда под пальцем' : language === 'zh' ? '核心入口保持在拇指范围内' : 'Core routes stay under your thumb';
  const moreNavHint =
    language === 'ru'
      ? 'Оставшиеся маршруты сгруппированы по роли и задаче'
      : language === 'zh'
        ? '其余路由按角色与任务分组'
        : 'The remaining routes are grouped by role and task';
  const closeLabel = language === 'ru' ? 'Закрыть меню' : language === 'zh' ? '关闭菜单' : 'Close menu';
  const currentLabel = language === 'ru' ? 'Текущий' : language === 'zh' ? '当前' : 'Current';
  const sectionsLabel = language === 'ru' ? 'маршрутов' : language === 'zh' ? '个分区' : 'routes';
  const groupLabels = {
    core: labels.navCore,
    guild: labels.navGuild,
    command: labels.navCommand,
    tools: labels.navTools,
  } as const;
  const sheetTitleId = `${moreSheetId}-title`;
  const sheetHintId = `${moreSheetId}-hint`;

  useEffect(() => {
    if (!sheetRef.current) return;
    autoAnimate(sheetRef.current, { duration: prefersReducedMotion ? 0 : 220, easing: 'ease-out' });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isMoreOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMoreMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMoreOpen]);

  useEffect(() => {
    if (!isMoreOpen) return;

    closeButtonRef.current?.focus();
  }, [isMoreOpen]);

  useEffect(() => {
    if (!isMoreOpen || typeof window === 'undefined') return;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    bodyScrollStateRef.current = {
      scrollY,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyTouchAction: body.style.touchAction,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverscroll: documentElement.style.overscrollBehavior,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.touchAction = 'none';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    documentElement.style.overscrollBehavior = 'none';

    return () => {
      const previousState = bodyScrollStateRef.current;

      body.style.overflow = previousState.bodyOverflow;
      body.style.position = previousState.bodyPosition;
      body.style.top = previousState.bodyTop;
      body.style.width = previousState.bodyWidth;
      body.style.touchAction = previousState.bodyTouchAction;
      body.style.paddingRight = previousState.bodyPaddingRight;
      documentElement.style.overscrollBehavior = previousState.htmlOverscroll;
      window.scrollTo(0, previousState.scrollY);
    };
  }, [isMoreOpen]);

  return (
    <div {...stylex.props(shellStyles.mobileNavRoot)}>
      <AnimatePresence initial={false}>
        {isMoreOpen ? (
          <>
            <motion.button
              type="button"
              aria-label={moreNavLabel}
              onClick={closeViaScrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18 }}
              {...stylex.props(shellStyles.mobileSheetScrim)}
            />
            <motion.nav
              id={moreSheetId}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 30 }}
              {...stylex.props(shellStyles.mobileSheetFrame)}
              aria-label={moreNavLabel}
              aria-labelledby={sheetTitleId}
              aria-describedby={sheetHintId}
            >
              <div {...stylex.props(shellStyles.mobileSheetStack)} ref={sheetRef}>
                <div {...stylex.props(shellStyles.mobileSheetHeader)}>
                  <div {...stylex.props(shellStyles.mobileSheetHeaderRow)}>
                    <div {...stylex.props(shellStyles.mobileSheetHeaderCopy)}>
                      <span id={sheetTitleId} {...stylex.props(shellStyles.mobileSheetTitle)}>{moreNavLabel}</span>
                      <span id={sheetHintId} {...stylex.props(shellStyles.mobileSheetHint)}>{moreNavHint}</span>
                    </div>
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={closeMoreMenu}
                      aria-label={closeLabel}
                      title={closeLabel}
                      {...stylex.props(shellStyles.mobileSheetClose)}
                    >
                      <WuxiaIcon name="x" className="h-4 w-4" />
                    </button>
                  </div>
                  <div {...stylex.props(shellStyles.mobileSheetStatusRow)}>
                    <span {...stylex.props(shellStyles.mobileSheetStatusChip, shellStyles.mobileSheetStatusChipActive)}>
                      <span {...stylex.props(shellStyles.mobileSheetStatusKicker)}>{labels.activeSection}</span>
                      <span {...stylex.props(shellStyles.mobileSheetStatusValue)}>{currentSectionLabel}</span>
                    </span>
                    <span {...stylex.props(shellStyles.mobileSheetStatusChip)}>
                      <span {...stylex.props(shellStyles.mobileSheetStatusKicker)}>{moreLabel}</span>
                      <span {...stylex.props(shellStyles.mobileSheetStatusValue)}>{secondaryItems.length} {sectionsLabel}</span>
                    </span>
                  </div>
                </div>
                <div {...stylex.props(shellStyles.mobileSheetScroll)}>
                  {mobileGroupedNavItems.map((group) => (
                    <section key={group.key} {...stylex.props(shellStyles.mobileGroup)}>
                      <div {...stylex.props(shellStyles.mobileGroupMeta)}>
                        <div {...stylex.props(shellStyles.groupLabel)}>{groupLabels[group.key]}</div>
                        <span {...stylex.props(shellStyles.mobileGroupCount)}>{String(group.items.length).padStart(2, '0')}</span>
                      </div>
                      <div {...stylex.props(shellStyles.mobileSheetGrid)}>
                        {group.items.map((item) => {
                          const isActive = currentSection === item.section;

                          return (
                            <Link
                              key={item.section}
                              href={item.href}
                              {...navPrefetchProps(item.section)}
                              {...stylex.props(shellStyles.mobileSheetLink, isActive && shellStyles.mobileSheetLinkActive)}
                              aria-label={orderLabels[item.section]}
                              aria-current={isActive ? 'page' : undefined}
                              title={orderLabels[item.section]}
                              onClick={closeMoreMenu}
                            >
                              <span {...stylex.props(shellStyles.mobileSheetIcon, isActive && shellStyles.mobileSheetIconActive)}>
                                <WuxiaIcon name={item.icon} className="h-5 w-5" />
                              </span>
                              <span {...stylex.props(shellStyles.mobileSheetText)}>
                                <span {...stylex.props(shellStyles.mobileSheetLabel, isActive && shellStyles.mobileSheetLabelActive)}>{orderLabels[item.section]}</span>
                                {isActive ? <span {...stylex.props(shellStyles.mobileSheetCurrentTag)}>{currentLabel}</span> : null}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
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
          <div {...stylex.props(shellStyles.mobileDockCopy)}>
            <span {...stylex.props(shellStyles.mobileDockKicker)}>{quickNavLabel}</span>
            <span {...stylex.props(shellStyles.mobileDockHint)}>{quickNavHint}</span>
          </div>
          <span {...stylex.props(shellStyles.mobileDockStatus)}>
            <span {...stylex.props(shellStyles.mobileDockStatusKicker)}>{labels.activeSection}</span>
            <span {...stylex.props(shellStyles.mobileDockStatusValue)}>{currentSectionLabel}</span>
          </span>
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
                  title={orderLabels[item.section]}
                  onClick={closeMoreMenu}
                >
                  {isActive ? <motion.span layoutId="mobile-bottom-active" {...stylex.props(shellStyles.navActiveIndicator)} transition={{ type: 'spring', stiffness: 420, damping: 32 }} /> : null}
                  <span {...stylex.props(shellStyles.mobileLinkContent)}>
                    <span {...stylex.props(shellStyles.mobileDockIcon, isActive && shellStyles.mobileDockIconActive)}>
                      <WuxiaIcon name={item.icon} className="w-5 h-5" />
                    </span>
                    <span {...stylex.props(shellStyles.mobileLabel, isActive && shellStyles.mobileLabelActive)}>
                      {orderLabels[item.section]}
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
              aria-controls={moreSheetId}
              aria-label={moreLabel}
              title={moreLabel}
            >
              {isMoreOpen || isMoreActive ? <motion.span layoutId="mobile-bottom-active" {...stylex.props(shellStyles.navActiveIndicator)} transition={{ type: 'spring', stiffness: 420, damping: 32 }} /> : null}
              <span {...stylex.props(shellStyles.mobileChipBadge)}>{String(secondaryItems.length).padStart(2, '0')}</span>
              <span {...stylex.props(shellStyles.mobileLinkContent)}>
                <span {...stylex.props(shellStyles.mobileDockIcon, (isMoreOpen || isMoreActive) && shellStyles.mobileDockIconActive)}>
                  <WuxiaIcon name="dots" className="w-5 h-5" />
                </span>
                <span {...stylex.props(shellStyles.mobileLabel, (isMoreOpen || isMoreActive) && shellStyles.mobileLabelActive)}>{moreLabel}</span>
              </span>
            </button>
          </div>
        </LayoutGroup>
      </nav>
    </div>
  );
}
