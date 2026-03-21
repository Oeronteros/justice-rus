'use client';

import { FocusEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import * as stylex from '@stylexjs/stylex';
import { Section } from '@/types';
import { headerCopy, Language, portalCopy, sectionLabels } from '@/lib/i18n';
import { groupedNavItems, primaryNavItems, resolveNavGroupForSection, type NavGroupKey } from '@/lib/nav';
import WuxiaIcon from '../WuxiaIcons';
import ThemeModeSwitch from './ThemeModeSwitch';
import { shellStyles } from './Shell.stylex';

interface HeaderProps {
  currentSection: Section;
  onLogout: () => void;
  onRefresh: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onNavPrefetch?: (section: Section) => void;
}

export default function Header({
  currentSection,
  onLogout,
  onRefresh,
  language,
  onLanguageChange,
  onNavPrefetch,
}: HeaderProps) {
  const [headerCompact, setHeaderCompact] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState<NavGroupKey | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const desktopSubmenuRef = useRef<HTMLDivElement | null>(null);
  const desktopTriggerRefs = useRef<Partial<Record<NavGroupKey, HTMLButtonElement | null>>>({});
  const focusOpenedGroupRef = useRef<NavGroupKey | null>(null);

  const navPrefetchProps = (section: Section) => ({
    onMouseEnter: () => onNavPrefetch?.(section),
    onFocus: () => onNavPrefetch?.(section),
    onTouchStart: () => onNavPrefetch?.(section),
  });

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
  const primaryNavLabel = labels.primaryNavigation;
  const secondaryNavLabel = labels.groupedNavigation;
  const immersiveMenuLabel = labels.sectionsMenu;
  const immersiveMenuHint = labels.sectionsMenuHint;
  const utilityStripLabel = labels.quickAccess;

  const sectionLabel = orderLabels[currentSection];
  const totalNavCount = primaryNavItems.length + groupedNavItems.reduce((total, group) => total + group.items.length, 0);

  const activeDesktopGroup = useMemo(
    () => resolveNavGroupForSection(currentSection, groupedNavItems),
    [currentSection]
  );

  const openDesktopGroupData = useMemo(
    () => groupedNavItems.find((group) => group.key === openDesktopGroup) ?? null,
    [openDesktopGroup]
  );

  const activeIndicatorTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 32 };
  const boundedHoverMotion = prefersReducedMotion ? {} : { y: -2 };
  const boundedTapMotion = prefersReducedMotion ? {} : { scale: 0.985 };
  const boundedSubmenuTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };
  const closeDesktopSubmenu = useCallback(() => {
    focusOpenedGroupRef.current = null;
    setOpenDesktopGroup(null);
  }, []);

  const handleDesktopGroupToggle = useCallback((groupKey: NavGroupKey) => {
    focusOpenedGroupRef.current = null;
    setOpenDesktopGroup(groupKey);
  }, []);

  const handleDesktopGroupFocus = useCallback((groupKey: NavGroupKey) => {
    focusOpenedGroupRef.current = groupKey;
    setOpenDesktopGroup(groupKey);
  }, []);

  const handleDesktopGroupHover = useCallback((groupKey: NavGroupKey) => {
    focusOpenedGroupRef.current = null;
    setOpenDesktopGroup(groupKey);
  }, []);

  const handleDesktopSubmenuBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }

    setOpenDesktopGroup(null);
  }, []);

  const handleDesktopSubmenuMouseLeave = useCallback(() => {
    if (desktopSubmenuRef.current?.contains(document.activeElement)) {
      return;
    }

    setOpenDesktopGroup(null);
  }, []);

  useEffect(() => {
    if (!openDesktopGroup) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDesktopGroup(null);
        desktopTriggerRefs.current[openDesktopGroup]?.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [openDesktopGroup]);

  useEffect(() => {
    if (!openDesktopGroup) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (target instanceof Node && desktopSubmenuRef.current?.contains(target)) {
        return;
      }

      closeDesktopSubmenu();
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown);
    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, [closeDesktopSubmenu, openDesktopGroup]);

  useEffect(() => {
    setOpenDesktopGroup(null);
  }, [currentSection]);

  const groupLabels = {
    core: labels.navCore,
    guild: labels.navGuild,
    command: labels.navCommand,
    tools: labels.navTools,
  } as const;

  const headerProps = stylex.props(shellStyles.header, headerCompact && shellStyles.headerCompact);
  const headerPanelProps = stylex.props(shellStyles.headerPanel, headerCompact && shellStyles.headerPanelCompact);
  const headerOathProps = stylex.props(shellStyles.headerOath, headerCompact && shellStyles.headerOathCompact);

  return (
    <header {...headerProps}>
      <div {...headerPanelProps}>
        <div {...stylex.props(shellStyles.headerTop)}>
          <Link href="/" {...stylex.props(shellStyles.brandBlock)}>
            <div {...stylex.props(shellStyles.brandSealWrap)}>
              <div {...stylex.props(shellStyles.sealRing, headerCompact && shellStyles.compactSeal)}>
                <div {...stylex.props(shellStyles.sealCore)}>
                  <WuxiaIcon name="skull" className="w-5 h-5 text-white" />
                </div>
              </div>
              <div {...stylex.props(shellStyles.brandStatusDot)} />
            </div>
            <div {...stylex.props(shellStyles.brandTextWrap)}>
              <h1 {...stylex.props(shellStyles.brandTitle, shellStyles.brandTitleGlow)}>
                Silent Moonfall
              </h1>
              <p {...stylex.props(shellStyles.brandSubtitle)}>{labels.brandSubtitle}</p>
              <div {...headerOathProps}>
                <span {...stylex.props(shellStyles.tag, shellStyles.tagCompact)}>
                  <WuxiaIcon name="eye" className="w-4 h-4" />
                  <span {...stylex.props(shellStyles.tagText)}>{portalCopy[language].oath}</span>
                </span>
                <span {...stylex.props(shellStyles.tag, shellStyles.tagCompact)}>
                  <WuxiaIcon name="seal" className="w-4 h-4" />
                  <span {...stylex.props(shellStyles.tagText)}>{labels.activeSection}: {sectionLabel}</span>
                </span>
              </div>
              <div {...stylex.props(shellStyles.mobileSectionTag)}>
                <span {...stylex.props(shellStyles.tag, shellStyles.tagCompact)}>
                  <WuxiaIcon name="seal" className="w-4 h-4" />
                  <span {...stylex.props(shellStyles.tagText)}>{sectionLabel}</span>
                </span>
              </div>
            </div>
          </Link>

          <div
            aria-hidden="true"
            {...stylex.props(
              shellStyles.desktopSectionSignal,
              headerCompact && shellStyles.desktopSectionSignalCompact
            )}
          >
            <span {...stylex.props(shellStyles.desktopSectionSignalKicker)}>{labels.activeSection}</span>
            <strong {...stylex.props(shellStyles.desktopSectionSignalValue)}>{sectionLabel}</strong>
            <div {...stylex.props(shellStyles.desktopSectionSignalMeta)}>
              <span {...stylex.props(shellStyles.desktopSectionSignalStat)}>
                <span {...stylex.props(shellStyles.desktopSectionSignalStatLabel)}>{primaryNavLabel}</span>
                <span {...stylex.props(shellStyles.desktopSectionSignalStatValue)}>{String(totalNavCount).padStart(2, '0')}</span>
              </span>
              <span {...stylex.props(shellStyles.desktopSectionSignalDivider)} />
              <span {...stylex.props(shellStyles.desktopSectionSignalStat)}>
                <span {...stylex.props(shellStyles.desktopSectionSignalStatLabel)}>{secondaryNavLabel}</span>
                <span {...stylex.props(shellStyles.desktopSectionSignalStatValue)}>{String(totalNavCount).padStart(2, '0')}</span>
              </span>
            </div>
          </div>

          <div {...stylex.props(shellStyles.toolbarShell)}>
            <div {...stylex.props(shellStyles.utilityPanel, headerCompact && shellStyles.utilityPanelCompact)}>
              <div {...stylex.props(shellStyles.utilityMeta)}>
                <span {...stylex.props(shellStyles.utilityKicker)}>{utilityStripLabel}</span>
                <span {...stylex.props(shellStyles.utilityCurrent)}>{labels.activeSection}: {sectionLabel}</span>
              </div>
              <div {...stylex.props(shellStyles.toolbar, headerCompact && shellStyles.toolbarCompact)}>
                <div {...stylex.props(shellStyles.toolbarCluster, shellStyles.toolbarClusterAdaptive)}>
                  <ThemeModeSwitch language={language} />
                  <select
                    id="langSwitch"
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value as Language)}
                    aria-label={labels.languageSwitcher}
                    {...stylex.props(shellStyles.select)}
                  >
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                    <option value="zh">简体中文</option>
                  </select>
                </div>

                <div {...stylex.props(shellStyles.toolbarCluster)}>
                  <Link
                    href="/calendar"
                    {...stylex.props(shellStyles.iconButton)}
                    title={labels.notifications}
                    aria-label={labels.notifications}
                  >
                    <WuxiaIcon name="calendarCheck" className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/profile"
                    {...stylex.props(shellStyles.iconButton, currentSection === 'profile' && shellStyles.iconButtonActive)}
                    title={labels.profile}
                    aria-label={labels.profile}
                  >
                    <WuxiaIcon name="profile" className="w-5 h-5" />
                  </Link>

                  <button
                    type="button"
                    onClick={onRefresh}
                    {...stylex.props(shellStyles.iconButton)}
                    title={labels.refresh}
                    aria-label={labels.refresh}
                  >
                    <WuxiaIcon name="refresh" className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={onLogout}
                    {...stylex.props(shellStyles.iconButton, shellStyles.iconButtonAccent)}
                    title={labels.logout}
                    aria-label={labels.logout}
                  >
                    <WuxiaIcon name="logout" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav data-testid="nav-horizontal" {...stylex.props(shellStyles.desktopNav)} aria-label={primaryNavLabel}>
          <div {...stylex.props(shellStyles.navShell, shellStyles.navShellEnhanced)}>
            <div {...stylex.props(shellStyles.navHeadRow)}>
              <div {...stylex.props(shellStyles.coreRailShell)}>
                <div {...stylex.props(shellStyles.navMetaBand)}>
                  <div {...stylex.props(shellStyles.navSectionMeta)}>
                    <span {...stylex.props(shellStyles.navSectionKicker)}>{primaryNavLabel}</span>
                    <span {...stylex.props(shellStyles.navSectionHint)}>{portalCopy[language].oath}</span>
                  </div>
                  <span {...stylex.props(shellStyles.navCurrentChip)}>{sectionLabel}</span>
                </div>
                <LayoutGroup id="desktop-core-nav">
                  <div {...stylex.props(shellStyles.coreRail, headerCompact && shellStyles.coreRailCompact)}>
                    {primaryNavItems.map((item, index) => {
                      const isActive = currentSection === item.section;

                      return (
                        <motion.div
                          key={item.section}
                          layout={!prefersReducedMotion}
                          whileHover={boundedHoverMotion}
                          whileTap={boundedTapMotion}
                          transition={activeIndicatorTransition}
                        >
                          <Link
                            href={item.href}
                            {...navPrefetchProps(item.section)}
                            {...stylex.props(
                              shellStyles.navLinkBase,
                              shellStyles.coreRailLink,
                              headerCompact && shellStyles.coreRailLinkCompact,
                              !isActive && shellStyles.navLinkInactive
                            )}
                            aria-label={orderLabels[item.section]}
                            aria-current={isActive ? 'page' : undefined}
                            title={orderLabels[item.section]}
                            onClick={closeDesktopSubmenu}
                          >
                            {isActive ? (
                              <motion.span
                                layoutId="desktop-core-active"
                                {...stylex.props(shellStyles.navActiveIndicator)}
                                transition={activeIndicatorTransition}
                              />
                            ) : null}
                            <span {...stylex.props(shellStyles.navLinkContent, shellStyles.coreLinkContent)}>
                              <span {...stylex.props(shellStyles.coreLinkMeta)}>
                                <span {...stylex.props(shellStyles.coreLinkIndex)}>{String(index + 1).padStart(2, '0')}</span>
                                <span {...stylex.props(shellStyles.orderDot)}>
                                  <WuxiaIcon name={item.icon} className="w-4 h-4" />
                                </span>
                              </span>
                              <span {...stylex.props(shellStyles.orderLabel, shellStyles.coreOrderLabel)}>{orderLabels[item.section]}</span>
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </LayoutGroup>
              </div>

              <div {...stylex.props(shellStyles.desktopMenuWrap)}>
                <div
                  ref={desktopSubmenuRef}
                  onBlur={handleDesktopSubmenuBlur}
                  onMouseLeave={handleDesktopSubmenuMouseLeave}
                  {...stylex.props(shellStyles.desktopSubmenuShell)}
                >
                  <div {...stylex.props(shellStyles.navSectionMeta, shellStyles.navSectionMetaCompact)}>
                    <span {...stylex.props(shellStyles.navSectionKicker)}>{secondaryNavLabel}</span>
                    <span {...stylex.props(shellStyles.navSectionHint)}>{immersiveMenuHint}</span>
                  </div>

                  <div {...stylex.props(shellStyles.groupTriggerRail)} role="group" aria-label={immersiveMenuLabel}>
                    {groupedNavItems.map((group) => {
                      const isOpen = openDesktopGroup === group.key;
                      const isCurrentGroup = activeDesktopGroup?.key === group.key;
                      const groupStatusLabel = isCurrentGroup ? sectionLabel : orderLabels[group.sections[0]];

                      return (
                        <button
                          key={group.key}
                          ref={(node) => {
                            desktopTriggerRefs.current[group.key] = node;
                          }}
                          type="button"
                          onClick={() => handleDesktopGroupToggle(group.key)}
                          onFocus={() => handleDesktopGroupFocus(group.key)}
                          onMouseEnter={() => handleDesktopGroupHover(group.key)}
                          aria-expanded={isOpen}
                          aria-controls={`desktop-group-panel-${group.key}`}
                          aria-label={groupLabels[group.key]}
                          title={groupLabels[group.key]}
                          {...stylex.props(
                            shellStyles.groupTrigger,
                            isCurrentGroup && shellStyles.groupTriggerCurrent,
                            isOpen && shellStyles.groupTriggerOpen
                          )}
                        >
                          <span {...stylex.props(shellStyles.groupTriggerContent)}>
                            <span {...stylex.props(shellStyles.groupTriggerLabel)}>{groupLabels[group.key]}</span>
                            <span {...stylex.props(shellStyles.groupTriggerHint)}>{groupStatusLabel}</span>
                          </span>
                          <span {...stylex.props(shellStyles.groupTriggerCount)}>{String(group.items.length).padStart(2, '0')}</span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence initial={false}>
                    {openDesktopGroupData ? (
                      <motion.section
                        key={openDesktopGroupData.key}
                        id={`desktop-group-panel-${openDesktopGroupData.key}`}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={boundedSubmenuTransition}
                        {...stylex.props(shellStyles.desktopSubmenuPanel)}
                        aria-label={`${secondaryNavLabel}: ${groupLabels[openDesktopGroupData.key]}`}
                      >
                        <div {...stylex.props(shellStyles.desktopSubmenuPanelHeader)}>
                          <div {...stylex.props(shellStyles.desktopSubmenuPanelCopy)}>
                            <span {...stylex.props(shellStyles.desktopSubmenuPanelTitle)}>{groupLabels[openDesktopGroupData.key]}</span>
                            <span {...stylex.props(shellStyles.desktopSubmenuPanelHint)}>{immersiveMenuHint}</span>
                          </div>
                          <span {...stylex.props(shellStyles.desktopSubmenuPanelCount)}>
                            {String(openDesktopGroupData.items.length).padStart(2, '0')}
                          </span>
                        </div>

                        <LayoutGroup id={`desktop-${openDesktopGroupData.key}-nav`}>
                          <div {...stylex.props(shellStyles.desktopSubmenuList)}>
                            {openDesktopGroupData.items.map((item) => {
                              const isActive = currentSection === item.section;

                              return (
                                <motion.div
                                  key={item.section}
                                  layout={!prefersReducedMotion}
                                  whileHover={boundedHoverMotion}
                                  whileTap={boundedTapMotion}
                                  transition={activeIndicatorTransition}
                                >
                                  <Link
                                    href={item.href}
                                    {...navPrefetchProps(item.section)}
                                    {...stylex.props(
                                      shellStyles.navLinkBase,
                                      shellStyles.desktopSubmenuLink,
                                      !isActive && shellStyles.navLinkInactive
                                    )}
                                    aria-label={orderLabels[item.section]}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={orderLabels[item.section]}
                                    onClick={closeDesktopSubmenu}
                                  >
                                    {isActive ? (
                                      <motion.span
                                        layoutId="desktop-submenu-active"
                                        {...stylex.props(shellStyles.navActiveIndicator)}
                                        transition={activeIndicatorTransition}
                                      />
                                    ) : null}
                                    <span {...stylex.props(shellStyles.navLinkContent, shellStyles.commandLinkContent)}>
                                      <span {...stylex.props(shellStyles.orderDot)}>
                                        <WuxiaIcon name={item.icon} className="w-4 h-4" />
                                      </span>
                                      <span {...stylex.props(shellStyles.orderLabel)}>{orderLabels[item.section]}</span>
                                    </span>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </LayoutGroup>
                      </motion.section>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
