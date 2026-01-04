'use client';

import type { Registration } from '@/types';

interface RegistrationStatsProps {
  registrations: Registration[];
}

export function RegistrationStats({ registrations }: RegistrationStatsProps) {
  const stats = {
    total: registrations.length,
    online: registrations.filter((r) => r.status === 'active').length,
    avgKPI:
      registrations.length > 0
        ? (registrations.reduce((sum, r) => sum + r.kpi, 0) / registrations.length).toFixed(1)
        : '0',
  };

  return (
    <div id="registration-kpi" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold font-orbitron text-red-400 mb-2">
          {stats.total}
        </div>
        <div className="text-gray-400">Всего в ордене</div>
      </div>
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold font-orbitron text-green-400 mb-2">
          {stats.online}
        </div>
        <div className="text-gray-400">В строю</div>
      </div>
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold font-orbitron text-yellow-400 mb-2">
          {stats.avgKPI}
        </div>
        <div className="text-gray-400">Средний KPI</div>
      </div>
    </div>
  );
}
