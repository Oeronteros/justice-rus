import { describe, expect, it } from 'vitest';
import {
  desktopNavGroups,
  desktopPrimarySections,
  desktopSecondarySections,
  mobileNavGroups,
  mobilePrimarySections,
  mobileSecondarySections,
  navItems,
  resolveSectionFromPath,
  sectionPathEntries,
  sectionPathAliases,
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

  it('derives section resolution from canonical nav routes and aliases', () => {
    for (const item of navItems) {
      expect(resolveSectionFromPath(item.href)).toBe(item.section);
    }

    expect(resolveSectionFromPath('/integrations/discord')).toBe('integrations');
    expect(resolveSectionFromPath('/integrations/google-sheets')).toBe('integrations');
    expect(resolveSectionFromPath('/integrations/wow')).toBe('integrations');
  });

  it('keeps integration aliases and fallback behavior explicit', () => {
    expect(sectionPathAliases.integrations).toEqual(['/integrations/discord', '/integrations/google-sheets', '/integrations/wow']);
    expect(sectionPathEntries).toContainEqual(['/integrations/discord', 'integrations']);
    expect(sectionPathEntries).toContainEqual(['/integrations/google-sheets', 'integrations']);
    expect(sectionPathEntries).toContainEqual(['/integrations/wow', 'integrations']);
    expect(resolveSectionFromPath('/unknown-path')).toBe('about');
  });
});
