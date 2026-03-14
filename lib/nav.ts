import type { IconName } from '@/components/WuxiaIcons';
import type { Section } from '@/types';

export type NavItem = {
  section: Section;
  href: string;
  icon: IconName;
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

function pickNavItems(sections: readonly Section[]): NavItem[] {
  return sections
    .map((section) => navItems.find((item) => item.section === section))
    .filter((item): item is NavItem => Boolean(item));
}

export const desktopPrimarySections: readonly Section[] = ['about', 'news', 'registration', 'schedule', 'help', 'profile'];
export const desktopSecondarySections: readonly Section[] = ['calendar', 'guides', 'absences', 'analytics', 'workflow', 'integrations', 'pvp', 'calculator'];
export const mobilePrimarySections: readonly Section[] = ['about', 'news', 'registration', 'help'];

export const desktopPrimaryNavItems = pickNavItems(desktopPrimarySections);
export const desktopSecondaryNavItems = pickNavItems(desktopSecondarySections);
export const mobilePrimaryNavItems = pickNavItems(mobilePrimarySections);
