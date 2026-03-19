import { describe, expect, it } from 'vitest';
import {
  desktopNavGroups,
  desktopPrimarySections,
  desktopSecondarySections,
  mobileNavGroups,
  mobilePrimarySections,
  mobileSecondarySections,
  navItems,
} from '@/lib/nav';

function flattenGroupSections(groups: ReadonlyArray<{ sections: readonly string[] }>): string[] {
  return groups.flatMap((group) => group.sections);
}

function pickRoutes(sections: readonly string[]): string[] {
  return sections
    .map((section) => navItems.find((item) => item.section === section)?.href)
    .filter((href): href is string => Boolean(href));
}

describe('core portal IA contract', () => {
  it('keeps desktop and mobile primary rails focused on daily routes', () => {
    expect(desktopPrimarySections).toEqual(['about', 'news', 'schedule', 'help', 'profile']);
    expect(mobilePrimarySections).toEqual(['about', 'news', 'schedule', 'help']);
  });

  it('moves account and guild depth routes into grouped secondary navigation', () => {
    expect(desktopSecondarySections).toEqual(['registration', 'guides', 'absences', 'pvp', 'analytics', 'workflow', 'integrations', 'calculator']);
    expect(mobileSecondarySections).toEqual(['registration', 'profile', 'guides', 'absences', 'pvp', 'analytics', 'workflow', 'integrations', 'calculator']);
    expect(flattenGroupSections(desktopNavGroups)).toEqual(desktopSecondarySections);
    expect(flattenGroupSections(mobileNavGroups)).toEqual(mobileSecondarySections);
  });

  it('preserves existing route destinations for moved sections', () => {
    const registration = navItems.find((item) => item.section === 'registration');
    const profile = navItems.find((item) => item.section === 'profile');

    expect(registration?.href).toBe('/members');
    expect(profile?.href).toBe('/profile');
  });

  it('keeps core refresh route ownership explicit from nav metadata', () => {
    const inScopeRoutes = pickRoutes(['about', 'news', 'guides', 'schedule', 'help', 'profile']);
    const shellSmokeOnlyRoutes = pickRoutes(['registration', 'absences', 'pvp', 'analytics', 'workflow', 'integrations', 'calculator']);

    expect(inScopeRoutes).toEqual(['/', '/news', '/guides', '/schedule', '/help', '/profile']);
    expect(shellSmokeOnlyRoutes).toEqual(['/members', '/absences', '/pvp', '/analytics', '/workflow', '/integrations', '/calculator']);
  });
});
