'use client';

import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useSchedule } from '@/lib/hooks/useSchedule';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/types';
import type { Language } from '@/lib/i18n';

interface ScheduleSectionProps {
  user: User;
  language: Language;
}

function ScheduleSectionContent({ user, language }: ScheduleSectionProps) {
  const { data: schedules = [], isLoading, error, refetch } = useSchedule(language);

  const today = new Date();
  const todayLabel = today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  if (isLoading) {
    return (
      <LoadingState
        title="Расписание"
        subtitle="Загрузка..."
        icon={<WuxiaIcon name="schedule" className="w-5 h-5 text-[#8fb9cc]" />}
        skeletonCount={2}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-6 h-6 text-red-400" />}
        title="Ошибка загрузки"
        description={error instanceof Error ? error.message : 'Не удалось загрузить'}
        action={<button onClick={() => refetch()} className="btn-primary text-sm py-2 px-4">Повторить</button>}
        variant="error"
      />
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#e6eff5]">Расписание</h2>
            <span className="text-sm text-gray-500">{todayLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8fb9cc]">{schedules.length} событий</span>
            <button
              type="button"
              onClick={() => refetch()}
              className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-[#1a2a38] transition-colors"
            >
              <WuxiaIcon name="refresh" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Список */}
        {schedules.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            Нет событий на сегодня
          </div>
        ) : (
          <div className="space-y-2">
            {schedules.map((schedule, index) => (
              <div
                key={`${schedule.date}_${index}`}
                className="flex items-start gap-3 p-3 bg-[#0d1419]/80 border border-[#2a3f4f]/40 rounded-lg"
              >
                <span className="px-2 py-0.5 bg-[#1a2a38] text-[#8fb9cc] rounded text-xs flex-shrink-0">
                  {schedule.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">
                    {schedule.description || 'Без описания'}
                  </p>
                  {schedule.registration && (
                    <span className="text-xs text-gray-500">{schedule.registration}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function ScheduleSection(props: ScheduleSectionProps) {
  return (
    <ErrorBoundary>
      <ScheduleSectionContent {...props} />
    </ErrorBoundary>
  );
}
