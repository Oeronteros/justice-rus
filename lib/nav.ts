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

export const navItems: NavItem[] = [
  { section: 'about', href: '/', icon: 'eye' },
  { section: 'news', href: '/news', icon: 'news' },
  { section: 'registration', href: '/members', icon: 'registration' },
  { section: 'schedule', href: '/schedule', icon: 'schedule' },
  { section: 'calendar', href: '/calendar', icon: 'calendar' },
  { section: 'analytics', href: '/analytics', icon: 'analytics' },
  { section: 'workflow', href: '/workflow', icon: 'workflow' },
  { section: 'integrations', href: '/integrations', icon: 'integrations' },
  { section: 'pvp', href: '/pvp', icon: 'sword' },
  { section: 'guides', href: '/guides', icon: 'guides' },
  { section: 'help', href: '/help', icon: 'help' },
  { section: 'absences', href: '/absences', icon: 'absences' },
  { section: 'calculator', href: '/calculator', icon: 'calculator' },
  { section: 'profile', href: '/profile', icon: 'profile' },
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

export const desktopPrimarySections: readonly Section[] = ['about', 'news', 'schedule', 'help', 'profile'];
export const desktopSecondarySections: readonly Section[] = ['registration', 'guides', 'absences', 'pvp', 'analytics', 'workflow', 'integrations', 'calculator'];
export const mobilePrimarySections: readonly Section[] = ['about', 'news', 'schedule', 'help'];
export const mobileSecondarySections: readonly Section[] = ['registration', 'profile', 'guides', 'absences', 'pvp', 'analytics', 'workflow', 'integrations', 'calculator'];

export const desktopNavGroups: readonly NavGroup[] = [
  { key: 'core', sections: ['registration'] },
  { key: 'guild', sections: ['guides', 'absences', 'pvp'] },
  { key: 'command', sections: ['analytics', 'workflow', 'integrations'] },
  { key: 'tools', sections: ['calculator'] },
];

export const mobileNavGroups: readonly NavGroup[] = [
  { key: 'core', sections: ['registration', 'profile'] },
  { key: 'guild', sections: ['guides', 'absences', 'pvp'] },
  { key: 'command', sections: ['analytics', 'workflow', 'integrations'] },
  { key: 'tools', sections: ['calculator'] },
];

export const desktopPrimaryNavItems = pickNavItems(desktopPrimarySections);
export const desktopSecondaryNavItems = pickNavItems(desktopSecondarySections);
export const mobilePrimaryNavItems = pickNavItems(mobilePrimarySections);
export const mobileSecondaryNavItems = pickNavItems(mobileSecondarySections);
export const desktopGroupedNavItems = desktopNavGroups.map((group) => ({
  ...group,
  items: pickNavItems(group.sections),
}));
export const mobileGroupedNavItems = mobileNavGroups.map((group) => ({
  ...group,
  items: pickNavItems(group.sections),
}));
