'use client';

import { useCallback, useEffect, useState } from 'react';
import { Registration, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate, getRankClass, getStatusClass, getKPIClass } from '@/lib/utils';

interface RegistrationSectionProps {
  user: User;
}

export default function RegistrationSection({ user }: RegistrationSectionProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [rankFilter, setRankFilter] = useState<string>('all');

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getRegistrations();
      setRegistrations(data);
      setFilteredRegistrations(data);
    } catch (err) {
      setError('Не удалось загрузить реестр');
      console.error('Failed to load registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = useCallback(() => {
    let filtered = [...registrations];

    // Поиск
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (registration) =>
          registration.discord.toLowerCase().includes(searchLower) ||
          registration.nickname.toLowerCase().includes(searchLower) ||
          registration.class.toLowerCase().includes(searchLower)
      );
    }

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter((registration) => registration.status === statusFilter);
    }

    // Фильтр по рангу
    if (rankFilter !== 'all') {
      filtered = filtered.filter(
        (registration) => registration.rank.toLowerCase() === rankFilter.toLowerCase()
      );
    }

    setFilteredRegistrations(filtered);
  }, [registrations, searchTerm, statusFilter, rankFilter]);

  useEffect(() => {
    filterRegistrations();
  }, [filterRegistrations]);


  const stats = {
    total: registrations.length,
    online: registrations.filter((r) => r.status === 'active').length,
    avgKPI:
      registrations.length > 0
        ? (
            registrations.reduce((sum, r) => sum + r.kpi, 0) / registrations.length
          ).toFixed(1)
        : '0',
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-2">
              <i className="fas fa-users mr-3"></i>
              Реестр Культа
            </h2>
            <p className="text-gray-400">Призываем записи ордена...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-8 bg-gray-800 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <div className="h-64 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-2xl text-red-400"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Реестр недоступен</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadRegistrations}
              className="btn-primary"
            >
              <i className="fas fa-redo mr-2"></i>Повторить ритуал
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <i className="fas fa-users mr-3"></i>
            Реестр Культа
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Состав ордена, ранги и клятвы каждого, кто носит наш знак.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-red-400 mb-2">{stats.total}</div>
            <div className="text-gray-400">Всего в ордене</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-green-400 mb-2">{stats.online}</div>
            <div className="text-gray-400">В строю</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-yellow-400 mb-2">{stats.avgKPI}</div>
            <div className="text-gray-400">Средний KPI</div>
          </div>
        </div>

        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по имени, Discord или классу..."
              className="input-field flex-1"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-field"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активен</option>
              <option value="inactive">Неактивен</option>
              <option value="pending">Ожидает</option>
              <option value="leave">Отгул</option>
            </select>

            <select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
              className="select-field"
            >
              <option value="all">Все ранги</option>
              <option value="novice">Новик</option>
              <option value="member">Брат</option>
              <option value="veteran">Ветеран</option>
              <option value="elite">Элита</option>
              <option value="legend">Легенда</option>
              <option value="gm">ГМ</option>
            </select>
          </div>

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
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <i className="fas fa-users-slash text-3xl mb-3"></i>
                        <div className="text-lg">Записей не найдено</div>
                        <div className="text-sm">Смени поиск или фильтры</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((registration, index) => (
                    <tr key={index} className="hover:bg-gray-800/50">
                      <td className="text-red-400 font-medium">#{index + 1}</td>
                      <td className="font-medium">
                        <div className="flex items-center space-x-2">
                          <i className="fab fa-discord text-blue-400"></i>
                          <span>{registration.discord}</span>
                        </div>
                      </td>
                      <td className="font-medium">{registration.nickname}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getRankClass(
                            registration.rank
                          )}`}
                        >
                          {registration.rank}
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
                          className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                            registration.status
                          )}`}
                        >
                          {registration.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
