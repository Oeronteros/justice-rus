'use client';

import { useMemo } from 'react';
import { SectionHero } from '@/components/shared/SectionHero';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useRosterAnalytics } from '@/lib/analytics';
import {
  AttendanceHeatmapDisplay,
  ClassCompositionChart,
  AttendanceTrendsChart,
  OfficerWorkloadDisplay,
} from '@/components/analytics';
import { useUser } from '@/lib/auth/context';
import { hasRoleAtLeast } from '@/lib/authz';
import { useLanguage, type Language } from '@/lib/i18n/context';

const copy: Record<Language, {
  title: string;
  subtitle: string;
  empty: string;
  emptyHint: string;
  loading: string;
}> = {
  ru: {
    title: 'Аналитика гильдии',
    subtitle: 'Метрики посещаемости, состав классов и нагрузка офицеров',
    empty: 'Нет данных для анализа',
    emptyHint: 'Аналитика станет доступна после накопления данных',
    loading: 'Загрузка аналитики...',
  },
  en: {
    title: 'Guild Analytics',
    subtitle: 'Attendance metrics, class composition, and officer workload',
    empty: 'No data available for analysis',
    emptyHint: 'Analytics will be available after data collection',
    loading: 'Loading analytics...',
  },
  zh: {
    title: '公会分析',
    subtitle: '出勤率、职业组成和官员工作量统计',
    empty: '暂无分析数据',
    emptyHint: '数据收集完成后将显示分析结果',
    loading: '正在加载分析...',
  },
};

export default function AnalyticsPage() {
  const { language } = useLanguage();
  const user = useUser();
  const { data: analytics, isLoading, error } = useRosterAnalytics(30);

  const canViewAnalytics = hasRoleAtLeast(user.role, 'officer');

  const hasData = useMemo(() => {
    if (!analytics) return false;
    return (
      analytics.heatmap.length > 0 ||
      analytics.classComposition.length > 0 ||
      analytics.trends.length > 0 ||
      analytics.officerWorkload.length > 0
    );
  }, [analytics]);

  if (!canViewAnalytics) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="registration" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Analytics', 'Officers Only']}
          />
          <EmptyState
            title={language === 'zh' ? '仅限官员' : language === 'en' ? 'Officers Only' : 'Только для офицеров'}
            description={language === 'zh' ? '此页面需要官员或更高权限' : language === 'en' ? 'This page requires officer or higher role' : 'Эта страница требует роли офицера или выше'}
            icon="lock"
          />
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="registration" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Analytics', 'Officers']}
          />
          <LoadingState title={copy[language].title} subtitle={copy[language].loading} icon="registration" />
        </div>
      </section>
    );
  }

  if (error || !hasData) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="registration" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Analytics']}
          />
          <EmptyState
            title={copy[language].empty}
            description={copy[language].emptyHint}
            icon="registration"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHero
          icon={<WuxiaIcon name="registration" className="w-5 h-5" />}
          title={copy[language].title}
          subtitle={copy[language].subtitle}
          chips={['Analytics', '30 days', `${analytics?.summary.totalMembers || 0} members`]}
        />

        <div className="space-y-6">
          {/* Summary Cards */}
          {analytics?.summary && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card section-card p-4 rounded-xl bg-[#101a23]/65 border border-[#2a3c4c]/60">
                <div className="text-gray-400 text-xs mb-1">Всего участников</div>
                <div className="text-2xl font-bold text-[#e6eff5]">{analytics.summary.totalMembers}</div>
              </div>
              <div className="card section-card p-4 rounded-xl bg-[#101a23]/65 border border-[#2a3c4c]/60">
                <div className="text-gray-400 text-xs mb-1">Активны</div>
                <div className="text-2xl font-bold text-[#2d5a3f]">{analytics.summary.activeMembers}</div>
              </div>
              <div className="card section-card p-4 rounded-xl bg-[#101a23]/65 border border-[#2a3c4c]/60">
                <div className="text-gray-400 text-xs mb-1">Неактивны</div>
                <div className="text-2xl font-bold text-[#5a2d2d]">{analytics.summary.inactiveMembers}</div>
              </div>
              <div className="card section-card p-4 rounded-xl bg-[#101a23]/65 border border-[#2a3c4c]/60">
                <div className="text-gray-400 text-xs mb-1">Средняя посещаемость</div>
                <div className="text-2xl font-bold text-[#bcd6e5]">{analytics.summary.averageAttendance}%</div>
              </div>
            </div>
          )}

          {/* Attendance Heatmap */}
          {analytics?.heatmap && analytics.heatmap.length > 0 && (
            <AttendanceHeatmapDisplay data={analytics.heatmap} weeksToShow={8} />
          )}

          {/* Class Composition & Trends Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analytics?.classComposition && analytics.classComposition.length > 0 && (
              <ClassCompositionChart data={analytics.classComposition} />
            )}
            {analytics?.trends && analytics.trends.length > 0 && (
              <AttendanceTrendsChart data={analytics.trends} daysToShow={14} />
            )}
          </div>

          {/* Officer Workload */}
          {analytics?.officerWorkload && analytics.officerWorkload.length > 0 && (
            <OfficerWorkloadDisplay data={analytics.officerWorkload} />
          )}
        </div>
      </div>
    </section>
  );
}
