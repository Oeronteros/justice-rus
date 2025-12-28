'use client';

import { useEffect, useState } from 'react';
import { Schedule, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '../WuxiaIcons';

interface ScheduleSectionProps {
  user: User;
}

export default function ScheduleSection({ user }: ScheduleSectionProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getSchedule();
      setSchedules(data);
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

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon
              name="schedule"
              className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom"
            />
            Расписание Ритуалов
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Список рейдов и действий ордена, где каждый дает клятву явки.</p>
        </div>

        <div className="space-y-6">
          {schedules.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <WuxiaIcon name="calendarX" className="w-10 h-10 text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Ритуалы не назначены</h3>
              <p className="text-gray-500">Ждем нового приказа на сбор</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schedules.map((schedule, index) => (
                <div key={index} className="card p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold font-orbitron text-red-400">{schedule.registration}</h3>
                    <span className="text-sm font-medium bg-[#121a22]/70 px-3 py-1 rounded-full">
                      {formatDate(schedule.date)}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">{schedule.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                      <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                      {schedule.type}
                    </span>

                    <button className="text-sm font-medium text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors">
                      <WuxiaIcon
                        name="calendarCheck"
                        className="inline-block w-4 h-4 mr-1 align-text-bottom"
                      />
                      Принять клятву
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
