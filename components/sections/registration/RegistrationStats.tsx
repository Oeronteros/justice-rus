'use client';

import type { User } from '@/lib/schemas/auth';
import type { Registration } from '@/lib/schemas/registration';
import { canSeeNumericKpi } from '@/lib/authz';
import { getKPIClass } from '@/lib/utils';

interface RegistrationStatsProps {
  registrations: Registration[];
  user: User;
}

export function RegistrationStats({ registrations, user }: RegistrationStatsProps) {
  const isSilentMoonfall = (guild: string) => guild.trim().toLowerCase() === 'silent moonfall';
  const stats = {
    total: registrations.length,
    online: registrations.filter((r) => r.status === 'active' && isSilentMoonfall(r.guild)).length,
    avgKPI:
      registrations.length > 0
        ? (registrations.reduce((sum, r) => sum + r.kpi, 0) / registrations.length).toFixed(1)
        : '0',
  };
  const avgKpiClass = getKPIClass(Number(stats.avgKPI));

  return (
    <div id="registration-kpi" className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
      <div className="card section-card p-5 sm:p-6 text-center">
        <div className="text-3xl font-bold font-orbitron text-red-400 mb-2">
          {stats.total}
        </div>
        <div className="text-sm text-[#c7dbe7]">Всего учётных записей</div>
      </div>
      <div className="card section-card p-5 sm:p-6 text-center">
        <div className="text-3xl font-bold font-orbitron text-green-400 mb-2">
          {stats.online}
        </div>
        <div className="text-sm text-[#c7dbe7]">В строю</div>
      </div>
      {canSeeNumericKpi(user.role) && (
        <div className="card section-card p-5 sm:p-6 text-center">
          <div className={`text-3xl font-bold font-orbitron mb-2 ${avgKpiClass}`}>
            {stats.avgKPI}
          </div>
          <div className="text-sm text-[#c7dbe7]">Средний KPI</div>
        </div>
      )}
    </div>
  );
}
