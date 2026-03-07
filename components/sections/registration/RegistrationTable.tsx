'use client';

import { formatDate, getRankClass, getStatusClass, getKPIClass, getKpiIndicator } from '@/lib/utils';
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

export function RegistrationTable({ registrations, user, onRefresh }: RegistrationTableProps) {
  const canSeeFullStats = hasRoleAtLeast(user.role, 'officer');

  const editStats = async (registration: Registration) => {
    const nextElo = prompt('ELO дуэлей', String(registration.elo || 0));
    if (nextElo === null) return;
    const nextMmr = prompt('Best MMR PvP (MMR20)', String(registration.mmr20 || 0));
    if (nextMmr === null) return;
    const nextBounty = prompt('Bounty', String(registration.bounty || 0));
    if (nextBounty === null) return;
    const nextMarks = prompt('Отметки', String(registration.marks || 0));
    if (nextMarks === null) return;
    const nextKpi = prompt('KPI', String(registration.kpi || 0));
    if (nextKpi === null) return;

    await fetch('/api/discord-proxy/registration', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: registration.nickname,
        elo: Number(nextElo) || 0,
        mmr20: Number(nextMmr) || 0,
        bounty: Number(nextBounty) || 0,
        marks: Number(nextMarks) || 0,
        kpi: Number(nextKpi) || 0,
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
            <th className="text-left">Дата вступления</th>
            <th className="text-left">ELO</th>
            <th className="text-left">Best MMR PvP</th>
            <th className="text-left">Bounty</th>
            <th className="text-left">Отметки</th>
            <th className="text-left">KPI</th>
            <th className="text-left">Статус</th>
            {canSeeFullStats && <th className="text-left">Действия</th>}
          </tr>
        </thead>
        <tbody>
          {registrations.length === 0 ? (
            <tr>
              <td colSpan={canSeeFullStats ? 14 : 13} className="py-12 text-center text-gray-500">
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
                <td>{formatDate(registration.joinDate)}</td>
                <td>{registration.elo || 0}</td>
                <td>{registration.mmr20 || 0}</td>
                <td>{registration.bounty || 0}</td>
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
