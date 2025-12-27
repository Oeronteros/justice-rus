'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
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
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <section className="occult-manifesto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <span className="occult-tag">
              <i className="fas fa-circle-notch"></i>
              Order Manifest
            </span>
            <h2 className="text-3xl font-orbitron text-[#e8ddc8] mt-4">
              Мы — культ рейдов, дисциплины и абсолютного дамага.
            </h2>
            <p className="text-[#c9b59a] mt-3 max-w-2xl">
              Свод правил прост: держим строй, чтим ритуалы и выжимаем максимум из каждого билда.
              В этом портале — расписание, гайды, состав и доказательства нашей силы.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-[#e3d6c2]">
            <div className="occult-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d7b37a]">Пакт I</div>
              <div className="mt-2 font-semibold">Железная дисциплина</div>
            </div>
            <div className="occult-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d7b37a]">Пакт II</div>
              <div className="mt-2 font-semibold">Знание билдов</div>
            </div>
            <div className="occult-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d7b37a]">Пакт III</div>
              <div className="mt-2 font-semibold">Лояльность культу</div>
            </div>
            <div className="occult-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d7b37a]">Пакт IV</div>
              <div className="mt-2 font-semibold">Удар без промаха</div>
            </div>
          </div>
        </div>
      </section>
      <main className="min-h-screen">{renderSection()}</main>
      <MobileNav
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        language={language}
      />
    </div>
  );
}
