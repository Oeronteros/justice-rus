import type { Registration } from '@/types';

export type RegistrationSortOption =
  | 'nickname-asc'
  | 'nickname-desc'
  | 'rank-desc'
  | 'kpi-desc'
  | 'status-asc';

const rankPriority: Record<Registration['rank'], number> = {
  guest: 0,
  member: 1,
  officer: 2,
  head: 3,
  sysadmin: 4,
};

const statusPriority: Record<Registration['status'], number> = {
  active: 0,
  pending: 1,
  leave: 2,
  inactive: 3,
};

function compareText(left: string | null | undefined, right: string | null | undefined) {
  return (left || '').localeCompare(right || '', 'ru', { sensitivity: 'base' });
}

export function sortRegistrations(registrations: Registration[], sortBy: RegistrationSortOption): Registration[] {
  return registrations
    .map((registration, index) => ({ registration, index }))
    .sort((left, right) => {
      const a = left.registration;
      const b = right.registration;

      switch (sortBy) {
        case 'nickname-desc': {
          return compareText(b.nickname, a.nickname) || left.index - right.index;
        }
        case 'rank-desc': {
          return rankPriority[b.rank] - rankPriority[a.rank] || compareText(a.nickname, b.nickname) || left.index - right.index;
        }
        case 'kpi-desc': {
          return b.kpi - a.kpi || compareText(a.nickname, b.nickname) || left.index - right.index;
        }
        case 'status-asc': {
          return statusPriority[a.status] - statusPriority[b.status] || compareText(a.nickname, b.nickname) || left.index - right.index;
        }
        case 'nickname-asc':
        default: {
          return compareText(a.nickname, b.nickname) || left.index - right.index;
        }
      }
    })
    .map(({ registration }) => registration);
}
