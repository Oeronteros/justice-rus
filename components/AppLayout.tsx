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
      <section className="wuxia-hero">
        <div className="wuxia-hero-grid">
          <div className="space-y-4">
            <span className="wuxia-tag">
              <i className="fas fa-circle-notch"></i>
              Клятва ордена Demonic Cult
            </span>
            <h2 className="text-3xl sm:text-4xl font-orbitron text-[#f2e6d2]">
              Тайное братство Justice Mobile: школа дуэлей, рейдов и власти над тенью.
            </h2>
            <p className="text-[#d6c4a5] max-w-2xl">
              Мы не просто гильдия. Мы дисциплина, ритуал и сила. Здесь рождаются командиры рейдов,
              мастера клинка и хранители закона крови. Вступив, ты получаешь путь, знак и круг,
              который держит слово крепче стали.
            </p>
            <div className="wuxia-rituals">
              <div className="wuxia-ritual">
                <span className="wuxia-ritual-title">Обряд входа</span>
                Проверка клинка, духа и верности.
              </div>
              <div className="wuxia-ritual">
                <span className="wuxia-ritual-title">Кодекс крови</span>
                Тишина, дисциплина, победа.
              </div>
              <div className="wuxia-ritual">
                <span className="wuxia-ritual-title">Печать ордена</span>
                Знак, что знают даже враги.
              </div>
            </div>
          </div>
          <div className="wuxia-crest">
            <div className="wuxia-crest-frame">
              <img
                src="/emblem.svg"
                alt="Demonic Cult Sigil"
                className="w-36 h-36 opacity-90 wuxia-emblem drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)]"
              />
            </div>
            <div className="wuxia-crest-caption">Demonic Cult</div>
            <div className="wuxia-crest-sub">Justice Mobile • Wuxia Order</div>
          </div>
          <div className="wuxia-pillars">
            <div className="wuxia-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d6b36a]">Ступень I</div>
              <div className="mt-2 font-semibold">Посвящение и дисциплина</div>
            </div>
            <div className="wuxia-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d6b36a]">Ступень II</div>
              <div className="mt-2 font-semibold">Школа дуэлей и контроля</div>
            </div>
            <div className="wuxia-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d6b36a]">Ступень III</div>
              <div className="mt-2 font-semibold">Охота за легендами</div>
            </div>
            <div className="wuxia-pillar">
              <div className="text-xs uppercase tracking-widest text-[#d6b36a]">Ступень IV</div>
              <div className="mt-2 font-semibold">Венчание рейдов и титулов</div>
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
