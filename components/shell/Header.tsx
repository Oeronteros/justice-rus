'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import autoAnimate from '@formkit/auto-animate';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import * as stylex from '@stylexjs/stylex';
import { Section } from '@/types';
import { headerCopy, Language, portalCopy, sectionLabels } from '@/lib/i18n';
import { desktopGroupedNavItems, desktopPrimaryNavItems } from '@/lib/nav';
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
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const desktopDeckRef = useRef<HTMLDivElement | null>(null);

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
  const primaryNavLabel = language === 'ru' ? 'Основная навигация' : language === 'zh' ? '主导航' : 'Primary navigation';
  const secondaryNavLabel = language === 'ru' ? 'Командная навигация' : language === 'zh' ? '指挥导航' : 'Command navigation';
  const immersiveMenuLabel = language === 'ru' ? 'Разделы' : language === 'zh' ? '分区菜单' : 'Sections';
  const immersiveMenuHint = language === 'ru' ? 'Быстрый переход по всем модулям' : language === 'zh' ? '快速跳转到全部模块' : 'Quick jump across all modules';
  const utilityStripLabel = language === 'ru' ? 'Быстрый доступ' : language === 'zh' ? '快速控制' : 'Quick access';

  const sectionLabel = orderLabels[currentSection];
  const groupedRouteCount = desktopGroupedNavItems.reduce((total, group) => total + group.items.length, 0);

  useEffect(() => {
    if (!desktopDeckRef.current) return;
    autoAnimate(desktopDeckRef.current, { duration: 220, easing: 'ease-out' });
  }, [isDesktopMenuOpen]);


  useEffect(() => {
    if (!isDesktopMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDesktopMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isDesktopMenuOpen]);

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

          <div {...stylex.props(shellStyles.toolbarShell)}>
            <div {...stylex.props(shellStyles.utilityPanel, headerCompact && shellStyles.utilityPanelCompact)}>
              <div {...stylex.props(shellStyles.utilityMeta)}>
                <span {...stylex.props(shellStyles.utilityKicker)}>{utilityStripLabel}</span>
                <span {...stylex.props(shellStyles.utilityCurrent)}>{labels.activeSection}: {sectionLabel}</span>
              </div>
              <div {...stylex.props(shellStyles.toolbar, headerCompact && shellStyles.toolbarCompact)}>
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

        <nav {...stylex.props(shellStyles.desktopNav)} aria-label={primaryNavLabel}>
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
                    {desktopPrimaryNavItems.map((item, index) => {
                      const isActive = currentSection === item.section;

                      return (
                        <motion.div key={item.section} layout whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }}>
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
                            onClick={() => setIsDesktopMenuOpen(false)}
                          >
                            {isActive ? <motion.span layoutId="desktop-core-active" {...stylex.props(shellStyles.navActiveIndicator)} transition={{ type: 'spring', stiffness: 500, damping: 34 }} /> : null}
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
                <div {...stylex.props(shellStyles.navSectionMeta, shellStyles.navSectionMetaCompact)}>
                  <span {...stylex.props(shellStyles.navSectionKicker)}>{secondaryNavLabel}</span>
                  <span {...stylex.props(shellStyles.navSectionHint)}>{immersiveMenuHint}</span>
                </div>

              <button
                type="button"
                onClick={() => setIsDesktopMenuOpen((current) => !current)}
                aria-expanded={isDesktopMenuOpen}
                aria-controls="desktop-immersive-menu"
                aria-label={immersiveMenuLabel}
                title={immersiveMenuLabel}
                {...stylex.props(shellStyles.desktopMenuButton, isDesktopMenuOpen && shellStyles.desktopMenuButtonActive)}
              >
                <span {...stylex.props(shellStyles.desktopMenuGlyph)}>
                  <WuxiaIcon name="dots" className="w-5 h-5" />
                </span>
                <span {...stylex.props(shellStyles.desktopMenuCopy)}>
                  <span {...stylex.props(shellStyles.desktopMenuLabel)}>{immersiveMenuLabel}</span>
                  <span {...stylex.props(shellStyles.desktopMenuValue)}>{String(groupedRouteCount).padStart(2, '0')}</span>
                </span>
              </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {isDesktopMenuOpen ? (
                <motion.section
                  id="desktop-immersive-menu"
                  initial={{ opacity: 0, y: -10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  {...stylex.props(shellStyles.immersivePanel)}
                  aria-label={secondaryNavLabel}
                >
                  <div {...stylex.props(shellStyles.immersivePanelHeader)}>
                    <span {...stylex.props(shellStyles.immersivePanelTitle)}>{secondaryNavLabel}</span>
                    <span {...stylex.props(shellStyles.immersivePanelHint)}>{immersiveMenuHint}</span>
                  </div>

                  <div {...stylex.props(shellStyles.commandDeck)} ref={desktopDeckRef}>
                    {desktopGroupedNavItems.map((group) => (
                      <section key={group.key} {...stylex.props(shellStyles.commandGroup)}>
                        <div {...stylex.props(shellStyles.groupLabel)}>{groupLabels[group.key]}</div>
                        <LayoutGroup id={`desktop-${group.key}-nav`}>
                          <div {...stylex.props(shellStyles.groupItems)}>
                            {group.items.map((item) => {
                              const isActive = currentSection === item.section;

                              return (
                                <motion.div key={item.section} layout whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }}>
                                  <Link
                                    href={item.href}
                                    {...navPrefetchProps(item.section)}
                                    {...stylex.props(shellStyles.navLinkBase, !isActive && shellStyles.navLinkInactive)}
                                    aria-label={orderLabels[item.section]}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={orderLabels[item.section]}
                                    onClick={() => setIsDesktopMenuOpen(false)}
                                  >
                                    {isActive ? <motion.span layoutId="desktop-command-active" {...stylex.props(shellStyles.navActiveIndicator)} transition={{ type: 'spring', stiffness: 500, damping: 34 }} /> : null}
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
                      </section>
                    ))}
                  </div>
                </motion.section>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </header>
  );
}
