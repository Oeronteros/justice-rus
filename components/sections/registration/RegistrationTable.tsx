'use client';

import { useEffect, useState } from 'react';
import { handleApiError } from '@/lib/api/client';
import { useUpdateRegistrationStats } from '@/lib/hooks';
import { getKPIClass, getKpiIndicator, getRankClass, getStatusClass } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import { ClassBadge } from '@/components/ClassIcon';
import type { Registration, User } from '@/types';
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
        <img
          src={registration.avatarUrl}
          alt={registration.nickname || displayDiscord || 'Avatar'}
          className={`${sizeClass} rounded-full border border-[#385264] object-cover bg-[#0c151d] shrink-0`}
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
      <div className="py-12 text-center text-gray-500">
        <div className="flex flex-col items-center">
          <WuxiaIcon name="usersSlash" className="w-10 h-10 mb-3 text-gray-400" />
          <div className="text-lg">Записей не найдено</div>
          <div className="text-sm">Смени поиск или фильтры</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobileLayout ? (
        <div className="grid grid-cols-1 gap-4">
          {registrations.map((registration, index) => (
            <div key={`${registration.nickname}-${registration.discord || index}`} className="rounded-2xl border border-[#2a3c4c]/60 bg-[#101a23]/60 p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <RegistrationIdentity registration={registration} compact />
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.18em] text-[#9ec5d8] mb-1">#{index + 1}</div>
                    <div className="text-lg font-semibold text-[#e6eff5]">{registration.nickname}</div>
                    <div className="text-sm text-gray-400 mt-1 truncate">{getDisplayDiscord(registration) || 'Discord не указан'}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${getRankClass(registration.rank)}`}>
                  {rankLabels[registration.rank] || registration.rank}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                  <div className="text-gray-400 mb-1">{columnLabels.class}</div>
                  <ClassBadge className={registration.class} textClassName="text-[#e6eff5]" iconSizeClassName="h-8 w-8" />
                </div>
                <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                  <div className="text-gray-400 mb-1">{columnLabels.guild}</div>
                  <div className="text-[#e6eff5]">{registration.guild || '—'}</div>
                </div>
                <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                  <div className="text-gray-400 mb-1">{columnLabels.elo}</div>
                  <div className="text-[#e6eff5]">{registration.elo || 0}</div>
                </div>
                <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                  <div className="text-gray-400 mb-1">{columnLabels.mmr20}</div>
                  <div className="text-[#e6eff5]">{registration.mmr20 || 0}</div>
                </div>
                <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                  <div className="text-gray-400 mb-1">{columnLabels.bounty}</div>
                  <div className="text-[#e6eff5]">{registration.bounty || 0}</div>
                </div>
                <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                  <div className="text-gray-400 mb-1">{columnLabels.status}</div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getStatusClass(registration.status)}`}>
                    {statusLabels[registration.status] || registration.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['outerHeroic', renderActivityValue(registration.outerHeroic || 0)],
                  ['innerHeroic', renderActivityValue(registration.innerHeroic || 0)],
                  ['crimsonSands', renderActivityValue(registration.crimsonSands || 0)],
                  ['abyss', renderActivityValue(registration.abyss || 0)],
                  ['gvg', renderActivityValue(registration.gvg || 0)],
                  ['secretRealm', renderActivityValue(registration.secretRealm || 0)],
                  ['marks', String(registration.marks || 0)],
                ].map(([key, value]) => (
                  <div key={key} className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                    <div className="text-gray-400 mb-1">{columnLabels[key as keyof RegistrationColumnLabels]}</div>
                    <div className="text-[#e6eff5]">{value}</div>
                  </div>
                ))}
                <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3 col-span-2">
                  <div className="text-gray-400 mb-1">{columnLabels.kpi}</div>
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
        <div className="overflow-x-auto">
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
                  <td className="font-medium">{registration.nickname}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${getRankClass(registration.rank)}`}>
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
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(registration.status)}`}>
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
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-8" onClick={closeEditor}>
          <div className="card w-full max-w-4xl p-6 md:p-8 max-h-[90vh] overflow-auto" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">Редактирование записи</h3>
                <p className="text-sm text-gray-400 mt-2">
                  {editingRegistration.nickname} · {getDisplayDiscord(editingRegistration) || 'Discord не указан'}
                </p>
              </div>
              <button
                type="button"
                className="dc-icon-btn p-2.5 rounded-xl"
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
              <div className="mt-6 text-sm text-red-300 bg-red-900/20 border border-red-900/40 rounded-xl p-4">
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
