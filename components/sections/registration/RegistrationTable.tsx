'use client';

import { getRankClass, getStatusClass, getKPIClass, getKpiIndicator } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { Registration, User } from '@/types';
import { canSeeNumericKpi, hasRoleAtLeast } from '@/lib/authz';

interface RegistrationTableProps {
  registrations: Registration[];
  user: User;
  onRefresh?: () => void;
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

function renderActivityValue(value: number) {
  if (value <= 0) {
    return '—';
  }

  return value > 1 ? `${value} ✓` : '✓';
}

export function RegistrationTable({ registrations, user, onRefresh }: RegistrationTableProps) {
  const canSeeFullStats = hasRoleAtLeast(user.role, 'officer');

  const editStats = async (registration: Registration) => {
    const nextClass = prompt('Класс', registration.class || '');
    if (nextClass === null) return;
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

    await fetch('/api/discord-proxy/registration', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: registration.nickname,
        className: nextClass.trim(),
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

    onRefresh?.();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-modern">
        <thead>
          <tr>
            <th className="text-left">Знак</th>
            <th className="text-left">Discord</th>
            <th className="text-left">Имя</th>
            <th className="text-left">Ранг</th>
            <th className="text-left">Класс</th>
            <th className="text-left">Клан</th>
            <th className="text-left">ELO</th>
            <th className="text-left">Best MMR PvP</th>
            <th className="text-left">Bounty</th>
            <th className="text-left">Outer Heroic</th>
            <th className="text-left">Inner Heroic</th>
            <th className="text-left">Crimson Sands</th>
            <th className="text-left">Abyss</th>
            <th className="text-left">GVG</th>
            <th className="text-left">Secret Realm</th>
            <th className="text-left">Отметки</th>
            <th className="text-left">KPI</th>
            <th className="text-left">Статус</th>
            {canSeeFullStats && <th className="text-left">Действия</th>}
          </tr>
        </thead>
        <tbody>
          {registrations.length === 0 ? (
            <tr>
              <td colSpan={canSeeFullStats ? 19 : 18} className="py-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <WuxiaIcon name="usersSlash" className="w-10 h-10 mb-3 text-gray-400" />
                  <div className="text-lg">Записей не найдено</div>
                  <div className="text-sm">Смени поиск или фильтры</div>
                </div>
              </td>
            </tr>
          ) : (
            registrations.map((registration, index) => (
              <tr key={index} className="hover:bg-gray-800/50">
                <td className="text-red-400 font-medium">#{index + 1}</td>
                <td className="font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{registration.discord}</span>
                  </div>
                </td>
                <td className="font-medium">{registration.nickname}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getRankClass(registration.rank)}`}
                  >
                    {rankLabels[registration.rank] || registration.rank}
                  </span>
                </td>
                <td>{registration.class}</td>
                <td>{registration.guild}</td>
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
                <td>
                  {canSeeNumericKpi(user.role) || registration.nickname.toLowerCase() === (user.nickname || '').toLowerCase() ? (
                    <span className={`${getKPIClass(registration.kpi)} font-medium`}>
                      {registration.kpi}
                    </span>
                  ) : (
                    <span className={`inline-flex items-center gap-2 ${getKpiIndicator(registration.kpi).className}`}>
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-current"></span>
                      <span className="text-xs uppercase tracking-wide">{getKpiIndicator(registration.kpi).label}</span>
                    </span>
                  )}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusClass(registration.status)}`}
                  >
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
