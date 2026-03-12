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
