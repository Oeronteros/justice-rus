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
    day: '2-digit',
    month: 'long',
  });

  if (isLoading) {
    return (
      <LoadingState
        title="Расписание Ритуалов"
        subtitle="Открываем свитки грядущих рейдов..."
        icon={<WuxiaIcon name="schedule" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="Расписание недоступно"
        description={error instanceof Error ? error.message : 'Не удалось загрузить расписание'}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            Повторить ритуал
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon name="schedule" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            Ритуалы сегодня
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {todayLabel}. Только текущий день — без лишнего шума.
          </p>
        </div>

        <div className="card p-7 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="wuxia-tag wuxia-tag-compact">
                <WuxiaIcon name="seal" className="w-4 h-4" />
                Печать дня
              </span>
              <div className="mt-3 text-2xl font-bold font-orbitron text-[#e6eff5]">
                {formatDate(today.toISOString())}
              </div>
              <div className="mt-2 text-gray-400">
                {schedules.length === 0
                  ? 'Сегодня орден молчит. Если нужна помощь — открой запрос.'
                  : `Назначено ритуалов: ${schedules.length}`}
              </div>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              className="dc-icon-btn p-2.5 rounded-xl self-start md:self-auto"
              title="Обновить"
            >
              <WuxiaIcon name="refresh" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {schedules.length === 0 ? (
          <EmptyState
            icon={<WuxiaIcon name="calendarX" className="w-10 h-10 text-gray-500" />}
            title="Ничего не назначено"
            description="Когда появятся события — они будут здесь. А пока можно заняться билдами и подготовкой."
          />
        ) : (
          <div className="card p-6">
            <div className="space-y-5">
              {schedules.map((schedule, index) => (
                <div
                  key={`${schedule.date}_${index}`}
                  className={`pb-5 ${index < schedules.length - 1 ? 'border-b border-gray-700/50' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="inline-flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                        <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                        {schedule.type}
                      </span>
                      {schedule.registration && (
                        <span className="text-sm text-gray-400 inline-flex items-center gap-2">
                          <WuxiaIcon name="user" className="w-4 h-4" />
                          {schedule.registration}
                        </span>
                      )}
                    </div>

                    <span className="text-sm font-medium bg-[#121a22]/70 px-3 py-1 rounded-full whitespace-nowrap self-start">
                      {formatDate(schedule.date)}
                    </span>
                  </div>

                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {schedule.description || 'Без описания'}
                  </div>
                </div>
              ))}
            </div>
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
