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
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { opsStyles } from '@/components/sections/ops/Ops.stylex';

interface AbsencesSectionProps {
  user: User;
}

const statusLabels: Record<string, string> = {
  pending: 'На рассмотрении',
  approved: 'Одобрено',
  rejected: 'Отклонено',
};

const getStatusClass = (status: string) => {
  const classes: Record<string, stylex.StyleXStyles> = {
    pending: opsStyles.statusPending,
    approved: opsStyles.statusApproved,
    rejected: opsStyles.statusRejected,
  };
  return classes[status] || opsStyles.statusPending;
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
        icon={<WuxiaIcon name="absences" {...stylex.props(uiStyles.iconLg, uiStyles.iconDanger)} />}
        skeletonCount={3}
        layout="list"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" {...stylex.props(uiStyles.iconXl, uiStyles.iconDanger)} />}
        title={t.absences.error}
        description={error instanceof Error ? error.message : t.absences.error}
        action={
          <button onClick={() => refetch()} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}>
            <WuxiaIcon name="redo" {...stylex.props(uiStyles.iconMd, uiStyles.inlineIcon)} />
            {t.errors.tryAgain}
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <div {...stylex.props(uiStyles.stackLg)}>
          <SectionHero
            icon={<WuxiaIcon name="absences" {...stylex.props(uiStyles.iconMd)} />}
            title={t.absences.title}
            subtitle={t.absences.subtitle}
            chips={['Roster Health', 'Requests', 'Status Tracking']}
          />

        <div {...stylex.props(opsStyles.splitGrid)}>
          <div {...stylex.props(opsStyles.sideCol, uiStyles.card, uiStyles.sectionCard, opsStyles.panel)}>
            <div {...stylex.props(opsStyles.iconTitleRow)}>
              <div {...stylex.props(opsStyles.iconWrap)}>
                <WuxiaIcon name="plus" {...stylex.props(uiStyles.iconXl, uiStyles.iconAccent)} />
              </div>
              <h3 {...stylex.props(opsStyles.panelTitle)}>{t.absences.createRequest}</h3>
            </div>

            <form onSubmit={handleSubmit} {...stylex.props(opsStyles.formStack)} data-testid="absence-form">
              <div {...stylex.props(opsStyles.helperInline)}>{t.absences.profilePrefix} <span {...stylex.props(opsStyles.helperAccent)}>{user.nickname || t.absences.currentUserFallback}</span></div>

              <div {...stylex.props(opsStyles.fieldGrid2)}>
                <div>
                  <label {...stylex.props(opsStyles.fieldLabel)}>{t.absences.startDate}</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    {...stylex.props(uiStyles.input)}
                    required
                  />
                </div>
                <div>
                  <label {...stylex.props(opsStyles.fieldLabel)}>{t.absences.endDate}</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    {...stylex.props(uiStyles.input)}
                    required
                  />
                </div>
              </div>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.absences.reasonPlaceholder}
                {...stylex.props(uiStyles.input)}
                style={{ minHeight: 120 }}
                maxLength={500}
                required
              />

              <button
                type="submit"
                {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                style={{ width: '100%', minHeight: 48 }}
                disabled={createAbsence.isPending}
              >
                {createAbsence.isPending ? (
                  <span {...stylex.props(uiStyles.inlineCenter)}>
                    <WuxiaIcon name="spinner" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon, uiStyles.iconSpin)} />
                    {t.absences.submitting}
                  </span>
                ) : (
                  <span {...stylex.props(uiStyles.inlineCenter)}>
                    <WuxiaIcon name="seal" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
                    {t.absences.submit}
                  </span>
                )}
              </button>

              {createAbsence.error && (
                <div {...stylex.props(opsStyles.errorBox)}>
                  <WuxiaIcon name="alertTriangle" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
                  {createAbsence.error instanceof Error ? createAbsence.error.message : t.absences.createFailed}
                </div>
              )}
            </form>
          </div>

          <div {...stylex.props(opsStyles.mainCol, opsStyles.listStack)}>
            <div {...stylex.props(opsStyles.toolbar)}>
              <div {...stylex.props(opsStyles.helperInline)}>
                <span>{t.absences.filter}</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  {...stylex.props(uiStyles.select)}
                  style={{ maxWidth: 320 }}
                >
                  <option value="all">{t.absences.allStatuses}</option>
                  <option value="pending">{t.absences.statuses.pending}</option>
                  <option value="approved">{t.absences.statuses.approved}</option>
                  <option value="rejected">{t.absences.statuses.rejected}</option>
                </select>
              </div>

              <button
                type="button"
                {...stylex.props(uiStyles.iconButton)}
                onClick={() => refetch()}
                title={t.common.refresh}
              >
                <WuxiaIcon name="refresh" {...stylex.props(uiStyles.iconMd)} />
              </button>
            </div>

            <div {...stylex.props(opsStyles.listStack)} data-testid="absence-list">
              {filteredAbsences.length === 0 ? (
                <EmptyState
                  icon={<WuxiaIcon name="calendarX" {...stylex.props(uiStyles.icon2xl, uiStyles.iconMuted)} />}
                  title={t.absences.emptyFiltered}
                  description={t.absences.emptyFilteredDescription}
                />
              ) : (
                filteredAbsences.map((absence) => (
                  <div
                    key={absence.id}
                    {...stylex.props(uiStyles.card, uiStyles.sectionCard)}
                    style={{ padding: '20px 24px' }}
                  >
                    <div {...stylex.props(opsStyles.toolbar)} style={{ marginBottom: 16, alignItems: 'flex-start' }}>
                      <h3 {...stylex.props(opsStyles.panelTitle)} style={{ color: '#f87171', fontSize: '1.25rem' }}>
                        {absence.member}
                      </h3>
                      <span {...stylex.props(opsStyles.statusBadge, getStatusClass(absence.status))}>
                        <span {...stylex.props(uiStyles.statusDot)} />
                        {statusLabels[absence.status] || absence.status}
                      </span>
                    </div>

                    <div {...stylex.props(opsStyles.statGrid2)}>
                      <div {...stylex.props(opsStyles.statCard)}>
                        <div {...stylex.props(opsStyles.statLabel)}>{t.absences.start}</div>
                        <div {...stylex.props(opsStyles.statValue)}>{formatDate(absence.startDate)}</div>
                      </div>
                      <div {...stylex.props(opsStyles.statCard)}>
                        <div {...stylex.props(opsStyles.statLabel)}>{t.absences.end}</div>
                        <div {...stylex.props(opsStyles.statValue)}>{formatDate(absence.endDate)}</div>
                      </div>
                    </div>

                    <div {...stylex.props(opsStyles.bodyCard)}>
                      <div {...stylex.props(opsStyles.statLabel)}>{t.absences.reason}</div>
                      <div {...stylex.props(opsStyles.bodyText)}>{absence.reason}</div>
                    </div>

                    <div {...stylex.props(opsStyles.actionRow)} style={{ justifyContent: 'flex-end', marginTop: 24 }} data-testid="absence-moderation-controls">
                      {canModerateAbsences && absence.status === 'pending' && (
                        <>
                          <button
                            type="button"
                            {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                            onClick={() => void handleStatusChange(absence.id, 'approved')}
                            disabled={updateAbsenceStatus.isPending}
                          >
                              <WuxiaIcon name="check" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
                            {updateAbsenceStatus.isPending && updateAbsenceStatus.variables?.id === absence.id && updateAbsenceStatus.variables?.status === 'approved'
                              ? t.absences.approving
                              : t.absences.approve}
                          </button>
                          <button
                            type="button"
                            {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                            onClick={() => void handleStatusChange(absence.id, 'rejected')}
                            disabled={updateAbsenceStatus.isPending}
                          >
                              <WuxiaIcon name="x" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
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
