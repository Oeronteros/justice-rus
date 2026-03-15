'use client';

import AppImage from '@/components/platform/AppImage';
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
import * as stylex from '@stylexjs/stylex';
import { mergeStylexProps } from '@/lib/stylex/utils';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { registrationStyles } from './Registration.stylex';

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
    <div {...stylex.props(registrationStyles.identityRow)}>
      {registration.avatarUrl ? (
        <AppImage
          src={registration.avatarUrl}
          alt={registration.nickname || displayDiscord || 'Avatar'}
          width={compact ? 44 : 36}
          height={compact ? 44 : 36}
          className={`${sizeClass} ${stylex.props(registrationStyles.identityAvatar).className}`}
          unoptimized
        />
      ) : (
        <div className={`${sizeClass} ${stylex.props(registrationStyles.identityAvatarFallback).className}`}>
          {initials}
        </div>
      )}

      <div {...stylex.props(registrationStyles.identityMeta)}>
        <div {...stylex.props(registrationStyles.identityPrimary)}>{displayDiscord || 'Discord не указан'}</div>
        <div {...stylex.props(registrationStyles.identitySecondary)}>{registration.nickname}</div>
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
    const kpiClass = getKPIClass(registration.kpi);
    const tone = kpiClass === 'kpi-good'
      ? registrationStyles.kpiValueGood
      : kpiClass === 'kpi-medium'
        ? registrationStyles.kpiValueMedium
        : registrationStyles.kpiValueBad;
    return <span {...stylex.props(tone)}>{registration.kpi}</span>;
  }

  const indicator = getKpiIndicator(registration.kpi);
  return (
    <span {...mergeStylexProps(stylex.props(registrationStyles.kpiIndicator), indicator.className)}>
      <span {...stylex.props(registrationStyles.kpiDot)}></span>
      <span {...stylex.props(registrationStyles.kpiIndicatorText)}>{indicator.label}</span>
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
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
    } else {
      mediaQuery.addListener(update);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', update);
      } else {
        mediaQuery.removeListener(update);
      }
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
      <div {...mergeStylexProps(stylex.props(uiStyles.card, uiStyles.sectionCard, registrationStyles.emptyCard), 'px-6 py-10')}>
        <div {...stylex.props(registrationStyles.emptyIconSurface)}>
            <WuxiaIcon name="usersSlash" className="w-8 h-8 text-gray-400" />
        </div>
        <span {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)}>Roster empty</span>
        <div {...stylex.props(registrationStyles.emptyTitle)}>Записей не найдено</div>
        <div {...stylex.props(registrationStyles.emptyText)}>Смени поиск или фильтры</div>
      </div>
    );
  }

  return (
    <>
      {isMobileLayout ? (
        <div {...stylex.props(registrationStyles.mobileCardGrid)}>
          {registrations.map((registration, index) => (
            <div key={`${registration.nickname}-${registration.discord || index}`} {...stylex.props(registrationStyles.mobileCard)}>
              <div {...stylex.props(registrationStyles.mobileCardHeader)}>
                <div {...stylex.props(registrationStyles.mobileCardLead)}>
                  <RegistrationIdentity registration={registration} compact />
                  <div {...stylex.props(registrationStyles.mobileCardMeta)}>
                    <div {...stylex.props(registrationStyles.mobileCardIndex)}>#{index + 1}</div>
                    <div {...stylex.props(registrationStyles.mobileCardNameRow)}>
                      <div {...stylex.props(registrationStyles.mobileCardName)}>{registration.nickname}</div>
                      <PrefixBadge prefix={registration.prefix} variant="compact" />
                    </div>
                    <div {...stylex.props(registrationStyles.mobileCardDiscord)}>{getDisplayDiscord(registration) || 'Discord не указан'}</div>
                  </div>
                </div>
                <span {...mergeStylexProps(stylex.props(uiStyles.badge), getRankClass(registration.rank))}>
                  {rankLabels[registration.rank] || registration.rank}
                </span>
              </div>

              <div {...stylex.props(registrationStyles.mobileSection, registrationStyles.mobileMetricsGrid)}>
                <div {...stylex.props(registrationStyles.mobileMetricTile)}>
                  <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels.class}</div>
                  <ClassBadge className={registration.class} textClassName="text-[#e6eff5]" iconSizeClassName="h-8 w-8" />
                </div>
                <div {...stylex.props(registrationStyles.mobileMetricTile)}>
                  <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels.guild}</div>
                  <div {...stylex.props(registrationStyles.mobileMetricValue)}>{registration.guild || '—'}</div>
                </div>
                <div {...stylex.props(registrationStyles.mobileMetricTile)}>
                  <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels.elo}</div>
                  <div {...stylex.props(registrationStyles.mobileMetricValue)}>{registration.elo || 0}</div>
                </div>
                <div {...stylex.props(registrationStyles.mobileMetricTile)}>
                  <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels.mmr20}</div>
                  <div {...stylex.props(registrationStyles.mobileMetricValue)}>{registration.mmr20 || 0}</div>
                </div>
                <div {...stylex.props(registrationStyles.mobileMetricTile)}>
                  <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels.bounty}</div>
                  <div {...stylex.props(registrationStyles.mobileMetricValue)}>{registration.bounty || 0}</div>
                </div>
                <div {...stylex.props(registrationStyles.mobileMetricTile)}>
                  <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels.status}</div>
                  <span {...mergeStylexProps(stylex.props(uiStyles.badge), getStatusClass(registration.status))}>
                    {statusLabels[registration.status] || registration.status}
                  </span>
                </div>
              </div>

              <div {...stylex.props(registrationStyles.mobileSection, registrationStyles.mobileMetricsGrid)}>
                {[
                  ['outerHeroic', renderActivityValue(registration.outerHeroic || 0)],
                  ['innerHeroic', renderActivityValue(registration.innerHeroic || 0)],
                  ['crimsonSands', renderActivityValue(registration.crimsonSands || 0)],
                  ['abyss', renderActivityValue(registration.abyss || 0)],
                  ['gvg', renderActivityValue(registration.gvg || 0)],
                  ['secretRealm', renderActivityValue(registration.secretRealm || 0)],
                  ['marks', String(registration.marks || 0)],
                ].map(([key, value]) => (
                  <div key={key} {...stylex.props(registrationStyles.mobileMetricTile)}>
                    <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels[key as keyof RegistrationColumnLabels]}</div>
                    <div {...stylex.props(registrationStyles.mobileMetricValue)}>{value}</div>
                  </div>
                ))}
                <div {...stylex.props(registrationStyles.mobileMetricTile, registrationStyles.fullSpan)}>
                  <div {...stylex.props(registrationStyles.mobileMetricLabel)}>{columnLabels.kpi}</div>
                  <KpiValue registration={registration} user={user} />
                </div>
              </div>

              {canSeeFullStats && (
                <button type="button" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, registrationStyles.mobileEditButton)} onClick={() => openEditor(registration)}>
                  Изменить запись
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div {...stylex.props(uiStyles.tableFrame)}>
          <table {...stylex.props(uiStyles.table)}>
            <thead>
              <tr>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.index}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.discord}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.nickname}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.rank}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.class}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.guild}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.elo}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.mmr20}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.bounty}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.outerHeroic}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.innerHeroic}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.crimsonSands}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.abyss}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.gvg}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.secretRealm}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.marks}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.kpi}</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.status}</th>
                {canSeeFullStats && <th {...stylex.props(uiStyles.tableHeadCell)}>{columnLabels.actions}</th>}
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration, index) => (
                <tr key={`${registration.nickname}-${registration.discord || index}`} {...stylex.props(index % 2 === 1 && uiStyles.tableRowEven, uiStyles.tableRowHover)}>
                  <td {...stylex.props(uiStyles.tableCell, registrationStyles.desktopIndex)}>#{index + 1}</td>
                  <td {...stylex.props(uiStyles.tableCell, registrationStyles.desktopIdentityCell)}>
                    <RegistrationIdentity registration={registration} />
                  </td>
                  <td {...stylex.props(uiStyles.tableCell, registrationStyles.desktopNicknameCell)}>
                    <div {...stylex.props(registrationStyles.desktopNicknameRow)}>
                      <span>{registration.nickname}</span>
                      <PrefixBadge prefix={registration.prefix} variant="compact" />
                    </div>
                  </td>
                  <td {...stylex.props(uiStyles.tableCell)}>
                    <span {...mergeStylexProps(stylex.props(uiStyles.badge), getRankClass(registration.rank))}>
                      {rankLabels[registration.rank] || registration.rank}
                    </span>
                  </td>
                  <td {...stylex.props(uiStyles.tableCell)}><ClassBadge className={registration.class} textClassName="text-[#e6eff5]" iconSizeClassName="h-8 w-8" /></td>
                  <td {...stylex.props(uiStyles.tableCell)}>{registration.guild || '—'}</td>
                  <td {...stylex.props(uiStyles.tableCell)}>{registration.elo || 0}</td>
                  <td {...stylex.props(uiStyles.tableCell)}>{registration.mmr20 || 0}</td>
                  <td {...stylex.props(uiStyles.tableCell)}>{registration.bounty || 0}</td>
                  <td {...stylex.props(uiStyles.tableCell)} title={String(registration.outerHeroic || 0)}>{renderActivityValue(registration.outerHeroic || 0)}</td>
                  <td {...stylex.props(uiStyles.tableCell)} title={String(registration.innerHeroic || 0)}>{renderActivityValue(registration.innerHeroic || 0)}</td>
                  <td {...stylex.props(uiStyles.tableCell)} title={String(registration.crimsonSands || 0)}>{renderActivityValue(registration.crimsonSands || 0)}</td>
                  <td {...stylex.props(uiStyles.tableCell)} title={String(registration.abyss || 0)}>{renderActivityValue(registration.abyss || 0)}</td>
                  <td {...stylex.props(uiStyles.tableCell)} title={String(registration.gvg || 0)}>{renderActivityValue(registration.gvg || 0)}</td>
                  <td {...stylex.props(uiStyles.tableCell)} title={String(registration.secretRealm || 0)}>{renderActivityValue(registration.secretRealm || 0)}</td>
                  <td {...stylex.props(uiStyles.tableCell)}>{registration.marks || 0}</td>
                  <td {...stylex.props(uiStyles.tableCell)}><KpiValue registration={registration} user={user} /></td>
                  <td {...stylex.props(uiStyles.tableCell)}>
                    <span {...mergeStylexProps(stylex.props(uiStyles.badge), getStatusClass(registration.status))}>
                      {statusLabels[registration.status] || registration.status}
                    </span>
                  </td>
                  {canSeeFullStats && (
                    <td {...stylex.props(uiStyles.tableCell)}>
                      <button type="button" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)} onClick={() => openEditor(registration)}>
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
        <div {...stylex.props(uiStyles.modalBackdrop)} onClick={closeEditor}>
          <div {...mergeStylexProps(stylex.props(uiStyles.modalShell, uiStyles.modalShellNarrow), 'p-6 md:p-8')} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="registration-editor-title">
            <div {...stylex.props(uiStyles.modalHeader)}>
              <div>
                <h3 id="registration-editor-title" {...mergeStylexProps(stylex.props(uiStyles.modalTitle), 'font-orbitron')}>Редактирование записи</h3>
                <p {...stylex.props(uiStyles.modalSubtitle)}>
                  {editingRegistration.nickname} · {getDisplayDiscord(editingRegistration) || 'Discord не указан'}
                </p>
              </div>
              <button
                type="button"
                {...stylex.props(uiStyles.iconButton)}
                onClick={closeEditor}
                disabled={updateRegistrationStats.isPending}
                title="Закрыть"
              >
                <WuxiaIcon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div {...stylex.props(registrationStyles.modalBodyGrid)}>
              <label {...stylex.props(registrationStyles.labelStack, registrationStyles.modalFieldFull)}>
                <span {...stylex.props(registrationStyles.fieldLabel)}>Discord</span>
                <input
                  value={editDraft.discordHandle}
                  onChange={(event) => updateDraftField('discordHandle', event.target.value)}
                  {...stylex.props(uiStyles.input)}
                  placeholder="@example"
                />
              </label>
              <label {...stylex.props(registrationStyles.labelStack)}>
                <span {...stylex.props(registrationStyles.fieldLabel)}>Класс</span>
                <input
                  value={editDraft.className}
                  onChange={(event) => updateDraftField('className', event.target.value)}
                  {...stylex.props(uiStyles.input)}
                  placeholder="Класс"
                />
                {editDraft.className ? (
                  <div {...stylex.props(registrationStyles.modalPreview)}>
                    <ClassBadge className={editDraft.className} badgeClassName="w-full" textClassName="text-[#e6eff5] font-medium" />
                  </div>
                ) : null}
              </label>
              <label {...stylex.props(registrationStyles.labelStack)}>
                <span {...stylex.props(registrationStyles.fieldLabel)}>Клан</span>
                <input
                  value={editDraft.guild}
                  onChange={(event) => updateDraftField('guild', event.target.value)}
                  {...stylex.props(uiStyles.input)}
                  placeholder="Клан"
                />
              </label>
            </div>

            <div {...stylex.props(registrationStyles.modalNumbersGrid)}>
              {editableNumericFields.map((field) => (
                <label key={field.key} {...stylex.props(registrationStyles.labelStack)}>
                  <span {...stylex.props(registrationStyles.fieldLabel)}>{field.label}</span>
                  <input
                    type="number"
                    value={editDraft[field.key]}
                    onChange={(event) => updateDraftField(field.key, event.target.value)}
                    {...stylex.props(uiStyles.input)}
                  />
                </label>
              ))}
            </div>

            {editError && (
              <div {...stylex.props(uiStyles.notice, uiStyles.noticeError, registrationStyles.modalError)}>
                <WuxiaIcon name="alertTriangle" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                {editError}
              </div>
            )}

            <div {...stylex.props(registrationStyles.modalActions)}>
              <button
                type="button"
                {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                onClick={closeEditor}
                disabled={updateRegistrationStats.isPending}
              >
                Отмена
              </button>
              <button
                type="button"
                {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
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
