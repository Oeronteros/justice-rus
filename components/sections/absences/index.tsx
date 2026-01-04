'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAbsences, useCreateAbsence } from '@/lib/hooks/useAbsences';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/types';

interface AbsencesSectionProps {
  user: User;
}

const statusLabels: Record<string, string> = {
  pending: 'На рассмотрении',
  approved: 'Одобрено',
  rejected: 'Отклонено',
};

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-gradient-to-r from-yellow-600/30 to-yellow-800/30 text-yellow-400',
    approved: 'bg-gradient-to-r from-green-600/30 to-green-800/30 text-green-400',
    rejected: 'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-400',
  };
  return classes[status] || 'bg-gray-700';
};

function AbsencesSectionContent({ user }: AbsencesSectionProps) {
  const { data: absences = [], isLoading, error, refetch } = useAbsences();
  const createAbsence = useCreateAbsence();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [member, setMember] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('dc_absence_member');
    if (stored) setMember(stored);
  }, []);

  const filteredAbsences = statusFilter === 'all'
    ? absences
    : absences.filter((a) => a.status === statusFilter);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!member.trim() || !startDate || !endDate || !reason.trim()) return;

    if (typeof window !== 'undefined') {
      localStorage.setItem('dc_absence_member', member.trim());
    }

    await createAbsence.mutateAsync({
      member: member.trim(),
      startDate,
      endDate,
      reason: reason.trim(),
    });

    setStartDate('');
    setEndDate('');
    setReason('');
  };

  if (isLoading) {
    return (
      <LoadingState
        title="Отлучения"
        subtitle="Собираем клятвы отсутствия..."
        icon={<WuxiaIcon name="absences" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="Отлучения недоступны"
        description={error instanceof Error ? error.message : 'Не удалось загрузить записи отсутствий'}
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon name="absences" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            Отлучения
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Учет отлучений, клятв и причин отсутствия в строю.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 card p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2f6e8d]/30 to-[#8fb9cc]/30 rounded-full flex items-center justify-center mr-4">
                <WuxiaIcon name="plus" className="w-7 h-7 text-[#8fb9cc]" />
              </div>
              <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">Создать заявку</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={member}
                onChange={(e) => setMember(e.target.value)}
                placeholder="Твой ник"
                className="input-field"
                maxLength={60}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Начало отсутствия</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Окончание отсутствия</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Причина отсутствия..."
                className="input-field min-h-[120px]"
                maxLength={500}
                required
              />

              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={createAbsence.isPending}
              >
                {createAbsence.isPending ? (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
                    Отправляем...
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="seal" className="w-4 h-4 mr-3" />
                    Подать заявку
                  </span>
                )}
              </button>

              {createAbsence.error && (
                <div className="text-[#bcd6e5] text-sm mt-2 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
                  <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                  {createAbsence.error instanceof Error ? createAbsence.error.message : 'Не удалось создать заявку'}
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Фильтр:</span>
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

              <button
                type="button"
                className="dc-icon-btn p-2.5 rounded-xl"
                onClick={() => refetch()}
                title="Обновить"
              >
                <WuxiaIcon name="refresh" className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {filteredAbsences.length === 0 ? (
                <EmptyState
                  icon={<WuxiaIcon name="calendarX" className="w-10 h-10 text-gray-500" />}
                  title="Отлучения не найдены"
                  description="Нет записей под текущие фильтры"
                />
              ) : (
                filteredAbsences.map((absence) => (
                  <div
                    key={absence.id}
                    className="card p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold font-orbitron text-red-400">
                        {absence.member}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(absence.status)}`}>
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
        </div>
      </div>
    </section>
  );
}

export default function AbsencesSection(props: AbsencesSectionProps) {
  return (
    <ErrorBoundary>
      <AbsencesSectionContent {...props} />
    </ErrorBoundary>
  );
}
