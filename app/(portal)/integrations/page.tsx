'use client';

import Link from 'next/link';
import { SectionHero } from '@/components/shared/SectionHero';
import WuxiaIcon from '@/components/WuxiaIcons';
import { hasRoleAtLeast } from '@/lib/authz';
import { useUser } from '@/lib/auth/context';
import { useLanguage, type Language } from '@/lib/i18n/context';

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
  },
};

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
          <div className="card section-card p-6 text-center text-gray-400">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => {
            const isComingSoon = integration.status === 'coming-soon';

            return (
              <Link
                key={integration.id}
                href={integration.href}
                className={`card section-card p-6 rounded-xl border transition-all group ${
                  isComingSoon
                    ? 'border-[#2a3c4c]/60 bg-[#101a23]/65 opacity-60 hover:opacity-100'
                    : 'border-[#2a3c4c]/60 bg-[#101a23]/65 hover:border-[#2f6e8d]/50 hover:bg-[#101a23]/85'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2d5a3f] to-[#1a3a2f] flex items-center justify-center">
                    <WuxiaIcon name={integration.icon} className="w-6 h-6 text-[#e6eff5]" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isComingSoon
                      ? 'bg-[#5a4a2d]/30 text-[#b9a56f]'
                      : 'bg-[#2d5a3f]/30 text-[#6fb98f]'
                  }`}>
                    {isComingSoon ? copy[language].comingSoon : copy[language].active}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#e6eff5] mb-2">
                  {copy[language].title === 'Integrations' 
                    ? integration.id === 'discord' ? 'Discord'
                    : integration.id === 'google-sheets' ? 'Google Sheets'
                    : 'WoW Services'
                    : integration.id === 'discord' ? 'Discord'
                    : integration.id === 'google-sheets' ? 'Google Sheets'
                    : 'WoW Services'}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {copy[language].descriptions[integration.id]}
                </p>

                <div className="flex items-center gap-1 text-xs text-[#8fb9cc] group-hover:gap-2 transition-all">
                  <span>{isComingSoon ? (language === 'zh' ? '即将推出' : language === 'en' ? 'Coming soon' : 'Скоро') : (language === 'zh' ? '配置' : language === 'en' ? 'Configure' : 'Настроить')}</span>
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
