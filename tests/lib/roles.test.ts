import { describe, expect, it } from 'vitest';
import { roleExplainerRows, roleLabels } from '@/lib/roles';

describe('lib/roles', () => {
  it('contains role labels for the current hierarchy', () => {
    expect(roleLabels.guest).toBe('Гость');
    expect(roleLabels.member).toBe('Член');
    expect(roleLabels.officer).toBe('Офицер');
    expect(roleLabels.head).toBe('Глава');
    expect(roleLabels.sysadmin).toBe('Сис.Админ');
  });

  it('builds role explainer rows in stable order', () => {
    expect(roleExplainerRows.map((item) => item.role)).toEqual([
      'guest',
      'member',
      'officer',
      'head',
      'sysadmin',
    ]);
  });

  it('keeps officer/head/sysadmin capabilities differentiated', () => {
    const officer = roleExplainerRows.find((item) => item.role === 'officer');
    const head = roleExplainerRows.find((item) => item.role === 'head');
    const sysadmin = roleExplainerRows.find((item) => item.role === 'sysadmin');

    expect(officer?.capabilities.some((item) => item.includes('назначать роли'))).toBe(false);
    expect(head?.capabilities.some((item) => item.includes('назначать роли'))).toBe(true);
    expect(sysadmin?.capabilities.some((item) => item.includes('назначать роли'))).toBe(true);
  });
});
