import { describe, expect, it } from 'vitest';
import { canAssignRoles, canManageAccounts, canModerateContent, canSeeNumericKpi, hasRoleAtLeast, roleOrder } from '@/lib/authz';
import type { UserRole } from '@/lib/schemas/auth';

describe('lib/authz', () => {
  it('keeps expected role order', () => {
    expect(roleOrder).toEqual(['guest', 'member', 'officer', 'head', 'sysadmin']);
  });

  it('checks rank thresholds correctly', () => {
    expect(hasRoleAtLeast('guest', 'member')).toBe(false);
    expect(hasRoleAtLeast('member', 'member')).toBe(true);
    expect(hasRoleAtLeast('officer', 'member')).toBe(true);
    expect(hasRoleAtLeast('head', 'officer')).toBe(true);
    expect(hasRoleAtLeast('sysadmin', 'head')).toBe(true);
  });

  it('enforces current permission boundaries', () => {
    const roles: UserRole[] = ['guest', 'member', 'officer', 'head', 'sysadmin'];

    for (const role of roles) {
      const isOfficerOrHigher = role === 'officer' || role === 'head' || role === 'sysadmin';
      const isHeadOrHigher = role === 'head' || role === 'sysadmin';

      expect(canManageAccounts(role)).toBe(isOfficerOrHigher);
      expect(canSeeNumericKpi(role)).toBe(isOfficerOrHigher);
      expect(canAssignRoles(role)).toBe(isHeadOrHigher);
      expect(canModerateContent(role)).toBe(isHeadOrHigher);
    }
  });
});
