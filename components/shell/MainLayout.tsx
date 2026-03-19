'use client';

import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as stylex from '@stylexjs/stylex';
import Header from './Header';
import MobileNav from './MobileNav';
import { HeaderProvider, useHeaderVisibility } from '@/lib/ui/headerContext';
import { usePrefetchAbsences } from '@/lib/absences/hooks';
import { usePrefetchGuides } from '@/lib/guides/hooks';
import { usePrefetchNews } from '@/lib/news/hooks';
import { usePrefetchRegistrations } from '@/lib/registration/hooks';
import { usePrefetchSchedule } from '@/lib/schedule/hooks';
import type { User } from '@/lib/schemas/auth';
import { resolveSectionFromPath } from '@/lib/nav';
import { Section } from '@/types';
import type { Language } from '@/lib/i18n';
import { useLanguage } from '@/lib/i18n/context';
import { shellStyles } from './Shell.stylex';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

interface ShellNavigationContract {
  currentSection: Section;
  onNavPrefetch: (section: Section) => void;
}

interface ShellSessionContract {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onRefresh: () => void;
  onLogout: () => void;
}

function resolvePageShellTone(section: Section) {
  switch (section) {
    case 'registration':
      return shellStyles.pageShellRegistration;
    case 'schedule':
      return shellStyles.pageShellSchedule;
    case 'calendar':
      return shellStyles.pageShellCalendar;
    case 'analytics':
      return shellStyles.pageShellAnalytics;
    case 'workflow':
      return shellStyles.pageShellWorkflow;
    case 'integrations':
      return shellStyles.pageShellIntegrations;
    case 'pvp':
      return shellStyles.pageShellPvp;
    case 'guides':
      return shellStyles.pageShellGuides;
    case 'help':
      return shellStyles.pageShellHelp;
    case 'absences':
      return shellStyles.pageShellAbsences;
    case 'news':
      return shellStyles.pageShellNews;
    case 'calculator':
      return shellStyles.pageShellCalculator;
    case 'profile':
      return shellStyles.pageShellProfile;
    case 'about':
    default:
      return shellStyles.pageShellAbout;
  }
}

function MainLayoutContent({ user, onLogout, children }: MainLayoutProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { language, setLanguage } = useLanguage();
  const { isHeaderHidden } = useHeaderVisibility();
  const prefetchNews = usePrefetchNews();
  const prefetchRegistrations = usePrefetchRegistrations();
  const prefetchSchedule = usePrefetchSchedule();
  const prefetchGuides = usePrefetchGuides();
  const prefetchAbsences = usePrefetchAbsences();

  const currentSection = useMemo(() => resolveSectionFromPath(pathname), [pathname]);
  const pageShellTone = useMemo(() => resolvePageShellTone(currentSection), [currentSection]);
  const handleNavPrefetch = useCallback(
    (section: Section) => {
      switch (section) {
        case 'news':
          prefetchNews();
          break;
        case 'registration':
          prefetchRegistrations();
          break;
        case 'schedule':
          prefetchSchedule(language);
          break;
        case 'guides':
          prefetchGuides();
          break;
        case 'absences':
          prefetchAbsences();
          break;
        default:
          break;
      }
    },
    [language, prefetchAbsences, prefetchGuides, prefetchNews, prefetchRegistrations, prefetchSchedule]
  );

  const sessionContract = useMemo<ShellSessionContract>(
    () => ({
      language,
      onLanguageChange: setLanguage,
      onRefresh: () => {
        window.location.reload();
      },
      onLogout,
    }),
    [language, onLogout, setLanguage]
  );

  const navigationContract = useMemo<ShellNavigationContract>(
    () => ({ currentSection, onNavPrefetch: handleNavPrefetch }),
    [currentSection, handleNavPrefetch]
  );

  return (
    <div {...stylex.props(shellStyles.layoutRoot)}>
      <div {...stylex.props(shellStyles.translateTransition, isHeaderHidden && shellStyles.hideTop)}>
        <Header
          currentSection={navigationContract.currentSection}
          onLogout={sessionContract.onLogout}
          onRefresh={sessionContract.onRefresh}
          language={sessionContract.language}
          onLanguageChange={sessionContract.onLanguageChange}
          onNavPrefetch={navigationContract.onNavPrefetch}
        />
      </div>
      <main id="portal-main" {...stylex.props(shellStyles.main, isHeaderHidden && shellStyles.mainShifted)}>
        <div {...stylex.props(shellStyles.mainInner)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              {...stylex.props(shellStyles.pageShell, pageShellTone)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.992 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.996 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <div {...stylex.props(shellStyles.pageShellContent)}>{children}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <div {...stylex.props(shellStyles.translateTransition, isHeaderHidden && shellStyles.hideBottom)}>
        <MobileNav
          currentSection={navigationContract.currentSection}
          language={sessionContract.language}
          onNavPrefetch={navigationContract.onNavPrefetch}
        />
      </div>
    </div>
  );
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <HeaderProvider>
      <MainLayoutContent {...props} />
    </HeaderProvider>
  );
}
