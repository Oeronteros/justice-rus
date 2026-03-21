'use client';

import { useMemo, lazy, Suspense } from 'react';
import { SectionHero } from '@/components/shared/SectionHero';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { useRosterAnalytics } from '@/lib/analytics';
import { useUser } from '@/lib/auth/context';
import { hasRoleAtLeast } from '@/lib/authz';
import { useLanguage, type Language } from '@/lib/i18n/context';
import * as stylex from '@stylexjs/stylex';

// Lazy load chart components for performance
const AttendanceHeatmapDisplay = lazy(() =>
  import('@/components/analytics').then((mod) => ({ default: mod.AttendanceHeatmapDisplay }))
);
const ClassCompositionChart = lazy(() =>
  import('@/components/analytics').then((mod) => ({ default: mod.ClassCompositionChart }))
);
const AttendanceTrendsChart = lazy(() =>
  import('@/components/analytics').then((mod) => ({ default: mod.AttendanceTrendsChart }))
);
const OfficerWorkloadDisplay = lazy(() =>
  import('@/components/analytics').then((mod) => ({ default: mod.OfficerWorkloadDisplay }))
);

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

const chartStyles = stylex.create({
  container: {
    display: 'grid',
    gap: '1.5rem',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, 1fr)',
      '@media (min-width: 768px)': 'repeat(4, 1fr)',
    },
    gap: '1rem',
  },
  summaryCard: {
    padding: '1rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(16, 26, 35, 0.65)',
    border: '1px solid rgba(42, 60, 76, 0.6)',
  },
  summaryLabel: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginBottom: '0.25rem',
  },
  summaryValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#e6eff5',
  },
  summaryValueGood: {
    color: '#2d5a3f',
  },
  summaryValueBad: {
    color: '#5a2d2d',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 1024px)': 'repeat(2, 1fr)',
    },
    gap: '1.5rem',
  },
  loadingContainer: {
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLoading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '2rem',
    color: '#9ca3af',
  },
  chartLoadingSpinner: {
    width: '2rem',
    height: '2rem',
    border: '2px solid rgba(42, 60, 76, 0.6)',
    borderTopColor: '#8fb9cc',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
});

function ChartLoadingFallback() {
  return (
    <div data-testid="chart-loading" {...stylex.props(chartStyles.chartLoading)}>
      <div {...stylex.props(chartStyles.chartLoadingSpinner)} />
      <span>Loading chart...</span>
    </div>
  );
}

function ChartEmptyFallback({ icon = 'registration', message = 'No data' }: { icon?: IconName; message?: string }) {
  return (
    <div data-testid="chart-empty-state" {...stylex.props(chartStyles.chartLoading)}>
      <WuxiaIcon name={icon} className="w-8 h-8" />
      <span>{message}</span>
    </div>
  );
}

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

        <div {...stylex.props(chartStyles.container)}>
          {/* Summary Cards */}
          {analytics?.summary && (
            <div {...stylex.props(chartStyles.summaryGrid)}>
              <div {...stylex.props(chartStyles.summaryCard)}>
                <div {...stylex.props(chartStyles.summaryLabel)}>Всего участников</div>
                <div {...stylex.props(chartStyles.summaryValue)}>{analytics.summary.totalMembers}</div>
              </div>
              <div {...stylex.props(chartStyles.summaryCard)}>
                <div {...stylex.props(chartStyles.summaryLabel)}>Активны</div>
                <div {...stylex.props(chartStyles.summaryValue, chartStyles.summaryValueGood)}>{analytics.summary.activeMembers}</div>
              </div>
              <div {...stylex.props(chartStyles.summaryCard)}>
                <div {...stylex.props(chartStyles.summaryLabel)}>Неактивны</div>
                <div {...stylex.props(chartStyles.summaryValue, chartStyles.summaryValueBad)}>{analytics.summary.inactiveMembers}</div>
              </div>
              <div {...stylex.props(chartStyles.summaryCard)}>
                <div {...stylex.props(chartStyles.summaryLabel)}>Средняя посещаемость</div>
                <div {...stylex.props(chartStyles.summaryValue)}>{analytics.summary.averageAttendance}%</div>
              </div>
            </div>
          )}

          {/* Attendance Heatmap - Lazy loaded */}
          {analytics?.heatmap && analytics.heatmap.length > 0 && (
            <Suspense fallback={<ChartLoadingFallback />}>
              <div data-testid="analytics-chart-attendance">
                <AttendanceHeatmapDisplay data={analytics.heatmap} weeksToShow={8} />
              </div>
            </Suspense>
          )}

          {/* Class Composition & Trends Side by Side - Lazy loaded */}
          <div {...stylex.props(chartStyles.chartGrid)}>
            <Suspense fallback={<ChartLoadingFallback />}>
              {analytics?.classComposition && analytics.classComposition.length > 0 && (
                <div data-testid="analytics-chart-pvp">
                  <ClassCompositionChart data={analytics.classComposition} />
                </div>
              )}
            </Suspense>
            <Suspense fallback={<ChartLoadingFallback />}>
              {analytics?.trends && analytics.trends.length > 0 && (
                <AttendanceTrendsChart data={analytics.trends} daysToShow={14} />
              )}
            </Suspense>
          </div>

          {/* Officer Workload - Lazy loaded */}
          <Suspense fallback={<ChartLoadingFallback />}>
            {analytics?.officerWorkload && analytics.officerWorkload.length > 0 && (
              <OfficerWorkloadDisplay data={analytics.officerWorkload} />
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
}