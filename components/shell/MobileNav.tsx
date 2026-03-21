'use client';

import { TouchEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import * as stylex from '@stylexjs/stylex';
import { Section } from '@/types';
import { headerCopy, Language, sectionLabels } from '@/lib/i18n';
import { mobileGroupedNavItems, mobilePrimaryNavItems, mobileSecondaryNavItems, resolveNavGroupForSection, type NavGroupKey } from '@/lib/nav';
import WuxiaIcon from '../WuxiaIcons';
import { shellStyles } from './Shell.stylex';

interface MobileNavProps {
  currentSection: Section;
  language: Language;
  onNavPrefetch?: (section: Section) => void;
}

export default function MobileNav({ currentSection, language, onNavPrefetch }: MobileNavProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const router = useRouter();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuOpenedAtRef = useRef(0);
  const bodyScrollStateRef = useRef({
    scrollY: 0,
    bodyOverflow: '',
    bodyPosition: '',
    bodyTop: '',
    bodyWidth: '',
    bodyPaddingRight: '',
    htmlOverscroll: '',
  });
  const prefersReducedMotion = useReducedMotion();
  const moreSheetId = useId();

  const labels = useMemo(() => headerCopy[language], [language]);
  const orderLabels = useMemo(() => sectionLabels[language], [language]);
  const primaryItems = useMemo(() => mobilePrimaryNavItems, []);
  const secondaryItems = useMemo(() => mobileSecondaryNavItems, []);
  const activeGroupedNav = useMemo(
    () => resolveNavGroupForSection(currentSection, mobileGroupedNavItems),
    [currentSection]
  );
  const [expandedGroups, setExpandedGroups] = useState<NavGroupKey[]>(() =>
    activeGroupedNav ? [activeGroupedNav.key] : [mobileGroupedNavItems[0]?.key].filter(Boolean) as NavGroupKey[]
  );

  const isMoreActive = secondaryItems.some((item) => item.section === currentSection);
  const currentSectionLabel = orderLabels[currentSection];
  const moreLabel = labels.more;
  const quickNavLabel = labels.quickNavigation;
  const moreNavLabel = labels.moreNavigation;
  const quickNavHint = labels.quickNavigationHint;
  const moreNavHint = labels.moreNavigationHint;
  const closeLabel = labels.closeMenu;
  const currentLabel = labels.current;
  const secondaryCountLabel = String(secondaryItems.length).padStart(2, '0');
  const scrimDismissGuardMs = 320;
  const activeIndicatorTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 32 };
  const boundedDrawerTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };
  const groupLabels = {
    core: labels.navCore,
    guild: labels.navGuild,
    command: labels.navCommand,
    tools: labels.navTools,
  } as const;
  const sheetTitleId = `${moreSheetId}-title`;
  const sheetHintId = `${moreSheetId}-hint`;

  const closeMoreMenu = useCallback(() => {
    setIsMoreOpen(false);
  }, []);

  const returnFocusToTrigger = useCallback(() => {
    window.requestAnimationFrame(() => {
      moreButtonRef.current?.focus();
    });
  }, []);

  const handleCloseMenu = useCallback(() => {
    closeMoreMenu();
    returnFocusToTrigger();
  }, [closeMoreMenu, returnFocusToTrigger]);

  const toggleMoreMenu = useCallback(() => {
    setIsMoreOpen((value) => {
      if (!value) {
        menuOpenedAtRef.current = Date.now();
      }

      return !value;
    });
  }, []);

  const handleMoreTouchEnd = useCallback(
    (event: TouchEvent<HTMLButtonElement>) => {
      event.preventDefault();
      toggleMoreMenu();
    },
    [toggleMoreMenu]
  );

  const toggleGroup = useCallback((groupKey: NavGroupKey) => {
    setExpandedGroups((current) =>
      current.includes(groupKey) ? current.filter((key) => key !== groupKey) : [...current, groupKey]
    );
  }, []);

  const closeViaScrim = useCallback(() => {
    if (Date.now() - menuOpenedAtRef.current < scrimDismissGuardMs) {
      return;
    }

    handleCloseMenu();
  }, [handleCloseMenu, scrimDismissGuardMs]);

  const navPrefetchProps = (section: Section) => ({
    onTouchStart: () => onNavPrefetch?.(section),
    onMouseEnter: () => onNavPrefetch?.(section),
    onFocus: () => onNavPrefetch?.(section),
  });

  const touchNavigateProps = (href: string) => ({
    onTouchEnd: (event: TouchEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      router.push(href);
    },
  });

  useEffect(() => {
    closeMoreMenu();
  }, [closeMoreMenu, currentSection]);

  useEffect(() => {
    if (!activeGroupedNav) {
      return;
    }

    setExpandedGroups((current) =>
      current.includes(activeGroupedNav.key) ? current : [...current, activeGroupedNav.key]
    );
  }, [activeGroupedNav]);

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
      bodyPaddingRight: body.style.paddingRight,
      htmlOverscroll: documentElement.style.overscrollBehavior,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
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
      body.style.paddingRight = previousState.bodyPaddingRight;
      documentElement.style.overscrollBehavior = previousState.htmlOverscroll;
      window.scrollTo(0, previousState.scrollY);
    };
  }, [isMoreOpen]);

  useEffect(() => {
    if (!isMoreOpen || !sheetRef.current) {
      return;
    }

    const container = sheetRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleCloseMenu();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((element) => !element.hasAttribute('hidden'));

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseMenu, isMoreOpen]);

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
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.16 }}
              {...stylex.props(shellStyles.mobileSheetScrim)}
            />
            <motion.nav
              id={moreSheetId}
              data-testid="nav-mobile-drawer"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              transition={boundedDrawerTransition}
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
                      onClick={handleCloseMenu}
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
                      <span {...stylex.props(shellStyles.mobileSheetStatusValue)}>{secondaryCountLabel}</span>
                    </span>
                  </div>
                </div>

                <div {...stylex.props(shellStyles.mobileSheetScroll)}>
                  {mobileGroupedNavItems.map((group) => {
                    const isExpanded = expandedGroups.includes(group.key);
                    const isCurrentGroup = activeGroupedNav?.key === group.key;

                    return (
                      <section key={group.key} {...stylex.props(shellStyles.mobileDisclosureSection)}>
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.key)}
                          aria-expanded={isExpanded}
                          aria-controls={`${moreSheetId}-${group.key}`}
                          aria-label={groupLabels[group.key]}
                          {...stylex.props(
                            shellStyles.mobileDisclosureButton,
                            isCurrentGroup && shellStyles.mobileDisclosureButtonCurrent,
                            isExpanded && shellStyles.mobileDisclosureButtonOpen
                          )}
                        >
                          <span {...stylex.props(shellStyles.mobileDisclosureCopy)}>
                            <span {...stylex.props(shellStyles.groupLabel)}>{groupLabels[group.key]}</span>
                            <span {...stylex.props(shellStyles.mobileDisclosureHint)}>
                              {isCurrentGroup ? currentSectionLabel : moreNavHint}
                            </span>
                          </span>
                          <span {...stylex.props(shellStyles.mobileDisclosureMeta)}>
                            <span {...stylex.props(shellStyles.mobileGroupCount)}>{String(group.items.length).padStart(2, '0')}</span>
                            <span {...stylex.props(shellStyles.mobileDisclosureGlyph)}>{isExpanded ? '-' : '+'}</span>
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded ? (
                            <motion.div
                              key={group.key}
                              id={`${moreSheetId}-${group.key}`}
                              initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={boundedDrawerTransition}
                              {...stylex.props(shellStyles.mobileDisclosurePanel)}
                            >
                              <div {...stylex.props(shellStyles.mobileDisclosureList)}>
                                {group.items.map((item) => {
                                  const isActive = currentSection === item.section;

                                  return (
                                    <Link
                                      key={item.section}
                                      href={item.href}
                                      {...navPrefetchProps(item.section)}
                                      {...touchNavigateProps(item.href)}
                                      {...stylex.props(
                                        shellStyles.mobileSheetLink,
                                        shellStyles.mobileDisclosureLink,
                                        isActive && shellStyles.mobileSheetLinkActive
                                      )}
                                      aria-label={orderLabels[item.section]}
                                      aria-current={isActive ? 'page' : undefined}
                                      title={orderLabels[item.section]}
                                    >
                                      <span {...stylex.props(shellStyles.mobileSheetIcon, isActive && shellStyles.mobileSheetIconActive)}>
                                        <WuxiaIcon name={item.icon} className="h-5 w-5" />
                                      </span>
                                      <span {...stylex.props(shellStyles.mobileSheetText)}>
                                        <span {...stylex.props(shellStyles.mobileSheetLabel, isActive && shellStyles.mobileSheetLabelActive)}>
                                          {orderLabels[item.section]}
                                        </span>
                                        {isActive ? <span {...stylex.props(shellStyles.mobileSheetCurrentTag)}>{currentLabel}</span> : null}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </section>
                    );
                  })}
                </div>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>

      <nav {...stylex.props(shellStyles.mobileDock)} aria-label={quickNavLabel}>
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
                  {...touchNavigateProps(item.href)}
                  {...stylex.props(shellStyles.mobileChip, isActive && shellStyles.mobileChipActive)}
                  aria-label={sectionLabels[language][item.section]}
                  aria-current={isActive ? 'page' : undefined}
                  title={orderLabels[item.section]}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="mobile-bottom-active"
                      {...stylex.props(shellStyles.navActiveIndicator)}
                      transition={activeIndicatorTransition}
                    />
                  ) : null}
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
              ref={moreButtonRef}
              type="button"
              {...stylex.props(shellStyles.mobileChip, shellStyles.mobileMore, (isMoreOpen || isMoreActive) && shellStyles.mobileChipActive)}
              onClick={toggleMoreMenu}
              onTouchEnd={handleMoreTouchEnd}
              aria-expanded={isMoreOpen}
              aria-controls={moreSheetId}
              aria-label={moreLabel}
              title={moreLabel}
            >
              {isMoreOpen || isMoreActive ? (
                <motion.span
                  layoutId="mobile-bottom-active"
                  {...stylex.props(shellStyles.navActiveIndicator)}
                  transition={activeIndicatorTransition}
                />
              ) : null}
              <span {...stylex.props(shellStyles.mobileChipBadge)}>{secondaryCountLabel}</span>
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
