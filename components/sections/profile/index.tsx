'use client';

import { useEffect, useMemo, useState } from 'react';
import type { PortalAccount, User, UserRole } from '@/types';
import WuxiaIcon from '@/components/WuxiaIcons';
import { SectionHero } from '@/components/shared/SectionHero';
import { canAssignRoles, canManageAccounts, roleOrder } from '@/lib/authz';
import { roleExplainerRows, roleLabels } from '@/lib/roles';
import { useAccounts, useUpdateAccount } from '@/lib/hooks/useAccounts';
import { useKnownClasses } from '@/lib/hooks/useKnownClasses';
import { useRegistrations, useUpdateRegistrationStats } from '@/lib/hooks/useRegistrations';
import { getKPIClass } from '@/lib/utils';

interface ProfileSectionProps {
  user: User;
}

type ActivityKey = 'outerHeroic' | 'innerHeroic' | 'crimsonSands' | 'abyss' | 'gvg' | 'secretRealm';

const activityLabels: Array<{ key: ActivityKey; label: string }> = [
  { key: 'outerHeroic', label: 'Outer Heroic' },
  { key: 'innerHeroic', label: 'Inner Heroic' },
  { key: 'crimsonSands', label: 'Crimson Sands' },
  { key: 'abyss', label: 'Abyss' },
  { key: 'gvg', label: 'GVG' },
  { key: 'secretRealm', label: 'Secret Realm' },
];

export default function ProfileSection({ user }: ProfileSectionProps) {
  const isAdmin = canManageAccounts(user.role);
  const canChangeRoles = canAssignRoles(user.role);
  const { data: knownClasses = [] } = useKnownClasses();
  const { data: accounts = [], isLoading: accountsLoading, error: accountsQueryError, refetch: refetchAccounts } = useAccounts(isAdmin);
  const { data: roster = [] } = useRegistrations();
  const updateAccountMutation = useUpdateAccount();
  const updateRegistrationStatsMutation = useUpdateRegistrationStats();

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [profileDraft, setProfileDraft] = useState({
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

  const roleOptions: UserRole[] = [...roleOrder];

  const profileRegistration = useMemo(
    () => roster.find((item) => item.nickname.toLowerCase() === (user.nickname || '').toLowerCase()),
    [roster, user.nickname]
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
  }, [profileRegistration, user.className]);

  const loadAccounts = () => {
    if (!isAdmin) return;
    void refetchAccounts();
  };

  const updateAccount = async (account: PortalAccount, next: { isActive?: boolean; role?: UserRole }) => {
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
  };

  const saveProfileStats = async () => {
    if (!user.nickname) {
      setProfileNotice('Ник не найден для сохранения профиля');
      return;
    }

    try {
      setProfileNotice(null);
      await updateRegistrationStatsMutation.mutateAsync({
        nickname: user.nickname,
        className: profileDraft.className,
        guild: profileDraft.guild.trim(),
        mmr20: Number(profileDraft.mmr20) || 0,
        outerHeroic: Number(profileDraft.outerHeroic) || 0,
        innerHeroic: Number(profileDraft.innerHeroic) || 0,
        crimsonSands: Number(profileDraft.crimsonSands) || 0,
        abyss: Number(profileDraft.abyss) || 0,
        gvg: Number(profileDraft.gvg) || 0,
        secretRealm: Number(profileDraft.secretRealm) || 0,
      });

      setProfileNotice('Профиль обновлён');
    } catch (error) {
      setProfileNotice(error instanceof Error ? error.message : 'Не удалось сохранить профиль');
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHero
          icon={<WuxiaIcon name="profile" className="w-5 h-5" />}
          title="Личный кабинет"
          subtitle="Твой профиль и управление учетками. Новые участники создаются неактивными и включаются админом."
          chips={['Account', 'Security', 'Admin Control']}
        />

        <div className="card p-6">
          <div className="text-sm uppercase tracking-widest text-[#9ec5d8] mb-2">Профиль</div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Ник</div>
              <div className="text-[#e6eff5] font-medium">{user.nickname || '—'}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Класс</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.class || user.className || '—'}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Клан</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.guild || '—'}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Роль</div>
              <div className="text-[#e6eff5] font-medium">{roleLabels[user.role]}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Статус</div>
              <div className="text-[#e6eff5] font-medium">{user.isActive ? 'active' : 'inactive'}</div>
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <div>
            <div className="text-sm uppercase tracking-widest text-[#9ec5d8] mb-2">Роли и доступ</div>
            <div className="text-gray-400 text-sm">
              Актуальные права по текущей иерархии: guest - member - officer - head - sysadmin.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
            {roleExplainerRows.map((entry) => {
              const isCurrentRole = entry.role === user.role;

              return (
                <article
                  key={entry.role}
                  className={`rounded-2xl border p-4 space-y-3 ${
                    isCurrentRole
                      ? 'border-[#2f6e8d]/70 bg-[#163042]/45'
                      : 'border-[#2a3c4c]/60 bg-[#101a23]/65'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#e6eff5] font-semibold">{entry.label}</span>
                    {isCurrentRole && (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8fb9cc]">Твоя роль</span>
                    )}
                  </div>

                  <p className="text-gray-300 text-xs leading-relaxed">{entry.summary}</p>

                  <div className="space-y-2">
                    {entry.capabilities.map((capability) => (
                      <div key={capability} className="flex items-start gap-2 text-xs text-[#c8dce8]">
                        <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-[#8fb9cc] shrink-0" />
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="card p-6 space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm uppercase tracking-widest text-[#9ec5d8] mb-2">Статистика</div>
              <div className="text-gray-400 text-sm">Данные из Neon: отметки, дуэли, Best MMR и расчётный KPI.</div>
            </div>
            <button
              type="button"
              className="btn-secondary px-4 py-2 text-sm"
              onClick={saveProfileStats}
              disabled={updateRegistrationStatsMutation.isPending}
            >
              {updateRegistrationStatsMutation.isPending ? 'Сохраняем...' : 'Сохранить профиль'}
            </button>
          </div>

          {profileNotice && (
            <div className="text-[#bcd6e5] text-sm p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {profileNotice}
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            <div className={`p-4 rounded-xl border ${profileKpiTone}`}>
              <div className="text-gray-400 mb-1">KPI</div>
              <div className={`font-medium ${profileKpiClass}`}>{profileRegistration?.kpi ?? 0}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">ELO</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.elo ?? 0}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Best MMR</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.mmr20 ?? 0}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Всего отметок</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.marks ?? 0}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Bounty</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.bounty ?? 0}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Победы в дуэлях</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.duelWins ?? 0}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Поражения в дуэлях</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.duelLosses ?? 0}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
              const isMarked = (profileDraft[key] || 0) > 0;

              return (
                <div key={key} className="rounded-2xl border border-[#2a3c4c]/60 bg-[#101a23]/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[#e6eff5] font-medium">{label}</div>
                      <div className="mt-1 text-xs text-gray-400">
                        Переключатель отметки: красный - нет, зелёный - да.
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isMarked}
                      onClick={() =>
                        setProfileDraft((prev) => ({
                          ...prev,
                          [key]: prev[key] > 0 ? 0 : 1,
                        }))
                      }
                      className={`relative inline-flex h-8 w-16 items-center rounded-full border transition-colors duration-200 ${
                        isMarked
                          ? 'border-green-400/60 bg-green-500/80 justify-end'
                          : 'border-red-400/50 bg-red-500/75 justify-start'
                      }`}
                    >
                      <span className="mx-1 inline-flex h-6 w-6 rounded-full bg-white/95 shadow-[0_6px_14px_rgba(0,0,0,0.28)]" />
                    </button>
                  </div>
                  <div className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isMarked ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-200'}`}>
                    {isMarked ? 'Отмечено' : 'Не отмечено'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {isAdmin && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h3 className="text-xl font-bold font-orbitron text-[#e6eff5]">Валидность учеток</h3>
              <button type="button" className="dc-icon-btn p-2.5 rounded-xl" onClick={loadAccounts} title="Обновить">
                <WuxiaIcon name="refresh" className="w-5 h-5" />
              </button>
            </div>

            {accountsError && (
              <div className="text-[#bcd6e5] text-sm mb-4 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
                <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                {accountsError}
              </div>
            )}

            {accountsLoading ? (
              <div className="text-sm text-gray-400">Загрузка аккаунтов...</div>
            ) : (
              <div className="overflow-x-auto">
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
                        <td>{roster.find((item) => item.nickname.toLowerCase() === account.nickname.toLowerCase())?.class || '—'}</td>
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
        )}
      </div>
    </section>
  );
}
