import { Section } from '@/types';

export type IconName =
  | Section
  | 'skull'
  | 'eye'
  | 'seal'
  | 'snowflake'
  | 'sparkle'
  | 'dots'
  | 'refresh'
  | 'logout'
  | 'spinner'
  | 'lockOpen'
  | 'shield'
  | 'alertTriangle'
  | 'redo'
  | 'tag'
  | 'user'
  | 'calendar'
  | 'calendarCheck'
  | 'calendarX'
  | 'book'
  | 'bookOpen'
  | 'checkCircle'
  | 'check'
  | 'x'
  | 'edit'
  | 'thumbtack'
  | 'comment'
  | 'plus'
  | 'trash'
  | 'sword'
  | 'usersSlash';

interface IconProps {
  name: IconName;
  className?: string;
}

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export default function WuxiaIcon({ name, className = '' }: IconProps) {
  switch (name) {
    case 'registration':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M6.2 9.2c.3-2 1.8-3.4 3.8-3.4 2.1 0 3.6 1.6 3.6 3.6 0 2.2-1.8 3.5-3.6 3.5-1 0-2-.3-2.7-1" />
          <path d="M3.5 18.3c.4-2.7 2.7-4.4 6.1-4.4 3.1 0 5.2 1.4 5.7 3.8" />
          <path d="M15.8 8.4c.3-1.4 1.5-2.4 3-2.4 1.7 0 3 1.3 3 3 0 1.3-.8 2.4-2 2.9" />
          <path d="M16.2 17.4c.5-1.4 2-2.4 3.9-2.4 1.1 0 2.1.3 2.9.8" />
        </svg>
      );
    case 'schedule':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M4.5 7.5c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3h-9c-1.7 0-3-1.3-3-3z" />
          <path d="M7 4v4M17 4v4M5 11h14" />
        </svg>
      );
    case 'help':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M6 16.6c1.9-2.1 3.9-3.2 6-3.2 2.4 0 4.4 1.2 6 3.3" />
          <path d="M6.8 12.1c1.4-1.8 3.1-2.7 5.2-2.7 2.2 0 3.9.8 5.2 2.5" />
          <path d="M12 6.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4z" />
        </svg>
      );
    case 'news':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M7.5 3.5h8.5l4.5 4.8v11.7c0 1.1-.9 2-2 2H7.5c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2z" />
          <path d="M15.5 3.5v4.5h4.7" />
          <path d="M9.5 12.2h7.8M9.5 16h6.2" />
        </svg>
      );
    case 'about':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 11v4.6" />
          <circle cx="12" cy="8.1" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'guides':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M4.5 5.2h6.8c1.8 0 3.2 1.4 3.2 3.2v11.4H7.8c-1.8 0-3.3 1.5-3.3 3.3z" />
          <path d="M19.5 5.2h-5.6v14.6h5.6c1 0 1.9-.9 1.9-1.9V7.1c0-1-.9-1.9-1.9-1.9z" />
        </svg>
      );
    case 'absences':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M16.2 4.8a7.2 7.2 0 1 0 3.9 11.8 6.6 6.6 0 1 1-3.9-11.8z" />
          <path d="M12.4 8.8c.8.5 1.3 1.2 1.3 2.1 0 1.3-1 2.2-2.5 2.4" />
        </svg>
      );
    case 'calculator':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M6 4.8h12c1.1 0 2 .9 2 2v10.4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6.8c0-1.1.9-2 2-2z" />
          <path d="M4.5 9.8h15M8 12.8h8M8 16.3h8" />
          <path d="M8.3 7.5h.8M11.8 7.5h.8M15.3 7.5h.8" />
        </svg>
      );

    case 'seal':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <circle cx="12" cy="12" r="8.2" />
          <path d="M12 4v2.4M12 17.6V20" />
          <path d="M4 12h2.4M17.6 12H20" />
          <path d="M7.2 7.2l1.7 1.7M15.1 15.1l1.7 1.7" />
          <path d="M16.8 7.2l-1.7 1.7M8.9 15.1l-1.7 1.7" />
          <circle cx="12" cy="12" r="2.2" />
        </svg>
      );
    case 'snowflake':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 2.5v19" />
          <path d="M5.2 6.4l13.6 11.2" />
          <path d="M18.8 6.4L5.2 17.6" />
          <path d="M12 6.2l-1.7-1.7M12 6.2l1.7-1.7" />
          <path d="M12 17.8l-1.7 1.7M12 17.8l1.7 1.7" />
          <path d="M7.3 9.4l-2.1.3M7.3 9.4l-.3-2.1" />
          <path d="M16.7 9.4l2.1.3M16.7 9.4l.3-2.1" />
          <path d="M7.3 14.6l-2.1-.3M7.3 14.6l-.3 2.1" />
          <path d="M16.7 14.6l2.1-.3M16.7 14.6l.3 2.1" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 3.4l1.5 5.2 5.1 1.5-5.1 1.5-1.5 5.2-1.5-5.2-5.1-1.5 5.1-1.5L12 3.4z" />
          <path d="M19.3 14.2l.7 2.4 2.4.7-2.4.7-.7 2.4-.7-2.4-2.4-.7 2.4-.7.7-2.4z" />
        </svg>
      );
    case 'dots':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <circle cx="6.3" cy="12" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="17.7" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'skull':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 2.5c-4.4 0-8 3.2-8 7.4 0 3 1.8 5.6 4.4 6.7V20a1.8 1.8 0 0 0 1.8 1.8h3.6A1.8 1.8 0 0 0 15.6 20v-3.4c2.6-1.1 4.4-3.7 4.4-6.7 0-4.2-3.6-7.4-8-7.4z" />
          <circle cx="9.4" cy="11" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="14.6" cy="11" r="1.1" fill="currentColor" stroke="none" />
          <path d="M10.2 15.4h3.6" />
          <path d="M10.6 19.2v-1.6M13.4 19.2v-1.6" />
        </svg>
      );
    case 'eye':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M2.6 12s3.6-6 9.4-6 9.4 6 9.4 6-3.6 6-9.4 6-9.4-6-9.4-6z" />
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'refresh':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M21 12a9 9 0 1 1-2.6-6.4" />
          <path d="M21 3v6h-6" />
        </svg>
      );
    case 'logout':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
        </svg>
      );
    case 'spinner':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M21 12a9 9 0 1 1-3.2-6.9" />
        </svg>
      );
    case 'lockOpen':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M7 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" />
          <path d="M9 11V8.8a4 4 0 0 1 7.5-1.7" />
          <path d="M12 15v2" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 2.6l8 4v6c0 5.1-3.4 9.5-8 10.1-4.6-.6-8-5-8-10.1v-6l8-4z" />
          <path d="M9.2 12.3l2 2 3.8-4.2" />
        </svg>
      );
    case 'alertTriangle':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 3.2L22 21H2L12 3.2z" />
          <path d="M12 9v4.2" />
          <circle cx="12" cy="17.1" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'redo':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M20 7v5h-5" />
          <path d="M20 12a8 8 0 1 0-2.6 5.9" />
        </svg>
      );
    case 'tag':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
          <circle cx="7.6" cy="7.6" r="1" />
        </svg>
      );
    case 'user':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M20 21a7.2 7.2 0 0 0-16 0" />
          <circle cx="12" cy="8.5" r="3.2" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <rect x="4" y="5.5" width="16" height="15" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" />
        </svg>
      );
    case 'calendarCheck':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <rect x="4" y="5.5" width="16" height="15" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" />
          <path d="M8.5 15.2l2 2 4.2-4.6" />
        </svg>
      );
    case 'calendarX':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <rect x="4" y="5.5" width="16" height="15" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" />
          <path d="M9 14.5l6 6M15 14.5l-6 6" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 0-3 3V4.5z" />
          <path d="M18 20h1.5A2.5 2.5 0 0 0 22 17.5V7A2.5 2.5 0 0 0 19.5 4.5H18" />
        </svg>
      );
    case 'bookOpen':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 6.2c-2-1.4-4-2-7-2v15c3 0 5 .6 7 2" />
          <path d="M12 6.2c2-1.4 4-2 7-2v15c-3 0-5 .6-7 2" />
          <path d="M12 6.2v15" />
        </svg>
      );
    case 'checkCircle':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.2 12.2l2.2 2.3 5.6-6.1" />
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M5 12.5l4 4L19 7.2" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M7 7l10 10M17 7L7 17" />
        </svg>
      );
    case 'edit':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case 'thumbtack':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M8 3h8l-1 6 3 3H6l3-3-1-6z" />
          <path d="M12 12v9" />
        </svg>
      );
    case 'comment':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M21 14a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
        </svg>
      );
    case 'plus':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'trash':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M4.5 7h15" />
          <path d="M10 3.8h4a1.2 1.2 0 0 1 1.2 1.2V7H8.8V5a1.2 1.2 0 0 1 1.2-1.2z" />
          <path d="M7 7l1 14h8l1-14" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      );
    case 'sword':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M14 3l7 7-4.2 4.2-7-7L14 3z" />
          <path d="M9.8 7.2L4.2 12.8" />
          <path d="M5 19l3-3" />
          <path d="M3.6 20.4l2.2-2.2 2.2 2.2-2.2 2.2-2.2-2.2z" />
        </svg>
      );
    case 'usersSlash':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseProps}>
          <path d="M3 3l18 18" />
          <circle cx="10" cy="9" r="3" />
          <path d="M3.8 19c.6-2.9 3-4.6 6.2-4.6 1.4 0 2.6.3 3.6.9" />
          <path d="M16.8 8.6c.2-1.2 1.2-2 2.6-2 1.6 0 2.8 1.2 2.8 2.8 0 1.2-.7 2.2-1.7 2.6" />
        </svg>
      );
    default:
      return null;
  }
}
