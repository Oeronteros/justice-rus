'use client';

import Link from 'next/link';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useLanguage } from '@/lib/i18n/context';
import { portalCopy } from '@/lib/i18n';
import RulesBlock from '@/components/sections/about/RulesBlock';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <>
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
              <h2 className="text-3xl sm:text-4xl font-orbitron dc-text">{portalCopy[language].heroTitle}</h2>
              <p className="dc-muted max-w-2xl">{portalCopy[language].heroSubtitle}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/schedule" className="btn-primary">
                  {portalCopy[language].heroCtaPrimary}
                </Link>
                <Link href="/guides" className="btn-secondary">
                  {portalCopy[language].heroCtaSecondary}
                </Link>
              </div>

              <details className="dc-details">
                <summary className="dc-summary">{portalCopy[language].heroManifestoTitle}</summary>
                <p className="dc-muted mt-3 leading-relaxed">{portalCopy[language].heroManifestoBody}</p>
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
                  alt="Cult Emblem"
                  className="w-36 h-36 opacity-90 wuxia-emblem drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)]"
                />
              </div>
              <div className="wuxia-crest-caption">Cult</div>
              <div className="wuxia-crest-sub">Game Community • Justice Mobile</div>
            </div>

            <div className="wuxia-pillars wuxia-parallax wuxia-parallax-light">
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень I' : 'Step I'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarOne}</div>
              </div>
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень II' : 'Step II'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarTwo}</div>
              </div>
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень III' : 'Step III'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarThree}</div>
              </div>
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень IV' : 'Step IV'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarFour}</div>
              </div>
            </div>
          </div>

          {/* Блок правил */}
          <RulesBlock language={language} />
        </div>
      </section>
    </>
  );
}
