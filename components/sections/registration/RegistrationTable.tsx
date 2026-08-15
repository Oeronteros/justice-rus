'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { handleApiError } from '@/lib/api/errors';
import { useUpdateRegistrationStats } from '@/lib/registration/hooks';
import { getKPIClass, getKpiIndicator, getRankClass, getStatusClass } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import { ClassBadge } from '@/components/ClassIcon';
import { PrefixBadge } from '@/components/PrefixBadge';
import type { User } from '@/lib/schemas/auth';
import type { Registration } from '@/lib/schemas/registration';
import { canSeeNumericKpi, hasRoleAtLeast } from '@/lib/authz';
import type { UpdateRegistrationStatsPayload } from '@/lib/api/registrations';
import type { RegistrationColumnLabels } from './columnLabels';

interface RegistrationTableProps {
  registrations: Registration[];
  user: User;
  onRefresh?: () => void;
  columnLabels: RegistrationColumnLabels;
}

const rankLabels: Record<string, string> = {
  guest: 'Гость',
  member: 'Брат',
  officer: 'Офицер',
  head: 'Глава',
  sysadmin: 'Сис.Админ',
};

const statusLabels: Record<string, string> = {
  active: 'Активен',
  inactive: 'Неактивен',
  pending: 'Ожидает',
  leave: 'Отгул',
};

type EditableNumericKey =
  | 'elo'
  | 'mmr20'
  | 'bounty'
  | 'outerHeroic'
  | 'innerHeroic'
  | 'crimsonSands'
  | 'abyss'
  | 'gvg'
  | 'secretRealm';

type EditableRegistrationDraft = {
  discordHandle: string;
  className: string;
  guild: string;
  elo: string;
  mmr20: string;
  bounty: string;
  outerHeroic: string;
  innerHeroic: string;
  crimsonSands: string;
  abyss: string;
  gvg: string;
  secretRealm: string;
};

const editableNumericFields: Array<{ key: EditableNumericKey; label: string }> = [
  { key: 'elo', label: 'ELO дуэлей' },
  { key: 'mmr20', label: 'Best MMR PvP (MMR20)' },
  { key: 'bounty', label: 'Bounty' },
  { key: 'outerHeroic', label: 'Outer Heroic' },
  { key: 'innerHeroic', label: 'Inner Heroic' },
  { key: 'crimsonSands', label: 'Crimson Sands' },
  { key: 'abyss', label: 'Abyss' },
  { key: 'gvg', label: 'GVG' },
  { key: 'secretRealm', label: 'Secret Realm' },
];

function toEditDraft(registration: Registration): EditableRegistrationDraft {
  return {
    discordHandle: registration.discordHandle || '',
    className: registration.class || '',
    guild: registration.guild || '',
    elo: String(registration.elo || 0),
    mmr20: String(registration.mmr20 || 0),
    bounty: String(registration.bounty || 0),
    outerHeroic: String(registration.outerHeroic || 0),
    innerHeroic: String(registration.innerHeroic || 0),
    crimsonSands: String(registration.crimsonSands || 0),
    abyss: String(registration.abyss || 0),
    gvg: String(registration.gvg || 0),
    secretRealm: String(registration.secretRealm || 0),
  };
}

function getDisplayDiscord(registration: Registration): string | null {
  const discordHandle = registration.discordHandle?.trim();
  if (discordHandle) {
    return discordHandle;
  }

  const discordIdentity = registration.discord?.trim();
  if (!discordIdentity || discordIdentity.toLowerCase().startsWith('portal:')) {
    return null;
  }

  return discordIdentity;
}

function normalizeNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function appendChangedNumber(
  payload: UpdateRegistrationStatsPayload,
  key: EditableNumericKey,
  nextValue: string,
  currentValue: number
) {
  const parsed = normalizeNumberInput(nextValue);
  if (parsed !== currentValue) {
    payload[key] = parsed;
  }
}

function getAvatarInitials(registration: Registration) {
  const base = registration.nickname || getDisplayDiscord(registration) || 'SM';
  return base
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'SM';
}

function RegistrationIdentity({ registration, compact = false }: { registration: Registration; compact?: boolean }) {
  const initials = getAvatarInitials(registration);
  const displayDiscord = getDisplayDiscord(registration);
  const sizeClass = compact ? 'h-11 w-11 text-xs' : 'h-9 w-9 text-[11px]';

  return (
    <div className="flex items-center gap-3 min-w-0">
      {registration.avatarUrl ? (
        <Image
          src={registration.avatarUrl}
          alt={registration.nickname || displayDiscord || 'Avatar'}
          width={compact ? 44 : 36}
          height={compact ? 44 : 36}
          className={`${sizeClass} rounded-full border border-[#385264] object-cover bg-[#0c151d] shrink-0`}
          unoptimized
        />
      ) : (
        <div className={`${sizeClass} rounded-full border border-[#385264] bg-gradient-to-br from-[#223544] to-[#4a90b0] text-[#f7fbff] font-semibold shrink-0 grid place-items-center`}>
          {initials}
        </div>
      )}

      <div className="min-w-0">
        <div className="font-medium truncate">{displayDiscord || 'Discord не указан'}</div>
        <div className="text-xs text-gray-400 truncate">{registration.nickname}</div>
      </div>
    </div>
  );
}

function renderActivityValue(value: number) {
  if (value <= 0) {
    return '—';
  }

  return value > 1 ? `${value} ✓` : '✓';
}

function KpiValue({ registration, user }: { registration: Registration; user: User }) {
  if (canSeeNumericKpi(user.role) || registration.nickname.toLowerCase() === (user.nickname || '').toLowerCase()) {
    return <span className={`${getKPIClass(registration.kpi)} font-medium`}>{registration.kpi}</span>;
  }

  const indicator = getKpiIndicator(registration.kpi);
  return (
    <span className={`inline-flex items-center gap-2 ${indicator.className}`}>
      <span className="inline-block w-2.5 h-2.5 rounded-full bg-current"></span>
      <span className="text-xs uppercase tracking-wide">{indicator.label}</span>
    </span>
  );
}

function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  return isMobile;
}

export function RegistrationTable({ registrations, user, onRefresh, columnLabels }: RegistrationTableProps) {
  const canSeeFullStats = hasRoleAtLeast(user.role, 'officer');
  const isMobileLayout = useIsMobileLayout();
  const updateRegistrationStats = useUpdateRegistrationStats();
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [editDraft, setEditDraft] = useState<EditableRegistrationDraft | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  const openEditor = (registration: Registration) => {
    setEditingRegistration(registration);
    setEditDraft(toEditDraft(registration));
    setEditError(null);
  };

  const closeEditor = () => {
    if (updateRegistrationStats.isPending) {
      return;
    }

    setEditingRegistration(null);
    setEditDraft(null);
    setEditError(null);
  };

  const updateDraftField = (key: keyof EditableRegistrationDraft, value: string) => {
    setEditDraft((current) => {
      if (!current) return current;
      return {
        ...current,
        [key]: value,
      };
    });
  };

  const saveEditor = async () => {
    if (!editingRegistration || !editDraft) {
      return;
    }

    const payload: UpdateRegistrationStatsPayload = {
      nickname: editingRegistration.nickname,
    };

    const trimmedDiscordHandle = editDraft.discordHandle.trim();
    const trimmedClassName = editDraft.className.trim();
    const trimmedGuild = editDraft.guild.trim();

    if (trimmedDiscordHandle !== (editingRegistration.discordHandle || '')) {
      payload.discordHandle = trimmedDiscordHandle;
    }

    if (trimmedClassName && trimmedClassName !== editingRegistration.class) {
      payload.className = trimmedClassName;
    }

    if (trimmedGuild !== editingRegistration.guild) {
      payload.guild = trimmedGuild;
    }

    appendChangedNumber(payload, 'elo', editDraft.elo, editingRegistration.elo);
    appendChangedNumber(payload, 'mmr20', editDraft.mmr20, editingRegistration.mmr20);
    appendChangedNumber(payload, 'bounty', editDraft.bounty, editingRegistration.bounty);
    appendChangedNumber(payload, 'outerHeroic', editDraft.outerHeroic, editingRegistration.outerHeroic);
    appendChangedNumber(payload, 'innerHeroic', editDraft.innerHeroic, editingRegistration.innerHeroic);
    appendChangedNumber(payload, 'crimsonSands', editDraft.crimsonSands, editingRegistration.crimsonSands);
    appendChangedNumber(payload, 'abyss', editDraft.abyss, editingRegistration.abyss);
    appendChangedNumber(payload, 'gvg', editDraft.gvg, editingRegistration.gvg);
    appendChangedNumber(payload, 'secretRealm', editDraft.secretRealm, editingRegistration.secretRealm);

    if (Object.keys(payload).length === 1) {
      closeEditor();
      return;
    }

    try {
      setEditError(null);
      await updateRegistrationStats.mutateAsync(payload);

      closeEditor();
      onRefresh?.();
    } catch (error) {
      setEditError(handleApiError(error));
    }
  };

  if (registrations.length === 0) {
    return (
      <div className="card section-card ds-section-panel px-6 py-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full ds-section-panel-soft grid place-items-center">
            <WuxiaIcon name="usersSlash" className="w-8 h-8 text-gray-400" />
          </div>
          <span className="ui-badge ui-badge-muted">Roster empty</span>
          <div className="text-lg text-[#d9e9f2] font-semibold">Записей не найдено</div>
          <div className="text-sm text-[#9fb5c3]">Смени поиск или фильтры</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobileLayout ? (
        <div className="table-card-grid">
          {registrations.map((registration, index) => (
            <div key={`${registration.nickname}-${registration.discord || index}`} className="table-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <RegistrationIdentity registration={registration} compact />
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.14em] text-[#9ec5d8] mb-1">#{index + 1}</div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-lg font-semibold text-[#e6eff5]">{registration.nickname}</div>
                      <PrefixBadge prefix={registration.prefix} variant="compact" />
                    </div>
                    <div className="text-sm text-gray-400 mt-1 truncate">{getDisplayDiscord(registration) || 'Discord не указан'}</div>
                  </div>
                </div>
                <span className={`ui-badge ${getRankClass(registration.rank)}`}>
                  {rankLabels[registration.rank] || registration.rank}
                </span>
              </div>

              <div className="table-card-section grid grid-cols-2 gap-3 text-sm">
                <div className="metric-tile">
                  <div className="metric-label">{columnLabels.class}</div>
                  <ClassBadge className={registration.class} textClassName="text-[#e6eff5]" iconSizeClassName="h-8 w-8" />
                </div>
                <div className="metric-tile">
                  <div className="metric-label">{columnLabels.guild}</div>
                  <div className="metric-value">{registration.guild || '—'}</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-label">{columnLabels.elo}</div>
                  <div className="metric-value">{registration.elo || 0}</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-label">{columnLabels.mmr20}</div>
                  <div className="metric-value">{registration.mmr20 || 0}</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-label">{columnLabels.bounty}</div>
                  <div className="metric-value">{registration.bounty || 0}</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-label">{columnLabels.status}</div>
                  <span className={`ui-badge ${getStatusClass(registration.status)}`}>
                    {statusLabels[registration.status] || registration.status}
                  </span>
                </div>
              </div>

              <div className="table-card-section grid grid-cols-2 gap-3 text-sm">
                {[
                  ['outerHeroic', renderActivityValue(registration.outerHeroic || 0)],
                  ['innerHeroic', renderActivityValue(registration.innerHeroic || 0)],
                  ['crimsonSands', renderActivityValue(registration.crimsonSands || 0)],
                  ['abyss', renderActivityValue(registration.abyss || 0)],
                  ['gvg', renderActivityValue(registration.gvg || 0)],
                  ['secretRealm', renderActivityValue(registration.secretRealm || 0)],
                  ['marks', String(registration.marks || 0)],
                ].map(([key, value]) => (
                  <div key={key} className="metric-tile">
                    <div className="metric-label">{columnLabels[key as keyof RegistrationColumnLabels]}</div>
                    <div className="metric-value">{value}</div>
                  </div>
                ))}
                <div className="metric-tile col-span-2">
                  <div className="metric-label">{columnLabels.kpi}</div>
                  <KpiValue registration={registration} user={user} />
                </div>
              </div>

              {canSeeFullStats && (
                <button type="button" className="btn-secondary w-full py-3" onClick={() => openEditor(registration)}>
                  Изменить запись
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="table-frame overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th className="text-left">{columnLabels.index}</th>
                <th className="text-left">{columnLabels.discord}</th>
                <th className="text-left">{columnLabels.nickname}</th>
                <th className="text-left">{columnLabels.rank}</th>
                <th className="text-left">{columnLabels.class}</th>
                <th className="text-left">{columnLabels.guild}</th>
                <th className="text-left">{columnLabels.elo}</th>
                <th className="text-left">{columnLabels.mmr20}</th>
                <th className="text-left">{columnLabels.bounty}</th>
                <th className="text-left">{columnLabels.outerHeroic}</th>
                <th className="text-left">{columnLabels.innerHeroic}</th>
                <th className="text-left">{columnLabels.crimsonSands}</th>
                <th className="text-left">{columnLabels.abyss}</th>
                <th className="text-left">{columnLabels.gvg}</th>
                <th className="text-left">{columnLabels.secretRealm}</th>
                <th className="text-left">{columnLabels.marks}</th>
                <th className="text-left">{columnLabels.kpi}</th>
                <th className="text-left">{columnLabels.status}</th>
                {canSeeFullStats && <th className="text-left">{columnLabels.actions}</th>}
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration, index) => (
                <tr key={`${registration.nickname}-${registration.discord || index}`} className="hover:bg-gray-800/50">
                  <td className="text-red-400 font-medium">#{index + 1}</td>
                  <td className="min-w-[220px]">
                    <RegistrationIdentity registration={registration} />
                  </td>
                  <td className="font-medium">
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{registration.nickname}</span>
                      <PrefixBadge prefix={registration.prefix} variant="compact" />
                    </div>
                  </td>
                  <td>
                    <span className={`ui-badge ${getRankClass(registration.rank)}`}>
                      {rankLabels[registration.rank] || registration.rank}
                    </span>
                  </td>
                  <td><ClassBadge className={registration.class} textClassName="text-[#e6eff5]" iconSizeClassName="h-8 w-8" /></td>
                  <td>{registration.guild || '—'}</td>
                  <td>{registration.elo || 0}</td>
                  <td>{registration.mmr20 || 0}</td>
                  <td>{registration.bounty || 0}</td>
                  <td title={String(registration.outerHeroic || 0)}>{renderActivityValue(registration.outerHeroic || 0)}</td>
                  <td title={String(registration.innerHeroic || 0)}>{renderActivityValue(registration.innerHeroic || 0)}</td>
                  <td title={String(registration.crimsonSands || 0)}>{renderActivityValue(registration.crimsonSands || 0)}</td>
                  <td title={String(registration.abyss || 0)}>{renderActivityValue(registration.abyss || 0)}</td>
                  <td title={String(registration.gvg || 0)}>{renderActivityValue(registration.gvg || 0)}</td>
                  <td title={String(registration.secretRealm || 0)}>{renderActivityValue(registration.secretRealm || 0)}</td>
                  <td>{registration.marks || 0}</td>
                  <td><KpiValue registration={registration} user={user} /></td>
                  <td>
                    <span className={`ui-badge ${getStatusClass(registration.status)}`}>
                      {statusLabels[registration.status] || registration.status}
                    </span>
                  </td>
                  {canSeeFullStats && (
                    <td>
                      <button type="button" className="btn-secondary px-3 py-2 text-xs" onClick={() => openEditor(registration)}>
                        Изменить
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {canSeeFullStats && editingRegistration && editDraft && (
        <div className="modal-backdrop" onClick={closeEditor}>
          <div className="modal-shell modal-shell-narrow p-6 md:p-8" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="registration-editor-title">
            <div className="modal-header">
              <div>
                <h3 id="registration-editor-title" className="modal-title">Редактирование записи</h3>
                <p className="modal-subtitle">
                  {editingRegistration.nickname} · {getDisplayDiscord(editingRegistration) || 'Discord не указан'}
                </p>
              </div>
              <button
                type="button"
                className="dc-icon-btn h-[46px] w-[46px] rounded-xl shrink-0"
                onClick={closeEditor}
                disabled={updateRegistrationStats.isPending}
                title="Закрыть"
              >
                <WuxiaIcon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className="space-y-2 text-sm md:col-span-2">
                <span className="text-gray-400">Discord</span>
                <input
                  value={editDraft.discordHandle}
                  onChange={(event) => updateDraftField('discordHandle', event.target.value)}
                  className="input-field w-full"
                  placeholder="@example"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-gray-400">Класс</span>
                <input
                  value={editDraft.className}
                  onChange={(event) => updateDraftField('className', event.target.value)}
                  className="input-field w-full"
                  placeholder="Класс"
                />
                {editDraft.className ? (
                  <div className="rounded-2xl ds-section-panel-soft border-[#2f6e8d]/35 bg-[#12202b]/55 px-4 py-3">
                    <ClassBadge className={editDraft.className} badgeClassName="w-full" textClassName="text-[#e6eff5] font-medium" />
                  </div>
                ) : null}
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-gray-400">Клан</span>
                <input
                  value={editDraft.guild}
                  onChange={(event) => updateDraftField('guild', event.target.value)}
                  className="input-field w-full"
                  placeholder="Клан"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {editableNumericFields.map((field) => (
                <label key={field.key} className="space-y-2 text-sm">
                  <span className="text-gray-400">{field.label}</span>
                  <input
                    type="number"
                    value={editDraft[field.key]}
                    onChange={(event) => updateDraftField(field.key, event.target.value)}
                    className="input-field w-full"
                  />
                </label>
              ))}
            </div>

            {editError && (
              <div className="ds-notice mt-6 border-red-900/40 bg-red-900/20 text-red-300">
                <WuxiaIcon name="alertTriangle" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                {editError}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                className="btn-secondary px-5 py-3"
                onClick={closeEditor}
                disabled={updateRegistrationStats.isPending}
              >
                Отмена
              </button>
              <button
                type="button"
                className="btn-primary px-5 py-3"
                onClick={() => void saveEditor()}
                disabled={updateRegistrationStats.isPending}
              >
                {updateRegistrationStats.isPending ? 'Сохраняем...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
