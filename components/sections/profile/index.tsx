'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { PortalAccount } from '@/lib/schemas/account';
import type { User, UserRole } from '@/lib/schemas/auth';
import { prefixOptions, type Registration } from '@/lib/schemas/registration';
import WuxiaIcon from '@/components/WuxiaIcons';
import { ClassBadge } from '@/components/ClassIcon';
import { PrefixBadge } from '@/components/PrefixBadge';
import { SectionHero } from '@/components/shared/SectionHero';
import { canAssignRoles, canManageAccounts, roleOrder } from '@/lib/authz';
import { roleExplainerRows, roleLabels } from '@/lib/roles';
import { useAccounts, useKnownClasses, useUpdateAccount } from '@/lib/auth/hooks';
import { useRegistrations, useUpdateRegistrationStats } from '@/lib/registration/hooks';
import { getKPIClass, cn } from '@/lib/utils';
import { useNotifications } from '@/lib/notifications/context';
import type { UpdateRegistrationStatsPayload } from '@/lib/api/registrations';
import * as stylex from '@stylexjs/stylex';
import { mergeStylexProps } from '@/lib/stylex/utils';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { profileStyles } from '@/components/sections/profile/Profile.stylex';





interface ProfileSectionProps {
  user: User;
}

type ActivityKey = 'outerHeroic' | 'innerHeroic' | 'crimsonSands' | 'abyss' | 'gvg' | 'secretRealm';

const activityKeys: ActivityKey[] = ['outerHeroic', 'innerHeroic', 'crimsonSands', 'abyss', 'gvg', 'secretRealm'];

interface ProfileDraftState {
  discordHandle: string;
  prefix: string;
  className: string;
  guild: string;
  mmr20: number;
  outerHeroic: number;
  innerHeroic: number;
  crimsonSands: number;
  abyss: number;
  gvg: number;
  secretRealm: number;
}

const activityLabels: Array<{ key: ActivityKey; label: string }> = [
  { key: 'outerHeroic', label: 'Outer Heroic' },
  { key: 'innerHeroic', label: 'Inner Heroic' },
  { key: 'crimsonSands', label: 'Crimson Sands' },
  { key: 'abyss', label: 'Abyss' },
  { key: 'gvg', label: 'GVG' },
  { key: 'secretRealm', label: 'Secret Realm' },
];

const resetActivityDraft = (draft: ProfileDraftState): ProfileDraftState => ({
  ...draft,
  outerHeroic: 0,
  innerHeroic: 0,
  crimsonSands: 0,
  abyss: 0,
  gvg: 0,
  secretRealm: 0,
});

const roleOptions: UserRole[] = [...roleOrder];

function isPrefixOption(value: string): value is (typeof prefixOptions)[number] {
  return prefixOptions.includes(value as (typeof prefixOptions)[number]);
}

interface ProfileOverviewProps {
  profileRegistration?: Registration;
  user: User;
}

const ProfileOverview = memo(function ProfileOverview({ profileRegistration, user }: ProfileOverviewProps) {
  const prefix = profileRegistration?.prefix ?? user.prefix ?? null;

  return (
    <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, uiStyles.sectionContainer ? undefined : undefined)} className="p-5 sm:p-6">
      <div {...stylex.props(profileStyles.headingKicker)}>Профиль</div>
      <div {...stylex.props(profileStyles.overviewGrid)}>
        <div {...stylex.props(profileStyles.metricTile)}>
          <div {...stylex.props(profileStyles.metricLabel)}>Ник</div>
          <div {...stylex.props(profileStyles.metricValue)}>{user.nickname || '—'}</div>
          <PrefixBadge prefix={prefix} className="mt-2" />
        </div>
        <div {...stylex.props(profileStyles.metricTile)}>
          <div {...stylex.props(profileStyles.metricLabel)}>Discord</div>
          <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.discordHandle || user.discordHandle || '—'}</div>
        </div>
        <div {...stylex.props(profileStyles.metricTile)}>
          <div {...stylex.props(profileStyles.metricLabel)}>Класс</div>
          <ClassBadge
            className={profileRegistration?.class || user.className}
            textClassName="text-[#e6eff5] font-medium"
            iconSizeClassName="h-8 w-8"
          />
        </div>
        <div {...stylex.props(profileStyles.metricTile)}>
          <div {...stylex.props(profileStyles.metricLabel)}>Клан</div>
          <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.guild || '—'}</div>
        </div>
        <div {...stylex.props(profileStyles.metricTile)}>
          <div {...stylex.props(profileStyles.metricLabel)}>Роль</div>
          <div {...stylex.props(profileStyles.metricValue)}>{roleLabels[user.role]}</div>
        </div>
        <div {...stylex.props(profileStyles.metricTile)}>
          <div {...stylex.props(profileStyles.metricLabel)}>Статус</div>
          <div {...stylex.props(profileStyles.metricValue)}>{user.isActive ? 'active' : 'inactive'}</div>
        </div>
      </div>
    </div>
  );
});

function NotificationSettingsSection() {
  const { settings, updateSettings, requestPermission } = useNotifications();
  const [requesting, setRequesting] = useState(false);

  const handleDesktopPermission = async () => {
    setRequesting(true);
    try {
      await requestPermission();
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div {...mergeStylexProps(stylex.props(uiStyles.card, uiStyles.sectionCard), 'p-5 sm:p-6')}>
      <div {...stylex.props(profileStyles.headingKicker, profileStyles.headingKickerSpacious)}>Уведомления</div>
      <p {...stylex.props(profileStyles.mutedText)} style={{ marginBottom: 20 }}>Настройте типы уведомлений и способ доставки</p>

      <div {...stylex.props(profileStyles.notificationGroup)}>
        <div {...stylex.props(profileStyles.notificationItem)}>
          <div {...stylex.props(profileStyles.notificationLabel)}>
            <div {...stylex.props(profileStyles.notificationTitle)}>Все уведомления</div>
            <div {...stylex.props(profileStyles.notificationDescription)}>Глобальное включение/выключение всех уведомлений</div>
          </div>
          <div {...stylex.props(profileStyles.notificationToggleWrap)}>
            <button
              type="button"
              {...stylex.props(profileStyles.toggleSwitch, settings.enabled && profileStyles.toggleSwitchActive)}
              onClick={() => updateSettings({ enabled: !settings.enabled })}
              aria-pressed={settings.enabled}
            >
              <span {...stylex.props(profileStyles.toggleKnob, settings.enabled && profileStyles.toggleKnobActive)} />
            </button>
          </div>
        </div>

        <div {...stylex.props(profileStyles.notificationItem)}>
          <div {...stylex.props(profileStyles.notificationLabel)}>
            <div {...stylex.props(profileStyles.notificationTitle)}>Запросы помощи</div>
            <div {...stylex.props(profileStyles.notificationDescription)}>Уведомлять о запросах без ответа более 15 минут</div>
          </div>
          <div {...stylex.props(profileStyles.notificationToggleWrap)}>
            <button
              type="button"
              {...stylex.props(profileStyles.toggleSwitch, settings.enabled && settings.helpRequests && profileStyles.toggleSwitchActive)}
              onClick={() => updateSettings({ helpRequests: !settings.helpRequests })}
              disabled={!settings.enabled}
              aria-pressed={settings.helpRequests}
            >
              <span {...stylex.props(profileStyles.toggleKnob, settings.enabled && settings.helpRequests && profileStyles.toggleKnobActive)} />
            </button>
          </div>
        </div>

        <div {...stylex.props(profileStyles.notificationItem)}>
          <div {...stylex.props(profileStyles.notificationLabel)}>
            <div {...stylex.props(profileStyles.notificationTitle)}>Подтверждение отсутствий</div>
            <div {...stylex.props(profileStyles.notificationDescription)}>Для офицеров: уведомления о pending absence</div>
          </div>
          <div {...stylex.props(profileStyles.notificationToggleWrap)}>
            <button
              type="button"
              {...stylex.props(profileStyles.toggleSwitch, settings.enabled && settings.absenceApprovals && profileStyles.toggleSwitchActive)}
              onClick={() => updateSettings({ absenceApprovals: !settings.absenceApprovals })}
              disabled={!settings.enabled}
              aria-pressed={settings.absenceApprovals}
            >
              <span {...stylex.props(profileStyles.toggleKnob, settings.enabled && settings.absenceApprovals && profileStyles.toggleKnobActive)} />
            </button>
          </div>
        </div>

        <div {...stylex.props(profileStyles.notificationItem)}>
          <div {...stylex.props(profileStyles.notificationLabel)}>
            <div {...stylex.props(profileStyles.notificationTitle)}>PvP-матчи</div>
            <div {...stylex.props(profileStyles.notificationDescription)}>Завершение матчей и спорные ситуации</div>
          </div>
          <div {...stylex.props(profileStyles.notificationToggleWrap)}>
            <button
              type="button"
              {...stylex.props(profileStyles.toggleSwitch, settings.enabled && settings.pvpMatches && profileStyles.toggleSwitchActive)}
              onClick={() => updateSettings({ pvpMatches: !settings.pvpMatches })}
              disabled={!settings.enabled}
              aria-pressed={settings.pvpMatches}
            >
              <span {...stylex.props(profileStyles.toggleKnob, settings.enabled && settings.pvpMatches && profileStyles.toggleKnobActive)} />
            </button>
          </div>
        </div>

        <div {...stylex.props(profileStyles.notificationItem)}>
          <div {...stylex.props(profileStyles.notificationLabel)}>
            <div {...stylex.props(profileStyles.notificationTitle)}>Desktop-уведомления</div>
            <div {...stylex.props(profileStyles.notificationDescription)}>Системные уведомления браузера</div>
          </div>
          <div {...stylex.props(profileStyles.notificationToggleWrap)}>
            <button
              type="button"
              {...stylex.props(profileStyles.toggleSwitch, settings.desktopEnabled && profileStyles.toggleSwitchActive)}
              onClick={handleDesktopPermission}
              disabled={requesting}
              aria-pressed={settings.desktopEnabled}
            >
              <span {...stylex.props(profileStyles.toggleKnob, settings.desktopEnabled && profileStyles.toggleKnobActive)} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


const RoleAccessPanel = memo(function RoleAccessPanel({ currentRole }: { currentRole: UserRole }) {
  return (
    <div {...mergeStylexProps(stylex.props(uiStyles.card, uiStyles.sectionCard, profileStyles.spaceY5), 'p-5 sm:p-6')}>
      <div>
        <div {...stylex.props(profileStyles.headingKicker)}>Роли и доступ</div>
        <div {...stylex.props(profileStyles.mutedText)}>
          Актуальные права по текущей иерархии: guest - member - officer - head - sysadmin.
        </div>
      </div>

      <div {...stylex.props(profileStyles.roleGrid)}>
        {roleExplainerRows.map((entry) => {
          const isCurrentRole = entry.role === currentRole;

          return (
            <article key={entry.role} {...stylex.props(profileStyles.roleCard, isCurrentRole && profileStyles.roleCardActive)}>
              <div {...stylex.props(profileStyles.roleHeader)}>
                <span {...stylex.props(profileStyles.roleTitle)}>{entry.label}</span>
                {isCurrentRole && (
                  <span {...stylex.props(profileStyles.roleCurrent)}>Твоя роль</span>
                )}
              </div>

              <p {...stylex.props(profileStyles.roleSummary)}>{entry.summary}</p>

              <div {...stylex.props(profileStyles.capabilityList)}>
                {entry.capabilities.map((capability) => (
                  <div key={capability} {...stylex.props(profileStyles.capabilityItem)}>
                    <span {...stylex.props(profileStyles.capabilityDot)} />
                    <span>{capability}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
});

interface ActivityToggleCardProps {
  activityKey: ActivityKey;
  isMarked: boolean;
  label: string;
  onToggle: (activityKey: ActivityKey) => void;
}

const ActivityToggleCard = memo(function ActivityToggleCard({ activityKey, isMarked, label, onToggle }: ActivityToggleCardProps) {
  const hintId = `profile-activity-${activityKey}-hint`;
  const labelId = `profile-activity-${activityKey}-label`;

  return (
    <div {...stylex.props(profileStyles.activityCard)}>
      <div {...stylex.props(profileStyles.activityHeader)}>
        <div>
          <div id={labelId} {...stylex.props(profileStyles.activityLabel)}>{label}</div>
          <div id={hintId} {...stylex.props(profileStyles.activityHint)}>
            Переключатель отметки: красный - нет, зелёный - да.
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isMarked}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          onClick={() => onToggle(activityKey)}
          {...stylex.props(profileStyles.activitySwitch, isMarked && profileStyles.activitySwitchActive)}
        >
          <span {...stylex.props(profileStyles.activityKnob, isMarked && profileStyles.activityKnobActive)} />
        </button>
      </div>
      <div {...stylex.props(profileStyles.activityPill, isMarked && profileStyles.activityPillActive)}>
        {isMarked ? 'Отмечено' : 'Не отмечено'}
      </div>
    </div>
  );
});

interface AccountsPanelProps {
  accounts: PortalAccount[];
  accountsError: string | null;
  accountsLoading: boolean;
  canChangeRoles: boolean;
  loadAccounts: () => void;
  rosterByNickname: Map<string, Registration>;
  togglingId: string | null;
  updateAccount: (account: PortalAccount, next: { isActive?: boolean; role?: UserRole }) => Promise<void>;
}

const AccountsPanel = memo(function AccountsPanel({
  accounts,
  accountsError,
  accountsLoading,
  canChangeRoles,
  loadAccounts,
  rosterByNickname,
  togglingId,
  updateAccount,
}: AccountsPanelProps) {
  return (
    <div className="card section-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-xl font-bold font-orbitron text-[#e6eff5]">Валидность учеток</h3>
        <button
          type="button"
          className="dc-icon-btn h-[46px] w-[46px] rounded-xl shrink-0"
          onClick={loadAccounts}
          title="Обновить"
          aria-label="Обновить"
        >
          <WuxiaIcon name="refresh" className="w-5 h-5" />
        </button>
      </div>

      {accountsError && (
        <div className="ds-notice mb-4">
          <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
          {accountsError}
        </div>
      )}

      {accountsLoading ? (
        <div className="text-sm text-gray-400">Загрузка аккаунтов...</div>
      ) : (
        <div className="table-frame overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Ник</th>
                <th>Роль</th>
                <th>Статус</th>
                <th>Класс</th>
                <th>Создан</th>
                <th>Последний вход</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="font-medium">{account.nickname}</td>
                  <td>
                    {canChangeRoles ? (
                      <select
                        className="select-field text-xs min-w-[120px]"
                        value={account.role}
                        onChange={(e) => updateAccount(account, { role: e.target.value as UserRole })}
                        disabled={togglingId === account.id}
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>{roleLabels[role]}</option>
                        ))}
                      </select>
                    ) : (
                      roleLabels[account.role]
                    )}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        account.isActive
                          ? 'bg-green-600/20 text-green-300 border border-green-600/30'
                          : 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/30'
                      }`}
                    >
                      {account.isActive ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td>
                    <ClassBadge
                      className={rosterByNickname.get(account.nickname.toLowerCase())?.class}
                      textClassName="text-[#e6eff5]"
                      iconSizeClassName="h-8 w-8"
                    />
                  </td>
                  <td>{new Date(account.createdAt).toLocaleDateString()}</td>
                  <td>{account.lastLoginAt ? new Date(account.lastLoginAt).toLocaleString() : '—'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-secondary px-3 py-2 text-xs"
                      disabled={togglingId === account.id}
                      onClick={() => updateAccount(account, { isActive: !account.isActive })}
                    >
                      {togglingId === account.id
                        ? '...'
                        : account.isActive
                          ? 'Выключить'
                          : 'Включить'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export default function ProfileSection({ user }: ProfileSectionProps) {
  const isAdmin = canManageAccounts(user.role);
  const canChangeRoles = canAssignRoles(user.role);
  const { data: knownClasses = [] } = useKnownClasses();
  const { data: accounts = [], isLoading: accountsLoading, error: accountsQueryError, refetch: refetchAccounts } = useAccounts(isAdmin);
  const { data: roster = [] } = useRegistrations();
  const updateAccountMutation = useUpdateAccount();
  const updateRegistrationStatsMutation = useUpdateRegistrationStats();

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [profileDraft, setProfileDraft] = useState<ProfileDraftState>({
    discordHandle: '',
    prefix: '',
    className: '',
    guild: '',
    mmr20: 0,
    outerHeroic: 0,
    innerHeroic: 0,
    crimsonSands: 0,
    abyss: 0,
    gvg: 0,
    secretRealm: 0,
  });
  const [profileNotice, setProfileNotice] = useState<string | null>(null);

  const rosterByNickname = useMemo(() => {
    const next = new Map<string, Registration>();

    for (const item of roster) {
      next.set(item.nickname.toLowerCase(), item);
    }

    return next;
  }, [roster]);

  const profileRegistration = useMemo(
    () => rosterByNickname.get((user.nickname || '').toLowerCase()),
    [rosterByNickname, user.nickname]
  );
  const classOptions = useMemo(() => {
    const values = new Set(knownClasses);
    if (profileDraft.className) {
      values.add(profileDraft.className);
    }
    return [...values].sort((a, b) => a.localeCompare(b, 'ru'));
  }, [knownClasses, profileDraft.className]);

  const profileKpiClass = useMemo(() => getKPIClass(profileRegistration?.kpi ?? 0), [profileRegistration?.kpi]);

  const profileKpiTone = useMemo(() => {
    if (profileKpiClass === 'kpi-good') {
      return 'border-green-500/35 bg-green-500/12 text-green-300';
    }
    if (profileKpiClass === 'kpi-medium') {
      return 'border-yellow-500/35 bg-yellow-500/12 text-yellow-300';
    }
    return 'border-red-500/35 bg-red-500/12 text-red-300';
  }, [profileKpiClass]);

  const accountsError = useMemo(() => {
    if (updateAccountMutation.error instanceof Error) {
      return updateAccountMutation.error.message;
    }

    if (accountsQueryError instanceof Error) {
      return accountsQueryError.message;
    }

    return null;
  }, [accountsQueryError, updateAccountMutation.error]);

  useEffect(() => {
    setProfileDraft({
      discordHandle: profileRegistration?.discordHandle || user.discordHandle || '',
      prefix: profileRegistration?.prefix ?? user.prefix ?? '',
      className: profileRegistration?.class || user.className || '',
      guild: profileRegistration?.guild || '',
      mmr20: profileRegistration?.mmr20 || 0,
      outerHeroic: profileRegistration?.outerHeroic || 0,
      innerHeroic: profileRegistration?.innerHeroic || 0,
      crimsonSands: profileRegistration?.crimsonSands || 0,
      abyss: profileRegistration?.abyss || 0,
      gvg: profileRegistration?.gvg || 0,
      secretRealm: profileRegistration?.secretRealm || 0,
    });
  }, [profileRegistration, user.className, user.discordHandle, user.prefix]);

  const loadAccounts = useCallback(() => {
    if (!isAdmin) return;
    void refetchAccounts();
  }, [isAdmin, refetchAccounts]);

  const updateAccount = useCallback(async (account: PortalAccount, next: { isActive?: boolean; role?: UserRole }) => {
    try {
      setTogglingId(account.id);
      await updateAccountMutation.mutateAsync({
          id: account.id,
          isActive: next.isActive ?? account.isActive,
          role: next.role,
      });
    } finally {
      setTogglingId(null);
    }
  }, [updateAccountMutation]);

  const handleActivityToggle = useCallback((activityKey: ActivityKey) => {
    setProfileDraft((prev) => ({
      ...prev,
      [activityKey]: prev[activityKey] > 0 ? 0 : 1,
    }));
  }, []);

  const resetActivities = useCallback(() => {
    setProfileDraft((prev) => resetActivityDraft(prev));
  }, []);

  const hasMarkedActivities = useMemo(
    () => activityKeys.some((activityKey) => profileDraft[activityKey] > 0),
    [profileDraft]
  );

  const saveProfileStats = async () => {
    if (!user.nickname) {
      setProfileNotice('Ник не найден для сохранения профиля');
      return;
    }

    const payload: UpdateRegistrationStatsPayload = {
      nickname: user.nickname,
    };

    const nextDiscordHandle = profileDraft.discordHandle.trim();
    const nextPrefix = profileDraft.prefix.trim();
    const nextClassName = profileDraft.className.trim();
    const nextGuild = profileDraft.guild.trim();

    if (nextDiscordHandle !== (profileRegistration?.discordHandle || user.discordHandle || '')) {
      payload.discordHandle = nextDiscordHandle;
    }

    if (nextPrefix !== (profileRegistration?.prefix || user.prefix || '')) {
      payload.prefix = nextPrefix ? (isPrefixOption(nextPrefix) ? nextPrefix : null) : null;
    }

    if (nextClassName && nextClassName !== (profileRegistration?.class || user.className || '')) {
      payload.className = nextClassName;
    }

    if (nextGuild !== (profileRegistration?.guild || '')) {
      payload.guild = nextGuild;
    }

    if ((profileDraft.mmr20 || 0) !== (profileRegistration?.mmr20 || 0)) {
      payload.mmr20 = Number(profileDraft.mmr20) || 0;
    }
    if ((profileDraft.outerHeroic || 0) !== (profileRegistration?.outerHeroic || 0)) {
      payload.outerHeroic = Number(profileDraft.outerHeroic) || 0;
    }
    if ((profileDraft.innerHeroic || 0) !== (profileRegistration?.innerHeroic || 0)) {
      payload.innerHeroic = Number(profileDraft.innerHeroic) || 0;
    }
    if ((profileDraft.crimsonSands || 0) !== (profileRegistration?.crimsonSands || 0)) {
      payload.crimsonSands = Number(profileDraft.crimsonSands) || 0;
    }
    if ((profileDraft.abyss || 0) !== (profileRegistration?.abyss || 0)) {
      payload.abyss = Number(profileDraft.abyss) || 0;
    }
    if ((profileDraft.gvg || 0) !== (profileRegistration?.gvg || 0)) {
      payload.gvg = Number(profileDraft.gvg) || 0;
    }
    if ((profileDraft.secretRealm || 0) !== (profileRegistration?.secretRealm || 0)) {
      payload.secretRealm = Number(profileDraft.secretRealm) || 0;
    }

    if (Object.keys(payload).length === 1) {
      setProfileNotice('Изменений нет');
      return;
    }

    try {
      setProfileNotice(null);
      await updateRegistrationStatsMutation.mutateAsync(payload);

      setProfileNotice('Профиль обновлён');
    } catch (error) {
      setProfileNotice(error instanceof Error ? error.message : 'Не удалось сохранить профиль');
    }
  };

  return (
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <div {...stylex.props(uiStyles.stackLg)}>
        <SectionHero
          icon={<WuxiaIcon name="profile" className="w-5 h-5" />}
          title="Личный кабинет"
          subtitle="Твой профиль и управление учетками. Новые участники создаются неактивными и включаются админом."
          chips={['Account', 'Security', 'Admin Control']}
        />

        <ProfileOverview profileRegistration={profileRegistration} user={user} />

        <RoleAccessPanel currentRole={user.role} />

        <div {...mergeStylexProps(stylex.props(uiStyles.card, uiStyles.sectionCard, profileStyles.statsCard), 'p-5 sm:p-6')}>
          <div {...stylex.props(profileStyles.statsHeader)}>
            <div>
              <div {...stylex.props(profileStyles.headingKicker)}>Статистика</div>
              <div {...stylex.props(profileStyles.mutedText)}>Данные из Neon: отметки, дуэли, Best MMR и расчётный KPI.</div>
            </div>
            <div {...stylex.props(profileStyles.actionRow)}>
              <button
                type="button"
                {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                onClick={resetActivities}
                disabled={updateRegistrationStatsMutation.isPending || !hasMarkedActivities}
              >
                Сбросить отметки
              </button>
              <button
                type="button"
                {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                onClick={saveProfileStats}
                disabled={updateRegistrationStatsMutation.isPending}
              >
                {updateRegistrationStatsMutation.isPending ? 'Сохраняем...' : 'Сохранить профиль'}
              </button>
            </div>
          </div>

          {profileNotice && (
            <div className="ds-notice">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {profileNotice}
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            <div className={`ds-metric-tile border ${profileKpiTone}`}>
              <div className="text-gray-400 mb-1">KPI</div>
              <div className={`font-medium ${profileKpiClass}`}>{profileRegistration?.kpi ?? 0}</div>
            </div>
            <div className="ds-metric-tile">
              <div className="text-gray-400 mb-1">ELO</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.elo ?? 0}</div>
            </div>
            <div className="ds-metric-tile">
              <div className="text-gray-400 mb-1">Best MMR</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.mmr20 ?? 0}</div>
            </div>
            <div className="ds-metric-tile">
              <div className="text-gray-400 mb-1">Всего отметок</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.marks ?? 0}</div>
            </div>
            <div className="ds-metric-tile">
              <div className="text-gray-400 mb-1">Bounty</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.bounty ?? 0}</div>
            </div>
            <div className="ds-metric-tile">
              <div className="text-gray-400 mb-1">Победы в дуэлях</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.duelWins ?? 0}</div>
            </div>
            <div className="ds-metric-tile">
              <div className="text-gray-400 mb-1">Поражения в дуэлях</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.duelLosses ?? 0}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <label className="space-y-2">
              <span className="text-gray-400">Discord</span>
              <input
                type="text"
                value={profileDraft.discordHandle}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, discordHandle: e.target.value }))}
                className="input-field w-full"
                placeholder="@example"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Титул / префикс</span>
              <select
                value={profileDraft.prefix}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, prefix: e.target.value }))}
                className="select-field w-full"
              >
                <option value="">Без префикса</option>
                {prefixOptions.map((prefix) => (
                  <option key={prefix} value={prefix}>{prefix}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Класс</span>
              <select
                value={profileDraft.className}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, className: e.target.value }))}
                className="select-field w-full"
              >
                <option value="">Выбери класс</option>
                {classOptions.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
              {profileDraft.className ? (
                <div className="rounded-2xl border border-[#2f6e8d]/35 bg-[#12202b]/55 px-4 py-3">
                  <ClassBadge className={profileDraft.className} badgeClassName="w-full" textClassName="text-[#e6eff5] font-medium" />
                </div>
              ) : null}
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Клан</span>
              <input
                type="text"
                value={profileDraft.guild}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, guild: e.target.value }))}
                className="input-field w-full"
                placeholder="Название клана"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Best MMR</span>
              <input
                type="number"
                value={profileDraft.mmr20}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, mmr20: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
            {activityLabels.map(({ key, label }) => {
              const isMarked = profileDraft[key] > 0;

              return (
                <ActivityToggleCard
                  key={key}
                  activityKey={key}
                  isMarked={isMarked}
                  label={label}
                  onToggle={handleActivityToggle}
                />
              );
            })}
          </div>
        </div>

        <NotificationSettingsSection />

        {isAdmin && (
          <AccountsPanel
            accounts={accounts}
            accountsError={accountsError}
            accountsLoading={accountsLoading}
            canChangeRoles={canChangeRoles}
            loadAccounts={loadAccounts}
            rosterByNickname={rosterByNickname}
            togglingId={togglingId}
            updateAccount={updateAccount}
          />
        )}
        </div>
      </div>
    </section>
  );
}
