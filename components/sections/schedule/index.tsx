'use client';

import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useSchedule } from '@/lib/hooks/useSchedule';
import { formatDate } from '@/lib/utils';
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
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  if (isLoading) {
    return (
      <LoadingState
        title="Расписание"
        subtitle="Загружаем события..."
        icon={<WuxiaIcon name="schedule" className="w-6 h-6 text-[#8fb9cc]" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="Не удалось загрузить"
        description={error instanceof Error ? error.message : 'Ошибка загрузки расписания'}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            Повторить
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#e6eff5] mb-1">
              Расписание
            </h2>
            <p className="text-gray-500 text-sm capitalize">{todayLabel}</p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="p-2 rounded-lg bg-[#1a2a38] text-gray-400 hover:text-white transition-colors"
            title="Обновить"
          >
            <WuxiaIcon name="refresh" className="w-5 h-5" />
          </button>
        </div>

        {/* Счётчик */}
        <div className="bg-[#0d1419] border border-[#2a3f4f]/50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Событий сегодня</span>
            <span className="text-2xl font-bold text-[#8fb9cc]">{schedules.length}</span>
          </div>
        </div>

        {/* Список событий */}
        {schedules.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <WuxiaIcon name="calendarX" className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>На сегодня ничего не запланировано</p>
          </div>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule, index) => (
              <div
                key={`${schedule.date}_${index}`}
                className="bg-[#0d1419] border border-[#2a3f4f]/50 rounded-xl p-4 hover:border-[#3a5f7f]/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-[#1a2a38] text-[#8fb9cc] rounded text-xs">
                        {schedule.type}
                      </span>
                      {schedule.registration && (
                        <span className="text-xs text-gray-500">
                          {schedule.registration}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">
                      {schedule.description || 'Без описания'}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(schedule.date)}
                  </span>
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
