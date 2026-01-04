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

  // Группируем по типу дня (day_type)
  const grouped = schedules.reduce((acc, item) => {
    const key = item.type || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof schedules>);

  const typeLabels: Record<string, { ru: string; en: string; emoji: string }> = {
    daily: { ru: 'Рутина', en: 'Daily', emoji: '🟢' },
    weekly: { ru: 'На этой неделе', en: 'This week', emoji: '📋' },
    event: { ru: 'События', en: 'Events', emoji: '⭐' },
    other: { ru: 'Прочее', en: 'Other', emoji: '📌' },
  };

  if (isLoading) {
    return (
      <div className="py-4 px-4 max-w-5xl mx-auto">
        <div className="text-gray-500 text-sm">Загрузка расписания...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 px-4 max-w-5xl mx-auto">
        <div className="text-red-400 text-sm">
          Ошибка: {error instanceof Error ? error.message : 'Не удалось загрузить'}
          <button onClick={() => refetch()} className="ml-2 text-[#8fb9cc] hover:underline">
            Повторить
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-4">
      <div className="max-w-5xl mx-auto px-4">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-lg font-semibold text-white capitalize">{dayName}</div>
            <div className="text-sm text-gray-500">{dateStr}</div>
          </div>
          <button
            onClick={() => refetch()}
            className="text-gray-500 hover:text-white p-1"
            title="Обновить"
          >
            <WuxiaIcon name="refresh" className="w-4 h-4" />
          </button>
        </div>

        {schedules.length === 0 ? (
          <div className="text-gray-500 text-sm py-4">
            {language === 'ru' ? 'Нет событий на сегодня' : 'No events today'}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(grouped).map(([type, items]) => {
              const label = typeLabels[type] || typeLabels.other;
              return (
                <div key={type}>
                  <div className="flex items-center gap-2 mb-2">
                    <span>{label.emoji}</span>
                    <span className="text-sm font-medium text-gray-300">
                      {language === 'ru' ? label.ru : label.en}
                    </span>
                  </div>
                  <ol className="space-y-1 text-sm">
                    {items.map((item, i) => (
                      <li key={i} className="flex gap-2 text-gray-400">
                        <span className="text-gray-600 w-4 flex-shrink-0">{i + 1}.</span>
                        <div className="min-w-0">
                          {item.description && (
                            <span className="text-[#8fb9cc]">{item.description} </span>
                          )}
                          <span>{item.registration}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
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
