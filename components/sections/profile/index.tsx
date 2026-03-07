'use client';

import { useEffect, useMemo, useState } from 'react';
import type { PortalAccount, Registration, User, UserRole } from '@/types';
import WuxiaIcon from '@/components/WuxiaIcons';
import { SectionHero } from '@/components/shared/SectionHero';
import { canAssignRoles, canManageAccounts } from '@/lib/authz';
import { useKnownClasses } from '@/lib/hooks/useKnownClasses';

interface ProfileSectionProps {
  user: User;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const isAdmin = canManageAccounts(user.role);
  const canChangeRoles = canAssignRoles(user.role);
  const { data: knownClasses = [] } = useKnownClasses();

  const [accounts, setAccounts] = useState<PortalAccount[]>([]);
  const [roster, setRoster] = useState<Registration[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [profileDraft, setProfileDraft] = useState({
    className: '',
    mmr20: 0,
    outerHeroic: 0,
    innerHeroic: 0,
    crimsonSands: 0,
    abyss: 0,
    gvg: 0,
    secretRealm: 0,
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState<string | null>(null);

  const roleOptions: UserRole[] = ['guest', 'member', 'officer', 'head', 'sysadmin'];
  const roleLabels: Record<UserRole, string> = {
    guest: 'Гость',
    member: 'Член',
    officer: 'Офицер',
    head: 'Глава',
    sysadmin: 'Сис.Админ',
  };

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

  useEffect(() => {
    setProfileDraft({
      className: profileRegistration?.class || user.className || '',
      mmr20: profileRegistration?.mmr20 || 0,
      outerHeroic: profileRegistration?.outerHeroic || 0,
      innerHeroic: profileRegistration?.innerHeroic || 0,
      crimsonSands: profileRegistration?.crimsonSands || 0,
      abyss: profileRegistration?.abyss || 0,
      gvg: profileRegistration?.gvg || 0,
      secretRealm: profileRegistration?.secretRealm || 0,
    });
  }, [profileRegistration, user.className]);

  const loadAccounts = async () => {
    if (!isAdmin) return;

    try {
      setAccountsLoading(true);
      setAccountsError(null);

      const response = await fetch('/api/admin/accounts', {
        credentials: 'include',
        cache: 'no-store',
      });

      const payload = (await response.json().catch(() => [])) as PortalAccount[] | { error?: string };
      if (!response.ok || !Array.isArray(payload)) {
        throw new Error((payload as any)?.error || 'Failed to load accounts');
      }

      setAccounts(payload);
    } catch (error) {
      setAccountsError(error instanceof Error ? error.message : 'Failed to load accounts');
    } finally {
      setAccountsLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, [isAdmin]);

  useEffect(() => {
    const loadRoster = async () => {
      try {
        const response = await fetch('/api/discord-proxy/registration', {
          credentials: 'include',
          cache: 'no-store',
        });
        const payload = (await response.json().catch(() => [])) as Registration[];
        if (response.ok && Array.isArray(payload)) {
          setRoster(payload);
        }
      } catch {
        // ignore profile enrichment errors
      }
    };

    loadRoster();
  }, []);

  const updateAccount = async (account: PortalAccount, next: { isActive?: boolean; role?: UserRole }) => {
    try {
      setTogglingId(account.id);
      const response = await fetch('/api/admin/accounts', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: account.id,
          isActive: next.isActive ?? account.isActive,
          role: next.role,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as PortalAccount | { error?: string };
      if (!response.ok || !('id' in payload)) {
        throw new Error((payload as any)?.error || 'Failed to update account');
      }

      setAccounts((prev) => prev.map((item) => (item.id === payload.id ? (payload as PortalAccount) : item)));
    } catch (error) {
      setAccountsError(error instanceof Error ? error.message : 'Failed to update account');
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
      setProfileSaving(true);
      setProfileNotice(null);
      const response = await fetch('/api/discord-proxy/registration', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: user.nickname,
          className: profileDraft.className,
          mmr20: Number(profileDraft.mmr20) || 0,
          outerHeroic: Number(profileDraft.outerHeroic) || 0,
          innerHeroic: Number(profileDraft.innerHeroic) || 0,
          crimsonSands: Number(profileDraft.crimsonSands) || 0,
          abyss: Number(profileDraft.abyss) || 0,
          gvg: Number(profileDraft.gvg) || 0,
          secretRealm: Number(profileDraft.secretRealm) || 0,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!response.ok) {
        throw new Error(payload.error || payload.message || 'Не удалось сохранить профиль');
      }

      setProfileNotice('Профиль обновлён');
      const refreshedRoster = await fetch('/api/discord-proxy/registration', {
        credentials: 'include',
        cache: 'no-store',
      });
      const rosterPayload = (await refreshedRoster.json().catch(() => [])) as Registration[];
      if (refreshedRoster.ok && Array.isArray(rosterPayload)) {
        setRoster(rosterPayload);
      }
    } catch (error) {
      setProfileNotice(error instanceof Error ? error.message : 'Не удалось сохранить профиль');
    } finally {
      setProfileSaving(false);
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Ник</div>
              <div className="text-[#e6eff5] font-medium">{user.nickname || '—'}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">Класс</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.class || user.className || '—'}</div>
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
              disabled={profileSaving}
            >
              {profileSaving ? 'Сохраняем...' : 'Сохранить профиль'}
            </button>
          </div>

          {profileNotice && (
            <div className="text-[#bcd6e5] text-sm p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {profileNotice}
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-[#101a23]/70 border border-[#2a3c4c]/60">
              <div className="text-gray-400 mb-1">KPI</div>
              <div className="text-[#e6eff5] font-medium">{profileRegistration?.kpi ?? 0}</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
              <span className="text-gray-400">Best MMR</span>
              <input
                type="number"
                value={profileDraft.mmr20}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, mmr20: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Outer Heroic</span>
              <input
                type="number"
                value={profileDraft.outerHeroic}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, outerHeroic: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Inner Heroic</span>
              <input
                type="number"
                value={profileDraft.innerHeroic}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, innerHeroic: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Crimson Sands</span>
              <input
                type="number"
                value={profileDraft.crimsonSands}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, crimsonSands: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Abyss</span>
              <input
                type="number"
                value={profileDraft.abyss}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, abyss: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">GVG</span>
              <input
                type="number"
                value={profileDraft.gvg}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, gvg: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Secret Realm</span>
              <input
                type="number"
                value={profileDraft.secretRealm}
                onChange={(e) => setProfileDraft((prev) => ({ ...prev, secretRealm: Number(e.target.value) || 0 }))}
                className="input-field w-full"
              />
            </label>
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
