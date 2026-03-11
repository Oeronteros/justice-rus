'use client';

import { useMemo, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  useHelp,
  useCreateHelpRequest,
  useUpdateHelpStatus,
  useUpdateHelpTimeRange,
  useHelpRsvp,
  useHelpWithdrawRsvp,
  useDeleteHelpRequest,
} from '@/lib/help/hooks';
import { handleApiError } from '@/lib/api/errors';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import { ClassBadge } from '@/components/ClassIcon';
import type { User } from '@/lib/schemas/auth';
import { SectionHero } from '@/components/shared/SectionHero';
import { canModerateContent, hasRoleAtLeast } from '@/lib/authz';
import { useTranslation } from '@/lib/i18n/context';

interface HelpSectionProps {
  user: User;
}

function HelpSectionContent({ user }: HelpSectionProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'open' | 'closed' | 'all'>('open');
  const { data: requests = [], isLoading, error, refetch } = useHelp(status);
  const createRequest = useCreateHelpRequest();
  const updateStatus = useUpdateHelpStatus();
  const updateTimeRange = useUpdateHelpTimeRange();
  const rsvp = useHelpRsvp();
  const withdrawRsvp = useHelpWithdrawRsvp();
  const deleteHelpRequest = useDeleteHelpRequest();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('outer_city_heroic');

  const [gatheringStartLocal, setGatheringStartLocal] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    now.setSeconds(0, 0);
    const d = new Date(now);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });
  const [gatheringEndLocal, setGatheringEndLocal] = useState(() => {
    const later = new Date();
    later.setMinutes(later.getMinutes() + 75);
    later.setSeconds(0, 0);
    const d = new Date(later);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });

  const [editingTimeId, setEditingTimeId] = useState<string | null>(null);
  const [editStartLocal, setEditStartLocal] = useState('');
  const [editEndLocal, setEditEndLocal] = useState('');

  const canModerate = hasRoleAtLeast(user.role, 'officer');
  const canDelete = canModerateContent(user.role);

  const categories = useMemo(
    () => [
      { value: 'outer_city_heroic', label: 'Outer City Heroic' },
      { value: 'inner_city_heroic', label: 'Inner City Heroic' },
      { value: 'battle_royal', label: 'Battle Royal' },
      { value: '12vs12', label: '12vs12' },
      { value: '3vs3', label: '3vs3' },
      { value: 'secret_realm', label: 'Secret Realm' },
    ],
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !details.trim()) return;

    const startDate = new Date(gatheringStartLocal);
    const endDate = new Date(gatheringEndLocal);
    if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime())) return;
    if (endDate.getTime() <= startDate.getTime()) return;
    const startIso = startDate.toISOString();
    const endIso = endDate.toISOString();

    await createRequest.mutateAsync({
      title,
      details,
      category,
      gatheringStart: startIso,
      gatheringEnd: endIso,
    });

    setTitle('');
    setDetails('');
    setCategory('outer_city_heroic');
  };

  const formatDateTimeRange = (start: string, end: string) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      if (!Number.isFinite(s.getTime()) || !Number.isFinite(e.getTime())) return `${start} - ${end}`;
      const sameDay = s.toDateString() === e.toDateString();
      const day = s.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
      const st = s.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      const et = e.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      if (sameDay) return `${day} ${st}–${et}`;
      const day2 = e.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
      return `${day} ${st} → ${day2} ${et}`;
    } catch {
      return `${start} - ${end}`;
    }
  };

  const isoToLocalInput = (iso: string) => {
    const d = new Date(iso);
    if (!Number.isFinite(d.getTime())) return '';
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  const startEditTime = (requestId: string, startIso: string, endIso: string) => {
    setEditingTimeId(requestId);
    setEditStartLocal(isoToLocalInput(startIso));
    setEditEndLocal(isoToLocalInput(endIso));
  };

  const saveEditTime = async (requestId: string) => {
    const startDate = new Date(editStartLocal);
    const endDate = new Date(editEndLocal);
    if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime())) return;
    if (endDate.getTime() <= startDate.getTime()) return;
    const startIso = startDate.toISOString();
    const endIso = endDate.toISOString();
    await updateTimeRange.mutateAsync({ id: requestId, gatheringStart: startIso, gatheringEnd: endIso });
    setEditingTimeId(null);
  };

  const toggleStatus = async (requestId: string, currentStatus: 'open' | 'closed') => {
    const nextStatus = currentStatus === 'closed' ? 'open' : 'closed';
    await updateStatus.mutateAsync({ id: requestId, status: nextStatus });
  };

  const deleteRequest = async (requestId: string) => {
    try {
      await deleteHelpRequest.mutateAsync(requestId);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-stack-lg">
          <SectionHero
            icon={<WuxiaIcon name="help" className="w-5 h-5" />}
            title={t.help.title}
            subtitle={t.help.subtitle}
            chips={['Support Board', 'Open / Closed', 'Officer Review']}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 card section-card p-5 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2f6e8d]/30 to-[#8fb9cc]/30 rounded-full flex items-center justify-center mr-4">
                <WuxiaIcon name="plus" className="w-7 h-7 text-[#8fb9cc]" />
              </div>
              <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">{t.help.createRequest}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="input-field flex items-center text-sm text-gray-400">{t.help.profilePrefix} <span className="text-[#d2e5ef] ml-2">{user.nickname || t.help.currentUserFallback}</span></div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select-field w-full"
                  aria-label={t.help.category}
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1 px-1">{t.help.gatheringStart}</div>
                  <input
                    type="datetime-local"
                    value={gatheringStartLocal}
                    onChange={(e) => setGatheringStartLocal(e.target.value)}
                    className="input-field w-full"
                    aria-label={t.help.gatheringStart}
                    required
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1 px-1">{t.help.gatheringEnd}</div>
                  <input
                    type="datetime-local"
                    value={gatheringEndLocal}
                    onChange={(e) => setGatheringEndLocal(e.target.value)}
                    className="input-field w-full"
                    aria-label={t.help.gatheringEnd}
                    required
                  />
                </div>
              </div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.help.titlePlaceholder}
                className="input-field w-full"
                aria-label={t.help.titlePlaceholder}
                maxLength={140}
                required
              />

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t.help.detailsPlaceholder}
                className="input-field min-h-[140px] w-full"
                aria-label={t.help.detailsPlaceholder}
                maxLength={5000}
                required
              />

              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={createRequest.isPending}
              >
                {createRequest.isPending ? (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
                    {t.help.submitting}
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="seal" className="w-4 h-4 mr-3" />
                    {t.help.submit}
                  </span>
                )}
              </button>

              {createRequest.error && (
                <div className="text-[#bcd6e5] text-sm mt-2 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
                  <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                  {createRequest.error instanceof Error ? createRequest.error.message : t.help.createFailed}
                </div>
              )}
            </form>
          </div>

            <div className="lg:col-span-3 section-stack-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{t.help.show}</span>
                <div className="inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70">
                  {(['open', 'closed', 'all'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStatus(value)}
                      className={`px-3 py-2 text-sm rounded-2xl transition-colors ${
                        status === value ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'
                      }`}
                    >
                      {value === 'open' ? t.help.open : value === 'closed' ? t.help.closed : t.help.all}
                    </button>
                  ))}
                </div>
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

            {isLoading ? (
              <LoadingState
                title={t.help.title}
                subtitle="Собираем активные запросы и отклики..."
                icon={<WuxiaIcon name="help" className="w-6 h-6 text-[#8fb9cc]" />}
                skeletonCount={3}
                layout="list"
              />
            ) : requests.length === 0 ? (
              <div className="card section-card p-8 sm:p-10 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-[#101922]/70 border border-[#223544]/60 grid place-items-center">
                    <WuxiaIcon name="seal" className="w-8 h-8 text-[#8fb9cc]" />
                  </div>
                </div>
                <div className="text-xl font-semibold text-[#e6eff5]">{t.help.noRequestsTitle}</div>
                <p className="text-gray-400 mt-2">{t.help.noRequestsDescription}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-5">
                {requests.map((req) => {
                  const isResponder = Boolean(user.id) && req.responders.some((r) => r.userId === user.id);
                  const canEditTime =
                    canModerate ||
                    (req.authorUserId && user.id && req.authorUserId === user.id) ||
                    (!req.authorUserId && user.nickname && req.author && req.author.toLowerCase() === user.nickname.toLowerCase());

                  return (
                    <div key={req.id} className="card section-card p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                              <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                              {req.category}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                req.status === 'closed'
                                  ? 'bg-[#0f1720]/70 text-gray-400 border border-[#223140]/70'
                                  : 'bg-[#183244]/70 text-[#e6eff5] border border-[#2f6e8d]/50'
                              }`}
                            >
                              {req.status === 'closed' ? t.help.statusClosed : t.help.statusOpen}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <div className="inline-flex items-center gap-2 text-sm text-gray-300">
                              <WuxiaIcon name="calendar" className="w-4 h-4 text-[#8fb9cc]" />
                              <span className="text-[#d2e5ef]">{t.help.gatheringLabel} {formatDateTimeRange(req.gatheringStart, req.gatheringEnd)}</span>
                            </div>
                            {canEditTime && editingTimeId !== req.id && (
                              <button
                                type="button"
                                className="text-sm font-medium text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors text-left"
                                onClick={() => startEditTime(req.id, req.gatheringStart, req.gatheringEnd)}
                              >
                                {t.help.editTime}
                              </button>
                            )}
                          </div>

                          {editingTimeId === req.id && (
                            <div className="mb-4 p-4 bg-[#0b141d]/70 border border-[#223140]/70 rounded-2xl">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <div className="text-xs text-gray-400 mb-1 px-1">Сбор: начало</div>
                                  <input
                                    type="datetime-local"
                                    value={editStartLocal}
                                    onChange={(e) => setEditStartLocal(e.target.value)}
                                    className="input-field w-full"
                                    aria-label={t.help.gatheringStart}
                                    required
                                  />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400 mb-1 px-1">Сбор: конец</div>
                                  <input
                                    type="datetime-local"
                                    value={editEndLocal}
                                    onChange={(e) => setEditEndLocal(e.target.value)}
                                    className="input-field w-full"
                                    aria-label={t.help.gatheringEnd}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-3 mt-3">
                                <button
                                  type="button"
                                  className="btn-primary px-4 py-2 w-full sm:w-auto"
                                  onClick={() => saveEditTime(req.id)}
                                  disabled={updateTimeRange.isPending}
                                >
                                  Сохранить
                                </button>
                                <button
                                  type="button"
                                  className="dc-icon-btn px-4 py-2 rounded-xl w-full sm:w-auto"
                                  onClick={() => setEditingTimeId(null)}
                                >
                                  Отмена
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="mb-4">
                            <div className="text-xs text-gray-400 mb-2">Откликнулись ({req.responders.length})</div>
                            {req.responders.length === 0 ? (
                              <div className="text-xs text-gray-500">Пока никто не откликнулся</div>
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                {req.responders.map((r) => (
                                  <span
                                    key={`${req.id}:${r.userId}`}
                                    className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#101922]/70 border border-[#223544]/60 text-[#d2e5ef] rounded-full text-xs"
                                    title={r.respondedAt}
                                  >
                                    <span>{r.nickname}</span>
                                    {r.className ? (
                                      <>
                                        <span className="text-[#6f8799]">·</span>
                                        <ClassBadge className={r.className} textClassName="text-[#d2e5ef] text-xs" iconSizeClassName="h-6 w-6" />
                                      </>
                                    ) : null}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <h3 className="text-xl font-bold font-orbitron text-[#e6eff5] mb-2 break-words">{req.title}</h3>
                          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{req.details}</p>

                          {req.status === 'open' && (
                            <div className="mt-4 flex flex-wrap gap-3">
                              {isResponder ? (
                                <button
                                  type="button"
                                  className="dc-icon-btn px-4 py-2 rounded-xl text-sm"
                                  onClick={() => withdrawRsvp.mutateAsync(req.id)}
                                  disabled={withdrawRsvp.isPending}
                                >
                                  Убрать себя
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn-primary px-4 py-2 text-sm w-full sm:w-auto"
                                  onClick={() => rsvp.mutateAsync({ id: req.id })}
                                  disabled={rsvp.isPending}
                                >
                                  Откликнуться
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="sm:text-right text-sm text-gray-400 flex flex-col gap-3">
                          <div>
                            <div className="inline-flex items-center gap-2">
                              <WuxiaIcon name="user" className="w-4 h-4" />
                              <span>{req.author}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 mt-1">
                              <WuxiaIcon name="calendar" className="w-4 h-4" />
                              <span>{formatDate(req.createdAt)}</span>
                            </div>
                          </div>

                          {(canModerate || canDelete) && (
                            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                              {canModerate && (
                                <button
                                  type="button"
                                  className="text-sm font-medium text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors"
                                  onClick={() => toggleStatus(req.id, req.status)}
                                  disabled={updateStatus.isPending}
                                >
                                  <WuxiaIcon
                                    name={req.status === 'closed' ? 'redo' : 'checkCircle'}
                                    className="inline-block w-4 h-4 mr-2 align-text-bottom"
                                  />
                                  {req.status === 'closed' ? 'Открыть снова' : 'Закрыть'}
                                </button>
                              )}
                              {canDelete && (
                                <button
                                  type="button"
                                  className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                                  onClick={() => deleteRequest(req.id)}
                                  disabled={deleteHelpRequest.isPending}
                                >
                                  <WuxiaIcon name="trash" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                                  Удалить
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HelpSection(props: HelpSectionProps) {
  return (
    <ErrorBoundary>
      <HelpSectionContent {...props} />
    </ErrorBoundary>
  );
}
