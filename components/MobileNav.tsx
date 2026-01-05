'use client';

import Link from 'next/link';
import { Section } from '@/types';
import { Language, sectionLabels } from '@/lib/i18n';
import WuxiaIcon from './WuxiaIcons';

interface MobileNavProps {
  currentSection: Section;
  language: Language;
}

type NavItem = {
  section: Section;
  href: string;
};

const navItems: NavItem[] = [
  { section: 'about', href: '/' },
  { section: 'news', href: '/news' },
  { section: 'registration', href: '/members' },
  { section: 'schedule', href: '/schedule' },
  { section: 'guides', href: '/guides' },
  { section: 'help', href: '/help' },
  { section: 'absences', href: '/absences' },
];

export default function MobileNav({ currentSection, language }: MobileNavProps) {
  return (
    <div className="wuxia-dock md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a1118]/95 to-[#111d27]/85 backdrop-blur-xl border-t border-[#223544]/60 z-40 shadow-2xl shadow-black/40">
      <div className="flex justify-around py-3 px-2">
        {navItems.map((item) => (
          <Link
            key={item.section}
            href={item.href}
            className={`nav-chip flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
              currentSection === item.section ? 'is-active' : ''
            }`}
          >
            <span className="mb-1 dc-accent">
              <WuxiaIcon name={item.section} className="w-5 h-5" />
            </span>
            <span className="text-xs font-medium">{sectionLabels[language][item.section]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
