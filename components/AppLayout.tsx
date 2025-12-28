'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
import WuxiaIcon from './WuxiaIcons';
import RegistrationSection from './sections/RegistrationSection';
import ScheduleSection from './sections/ScheduleSection';
import HelpSection from './sections/HelpSection';
import NewsSection from './sections/NewsSection';
import GuidesSection from './sections/GuidesSection';
import AbsencesSection from './sections/AbsencesSection';
import { User, Section } from '@/types';
import { Language, portalCopy } from '@/lib/i18n';

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
        <div className="wuxia-hero-surface">
          <div className="wuxia-ornament orb-a wuxia-parallax wuxia-parallax-deep"></div>
          <div className="wuxia-ornament orb-b wuxia-parallax wuxia-parallax-light"></div>
          <div className="wuxia-ornament ribbon wuxia-parallax wuxia-parallax-mid"></div>
          <div className="wuxia-hero-grid">
          <div className="space-y-4 wuxia-parallax wuxia-parallax-text">
            <span className="wuxia-tag">
              <WuxiaIcon name="seal" className="w-4 h-4" />
              {portalCopy[language].heroTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-orbitron dc-text">
              {portalCopy[language].heroTitle}
            </h2>
            <p className="dc-muted max-w-2xl">
              {portalCopy[language].heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" className="btn-primary" onClick={() => jumpTo('schedule')}>
                {portalCopy[language].heroCtaPrimary}
              </button>
              <button type="button" className="btn-secondary" onClick={() => jumpTo('guides')}>
                {portalCopy[language].heroCtaSecondary}
              </button>
            </div>

            <details className="dc-details">
              <summary className="dc-summary">{portalCopy[language].heroManifestoTitle}</summary>
              <p className="dc-muted mt-3 leading-relaxed">
                {portalCopy[language].heroManifestoBody}
              </p>
            </details>

            <div className="wuxia-rituals">
              <div className="wuxia-ritual">
                <span className="wuxia-ritual-title">{portalCopy[language].ritualOneTitle}</span>
                {portalCopy[language].ritualOneBody}
              </div>
              <div className="wuxia-ritual">
                <span className="wuxia-ritual-title">{portalCopy[language].ritualTwoTitle}</span>
                {portalCopy[language].ritualTwoBody}
              </div>
              <div className="wuxia-ritual">
                <span className="wuxia-ritual-title">{portalCopy[language].ritualThreeTitle}</span>
                {portalCopy[language].ritualThreeBody}
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
              <div className="text-xs uppercase tracking-widest dc-accent">{language === 'ru' ? 'Ступень I' : 'Step I'}</div>
              <div className="mt-2 font-semibold">{portalCopy[language].pillarOne}</div>
            </div>
            <div className="wuxia-pillar">
              <div className="text-xs uppercase tracking-widest dc-accent">{language === 'ru' ? 'Ступень II' : 'Step II'}</div>
              <div className="mt-2 font-semibold">{portalCopy[language].pillarTwo}</div>
            </div>
            <div className="wuxia-pillar">
              <div className="text-xs uppercase tracking-widest dc-accent">{language === 'ru' ? 'Ступень III' : 'Step III'}</div>
              <div className="mt-2 font-semibold">{portalCopy[language].pillarThree}</div>
            </div>
            <div className="wuxia-pillar">
              <div className="text-xs uppercase tracking-widest dc-accent">{language === 'ru' ? 'Ступень IV' : 'Step IV'}</div>
              <div className="mt-2 font-semibold">{portalCopy[language].pillarFour}</div>
            </div>
          </div>
        </div>
        </div>
      </section>
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
