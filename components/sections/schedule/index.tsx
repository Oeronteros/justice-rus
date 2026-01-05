'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useSchedule } from '@/lib/hooks/useSchedule';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/types';
import type { Language } from '@/lib/i18n';

interface ScheduleSectionProps {
  user: User;
  language: Language;
}

// Парсим время из строки "HH:MM" или "HH:MM - HH:MM"
function parseTime(timeStr: string): { start: number; end: number } | null {
  if (!timeStr) return null;
  
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const start = hours * 60 + minutes;
  
  // Проверяем есть ли конечное время
  const endMatch = timeStr.match(/[-–]\s*(\d{1,2}):(\d{2})/);
  if (endMatch) {
    const endHours = parseInt(endMatch[1], 10);
    const endMinutes = parseInt(endMatch[2], 10);
    return { start, end: endHours * 60 + endMinutes };
  }
  
  // Если нет конечного времени, считаем что событие длится час
  return { start, end: start + 60 };
}

function formatCountdown(minutes: number, language: Language): string {
  if (minutes < 0) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return language === 'ru' 
      ? `через ${hours}ч ${mins}м`
      : `in ${hours}h ${mins}m`;
  }
  return language === 'ru' ? `через ${mins}м` : `in ${mins}m`;
}

// Цвета для групп
const groupColors: Record<string, string> = {
  'Общее': '#8fb9cc',
  'General': '#8fb9cc',
  'PvP': '#e57373',
  'PvE': '#81c784',
  'Рейды': '#ffb74d',
  'Raids': '#ffb74d',
  'Ивенты': '#ba68c8',
  'Events': '#ba68c8',
};

function getGroupColor(groupName: string): string {
  return groupColors[groupName] || '#8fb9cc';
}

function ScheduleSectionContent({ user, language }: ScheduleSectionProps) {
  const { data: schedules = [], isLoading, error, refetch } = useSchedule(language);
  const [now, setNow] = useState(() => new Date());
  const [filter, setFilter] = useState<string>('all');

  // Обновляем время каждую минуту
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const today = new Date();
  const dayName = today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
  });

  // Группируем по группам
  const groupedByGroup = schedules.reduce((acc, item) => {
    const groupName = item.group || (language === 'ru' ? 'Общее' : 'General');
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {} as Record<string, typeof schedules>);

  const sortedGroups = Object.keys(groupedByGroup).sort((a, b) => {
    if (a === 'Общее' || a === 'General') return -1;
    if (b === 'Общее' || b === 'General') return 1;
    return a.localeCompare(b);
  });

  // Фильтруем группы
  const filteredGroups = filter === 'all' 
    ? sortedGroups 
    : sortedGroups.filter(g => g === filter);

  // Находим следующее событие
  const nextEvent = schedules
    .map(item => ({ ...item, time: parseTime(item.description) }))
    .filter(item => item.time && item.time.start > currentMinutes)
    .sort((a, b) => (a.time?.start || 0) - (b.time?.start || 0))[0];

  // Находим текущее событие
  const currentEvent = schedules
    .map(item => ({ ...item, time: parseTime(item.description) }))
    .find(item => item.time && item.time.start <= currentMinutes && item.time.end > currentMinutes);

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-48"></div>
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-800/50 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
            <WuxiaIcon name="alertTriangle" className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <p className="text-red-400 mb-4">
              {error instanceof Error ? error.message : language === 'ru' ? 'Не удалось загрузить' : 'Failed to load'}
            </p>
            <button onClick={() => refetch()} className="btn-primary">
              <WuxiaIcon name="refresh" className="w-4 h-4 mr-2" />
              {language === 'ru' ? 'Повторить' : 'Retry'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Заголовок */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize flex items-center gap-3">
              <WuxiaIcon name="schedule" className="w-6 h-6 text-[#8fb9cc]" />
              {dayName}
            </h1>
            <p className="text-gray-400 mt-1">{dateStr}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#8fb9cc]"
            >
              <option value="all">{language === 'ru' ? 'Все группы' : 'All groups'}</option>
              {sortedGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            
            <button
              onClick={() => refetch()}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title={language === 'ru' ? 'Обновить' : 'Refresh'}
            >
              <WuxiaIcon name="refresh" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Текущее/следующее событие */}
        {(currentEvent || nextEvent) && (
          <div className="mb-6">
            {currentEvent ? (
              <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-700/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {language === 'ru' ? 'Сейчас идёт' : 'Happening now'}
                </div>
                <div className="text-white font-semibold text-lg">{currentEvent.registration}</div>
                <div className="text-gray-400 text-sm mt-1">
                  {currentEvent.description} • {currentEvent.group || (language === 'ru' ? 'Общее' : 'General')}
                </div>
              </div>
            ) : nextEvent && nextEvent.time ? (
              <div className="bg-gradient-to-r from-[#1a2a3a] to-[#1a1a2a] border border-[#8fb9cc]/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#8fb9cc] text-sm font-medium mb-2">
                      <WuxiaIcon name="schedule" className="w-4 h-4" />
                      {language === 'ru' ? 'Следующее событие' : 'Next event'}
                    </div>
                    <div className="text-white font-semibold text-lg">{nextEvent.registration}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      {nextEvent.description} • {nextEvent.group || (language === 'ru' ? 'Общее' : 'General')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#8fb9cc]">
                      {formatCountdown(nextEvent.time.start - currentMinutes, language)}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {schedules.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-12 text-center">
            <WuxiaIcon name="schedule" className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {language === 'ru' ? 'Нет событий на сегодня' : 'No events today'}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {language === 'ru' ? 'Отдыхай, воин!' : 'Rest well, warrior!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredGroups.map((groupName) => {
              const items = groupedByGroup[groupName];
              const color = getGroupColor(groupName);
              
              return (
                <div
                  key={groupName}
                  className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
                >
                  {/* Заголовок группы */}
                  <div 
                    className="px-4 py-3 border-b border-gray-800"
                    style={{ borderLeftWidth: 3, borderLeftColor: color }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{groupName}</span>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                        {items.length} {language === 'ru' ? 'событий' : 'events'}
                      </span>
                    </div>
                  </div>
                  
                  {/* События */}
                  <div className="divide-y divide-gray-800/50">
                    {items.map((item, idx) => {
                      const time = parseTime(item.description);
                      const isNow = time && time.start <= currentMinutes && time.end > currentMinutes;
                      const isPast = time && time.end <= currentMinutes;
                      const isNext = nextEvent && item.registration === nextEvent.registration && item.description === nextEvent.description;
                      
                      return (
                        <div
                          key={idx}
                          className={`px-4 py-3 flex items-start gap-3 transition-colors ${
                            isNow 
                              ? 'bg-green-900/20' 
                              : isNext 
                                ? 'bg-[#8fb9cc]/10' 
                                : isPast 
                                  ? 'opacity-50' 
                                  : 'hover:bg-gray-800/30'
                          }`}
                        >
                          {/* Время */}
                          <div className={`font-mono text-sm w-16 flex-shrink-0 ${
                            isNow ? 'text-green-400' : isNext ? 'text-[#8fb9cc]' : 'text-gray-500'
                          }`}>
                            {item.description || '—'}
                          </div>
                          
                          {/* Название */}
                          <div className="flex-1 min-w-0">
                            <div className={`${isPast ? 'text-gray-500' : 'text-gray-200'} ${isNow ? 'font-medium' : ''}`}>
                              {item.registration}
                            </div>
                            {isNow && (
                              <span className="inline-flex items-center gap-1 text-xs text-green-400 mt-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                {language === 'ru' ? 'Сейчас' : 'Now'}
                              </span>
                            )}
                          </div>
                          
                          {/* Статус */}
                          {isPast && (
                            <WuxiaIcon name="check" className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Статистика */}
        {schedules.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>{sortedGroups.length} {language === 'ru' ? 'групп' : 'groups'}</span>
            <span>•</span>
            <span>{schedules.length} {language === 'ru' ? 'событий' : 'events'}</span>
            {nextEvent && nextEvent.time && (
              <>
                <span>•</span>
                <span className="text-[#8fb9cc]">
                  {language === 'ru' ? 'След.' : 'Next'}: {formatCountdown(nextEvent.time.start - currentMinutes, language)}
                </span>
              </>
            )}
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
