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
  const dayName = today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Разделяем на две колонки: Рутина и На этой неделе
  const routine = schedules.filter(s => s.type === 'daily');
  const weekly = schedules.filter(s => s.type !== 'daily');

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
        icon={<WuxiaIcon name="alertTriangle" className="w-5 h-5 text-red-400" />}
        title="Ошибка"
        description="Не удалось загрузить"
        action={<button onClick={() => refetch()} className="text-sm text-[#8fb9cc] hover:underline">Повторить</button>}
        variant="error"
      />
    );
  }

  return (
    <section className="py-4">
      <div className="max-w-5xl mx-auto px-4">
        {/* Заголовок как в Discord */}
        <div className="mb-4">
          <div className="text-lg font-semibold text-white capitalize">{dayName}</div>
          <div className="text-sm text-gray-500">{dateStr}</div>
        </div>

        {schedules.length === 0 ? (
          <div className="text-gray-500 text-sm">Нет событий</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Левая колонка - Рутина */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-500">🟢</span>
                <span className="text-sm font-medium text-gray-300">Рутина</span>
              </div>
              <ol className="space-y-1.5 text-sm">
                {routine.length > 0 ? routine.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-400">
                    <span className="text-gray-600">{i + 1}.</span>
                    <span>{item.description || 'Без описания'}</span>
                  </li>
                )) : (
                  <li className="text-gray-600 text-xs">Нет рутинных задач</li>
                )}
              </ol>
            </div>

            {/* Правая колонка - На этой неделе */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-500">📋</span>
                <span className="text-sm font-medium text-gray-300">На этой неделе</span>
              </div>
              <ol className="space-y-1.5 text-sm">
                {weekly.length > 0 ? weekly.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-400">
                    <span className="text-gray-600">{i + 1}.</span>
                    <div>
                      <span className="text-[#8fb9cc]">{item.type}</span>
                      {item.registration && <span className="text-gray-500"> | {item.registration}</span>}
                      <span> | {item.description || 'Без описания'}</span>
                    </div>
                  </li>
                )) : (
                  <li className="text-gray-600 text-xs">Нет событий на неделе</li>
                )}
              </ol>
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
