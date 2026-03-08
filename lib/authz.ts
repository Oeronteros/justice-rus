import type { UserRole } from '@/lib/schemas/auth';

export const roleOrder: UserRole[] = ['guest', 'member', 'officer', 'head', 'sysadmin'];

export function hasRoleAtLeast(role: UserRole | undefined | null, minimum: UserRole): boolean {
  if (!role) return false;
  return roleOrder.indexOf(role) >= roleOrder.indexOf(minimum);
}

export function canManageAccounts(role: UserRole | undefined | null): boolean {
  return hasRoleAtLeast(role, 'officer');
}

export function canAssignRoles(role: UserRole | undefined | null): boolean {
  return hasRoleAtLeast(role, 'head');
}

export function canModerateContent(role: UserRole | undefined | null): boolean {
  return hasRoleAtLeast(role, 'head');
}

export function canSeeNumericKpi(role: UserRole | undefined | null): boolean {
  return hasRoleAtLeast(role, 'officer');
}
