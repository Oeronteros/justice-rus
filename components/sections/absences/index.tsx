'use client';

import { useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAbsences, useCreateAbsence, useUpdateAbsenceStatus } from '@/lib/absences/hooks';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/lib/schemas/auth';
import { SectionHero } from '@/components/shared/SectionHero';
import { hasRoleAtLeast } from '@/lib/authz';
import { useTranslation } from '@/lib/i18n/context';

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
  const { t } = useTranslation();
  const { data: absences = [], isLoading, error, refetch } = useAbsences();
  const createAbsence = useCreateAbsence();
  const updateAbsenceStatus = useUpdateAbsenceStatus();
  const canModerateAbsences = hasRoleAtLeast(user.role, 'officer');
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const filteredAbsences = statusFilter === 'all'
    ? absences
    : absences.filter((a) => a.status === statusFilter);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!startDate || !endDate || !reason.trim()) return;

    await createAbsence.mutateAsync({
      startDate,
      endDate,
      reason: reason.trim(),
    });

    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    await updateAbsenceStatus.mutateAsync({ id, status });
  };

  if (isLoading) {
    return (
      <LoadingState
        title={t.absences.title}
        subtitle={t.absences.loading}
        icon={<WuxiaIcon name="absences" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
        layout="list"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title={t.absences.error}
        description={error instanceof Error ? error.message : t.absences.error}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            {t.errors.tryAgain}
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-stack-lg">
          <SectionHero
            icon={<WuxiaIcon name="absences" className="w-5 h-5" />}
            title={t.absences.title}
            subtitle={t.absences.subtitle}
            chips={['Roster Health', 'Requests', 'Status Tracking']}
          />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2 card section-card p-5 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2f6e8d]/30 to-[#8fb9cc]/30 rounded-full flex items-center justify-center mr-4">
                <WuxiaIcon name="plus" className="w-7 h-7 text-[#8fb9cc]" />
              </div>
              <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">{t.absences.createRequest}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-sm text-gray-400">{t.absences.profilePrefix} <span className="text-[#c9deea]">{user.nickname || t.absences.currentUserFallback}</span></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.absences.startDate}</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.absences.endDate}</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-field w-full"
                    required
                  />
                </div>
              </div>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.absences.reasonPlaceholder}
                className="input-field min-h-[120px] w-full"
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
                    <WuxiaIcon name="spinner" className="spinner-icon w-4 h-4 mr-3" />
                    {t.absences.submitting}
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="seal" className="w-4 h-4 mr-3" />
                    {t.absences.submit}
                  </span>
                )}
              </button>

              {createAbsence.error && (
                <div className="text-[#bcd6e5] text-sm mt-2 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
                  <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                  {createAbsence.error instanceof Error ? createAbsence.error.message : t.absences.createFailed}
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-3 section-stack-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{t.absences.filter}</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="select-field w-full max-w-xs"
                >
                  <option value="all">{t.absences.allStatuses}</option>
                  <option value="pending">{t.absences.statuses.pending}</option>
                  <option value="approved">{t.absences.statuses.approved}</option>
                  <option value="rejected">{t.absences.statuses.rejected}</option>
                </select>
              </div>

              <button
                type="button"
                className="dc-icon-btn h-[46px] w-[46px] rounded-xl shrink-0"
                onClick={() => refetch()}
                title={t.common.refresh}
              >
                <WuxiaIcon name="refresh" className="w-5 h-5" />
              </button>
            </div>

            <div className="section-stack-md">
              {filteredAbsences.length === 0 ? (
                <EmptyState
                  icon={<WuxiaIcon name="calendarX" className="w-10 h-10 text-gray-500" />}
                  title={t.absences.emptyFiltered}
                  description={t.absences.emptyFilteredDescription}
                />
              ) : (
                filteredAbsences.map((absence) => (
                  <div
                    key={absence.id}
                    className="card section-card p-5 sm:p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4">
                      <div className="bg-gray-800/50 p-4 rounded-xl">
                        <div className="text-sm text-gray-400 mb-1">{t.absences.start}</div>
                        <div className="font-bold text-lg">{formatDate(absence.startDate)}</div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-xl">
                        <div className="text-sm text-gray-400 mb-1">{t.absences.end}</div>
                        <div className="font-bold text-lg">{formatDate(absence.endDate)}</div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">{t.absences.reason}</div>
                      <div className="text-gray-300">{absence.reason}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
                      {canModerateAbsences && absence.status === 'pending' && (
                        <>
                          <button
                            type="button"
                            className="btn-primary px-4 py-2 text-sm disabled:opacity-60 w-full sm:w-auto"
                            onClick={() => void handleStatusChange(absence.id, 'approved')}
                            disabled={updateAbsenceStatus.isPending}
                          >
                              <WuxiaIcon name="check" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                            {updateAbsenceStatus.isPending && updateAbsenceStatus.variables?.id === absence.id && updateAbsenceStatus.variables?.status === 'approved'
                              ? t.absences.approving
                              : t.absences.approve}
                          </button>
                          <button
                            type="button"
                            className="btn-secondary px-4 py-2 text-sm disabled:opacity-60 w-full sm:w-auto"
                            onClick={() => void handleStatusChange(absence.id, 'rejected')}
                            disabled={updateAbsenceStatus.isPending}
                          >
                              <WuxiaIcon name="x" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                            {updateAbsenceStatus.isPending && updateAbsenceStatus.variables?.id === absence.id && updateAbsenceStatus.variables?.status === 'rejected'
                              ? t.absences.rejecting
                              : t.absences.reject}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
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
