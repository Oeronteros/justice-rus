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
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { opsStyles } from '@/components/sections/ops/Ops.stylex';

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
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <div {...stylex.props(uiStyles.stackLg)}>
          <SectionHero
            icon={<WuxiaIcon name="help" className="w-5 h-5" />}
            title={t.help.title}
            subtitle={t.help.subtitle}
            chips={['Support Board', 'Open / Closed', 'Officer Review']}
          />

          <div {...stylex.props(opsStyles.splitGrid)}>
            <div {...stylex.props(opsStyles.sideCol, uiStyles.card, uiStyles.sectionCard, opsStyles.panel)}>
            <div {...stylex.props(opsStyles.iconTitleRow)}>
              <div {...stylex.props(opsStyles.iconWrap)}>
                <WuxiaIcon name="plus" className="w-7 h-7 text-[#8fb9cc]" />
              </div>
              <h3 {...stylex.props(opsStyles.panelTitle)}>{t.help.createRequest}</h3>
            </div>

            <form onSubmit={handleSubmit} {...stylex.props(opsStyles.formStack)}>
              <div {...stylex.props(opsStyles.fieldGrid2)}>
                <div {...stylex.props(uiStyles.input, opsStyles.helperInline)}>{t.help.profilePrefix} <span {...stylex.props(opsStyles.helperAccent)}>{user.nickname || t.help.currentUserFallback}</span></div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  {...stylex.props(uiStyles.select)}
                  aria-label={t.help.category}
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div {...stylex.props(opsStyles.fieldGrid2)}>
                <div>
                  <div {...stylex.props(opsStyles.fieldLabel)} style={{ fontSize: '0.75rem', marginBottom: 4, paddingInline: 4 }}>{t.help.gatheringStart}</div>
                  <input
                    type="datetime-local"
                    value={gatheringStartLocal}
                    onChange={(e) => setGatheringStartLocal(e.target.value)}
                    {...stylex.props(uiStyles.input)}
                    aria-label={t.help.gatheringStart}
                    required
                  />
                </div>
                <div>
                  <div {...stylex.props(opsStyles.fieldLabel)} style={{ fontSize: '0.75rem', marginBottom: 4, paddingInline: 4 }}>{t.help.gatheringEnd}</div>
                  <input
                    type="datetime-local"
                    value={gatheringEndLocal}
                    onChange={(e) => setGatheringEndLocal(e.target.value)}
                    {...stylex.props(uiStyles.input)}
                    aria-label={t.help.gatheringEnd}
                    required
                  />
                </div>
              </div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.help.titlePlaceholder}
                {...stylex.props(uiStyles.input)}
                aria-label={t.help.titlePlaceholder}
                maxLength={140}
                required
              />

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t.help.detailsPlaceholder}
                {...stylex.props(uiStyles.input)}
                style={{ minHeight: 140 }}
                aria-label={t.help.detailsPlaceholder}
                maxLength={5000}
                required
              />

              <button
                type="submit"
                {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                style={{ width: '100%', minHeight: 48 }}
                disabled={createRequest.isPending}
              >
                {createRequest.isPending ? (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="spinner" className="spinner-icon w-4 h-4 mr-3" />
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
                <div {...stylex.props(uiStyles.notice, uiStyles.noticeError)}>
                  <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                  {createRequest.error instanceof Error ? createRequest.error.message : t.help.createFailed}
                </div>
              )}
            </form>
          </div>

            <div {...stylex.props(opsStyles.mainCol, opsStyles.listStack)}>
            <div {...stylex.props(opsStyles.toolbarSurface)}>
              <div {...stylex.props(opsStyles.actionRow)}>
                <span {...stylex.props(opsStyles.helperInline)}>{t.help.show}</span>
                <div {...stylex.props(opsStyles.actionRow)}>
                  {(['open', 'closed', 'all'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStatus(value)}
                      {...stylex.props(uiStyles.chip, status === value && uiStyles.chipActive)}
                    >
                      {value === 'open' ? t.help.open : value === 'closed' ? t.help.closed : t.help.all}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                {...stylex.props(uiStyles.iconButton)}
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
              <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, opsStyles.emptyCard)}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <div {...stylex.props(opsStyles.emptyIconSurface)}>
                    <WuxiaIcon name="seal" className="w-8 h-8 text-[#8fb9cc]" />
                  </div>
                </div>
                <div {...stylex.props(opsStyles.emptyTitle)}>{t.help.noRequestsTitle}</div>
                <p {...stylex.props(opsStyles.emptyDescription)}>{t.help.noRequestsDescription}</p>
              </div>
            ) : (
              <div {...stylex.props(opsStyles.listStack)}>
                {requests.map((req) => {
                  const isResponder = Boolean(user.id) && req.responders.some((r) => r.userId === user.id);
                  const canEditTime =
                    canModerate ||
                    (req.authorUserId && user.id && req.authorUserId === user.id) ||
                    (!req.authorUserId && user.nickname && req.author && req.author.toLowerCase() === user.nickname.toLowerCase());

                  return (
                    <div key={req.id} {...stylex.props(uiStyles.card, uiStyles.sectionCard, opsStyles.panel)}>
                      <div {...stylex.props(opsStyles.toolbar)} style={{ alignItems: 'flex-start' }}>
                        <div className="min-w-0">
                          <div {...stylex.props(opsStyles.actionRow)} style={{ marginBottom: 12 }}>
                            <span {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)}>
                              <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                              {req.category}
                            </span>
                            <span
                              {...stylex.props(uiStyles.badge, req.status === 'closed' ? uiStyles.badgeMuted : uiStyles.badgeSuccess)}
                            >
                              {req.status === 'closed' ? t.help.statusClosed : t.help.statusOpen}
                            </span>
                          </div>

                          <div {...stylex.props(opsStyles.toolbar)} style={{ marginBottom: 12 }}>
                            <div {...stylex.props(opsStyles.helperInline)} style={{ color: 'rgba(209,213,219,0.95)' }}>
                              <WuxiaIcon name="calendar" className="w-4 h-4 text-[#8fb9cc]" />
                              <span style={{ color: '#d2e5ef' }}>{t.help.gatheringLabel} {formatDateTimeRange(req.gatheringStart, req.gatheringEnd)}</span>
                            </div>
                            {canEditTime && editingTimeId !== req.id && (
                              <button
                                type="button"
                                {...stylex.props(uiStyles.chip)}
                                onClick={() => startEditTime(req.id, req.gatheringStart, req.gatheringEnd)}
                              >
                                {t.help.editTime}
                              </button>
                            )}
                          </div>

                          {editingTimeId === req.id && (
                            <div {...stylex.props(uiStyles.softPanel)} style={{ marginBottom: 16, padding: 16 }}>
                              <div {...stylex.props(opsStyles.fieldGrid2)}>
                                <div>
                                  <div {...stylex.props(opsStyles.fieldLabel)} style={{ fontSize: '0.75rem', marginBottom: 4, paddingInline: 4 }}>Сбор: начало</div>
                                  <input
                                    type="datetime-local"
                                    value={editStartLocal}
                                    onChange={(e) => setEditStartLocal(e.target.value)}
                                    {...stylex.props(uiStyles.input)}
                                    aria-label={t.help.gatheringStart}
                                    required
                                  />
                                </div>
                                <div>
                                  <div {...stylex.props(opsStyles.fieldLabel)} style={{ fontSize: '0.75rem', marginBottom: 4, paddingInline: 4 }}>Сбор: конец</div>
                                  <input
                                    type="datetime-local"
                                    value={editEndLocal}
                                    onChange={(e) => setEditEndLocal(e.target.value)}
                                    {...stylex.props(uiStyles.input)}
                                    aria-label={t.help.gatheringEnd}
                                    required
                                  />
                                </div>
                              </div>

                              <div {...stylex.props(opsStyles.actionRow)} style={{ marginTop: 12 }}>
                                <button
                                  type="button"
                                  {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                                  onClick={() => saveEditTime(req.id)}
                                  disabled={updateTimeRange.isPending}
                                >
                                  Сохранить
                                </button>
                                <button
                                  type="button"
                                  {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                                  onClick={() => setEditingTimeId(null)}
                                >
                                  Отмена
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="mb-4">
                            <div {...stylex.props(opsStyles.fieldLabel)} style={{ fontSize: '0.75rem', marginBottom: 8 }}>Откликнулись ({req.responders.length})</div>
                            {req.responders.length === 0 ? (
                              <div {...stylex.props(opsStyles.helperInline)} style={{ fontSize: '0.75rem' }}>Пока никто не откликнулся</div>
                            ) : (
                              <div {...stylex.props(opsStyles.actionRow)}>
                                {req.responders.map((r) => (
                                  <span
                                    key={`${req.id}:${r.userId}`}
                                    {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)}
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

                          <h3 {...stylex.props(opsStyles.panelTitle)} style={{ fontSize: '1.25rem', marginBottom: 8 }}>{req.title}</h3>
                          <p {...stylex.props(opsStyles.bodyText)} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{req.details}</p>

                          {req.status === 'open' && (
                            <div {...stylex.props(opsStyles.actionRow)} style={{ marginTop: 16 }}>
                              {isResponder ? (
                                <button
                                  type="button"
                                  {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                                  onClick={() => withdrawRsvp.mutateAsync(req.id)}
                                  disabled={withdrawRsvp.isPending}
                                >
                                  Убрать себя
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                                  onClick={() => rsvp.mutateAsync({ id: req.id })}
                                  disabled={rsvp.isPending}
                                >
                                  Откликнуться
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        <div {...stylex.props(opsStyles.listStack)} style={{ fontSize: '0.875rem', color: 'rgba(156,163,175,0.95)' }}>
                          <div>
                            <div {...stylex.props(opsStyles.helperInline)}>
                              <WuxiaIcon name="user" className="w-4 h-4" />
                              <span>{req.author}</span>
                            </div>
                            <div {...stylex.props(opsStyles.helperInline)} style={{ marginTop: 4 }}>
                              <WuxiaIcon name="calendar" className="w-4 h-4" />
                              <span>{formatDate(req.createdAt)}</span>
                            </div>
                          </div>

                          {(canModerate || canDelete) && (
                            <div {...stylex.props(opsStyles.actionRow)} style={{ justifyContent: 'flex-end' }}>
                              {canModerate && (
                                <button
                                  type="button"
                                  {...stylex.props(uiStyles.chip)}
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
                                  {...stylex.props(uiStyles.chip, uiStyles.badgeDanger)}
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
