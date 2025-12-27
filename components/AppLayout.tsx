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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const maxTilt = 6;
    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * -2;
        root.style.setProperty('--tilt-x', `${(y * maxTilt).toFixed(2)}deg`);
        root.style.setProperty('--tilt-y', `${(x * maxTilt).toFixed(2)}deg`);
        frame = 0;
      });
    };

    const handleLeave = () => {
      root.style.setProperty('--tilt-x', '0deg');
      root.style.setProperty('--tilt-y', '0deg');
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
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
        <div className="wuxia-ornament orb-a wuxia-parallax wuxia-parallax-deep"></div>
        <div className="wuxia-ornament orb-b wuxia-parallax wuxia-parallax-light"></div>
        <div className="wuxia-ornament ribbon wuxia-parallax wuxia-parallax-mid"></div>
        <div className="wuxia-hero-grid">
          <div className="space-y-4 wuxia-parallax wuxia-parallax-text">
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
          <div className="wuxia-crest wuxia-parallax wuxia-parallax-mid">
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
          <div className="wuxia-pillars wuxia-parallax wuxia-parallax-light">
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
      <main className="min-h-screen">
        <div key={currentSection} className="wuxia-section">
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
