'use client';

import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { PortalAccount } from '@/lib/schemas/account';
import type { User, UserRole } from '@/lib/schemas/auth';
import {
  prefixOptions,
  profileInterestOptions,
  profileTitleOptions,
  type NotificationDefaults,
  type ProfileInterest,
  type Registration,
} from '@/lib/schemas/registration';
import WuxiaIcon from '@/components/WuxiaIcons';
import { ClassBadge } from '@/components/ClassIcon';
import { PrefixBadge } from '@/components/PrefixBadge';
import { SectionHero } from '@/components/shared/SectionHero';
import { canAssignRoles, canManageAccounts, roleOrder } from '@/lib/authz';
import { roleExplainerRows, roleLabels } from '@/lib/roles';
import { useAccounts, useKnownClasses, useUpdateAccount } from '@/lib/auth/hooks';
import { useRegistrations, useUpdateRegistrationStats } from '@/lib/registration/hooks';
import { useNotifications } from '@/lib/notifications/context';
import type { UpdateRegistrationStatsPayload } from '@/lib/api/registrations';
import { useTranslation } from '@/lib/i18n/context';
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
  profileTitle: string;
  className: string;
  preferredClasses: string[];
  interests: ProfileInterest[];
  notificationDefaults: NotificationDefaults;
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

const defaultNotificationDefaults: NotificationDefaults = {
  helpRequests: true,
  absenceApprovals: true,
  pvpMatches: true,
  eventReminders: true,
};

const profileInterestLabels: Record<ProfileInterest, string> = {
  pvp: 'PvP focus',
  'absences-planning': 'Roster planning',
  'raid-prep': 'Raid prep',
  matchmaking: 'Matchmaking',
  mentoring: 'Mentoring',
};

type RecommendationTag = {
  id: string;
  label: string;
  reason: string;
};

function normalizeList(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ru'));
}

function sameNormalizedList(left: string[], right: string[]): boolean {
  const leftNormalized = normalizeList(left);
  const rightNormalized = normalizeList(right);

  if (leftNormalized.length !== rightNormalized.length) {
    return false;
  }

  return leftNormalized.every((value, index) => value === rightNormalized[index]);
}

function buildRecommendationTags(draft: Pick<ProfileDraftState, 'profileTitle' | 'prefix' | 'preferredClasses' | 'interests' | 'notificationDefaults'>): RecommendationTag[] {
  const tags: RecommendationTag[] = [];

  if (draft.profileTitle) {
    tags.push({
      id: `title-${draft.profileTitle.toLowerCase()}`,
      label: `Title: ${draft.profileTitle}`,
      reason: 'Based on your selected personal title.',
    });
  }

  if (draft.prefix) {
    tags.push({
      id: `prefix-${draft.prefix.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Prefix: ${draft.prefix}`,
      reason: 'Derived from your visible profile prefix.',
    });
  }

  for (const className of normalizeList(draft.preferredClasses).slice(0, 3)) {
    tags.push({
      id: `class-${className.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Class lane: ${className}`,
      reason: 'Selected in your preferred classes.',
    });
  }

  for (const interest of profileInterestOptions) {
    if (!draft.interests.includes(interest)) {
      continue;
    }

    tags.push({
      id: `interest-${interest}`,
      label: profileInterestLabels[interest],
      reason: 'Enabled in your tactical interests.',
    });
  }

  if (draft.notificationDefaults.pvpMatches) {
    tags.push({
      id: 'notif-pvp',
      label: 'PvP alerts on',
      reason: 'Notification defaults keep PvP match alerts enabled.',
    });
  }

  if (draft.notificationDefaults.absenceApprovals) {
    tags.push({
      id: 'notif-absences',
      label: 'Absence watch',
      reason: 'Notification defaults keep absence approval alerts enabled.',
    });
  }

  return tags;
}

function isProfileTitleOption(value: string): value is (typeof profileTitleOptions)[number] {
  return profileTitleOptions.includes(value as (typeof profileTitleOptions)[number]);
}

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
    <div {...mergeStylexProps(stylex.props(uiStyles.card, uiStyles.sectionCard), 'p-5 sm:p-6')}>
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

function NotificationSettingsSection({
  notificationDefaults,
  onNotificationDefaultsChange,
}: {
  notificationDefaults: NotificationDefaults;
  onNotificationDefaultsChange: (next: NotificationDefaults) => void;
}) {
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
          <button
            type="button"
            {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)}
            onClick={() => {
              const next = {
                ...notificationDefaults,
                helpRequests: !notificationDefaults.helpRequests,
              };
              onNotificationDefaultsChange(next);
              updateSettings({ helpRequests: next.helpRequests });
            }}
            data-testid="profile-default-help-requests"
          >
            Профиль по умолчанию: {notificationDefaults.helpRequests ? 'вкл' : 'выкл'}
          </button>
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
          <button
            type="button"
            {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)}
            onClick={() => {
              const next = {
                ...notificationDefaults,
                absenceApprovals: !notificationDefaults.absenceApprovals,
              };
              onNotificationDefaultsChange(next);
              updateSettings({ absenceApprovals: next.absenceApprovals });
            }}
            data-testid="profile-default-absence-approvals"
          >
            Профиль по умолчанию: {notificationDefaults.absenceApprovals ? 'вкл' : 'выкл'}
          </button>
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
          <button
            type="button"
            {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)}
            onClick={() => {
              const next = {
                ...notificationDefaults,
                pvpMatches: !notificationDefaults.pvpMatches,
              };
              onNotificationDefaultsChange(next);
              updateSettings({ pvpMatches: next.pvpMatches });
            }}
            data-testid="profile-default-pvp-matches"
          >
            Профиль по умолчанию: {notificationDefaults.pvpMatches ? 'вкл' : 'выкл'}
          </button>
        </div>

        <div {...stylex.props(profileStyles.notificationItem)}>
          <div {...stylex.props(profileStyles.notificationLabel)}>
            <div {...stylex.props(profileStyles.notificationTitle)}>Напоминания событий</div>
            <div {...stylex.props(profileStyles.notificationDescription)}>Базовый профиль уведомлений для событий и календаря</div>
          </div>
          <button
            type="button"
            {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)}
            onClick={() => {
              const next = {
                ...notificationDefaults,
                eventReminders: !notificationDefaults.eventReminders,
              };
              onNotificationDefaultsChange(next);
              updateSettings({ eventReminders: next.eventReminders });
            }}
            data-testid="profile-default-event-reminders"
          >
            Профиль по умолчанию: {notificationDefaults.eventReminders ? 'вкл' : 'выкл'}
          </button>
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
    <div {...mergeStylexProps(stylex.props(uiStyles.card, uiStyles.sectionCard), 'p-5 sm:p-6')}>
      <div {...stylex.props(profileStyles.accountsHeader)}>
        <h3 {...mergeStylexProps(stylex.props(profileStyles.accountsTitle), 'font-orbitron')}>Валидность учеток</h3>
        <button
          type="button"
          {...stylex.props(uiStyles.iconButton)}
          onClick={loadAccounts}
          title="Обновить"
          aria-label="Обновить"
        >
          <WuxiaIcon name="refresh" {...stylex.props(uiStyles.iconMd)} />
        </button>
      </div>

      {accountsError && (
        <div {...mergeStylexProps(stylex.props(uiStyles.notice), 'mb-4')}>
          <WuxiaIcon name="alertTriangle" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
          {accountsError}
        </div>
      )}

      {accountsLoading ? (
        <div {...stylex.props(profileStyles.loadingText)}>Загрузка аккаунтов...</div>
      ) : (
        <div {...stylex.props(uiStyles.tableFrame)}>
          <table {...stylex.props(uiStyles.table)}>
            <thead>
              <tr>
                <th {...stylex.props(uiStyles.tableHeadCell)}>Ник</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>Роль</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>Статус</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>Класс</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>Создан</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>Последний вход</th>
                <th {...stylex.props(uiStyles.tableHeadCell)}>Действие</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account.id} {...stylex.props(index % 2 === 1 && uiStyles.tableRowEven, uiStyles.tableRowHover)}>
                  <td {...stylex.props(uiStyles.tableCell, profileStyles.nicknameCell)}>{account.nickname}</td>
                  <td {...stylex.props(uiStyles.tableCell)}>
                    {canChangeRoles ? (
                      <select
                        {...mergeStylexProps(stylex.props(uiStyles.select), 'text-xs min-w-[120px]')}
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
                  <td {...stylex.props(uiStyles.tableCell)}>
                    <span
                      {...stylex.props(uiStyles.badge, account.isActive ? uiStyles.badgeSuccess : uiStyles.badgeWarning)}
                    >
                      {account.isActive ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td {...stylex.props(uiStyles.tableCell)}>
                    <ClassBadge
                      className={rosterByNickname.get(account.nickname.toLowerCase())?.class}
                      textClassName="text-[#e6eff5]"
                      iconSizeClassName="h-8 w-8"
                    />
                  </td>
                  <td {...stylex.props(uiStyles.tableCell)}>{new Date(account.createdAt).toLocaleDateString()}</td>
                  <td {...stylex.props(uiStyles.tableCell)}>{account.lastLoginAt ? new Date(account.lastLoginAt).toLocaleString() : '—'}</td>
                  <td {...stylex.props(uiStyles.tableCell)}>
                    <button
                      type="button"
                      {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)}
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
  const { language } = useTranslation();
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
    profileTitle: '',
    className: '',
    preferredClasses: [],
    interests: [],
    notificationDefaults: defaultNotificationDefaults,
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

  const profileKpiTone = useMemo(() => {
    const kpi = profileRegistration?.kpi ?? 0;
    if (kpi >= 6) return profileStyles.statsMetricGood;
    if (kpi >= 3) return profileStyles.statsMetricMedium;
    return profileStyles.statsMetricBad;
  }, [profileRegistration?.kpi]);

  const savedNotificationDefaults = useMemo<NotificationDefaults>(() => {
    const fromRegistration = profileRegistration?.notificationDefaults;
    if (fromRegistration) {
      return fromRegistration;
    }

    if (user.notificationDefaults) {
      return user.notificationDefaults;
    }

    return defaultNotificationDefaults;
  }, [profileRegistration?.notificationDefaults, user.notificationDefaults]);

  const recommendationTags = useMemo(
    () => buildRecommendationTags(profileDraft),
    [profileDraft]
  );

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
      profileTitle: profileRegistration?.title ?? user.profileTitle ?? '',
      className: profileRegistration?.class || user.className || '',
      preferredClasses: normalizeList(profileRegistration?.preferredClasses || user.preferredClasses || []),
      interests: profileInterestOptions.filter((interest) => (profileRegistration?.interests || user.interests || []).includes(interest)),
      notificationDefaults: savedNotificationDefaults,
      guild: profileRegistration?.guild || '',
      mmr20: profileRegistration?.mmr20 || 0,
      outerHeroic: profileRegistration?.outerHeroic || 0,
      innerHeroic: profileRegistration?.innerHeroic || 0,
      crimsonSands: profileRegistration?.crimsonSands || 0,
      abyss: profileRegistration?.abyss || 0,
      gvg: profileRegistration?.gvg || 0,
      secretRealm: profileRegistration?.secretRealm || 0,
    });
  }, [profileRegistration, savedNotificationDefaults, user.className, user.discordHandle, user.interests, user.prefix, user.preferredClasses, user.profileTitle]);

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
    const nextProfileTitle = profileDraft.profileTitle.trim();
    const nextClassName = profileDraft.className.trim();
    const nextPreferredClasses = normalizeList(profileDraft.preferredClasses);
    const nextInterests = [...profileDraft.interests].sort((a, b) => a.localeCompare(b, 'en'));
    const nextGuild = profileDraft.guild.trim();

    if (nextDiscordHandle !== (profileRegistration?.discordHandle || user.discordHandle || '')) {
      payload.discordHandle = nextDiscordHandle;
    }

    if (nextPrefix !== (profileRegistration?.prefix || user.prefix || '')) {
      payload.prefix = nextPrefix ? (isPrefixOption(nextPrefix) ? nextPrefix : null) : null;
    }

    if (nextProfileTitle !== (profileRegistration?.title || user.profileTitle || '')) {
      payload.profileTitle = nextProfileTitle ? (isProfileTitleOption(nextProfileTitle) ? nextProfileTitle : null) : null;
    }

    if (nextClassName && nextClassName !== (profileRegistration?.class || user.className || '')) {
      payload.className = nextClassName;
    }

    if (nextGuild !== (profileRegistration?.guild || '')) {
      payload.guild = nextGuild;
    }

    if (!sameNormalizedList(nextPreferredClasses, profileRegistration?.preferredClasses || user.preferredClasses || [])) {
      payload.preferredClasses = nextPreferredClasses;
    }

    if (!sameNormalizedList(nextInterests, profileRegistration?.interests || user.interests || [])) {
      payload.interests = nextInterests;
    }

    if (
      profileDraft.notificationDefaults.helpRequests !== savedNotificationDefaults.helpRequests ||
      profileDraft.notificationDefaults.absenceApprovals !== savedNotificationDefaults.absenceApprovals ||
      profileDraft.notificationDefaults.pvpMatches !== savedNotificationDefaults.pvpMatches ||
      profileDraft.notificationDefaults.eventReminders !== savedNotificationDefaults.eventReminders
    ) {
      payload.notificationDefaults = profileDraft.notificationDefaults;
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
          icon={<WuxiaIcon name="profile" {...stylex.props(uiStyles.iconMd)} />}
          title={language === 'ru' ? 'Личный кабинет' : language === 'zh' ? '个人中枢' : 'Profile hub'}
          subtitle={language === 'ru' ? 'Твой профиль и управление учетками. Новые участники создаются неактивными и включаются админом.' : language === 'zh' ? '管理你的个人资料与账号状态。新成员默认处于未激活状态，由管理员启用。' : 'Manage your profile and account state. New members are created inactive and enabled by an admin.'}
          chips={['Account', 'Security', 'Admin Control']}
          actions={
            <div {...stylex.props(profileStyles.heroActionRow)}>
              <Link href="/" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}>
                <WuxiaIcon name="eye" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
                {language === 'ru' ? 'Дашборд' : language === 'zh' ? '总览' : 'Dashboard'}
              </Link>
              <Link href="/news" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}>
                <WuxiaIcon name="news" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
                {language === 'ru' ? 'Новости' : language === 'zh' ? '公告' : 'News'}
              </Link>
            </div>
          }
        />

        <div {...stylex.props(profileStyles.overviewRail)}>
          <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, profileStyles.overviewRailCard)}>
            <span {...stylex.props(profileStyles.headingKicker)}>{language === 'ru' ? 'Статус' : language === 'zh' ? '状态' : 'Status'}</span>
            <strong {...stylex.props(profileStyles.metricValue)}>{user.isActive ? 'active' : 'inactive'}</strong>
            <span {...stylex.props(profileStyles.mutedText)}>{language === 'ru' ? 'Состояние аккаунта и роль теперь читаются как отдельный командный блок.' : language === 'zh' ? '账号状态与角色现在作为独立指挥模块显示。' : 'Account state and role now read as a dedicated command block.'}</span>
          </article>
          <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, profileStyles.overviewRailCard)}>
            <span {...stylex.props(profileStyles.headingKicker)}>{language === 'ru' ? 'Роль' : language === 'zh' ? '身份' : 'Role'}</span>
            <strong {...stylex.props(profileStyles.metricValue)}>{roleLabels[user.role]}</strong>
            <span {...stylex.props(profileStyles.mutedText)}>{language === 'ru' ? 'Права доступа и административные действия остаются заметными без смешивания с личными настройками.' : language === 'zh' ? '权限与管理动作保持清晰可见，不再与个人设置混杂。' : 'Permissions and administrative actions stay visible without blending into personal settings.'}</span>
          </article>
          <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, profileStyles.overviewRailCard)}>
            <span {...stylex.props(profileStyles.headingKicker)}>{language === 'ru' ? 'Боевой профиль' : language === 'zh' ? '战斗档案' : 'Combat profile'}</span>
            <strong {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.class || user.className || '—'}</strong>
            <span {...stylex.props(profileStyles.mutedText)}>{language === 'ru' ? 'Класс, префикс и PvP-статус вынесены в быстрый обзор перед детальными настройками.' : language === 'zh' ? '职业、前缀和 PvP 状态先进入快速概览，再进入详细设置。' : 'Class, prefix, and PvP status now sit in a quick overview before the detailed settings.'}</span>
            <div {...stylex.props(uiStyles.inlineTags)} data-testid="profile-recommendation-tags">
              {recommendationTags.slice(0, 4).map((tag) => (
                <span key={tag.id} data-testid="recommendation-chip-list" {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)} title={tag.reason}>
                  {tag.label}
                </span>
              ))}
            </div>
          </article>
        </div>

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
                data-testid="profile-save"
              >
                {updateRegistrationStatsMutation.isPending ? 'Сохраняем...' : 'Сохранить профиль'}
              </button>
            </div>
          </div>

          {profileNotice && (
            <div {...stylex.props(uiStyles.notice, uiStyles.noticeSuccess)}>
              <WuxiaIcon name="checkCircle" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
              {profileNotice}
            </div>
          )}

          <div {...stylex.props(profileStyles.statsMetricGrid)}>
            <div {...stylex.props(profileStyles.statsMetricTile, profileKpiTone)}>
              <div {...stylex.props(profileStyles.metricLabel)}>KPI</div>
              <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.kpi ?? 0}</div>
            </div>
            <div {...stylex.props(profileStyles.statsMetricTile)}>
              <div {...stylex.props(profileStyles.metricLabel)}>ELO</div>
              <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.elo ?? 0}</div>
            </div>
            <div {...stylex.props(profileStyles.statsMetricTile)}>
              <div {...stylex.props(profileStyles.metricLabel)}>Best MMR</div>
              <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.mmr20 ?? 0}</div>
            </div>
            <div {...stylex.props(profileStyles.statsMetricTile)}>
              <div {...stylex.props(profileStyles.metricLabel)}>Всего отметок</div>
              <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.marks ?? 0}</div>
            </div>
            <div {...stylex.props(profileStyles.statsMetricTile)}>
              <div {...stylex.props(profileStyles.metricLabel)}>Bounty</div>
              <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.bounty ?? 0}</div>
            </div>
            <div {...stylex.props(profileStyles.statsMetricTile)}>
              <div {...stylex.props(profileStyles.metricLabel)}>Победы в дуэлях</div>
              <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.duelWins ?? 0}</div>
            </div>
            <div {...stylex.props(profileStyles.statsMetricTile)}>
              <div {...stylex.props(profileStyles.metricLabel)}>Поражения в дуэлях</div>
              <div {...stylex.props(profileStyles.metricValue)}>{profileRegistration?.duelLosses ?? 0}</div>
            </div>
          </div>

          <div {...stylex.props(profileStyles.fieldGrid)}>
            <label {...stylex.props(profileStyles.labelStack)}>
              <span {...stylex.props(profileStyles.fieldLabel)}>Discord</span>
              <input
                type="text"
                value={profileDraft.discordHandle}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, discordHandle: e.target.value }))}
                {...stylex.props(uiStyles.input)}
                placeholder="@example"
              />
            </label>
            <label {...stylex.props(profileStyles.labelStack)}>
              <span {...stylex.props(profileStyles.fieldLabel)}>Титул / префикс</span>
              <select
                value={profileDraft.prefix}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, prefix: e.target.value }))}
                {...stylex.props(uiStyles.select)}
                data-testid="profile-prefix-input"
              >
                <option value="">Без префикса</option>
                {prefixOptions.map((prefix) => (
                  <option key={prefix} value={prefix}>{prefix}</option>
                ))}
              </select>
            </label>
            <label {...stylex.props(profileStyles.labelStack)}>
              <span {...stylex.props(profileStyles.fieldLabel)}>Класс</span>
              <select
                value={profileDraft.className}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, className: e.target.value }))}
                {...stylex.props(uiStyles.select)}
              >
                <option value="">Выбери класс</option>
                {classOptions.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
              {profileDraft.className ? (
                <div {...stylex.props(profileStyles.classPreview)}>
                  <ClassBadge className={profileDraft.className} badgeClassName="w-full" textClassName="text-[#e6eff5] font-medium" />
                </div>
              ) : null}
            </label>
            <label {...stylex.props(profileStyles.labelStack)}>
              <span {...stylex.props(profileStyles.fieldLabel)}>Титул</span>
              <select
                value={profileDraft.profileTitle}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, profileTitle: e.target.value }))}
                {...stylex.props(uiStyles.select)}
                data-testid="profile-personalization-title"
              >
                <option value="">Без титула</option>
                {profileTitleOptions.map((title) => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </label>
            <label {...stylex.props(profileStyles.labelStack)}>
              <span {...stylex.props(profileStyles.fieldLabel)}>Клан</span>
              <input
                type="text"
                value={profileDraft.guild}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, guild: e.target.value }))}
                {...stylex.props(uiStyles.input)}
                placeholder="Название клана"
              />
            </label>
            <label {...stylex.props(profileStyles.labelStack)}>
              <span {...stylex.props(profileStyles.fieldLabel)}>Best MMR</span>
              <input
                type="number"
                value={profileDraft.mmr20}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, mmr20: Number(e.target.value) || 0 }))}
                {...stylex.props(uiStyles.input)}
              />
            </label>
          </div>

          <div {...stylex.props(profileStyles.personalizationGrid)}>
            <div {...stylex.props(profileStyles.personalizationCard)}>
              <div {...stylex.props(profileStyles.fieldLabel)}>Предпочитаемые классы</div>
              <div {...stylex.props(uiStyles.inlineTags)} data-testid="class-multiselect">
                {classOptions.map((className) => {
                  const isActive = profileDraft.preferredClasses.includes(className);

                  return (
                    <button
                      key={className}
                      type="button"
                      {...stylex.props(uiStyles.chip, isActive && uiStyles.chipActive)}
                      onClick={() => {
                        setProfileDraft((prev) => {
                          const next = prev.preferredClasses.includes(className)
                            ? prev.preferredClasses.filter((value) => value !== className)
                            : normalizeList([...prev.preferredClasses, className]).slice(0, 6);

                          return {
                            ...prev,
                            preferredClasses: next,
                          };
                        });
                      }}
                      data-testid={`profile-class-tag-${className}`}
                    >
                      {className}
                    </button>
                  );
                })}
              </div>
            </div>

            <div {...stylex.props(profileStyles.personalizationCard)}>
              <div {...stylex.props(profileStyles.fieldLabel)}>Интересы</div>
              <div {...stylex.props(uiStyles.inlineTags)}>
                {profileInterestOptions.map((interest) => {
                  const isActive = profileDraft.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      {...stylex.props(uiStyles.chip, isActive && uiStyles.chipActive)}
                      onClick={() => {
                        setProfileDraft((prev) => {
                          const nextInterests = prev.interests.includes(interest)
                            ? prev.interests.filter((value) => value !== interest)
                            : [...prev.interests, interest];

                          return {
                            ...prev,
                            interests: profileInterestOptions.filter((entry) => nextInterests.includes(entry)),
                          };
                        });
                      }}
                      data-testid={`profile-interest-tag-${interest}`}
                    >
                      {profileInterestLabels[interest]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div {...stylex.props(profileStyles.personalizationCard)}>
              <div {...stylex.props(profileStyles.fieldLabel)}>Recommendation tags</div>
              <div {...stylex.props(profileStyles.mutedText)}>Теги детерминированы по title/prefix/classes/interests и notification defaults.</div>
              <div {...stylex.props(uiStyles.inlineTags)} data-testid="profile-recommendation-tags-detailed">
                {recommendationTags.map((tag) => (
                  <span key={tag.id} {...stylex.props(uiStyles.badge)} title={tag.reason}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div {...stylex.props(profileStyles.activityGrid)}>
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

        <NotificationSettingsSection
          notificationDefaults={profileDraft.notificationDefaults}
          onNotificationDefaultsChange={(next) => {
            setProfileDraft((prev) => ({
              ...prev,
              notificationDefaults: next,
            }));
          }}
        />

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


