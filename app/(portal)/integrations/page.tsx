'use client';

import Link from 'next/link';
import { SectionHero } from '@/components/shared/SectionHero';
import WuxiaIcon from '@/components/WuxiaIcons';
import { hasRoleAtLeast } from '@/lib/authz';
import { useUser } from '@/lib/auth/context';
import { useLanguage, type Language } from '@/lib/i18n/context';
import * as stylex from '@stylexjs/stylex';

const integrations = [
  {
    id: 'discord',
    href: '/integrations/discord',
    icon: 'schedule',
    status: 'active',
  },
  {
    id: 'google-sheets',
    href: '/integrations/google-sheets',
    icon: 'schedule',
    status: 'coming-soon',
  },
  {
    id: 'wow',
    href: '/integrations/wow',
    icon: 'schedule',
    status: 'coming-soon',
  },
] as const;

const copy: Record<Language, {
  title: string;
  subtitle: string;
  active: string;
  comingSoon: string;
  descriptions: Record<string, string>;
  configure: string;
}> = {
  ru: {
    title: 'Интеграции',
    subtitle: 'Внешние сервисы и подключения',
    active: 'Активно',
    comingSoon: 'Скоро',
    descriptions: {
      discord: 'Discord бот и уведомления',
      'google-sheets': 'Экспорт в Google Таблицы',
      wow: 'WoW API и сервисы',
    },
    configure: 'Настроить',
  },
  en: {
    title: 'Integrations',
    subtitle: 'External services and connections',
    active: 'Active',
    comingSoon: 'Coming Soon',
    descriptions: {
      discord: 'Discord bot and notifications',
      'google-sheets': 'Export to Google Sheets',
      wow: 'WoW API and services',
    },
    configure: 'Configure',
  },
  zh: {
    title: '集成',
    subtitle: '外部服务和连接',
    active: '活跃',
    comingSoon: '即将推出',
    descriptions: {
      discord: 'Discord 机器人和通知',
      'google-sheets': '导出到 Google 表格',
      wow: 'WoW API 和服务',
    },
    configure: '配置',
  },
};

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, 1fr)',
      '@media (min-width: 1024px)': 'repeat(3, 1fr)',
    },
    gap: '1.5rem',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(42, 60, 76, 0.6)',
    backgroundColor: 'rgba(16, 26, 35, 0.65)',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'block',
  },
  cardHover: {
    ':hover': {
      borderColor: 'rgba(47, 110, 141, 0.5)',
      backgroundColor: 'rgba(16, 26, 35, 0.85)',
    },
  },
  cardDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  cardDisabledHover: {
    ':hover': {
      opacity: 1,
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  iconWrap: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    background: 'linear-gradient(to bottom right, #2d5a3f, #1a3a2f)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '1.5rem',
    height: '1.5rem',
    color: '#e6eff5',
  },
  badge: {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
  },
  badgeActive: {
    backgroundColor: 'rgba(45, 90, 63, 0.3)',
    color: '#6fb98f',
  },
  badgeComingSoon: {
    backgroundColor: 'rgba(90, 74, 45, 0.3)',
    color: '#b9a56f',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#e6eff5',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    marginBottom: '1rem',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.75rem',
    color: '#8fb9cc',
    transition: 'gap 0.2s',
  },
  cardFooterHover: {
    ':hover': {
      gap: '0.5rem',
    },
  },
  lockedState: {
    textAlign: 'center',
    padding: '2rem',
    color: '#9ca3af',
  },
  lockedIcon: {
    width: '3rem',
    height: '3rem',
    margin: '0 auto 0.75rem',
    opacity: 0.3,
  },
});

function getIntegrationTitle(id: string, language: Language): string {
  if (id === 'discord') return 'Discord';
  if (id === 'google-sheets') return 'Google Sheets';
  if (id === 'wow') return 'WoW Services';
  return id;
}

export default function IntegrationsPage() {
  const { language } = useLanguage();
  const user = useUser();
  const canManageIntegrations = hasRoleAtLeast(user.role, 'officer');

  if (!canManageIntegrations) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Officers Only']}
          />
          <div data-testid="permission-error" {...stylex.props(styles.lockedState)}>
            <WuxiaIcon name="lockOpen" className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{language === 'zh' ? '此页面需要官员或更高权限' : language === 'en' ? 'This page requires officer or higher role' : 'Эта страница требует роли офицера или выше'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHero
          icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
          title={copy[language].title}
          subtitle={copy[language].subtitle}
          chips={['Officers', 'External']}
        />

        <div data-testid="integration-health-list" {...stylex.props(styles.grid)}>
          {integrations.map((integration) => {
            const isComingSoon = integration.status === 'coming-soon';

            return (
              <Link
                key={integration.id}
                href={integration.href}
                data-testid={integration.id === 'discord' ? 'integration-discord-status' : undefined}
                {...stylex.props(
                  styles.card,
                  !isComingSoon && styles.cardHover,
                  isComingSoon && styles.cardDisabled,
                  isComingSoon && styles.cardDisabledHover
                )}
              >
                <div {...stylex.props(styles.cardHeader)}>
                  <div {...stylex.props(styles.iconWrap)}>
                    <WuxiaIcon name={integration.icon} {...stylex.props(styles.icon)} />
                  </div>
                  <span {...stylex.props(styles.badge, isComingSoon ? styles.badgeComingSoon : styles.badgeActive)}>
                    {isComingSoon ? copy[language].comingSoon : copy[language].active}
                  </span>
                </div>

                <h3 {...stylex.props(styles.cardTitle)}>
                  {getIntegrationTitle(integration.id, language)}
                </h3>
                <p {...stylex.props(styles.cardDescription)}>
                  {copy[language].descriptions[integration.id]}
                </p>

                <div {...stylex.props(styles.cardFooter, !isComingSoon && styles.cardFooterHover)}>
                  <span>
                    {isComingSoon
                      ? (language === 'zh' ? '即将推出' : language === 'en' ? 'Coming soon' : 'Скоро')
                      : copy[language].configure}
                  </span>
                  <WuxiaIcon name="redo" className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}