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
      setError('Failed to load registrations');
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
              Registration List
            </h2>
            <p className="text-gray-400">Loading guild members data...</p>
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
            <h3 className="text-2xl font-bold text-red-400 mb-2">Error Loading Registrations</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadRegistrations}
              className="btn-primary"
            >
              <i className="fas fa-redo mr-2"></i>Try Again
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
            Registration List
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">View and manage all guild members and their registration details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-red-400 mb-2">{stats.total}</div>
            <div className="text-gray-400">Total Registrations</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-green-400 mb-2">{stats.online}</div>
            <div className="text-gray-400">Online Now</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-yellow-400 mb-2">{stats.avgKPI}</div>
            <div className="text-gray-400">Avg KPI</div>
          </div>
        </div>

        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, discord or class..."
              className="input-field flex-1"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="leave">Leave</option>
            </select>

            <select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
              className="select-field"
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

          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Discord</th>
                  <th className="text-left">Nickname</th>
                  <th className="text-left">Rank</th>
                  <th className="text-left">Class</th>
                  <th className="text-left">Guild</th>
                  <th className="text-left">Join Date</th>
                  <th className="text-left">KPI</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <i className="fas fa-users-slash text-3xl mb-3"></i>
                        <div className="text-lg">No registrations found</div>
                        <div className="text-sm">Try adjusting your search or filters</div>
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

