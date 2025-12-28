'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
import AboutSection from './sections/AboutSection';
import RegistrationSection from './sections/RegistrationSection';
import ScheduleSection from './sections/ScheduleSection';
import HelpSection from './sections/HelpSection';
import NewsSection from './sections/NewsSection';
import GuidesSection from './sections/GuidesSection';
import AbsencesSection from './sections/AbsencesSection';
import { User, Section } from '@/types';
import { Language } from '@/lib/i18n';

interface AppLayoutProps {
  user: User;
  onLogout: () => void;
}

export default function AppLayout({ user, onLogout }: AppLayoutProps) {
  const [currentSection, setCurrentSection] = useState<Section>('registration');
  const [language, setLanguage] = useState<Language>('ru');

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

  const jumpTo = (section: Section) => {
    setCurrentSection(section);
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => {
      document.getElementById('portal-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'registration':
        return <RegistrationSection user={user} />;
      case 'schedule':
        return <ScheduleSection user={user} language={language} />;
      case 'about':
        return (
          <AboutSection
            language={language}
            onOpenSchedule={() => jumpTo('schedule')}
            onOpenGuides={() => jumpTo('guides')}
          />
        );
      case 'help':
        return <HelpSection user={user} />;
      case 'news':
        return <NewsSection user={user} />;
      case 'guides':
        return <GuidesSection user={user} />;
      case 'absences':
        return <AbsencesSection user={user} />;
      case 'calculator':
        if (typeof window !== 'undefined') {
          window.location.href = '/calculator';
          return null;
        }
        return null;
      default:
        return <RegistrationSection user={user} />;
    }
  };

  return (
    <div className="relative z-30">
      <Header
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onLogout={onLogout}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main id="portal-main" className="min-h-screen">
        <div
          key={currentSection}
          className={`wuxia-section wuxia-section-${currentSection}`}
        >
          {renderSection()}
        </div>
      </main>
      <MobileNav
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        language={language}
      />
    </div>
  );
}
