import type { IconName } from '@/components/WuxiaIcons';
import type { Section } from '@/types';

export type NavItem = {
  section: Section;
  href: string;
  icon: IconName;
};

export type NavGroupKey = 'core' | 'guild' | 'command' | 'tools';

export type NavGroup = {
  key: NavGroupKey;
  sections: readonly Section[];
};

export type NavGroupWithItems = NavGroup & {
  items: NavItem[];
};

export const navItems: NavItem[] = [
  { section: 'about', href: '/', icon: 'eye' },
  { section: 'news', href: '/news', icon: 'news' },
  { section: 'registration', href: '/members', icon: 'registration' },
  { section: 'schedule', href: '/schedule', icon: 'schedule' },
  { section: 'calendar', href: '/calendar', icon: 'calendar' },
  { section: 'guides', href: '/guides', icon: 'guides' },
  { section: 'absences', href: '/absences', icon: 'absences' },
  { section: 'pvp', href: '/pvp', icon: 'sword' },
  { section: 'analytics', href: '/analytics', icon: 'analytics' },
  { section: 'workflow', href: '/workflow', icon: 'workflow' },
  { section: 'integrations', href: '/integrations', icon: 'integrations' },
  { section: 'help', href: '/help', icon: 'help' },
  { section: 'profile', href: '/profile', icon: 'profile' },
  { section: 'calculator', href: '/calculator', icon: 'calculator' },
];

export const sectionPathAliases: Readonly<Partial<Record<Section, readonly string[]>>> = {
  integrations: ['/integrations/discord', '/integrations/google-sheets', '/integrations/wow'],
};

export const sectionPathEntries: ReadonlyArray<readonly [path: string, section: Section]> = navItems.flatMap((item) => {
  const aliases = sectionPathAliases[item.section] ?? [];
  return [[item.href, item.section] as const, ...aliases.map((alias) => [alias, item.section] as const)];
});

const pathToSection = Object.fromEntries(sectionPathEntries) as Record<string, Section>;
export function resolveSectionFromPath(pathname: string): Section {
  return pathToSection[pathname] ?? 'about';
}

function pickNavItems(sections: readonly Section[]): NavItem[] {
  return sections
    .map((section) => navItems.find((item) => item.section === section))
    .filter((item): item is NavItem => Boolean(item));
}

// Primary sections - shown as main nav items
export const primarySections: readonly Section[] = [
  'about', 'news', 'registration', 'schedule', 'guides', 'help', 'profile'
];

// All sections for unified navigation
export const allSections: readonly Section[] = [
  'about', 'news', 'registration', 'schedule', 'calendar', 'guides', 
  'absences', 'pvp', 'analytics', 'workflow', 'integrations', 
  'help', 'profile', 'calculator'
];

// Navigation groups (for mobile accordion)
export const navGroups: readonly NavGroup[] = [
  { key: 'core', sections: ['registration', 'schedule', 'calendar'] },
  { key: 'guild', sections: ['guides', 'absences', 'pvp'] },
  { key: 'command', sections: ['analytics', 'workflow', 'integrations'] },
  { key: 'tools', sections: ['help', 'calculator', 'profile'] },
];

// Unified nav items for desktop (no split between primary/secondary)
export const unifiedNavItems = pickNavItems(allSections);
export const primaryNavItems = pickNavItems(primarySections);
export const groupedNavItems = navGroups.map((group) => ({
  ...group,
  items: pickNavItems(group.sections),
}));

// Legacy exports for backwards compatibility
export const desktopPrimarySections: readonly Section[] = primarySections;
export const desktopSecondarySections: readonly Section[] = allSections.filter(s => !primarySections.includes(s));
export const mobilePrimarySections: readonly Section[] = ['about', 'news', 'schedule', 'help'];
export const mobileSecondarySections: readonly Section[] = allSections.filter(s => !mobilePrimarySections.includes(s));

export const desktopNavGroups: readonly NavGroup[] = navGroups;
export const mobileNavGroups: readonly NavGroup[] = navGroups;

export const desktopPrimaryNavItems = primaryNavItems;
export const desktopSecondaryNavItems = pickNavItems(desktopSecondarySections);
export const mobilePrimaryNavItems = pickNavItems(mobilePrimarySections);
export const mobileSecondaryNavItems = pickNavItems(mobileSecondarySections);
export const desktopGroupedNavItems = groupedNavItems;
export const mobileGroupedNavItems = groupedNavItems;

export function resolveNavGroupForSection(
  section: Section,
  groups: readonly NavGroupWithItems[]
): NavGroupWithItems | null {
  return groups.find((group) => group.sections.includes(section)) ?? null;
}
