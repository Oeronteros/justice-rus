'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, statusFilter, rankFilter]);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getRegistrations();
      setRegistrations(data);
      setFilteredRegistrations(data);
    } catch (err) {
      setError('Failed to load registrations');
      console.error('Failed to load registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
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
  };

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
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Error Loading Registrations</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={loadRegistrations}
              className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition"
            >
              <i className="fas fa-redo mr-2"></i>Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
            <i className="fas fa-users mr-3 text-red-500"></i>
            Registration List
          </h2>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Registrations</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.online}</div>
            <div className="text-sm text-gray-400">Online</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.avgKPI}</div>
            <div className="text-sm text-gray-400">Avg KPI</div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={rankFilter}
            onChange={(e) => setRankFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="all">All Ranks</option>
            <option value="novice">Novice</option>
            <option value="member">Member</option>
            <option value="veteran">Veteran</option>
            <option value="elite">Elite</option>
            <option value="legend">Legend</option>
            <option value="gm">GM</option>
          </select>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
          <div className="table-responsive">
            <table className="min-w-full">
              <thead className="bg-gray-900/80">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Discord | Telegram</th>
                  <th className="py-3 px-4 text-left">Nickname</th>
                  <th className="py-3 px-4 text-left">Rank</th>
                  <th className="py-3 px-4 text-left">Class</th>
                  <th className="py-3 px-4 text-left">Guild</th>
                  <th className="py-3 px-4 text-left">Join Date</th>
                  <th className="py-3 px-4 text-left">KPI</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-400">
                      <i className="fas fa-users-slash text-2xl mb-2"></i>
                      <div>No registrations found</div>
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((registration, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-700/30 transition"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <i className="fab fa-discord text-blue-400"></i>
                          <span>{registration.discord}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{registration.nickname}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getRankClass(
                            registration.rank
                          )}`}
                        >
                          {registration.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4">{registration.class}</td>
                      <td className="py-3 px-4">{registration.guild}</td>
                      <td className="py-3 px-4">{formatDate(registration.joinDate)}</td>
                      <td className="py-3 px-4">
                        <span className={`kpi ${getKPIClass(registration.kpi)}`}>
                          {registration.kpi}
                        </span>
                      </td>
                      <td className="py-3 px-4">
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

