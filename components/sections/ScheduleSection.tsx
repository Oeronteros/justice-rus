'use client';

import { useEffect, useState } from 'react';
import { Schedule, User } from '@/types';
import { formatDate } from '@/lib/utils';
import { Language } from '@/lib/i18n';
import WuxiaIcon from '../WuxiaIcons';

interface ScheduleSectionProps {
  user: User;
  language: Language;
}

export default function ScheduleSection({ user, language }: ScheduleSectionProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSchedule();
  }, [language]);

  const loadSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/schedule?language=${encodeURIComponent(language)}`, { cache: 'no-store' });
      const payload = (await response.json().catch(() => ({}))) as any;

      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }

      const data = payload?.data ?? payload;
      const normalized: Schedule[] = Array.isArray(data) ? data : data ? [data] : [];
      setSchedules(normalized);
    } catch (err) {
      setError('Не удалось загрузить расписание');
      console.error('Failed to load schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-2">
              <WuxiaIcon
                name="schedule"
                className="inline-block w-6 h-6 mr-3 text-red-400 align-text-bottom"
              />
              Расписание Ритуалов
            </h2>
            <p className="text-gray-400">Открываем свитки грядущих рейдов...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-6 bg-gray-800 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                <WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Расписание недоступно</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadSchedule}
              className="btn-primary"
            >
              <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />Повторить ритуал
            </button>
          </div>
        </div>
      </section>
    );
  }

  const today = new Date();
  const todayLabel = today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon
              name="schedule"
              className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom"
            />
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
              onClick={loadSchedule}
              className="dc-icon-btn p-2.5 rounded-xl self-start md:self-auto"
              title="Обновить"
            >
              <WuxiaIcon name="refresh" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {schedules.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center">
                <WuxiaIcon name="calendarX" className="w-10 h-10 text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">Ничего не назначено</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Когда появятся события — они будут здесь. А пока можно заняться билдами и подготовкой.
            </p>
          </div>
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
