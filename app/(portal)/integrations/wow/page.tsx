'use client';

import { SectionHero } from '@/components/shared/SectionHero';
import WuxiaIcon from '@/components/WuxiaIcons';
import { hasRoleAtLeast } from '@/lib/authz';
import { useUser } from '@/lib/auth/context';
import type { Language } from '@/lib/i18n';

interface WoWServicesPageProps {
  language: Language;
}

const copy: Record<Language, {
  title: string;
  subtitle: string;
  comingSoon: string;
  description: string;
  features: string[];
}> = {
  ru: {
    title: 'WoW Services',
    subtitle: 'Интеграция с WoW API и сервисами',
    comingSoon: 'В разработке',
    description: 'Получение данных из World of Warcraft API для актуальной информации о персонажах',
    features: [
      'Автоматическое обновление классов и специализаций',
      'Синхронизация уровня предметов',
      'Достижения и прогресс рейдов',
      'Warcraft Logs интеграция',
    ],
  },
  en: {
    title: 'WoW Services',
    subtitle: 'Integration with WoW API and services',
    comingSoon: 'Coming Soon',
    description: 'Fetch data from World of Warcraft API for up-to-date character information',
    features: [
      'Automatic class and spec updates',
      'Item level synchronization',
      'Achievements and raid progress',
      'Warcraft Logs integration',
    ],
  },
  zh: {
    title: 'WoW 服务',
    subtitle: '与 WoW API 和服务集成',
    comingSoon: '即将推出',
    description: '从魔兽世界 API 获取数据以获取最新的角色信息',
    features: [
      '自动更新职业和专精',
      '物品等级同步',
      '成就和团队进度',
      'Warcraft Logs 集成',
    ],
  },
};

export default function WoWServicesPage({ language }: WoWServicesPageProps) {
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
            chips={['Integration', 'Officers Only']}
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
          chips={['Integration', 'Coming Soon']}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card section-card p-6">
            <div className="text-center py-8">
              <WuxiaIcon name="schedule" className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-semibold text-[#bcd6e5] mb-2">{copy[language].comingSoon}</h3>
              <p className="text-sm text-gray-400 mb-6">{copy[language].description}</p>
              
              <ul className="text-left space-y-2 text-sm text-gray-400">
                {copy[language].features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <WuxiaIcon name="checkCircle" className="w-4 h-4 mt-0.5 text-[#6fb98f] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card section-card p-6 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#101a23]/65 border border-[#2a3c4c]/60 flex items-center justify-center">
                <WuxiaIcon name="schedule" className="w-12 h-12 opacity-30" />
              </div>
              <p className="text-xs">
                {language === 'zh' ? '功能开发中...' : language === 'en' ? 'Feature in development...' : 'Функция в разработке...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
