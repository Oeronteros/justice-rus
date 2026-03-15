'use client';

import type { User } from '@/lib/schemas/auth';
import type { Registration } from '@/lib/schemas/registration';
import { canSeeNumericKpi } from '@/lib/authz';
import { getKPIClass } from '@/lib/utils';
import * as stylex from '@stylexjs/stylex';
import { registrationStyles } from './Registration.stylex';

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
  const avgKpiTone = avgKpiClass === 'kpi-good'
    ? registrationStyles.statValueKpiGood
    : avgKpiClass === 'kpi-medium'
      ? registrationStyles.statValueKpiMedium
      : registrationStyles.statValueKpiBad;

  return (
    <div id="registration-kpi" {...stylex.props(registrationStyles.statsGrid)}>
      <div {...stylex.props(registrationStyles.statTile)}>
        <div {...stylex.props(registrationStyles.statValue, registrationStyles.statValueTotal)}>
          {stats.total}
        </div>
        <div {...stylex.props(registrationStyles.statLabel)}>Всего учётных записей</div>
      </div>
      <div {...stylex.props(registrationStyles.statTile)}>
        <div {...stylex.props(registrationStyles.statValue, registrationStyles.statValueOnline)}>
          {stats.online}
        </div>
        <div {...stylex.props(registrationStyles.statLabel)}>В строю</div>
      </div>
      {canSeeNumericKpi(user.role) && (
        <div {...stylex.props(registrationStyles.statTile)}>
          <div {...stylex.props(registrationStyles.statValue, avgKpiTone)}>
            {stats.avgKPI}
          </div>
          <div {...stylex.props(registrationStyles.statLabel)}>Средний KPI</div>
        </div>
      )}
    </div>
  );
}
