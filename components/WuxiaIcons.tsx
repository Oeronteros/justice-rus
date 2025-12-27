import { Section } from '@/types';

interface WuxiaIconProps {
  id: Section;
  className?: string;
}

export default function WuxiaIcon({ id, className = '' }: WuxiaIconProps) {
  switch (id) {
    case 'registration':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="9" r="3" />
          <path d="M2.5 19c0-3 3-4.5 5.5-4.5s5.5 1.5 5.5 4.5" />
          <circle cx="17" cy="8" r="2.5" />
          <path d="M14.5 18c.5-1.7 2.1-2.8 4.5-2.8 1.2 0 2.3.3 3.2.8" />
        </svg>
      );
    case 'schedule':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'help':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 16c2.2-2.2 4.2-3.3 7-3.3s4.8 1.1 7 3.3" />
          <path d="M6 12c1.5-2.1 3.2-3.1 6-3.1s4.5 1 6 3.1" />
          <circle cx="12" cy="6" r="1.6" />
        </svg>
      );
    case 'news':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h9l5 5v13H7z" />
          <path d="M16 3v5h5" />
          <path d="M10 12h8M10 16h6" />
        </svg>
      );
    case 'guides':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h7a3 3 0 0 1 3 3v12H7a3 3 0 0 0-3 3V5z" />
          <path d="M20 5h-6v15h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
        </svg>
      );
    case 'absences':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 4.5a7 7 0 1 0 4 12 6.5 6.5 0 1 1-4-12z" />
        </svg>
      );
    case 'calculator':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 9h16M8 12h8M8 16h8" />
          <circle cx="8" cy="7" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="16" cy="7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
