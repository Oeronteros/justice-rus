import { Section } from '@/types';

interface WuxiaIconProps {
  id: Section;
  className?: string;
}

export default function WuxiaIcon({ id, className = '' }: WuxiaIconProps) {
  switch (id) {
    case 'registration':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.2 9.2c.3-2 1.8-3.4 3.8-3.4 2.1 0 3.6 1.6 3.6 3.6 0 2.2-1.8 3.5-3.6 3.5-1 0-2-.3-2.7-1" />
          <path d="M3.5 18.3c.4-2.7 2.7-4.4 6.1-4.4 3.1 0 5.2 1.4 5.7 3.8" />
          <path d="M15.8 8.4c.3-1.4 1.5-2.4 3-2.4 1.7 0 3 1.3 3 3 0 1.3-.8 2.4-2 2.9" />
          <path d="M16.2 17.4c.5-1.4 2-2.4 3.9-2.4 1.1 0 2.1.3 2.9.8" />
        </svg>
      );
    case 'schedule':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 7.5c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3h-9c-1.7 0-3-1.3-3-3z" />
          <path d="M7 4v4M17 4v4M5 11h14" />
        </svg>
      );
    case 'help':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 16.6c1.9-2.1 3.9-3.2 6-3.2 2.4 0 4.4 1.2 6 3.3" />
          <path d="M6.8 12.1c1.4-1.8 3.1-2.7 5.2-2.7 2.2 0 3.9.8 5.2 2.5" />
          <path d="M12 6.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4z" />
        </svg>
      );
    case 'news':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.5 3.5h8.5l4.5 4.8v11.7c0 1.1-.9 2-2 2H7.5c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2z" />
          <path d="M15.5 3.5v4.5h4.7" />
          <path d="M9.5 12.2h7.8M9.5 16h6.2" />
        </svg>
      );
    case 'guides':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 5.2h6.8c1.8 0 3.2 1.4 3.2 3.2v11.4H7.8c-1.8 0-3.3 1.5-3.3 3.3z" />
          <path d="M19.5 5.2h-5.6v14.6h5.6c1 0 1.9-.9 1.9-1.9V7.1c0-1-.9-1.9-1.9-1.9z" />
        </svg>
      );
    case 'absences':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.2 4.8a7.2 7.2 0 1 0 3.9 11.8 6.6 6.6 0 1 1-3.9-11.8z" />
          <path d="M12.4 8.8c.8.5 1.3 1.2 1.3 2.1 0 1.3-1 2.2-2.5 2.4" />
        </svg>
      );
    case 'calculator':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4.8h12c1.1 0 2 .9 2 2v10.4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6.8c0-1.1.9-2 2-2z" />
          <path d="M4.5 9.8h15M8 12.8h8M8 16.3h8" />
          <path d="M8.3 7.5h.8M11.8 7.5h.8M15.3 7.5h.8" />
        </svg>
      );
    default:
      return null;
  }
}
