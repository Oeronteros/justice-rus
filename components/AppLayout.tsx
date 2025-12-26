'use client';

import { useState } from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
import RegistrationSection from './sections/RegistrationSection';
import ScheduleSection from './sections/ScheduleSection';
import HelpSection from './sections/HelpSection';
import NewsSection from './sections/NewsSection';
import GuidesSection from './sections/GuidesSection';
import AbsencesSection from './sections/AbsencesSection';
import { User, Section } from '@/types';

interface AppLayoutProps {
  user: User;
  onLogout: () => void;
}

export default function AppLayout({ user, onLogout }: AppLayoutProps) {
  const [currentSection, setCurrentSection] = useState<Section>('registration');

  const renderSection = () => {
    switch (currentSection) {
      case 'registration':
        return <RegistrationSection user={user} />;
      case 'schedule':
        return <ScheduleSection user={user} />;
      case 'help':
        return <HelpSection user={user} />;
      case 'news':
        return <NewsSection user={user} />;
      case 'guides':
        return <GuidesSection user={user} />;
      case 'absences':
        return <AbsencesSection user={user} />;
      case 'calculator':
        // Рендерим калькулятор напрямую, так как он в app router
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
      />
      <main className="min-h-screen">{renderSection()}</main>
      <MobileNav
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
    </div>
  );
}

