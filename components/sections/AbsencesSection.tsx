'use client';

import { useEffect, useState } from 'react';
import { Absence, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface AbsencesSectionProps {
  user: User;
}

export default function AbsencesSection({ user }: AbsencesSectionProps) {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadAbsences();
  }, []);

  const loadAbsences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAbsences();
      setAbsences(data);
    } catch (err) {
      setError('Failed to load absences');
      console.error('Failed to load absences:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAbsences =
    statusFilter === 'all'
      ? absences
      : absences.filter((a) => a.status === statusFilter);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      pending: 'bg-yellow-900/30 text-yellow-400',
      approved: 'bg-green-900/30 text-green-400',
      rejected: 'bg-red-900/30 text-red-400',
    };
    return classes[status] || 'bg-gray-700';
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
            <h3 className="text-xl font-semibold mb-2">Error Loading Absences</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={loadAbsences}
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
            <i className="fas fa-calendar-times mr-3 text-red-500"></i>
            Absences
          </h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredAbsences.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <i className="fas fa-calendar-times text-4xl mb-4"></i>
              <p>No absences found</p>
            </div>
          ) : (
            filteredAbsences.map((absence) => (
              <div
                key={absence.id}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{absence.member}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                      absence.status
                    )}`}
                  >
                    {absence.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-400">Start Date:</span>
                    <p className="font-semibold">{formatDate(absence.startDate)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">End Date:</span>
                    <p className="font-semibold">{formatDate(absence.endDate)}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Reason:</span>
                  <p className="text-gray-300 mt-1">{absence.reason}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

