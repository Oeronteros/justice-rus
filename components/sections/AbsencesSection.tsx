'use client';

import { useEffect, useState } from 'react';
import { Absence, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '../WuxiaIcons';

interface AbsencesSectionProps {
  user: User;
}

export default function AbsencesSection({ user }: AbsencesSectionProps) {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const statusLabels: Record<string, string> = {
    pending: 'На рассмотрении',
    approved: 'Одобрено',
    rejected: 'Отклонено',
  };

  useEffect(() => {
    loadAbsences();
  }, []);

  const loadAbsences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAbsences();
      setAbsences(data);
    } catch (err) {
      setError('Не удалось загрузить записи отсутствий');
      console.error('Failed to load absences:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAbsences =
    statusFilter === 'all'
      ? absences
      : absences.filter((a) => a.status === statusFilter);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      pending: 'bg-gradient-to-r from-yellow-600/30 to-yellow-800/30 text-yellow-400',
      approved: 'bg-gradient-to-r from-green-600/30 to-green-800/30 text-green-400',
      rejected: 'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-400',
    };
    return classes[status] || 'bg-gray-700';
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-2">
              <WuxiaIcon name="absences" className="inline-block w-6 h-6 mr-3 text-red-400 align-text-bottom" />
              Отлучения
            </h2>
            <p className="text-gray-400">Собираем клятвы отсутствия...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-6 bg-gray-800 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse mb-4"></div>
                <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
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
            <h3 className="text-2xl font-bold text-red-400 mb-2">Отлучения недоступны</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadAbsences}
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
            <WuxiaIcon name="absences" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            Отлучения
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Учет отлучений, клятв и причин отсутствия в строю.</p>
        </div>

        <div className="flex justify-center mb-8">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select-field max-w-xs"
          >
            <option value="all">Все статусы</option>
            <option value="pending">На рассмотрении</option>
            <option value="approved">Одобрено</option>
            <option value="rejected">Отклонено</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredAbsences.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <WuxiaIcon name="calendarX" className="w-10 h-10 text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Отлучения не найдены</h3>
              <p className="text-gray-500">Нет записей под текущие фильтры</p>
            </div>
          ) : (
            filteredAbsences.map((absence) => (
              <div key={absence.id} className="card p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold font-orbitron text-red-400">{absence.member}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      absence.status
                    )}`}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-current mr-2 opacity-80" />
                    {statusLabels[absence.status] || absence.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Начало</div>
                    <div className="font-bold text-lg">{formatDate(absence.startDate)}</div>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Окончание</div>
                    <div className="font-bold text-lg">{formatDate(absence.endDate)}</div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Причина</div>
                  <div className="text-gray-300">{absence.reason}</div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  {user.role !== 'member' && (
                    <>
                      <button className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg transition text-sm font-medium">
                        <WuxiaIcon name="check" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                        Одобрить
                      </button>
                      <button className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition text-sm font-medium">
                        <WuxiaIcon name="x" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                        Отклонить
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm font-medium">
                    <WuxiaIcon name="edit" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                    Редактировать
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
