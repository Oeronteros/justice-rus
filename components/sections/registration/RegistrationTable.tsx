'use client';

import { getKPIClass, getKpiIndicator, getRankClass, getStatusClass } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { Registration, User } from '@/types';
import { canSeeNumericKpi, hasRoleAtLeast } from '@/lib/authz';
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

function getAvatarInitials(registration: Registration) {
  const base = registration.nickname || registration.discord || 'SM';
  return base
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'SM';
}

function RegistrationIdentity({ registration, compact = false }: { registration: Registration; compact?: boolean }) {
  const initials = getAvatarInitials(registration);
  const sizeClass = compact ? 'h-11 w-11 text-xs' : 'h-9 w-9 text-[11px]';

  return (
    <div className="flex items-center gap-3 min-w-0">
      {registration.avatarUrl ? (
        <img
          src={registration.avatarUrl}
          alt={registration.nickname || registration.discord || 'Avatar'}
          className={`${sizeClass} rounded-full border border-[#385264] object-cover bg-[#0c151d] shrink-0`}
        />
      ) : (
        <div className={`${sizeClass} rounded-full border border-[#385264] bg-gradient-to-br from-[#223544] to-[#4a90b0] text-[#f7fbff] font-semibold shrink-0 grid place-items-center`}>
          {initials}
        </div>
      )}

      <div className="min-w-0">
        <div className="font-medium truncate">{registration.discord || 'Без Discord ID'}</div>
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

export function RegistrationTable({ registrations, user, onRefresh, columnLabels }: RegistrationTableProps) {
  const canSeeFullStats = hasRoleAtLeast(user.role, 'officer');

  const editStats = async (registration: Registration) => {
    const nextClass = prompt('Класс', registration.class || '');
    if (nextClass === null) return;
    const nextGuild = prompt('Клан', registration.guild || '');
    if (nextGuild === null) return;
    const nextElo = prompt('ELO дуэлей', String(registration.elo || 0));
    if (nextElo === null) return;
    const nextMmr = prompt('Best MMR PvP (MMR20)', String(registration.mmr20 || 0));
    if (nextMmr === null) return;
    const nextBounty = prompt('Bounty', String(registration.bounty || 0));
    if (nextBounty === null) return;
    const nextOuter = prompt('Outer Heroic', String(registration.outerHeroic || 0));
    if (nextOuter === null) return;
    const nextInner = prompt('Inner Heroic', String(registration.innerHeroic || 0));
    if (nextInner === null) return;
    const nextCrimson = prompt('Crimson Sands', String(registration.crimsonSands || 0));
    if (nextCrimson === null) return;
    const nextAbyss = prompt('Abyss', String(registration.abyss || 0));
    if (nextAbyss === null) return;
    const nextGvg = prompt('GVG', String(registration.gvg || 0));
    if (nextGvg === null) return;
    const nextSecretRealm = prompt('Secret Realm', String(registration.secretRealm || 0));
    if (nextSecretRealm === null) return;

    try {
      const response = await fetch('/api/discord-proxy/registration', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: registration.nickname,
          className: nextClass.trim(),
          guild: nextGuild.trim(),
          elo: Number(nextElo) || 0,
          mmr20: Number(nextMmr) || 0,
          bounty: Number(nextBounty) || 0,
          outerHeroic: Number(nextOuter) || 0,
          innerHeroic: Number(nextInner) || 0,
          crimsonSands: Number(nextCrimson) || 0,
          abyss: Number(nextAbyss) || 0,
          gvg: Number(nextGvg) || 0,
          secretRealm: Number(nextSecretRealm) || 0,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!response.ok) {
        throw new Error(payload.error || payload.message || 'Не удалось обновить запись');
      }

      onRefresh?.();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Не удалось обновить запись');
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
      <div className="hidden md:block overflow-x-auto">
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
                <td>{registration.class || '—'}</td>
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
                    <button type="button" className="btn-secondary px-3 py-2 text-xs" onClick={() => editStats(registration)}>
                      Изменить
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid grid-cols-1 gap-4">
        {registrations.map((registration, index) => (
          <div key={`${registration.nickname}-${registration.discord || index}`} className="rounded-2xl border border-[#2a3c4c]/60 bg-[#101a23]/60 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <RegistrationIdentity registration={registration} compact />
                <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.18em] text-[#9ec5d8] mb-1">#{index + 1}</div>
                <div className="text-lg font-semibold text-[#e6eff5]">{registration.nickname}</div>
                  <div className="text-sm text-gray-400 mt-1 truncate">{registration.discord || 'Без Discord ID'}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${getRankClass(registration.rank)}`}>
                {rankLabels[registration.rank] || registration.rank}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[#0c151d]/80 border border-[#223544]/60 p-3">
                <div className="text-gray-400 mb-1">{columnLabels.class}</div>
                <div className="text-[#e6eff5]">{registration.class || '—'}</div>
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
              <button type="button" className="btn-secondary w-full py-3" onClick={() => editStats(registration)}>
                Изменить запись
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
