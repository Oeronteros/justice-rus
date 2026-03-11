'use client';

import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
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
    <div className="relative z-30">
      <div className={`transition-transform duration-300 ${isHeaderHidden ? '-translate-y-full' : ''}`}>
        <Header
          currentSection={currentSection}
          onLogout={onLogout}
          language={language}
          onLanguageChange={handleLanguageChange}
          onNavPrefetch={handleNavPrefetch}
        />
      </div>
      <main id="portal-main" className={`min-h-screen pb-24 md:pb-0 ${isHeaderHidden ? '-mt-[var(--header-height,80px)]' : ''}`}>
        <div className="mx-auto max-w-[1280px] px-3 sm:px-5 lg:px-8 pt-4 sm:pt-6">
          <div className={`wuxia-section wuxia-section-${currentSection} rounded-2xl overflow-hidden`}> 
            {children}
          </div>
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
