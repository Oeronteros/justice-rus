'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import MobileNav from './MobileNav';
import { User, Section } from '@/types';
import { Language } from '@/lib/i18n';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const pathToSection: Record<string, Section> = {
  '/': 'about',
  '/members': 'registration',
  '/schedule': 'schedule',
  '/news': 'news',
  '/guides': 'guides',
  '/help': 'help',
  '/absences': 'absences',
  '/calculator': 'calculator',
};

export default function MainLayout({ user, onLogout, children }: MainLayoutProps) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>('ru');

  const currentSection = pathToSection[pathname] || 'about';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('guild_portal_lang');
    if (stored === 'ru' || stored === 'en') {
      setLanguage(stored);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('guild_portal_lang', lang);
    }
  };

  return (
    <div className="relative z-30">
      <Header
        currentSection={currentSection}
        onLogout={onLogout}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main id="portal-main" className="min-h-screen pb-20 md:pb-0">
        <div className={`wuxia-section wuxia-section-${currentSection}`}>
          {children}
        </div>
      </main>
      <MobileNav currentSection={currentSection} language={language} />
    </div>
  );
}
