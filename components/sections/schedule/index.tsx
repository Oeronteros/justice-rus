'use client';

import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
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

  // Группируем по группам
  const groupedByGroup = schedules.reduce((acc, item) => {
    const groupName = item.group || (language === 'ru' ? 'Общее' : 'General');
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {} as Record<string, typeof schedules>);

  const sortedGroups = Object.keys(groupedByGroup).sort((a, b) => {
    // "Общее" / "General" всегда первым
    if (a === 'Общее' || a === 'General') return -1;
    if (b === 'Общее' || b === 'General') return 1;
    return a.localeCompare(b);
  });

  if (isLoading) {
    return (
      <div className="py-4 px-4 max-w-5xl mx-auto">
        <div className="text-gray-500 text-sm">
          {language === 'ru' ? 'Загрузка расписания...' : 'Loading schedule...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 px-4 max-w-5xl mx-auto">
        <div className="text-red-400 text-sm">
          {language === 'ru' ? 'Ошибка: ' : 'Error: '}
          {error instanceof Error ? error.message : language === 'ru' ? 'Не удалось загрузить' : 'Failed to load'}
          <button onClick={() => refetch()} className="ml-2 text-[#8fb9cc] hover:underline">
            {language === 'ru' ? 'Повторить' : 'Retry'}
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
            title={language === 'ru' ? 'Обновить' : 'Refresh'}
          >
            <WuxiaIcon name="refresh" className="w-4 h-4" />
          </button>
        </div>

        {schedules.length === 0 ? (
          <div className="text-gray-500 text-sm py-4">
            {language === 'ru' ? 'Нет событий на сегодня' : 'No events today'}
          </div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
            {/* Таблица расписания по группам */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#252525] border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium w-40">
                      {language === 'ru' ? 'Группа' : 'Group'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium w-24">
                      {language === 'ru' ? 'Время' : 'Time'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      {language === 'ru' ? 'Событие' : 'Event'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedGroups.map((groupName) => {
                    const items = groupedByGroup[groupName];
                    return items.map((item, idx) => (
                      <tr
                        key={`${groupName}-${idx}`}
                        className="border-b border-gray-800/50 hover:bg-[#222] transition-colors"
                      >
                        {/* Показываем название группы только для первой строки группы */}
                        <td className="py-2.5 px-4">
                          {idx === 0 ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#8fb9cc]"></span>
                              <span className="text-white font-medium">{groupName}</span>
                            </span>
                          ) : null}
                        </td>
                        <td className="py-2.5 px-4 text-gray-400 font-mono text-xs">
                          {item.description || '—'}
                        </td>
                        <td className="py-2.5 px-4 text-gray-300">
                          {item.registration}
                        </td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>

            {/* Итого */}
            <div className="bg-[#252525] px-4 py-2 text-xs text-gray-500 border-t border-gray-800">
              {language === 'ru' 
                ? `${sortedGroups.length} групп • ${schedules.length} событий`
                : `${sortedGroups.length} groups • ${schedules.length} events`
              }
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
