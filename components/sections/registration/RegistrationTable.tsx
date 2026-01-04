'use client';

import { formatDate, getRankClass, getStatusClass, getKPIClass } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { Registration } from '@/types';

interface RegistrationTableProps {
  registrations: Registration[];
}

const rankLabels: Record<string, string> = {
  novice: 'Новик',
  member: 'Брат',
  veteran: 'Ветеран',
  elite: 'Элита',
  legend: 'Легенда',
  gm: 'ГМ',
};

const statusLabels: Record<string, string> = {
  active: 'Активен',
  inactive: 'Неактивен',
  pending: 'Ожидает',
  leave: 'Отгул',
};

export function RegistrationTable({ registrations }: RegistrationTableProps) {
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
            <th className="text-left">KPI</th>
            <th className="text-left">Статус</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-12 text-center text-gray-500">
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
                <td>
                  <span className={`${getKPIClass(registration.kpi)} font-medium`}>
                    {registration.kpi}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusClass(registration.status)}`}
                  >
                    {statusLabels[registration.status] || registration.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
