'use client';

import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Header from './Header';
import MobileNav from './MobileNav';
import { HeaderProvider, useHeader } from '@/lib/ui/headerContext';
import { usePrefetchAbsences } from '@/lib/absences/hooks';
import { usePrefetchGuides } from '@/lib/guides/hooks';
import { usePrefetchNews } from '@/lib/news/hooks';
import { usePrefetchRegistrations } from '@/lib/registration/hooks';
import { usePrefetchSchedule } from '@/lib/schedule/hooks';
import type { User } from '@/lib/schemas/auth';
import { Section } from '@/types';
import { useLanguage } from '@/lib/i18n/context';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const pathToSection: Record<string, Section> = {
  '/': 'about',
  '/members': 'registration',
  '/schedule': 'schedule',
  '/calendar': 'calendar',
  '/analytics': 'analytics',
  '/workflow': 'workflow',
  '/integrations': 'integrations',
  '/integrations/discord': 'integrations',
  '/integrations/google-sheets': 'integrations',
  '/integrations/wow': 'integrations',
  '/pvp': 'pvp',
  '/news': 'news',
  '/guides': 'guides',
  '/help': 'help',
  '/absences': 'absences',
  '/calculator': 'calculator',
  '/profile': 'profile',
};

function MainLayoutContent({ user, onLogout, children }: MainLayoutProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { language, setLanguage } = useLanguage();
  const { isHeaderHidden } = useHeader();
  const prefetchNews = usePrefetchNews();
  const prefetchRegistrations = usePrefetchRegistrations();
  const prefetchSchedule = usePrefetchSchedule();
  const prefetchGuides = usePrefetchGuides();
  const prefetchAbsences = usePrefetchAbsences();

  const currentSection = useMemo(() => pathToSection[pathname] || 'about', [pathname]);

  const handleLanguageChange = setLanguage;
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

  return (
    <div className="relative z-30 overflow-x-clip">
      <div className={`transition-transform duration-300 ${isHeaderHidden ? '-translate-y-full' : ''}`}>
        <Header
          currentSection={currentSection}
          onLogout={onLogout}
          language={language}
          onLanguageChange={handleLanguageChange}
          onNavPrefetch={handleNavPrefetch}
        />
      </div>
      <main id="portal-main" className={`min-h-screen pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-0 ${isHeaderHidden ? '-mt-[var(--header-height,80px)]' : ''}`}>
        <div className="mx-auto max-w-[1280px] overflow-x-clip px-3 sm:px-5 lg:px-8 pt-4 sm:pt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              className={`wuxia-section wuxia-section-${currentSection} dc-page-shell rounded-2xl overflow-hidden`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.992 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.996 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <div className={`transition-transform duration-300 ${isHeaderHidden ? 'translate-y-full' : ''}`}>
        <MobileNav currentSection={currentSection} language={language} onNavPrefetch={handleNavPrefetch} />
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
