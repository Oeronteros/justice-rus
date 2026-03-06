'use client';

import Link from 'next/link';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useLanguage } from '@/lib/i18n/context';
import { portalCopy, sectionLabels } from '@/lib/i18n';
import RulesBlock from '@/components/sections/about/RulesBlock';

export default function AboutPage() {
  const { language } = useLanguage();

  const commandCards = [
    {
      href: '/schedule',
      section: 'schedule' as const,
      title:
        language === 'ru'
          ? 'План на сегодня'
          : language === 'zh'
            ? '今日安排'
            : 'Today Plan',
      body:
        language === 'ru'
          ? 'Сразу видно следующее событие и окно для сбора.'
          : language === 'zh'
            ? '快速看到下一场活动和集结窗口。'
            : 'See the next event and the best rally window instantly.',
    },
    {
      href: '/guides',
      section: 'guides' as const,
      title:
        language === 'ru'
          ? 'База знаний'
          : language === 'zh'
            ? '知识库'
            : 'Knowledge Base',
      body:
        language === 'ru'
          ? 'Открывай сводки по билдам и загружай markdown из Obsidian.'
          : language === 'zh'
            ? '查看配装攻略，并可从 Obsidian 导入 Markdown。'
            : 'Open build guides and import markdown directly from Obsidian.',
    },
    {
      href: '/help',
      section: 'help' as const,
      title:
        language === 'ru'
          ? 'Боевой саппорт'
          : language === 'zh'
            ? '战斗支援'
            : 'Combat Support',
      body:
        language === 'ru'
          ? 'Оставляй запрос и отслеживай статус ответа офицеров.'
          : language === 'zh'
            ? '创建求助并追踪军官的处理状态。'
            : 'Open support requests and track officer response status.',
    },
    {
      href: '/members',
      section: 'registration' as const,
      title:
        language === 'ru'
          ? 'Состав гильдии'
          : language === 'zh'
            ? '公会成员'
            : 'Guild Roster',
      body:
        language === 'ru'
          ? 'Проверяй состав, роли и готовность рейд-пачек.'
          : language === 'zh'
            ? '查看成员、职责与团队就绪度。'
            : 'Check roster, roles, and raid readiness in one place.',
    },
  ];

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
                  alt="Silent Moonfall Emblem"
                  className="w-36 h-36 opacity-90 wuxia-emblem drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)]"
                />
              </div>
              <div className="wuxia-crest-caption">Silent Moonfall</div>
              <div className="wuxia-crest-sub">Guild • Justice Mobile</div>
            </div>

            <div className="wuxia-pillars wuxia-parallax wuxia-parallax-light">
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень I' : language === 'zh' ? '阶段 I' : 'Step I'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarOne}</div>
              </div>
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень II' : language === 'zh' ? '阶段 II' : 'Step II'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarTwo}</div>
              </div>
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень III' : language === 'zh' ? '阶段 III' : 'Step III'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarThree}</div>
              </div>
              <div className="wuxia-pillar">
                <div className="text-xs uppercase tracking-widest dc-accent">
                  {language === 'ru' ? 'Ступень IV' : language === 'zh' ? '阶段 IV' : 'Step IV'}
                </div>
                <div className="mt-2 font-semibold">{portalCopy[language].pillarFour}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {commandCards.map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                className="card p-5 group"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="text-xs uppercase tracking-widest text-[#9cc3d7] mb-2">
                  {sectionLabels[language][card.section]}
                </div>
                <div className="text-xl font-orbitron text-[#e6eff5] mb-2 group-hover:text-[#cde5f3] transition-colors">
                  {card.title}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{card.body}</p>
                <div className="mt-4 text-sm text-[#8fb9cc] inline-flex items-center gap-2">
                  <span>{language === 'ru' ? 'Открыть' : language === 'zh' ? '打开' : 'Open'}</span>
                  <WuxiaIcon name="link" className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* Блок правил */}
          <RulesBlock language={language} />
        </div>
      </section>
    </>
  );
}
