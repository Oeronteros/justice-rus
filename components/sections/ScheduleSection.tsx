'use client';

import { useEffect, useState } from 'react';
import { Schedule, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate } from '@/lib/utils';

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
      setError('Failed to load schedule');
      console.error('Failed to load schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Error Loading Schedule</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={loadSchedule}
              className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition"
            >
              <i className="fas fa-redo mr-2"></i>Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          <i className="fas fa-calendar-alt mr-3 text-red-500"></i>
          Schedule
        </h2>

        <div className="space-y-4">
          {schedules.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <i className="fas fa-calendar-times text-4xl mb-4"></i>
              <p>No schedule records found</p>
            </div>
          ) : (
            schedules.map((schedule, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{schedule.registration}</h3>
                  <span className="text-sm text-gray-400">
                    {formatDate(schedule.date)}
                  </span>
                </div>
                <p className="text-gray-300">{schedule.description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs">
                  {schedule.type}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

