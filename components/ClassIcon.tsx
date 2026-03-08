'use client';

import { getClassVisual, getKnownClassName } from '@/lib/classes';

interface ClassIconProps {
  className: string | null | undefined;
  sizeClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
}

function joinClasses(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

function ClassGlyph({ className }: { className: string }) {
  switch (className) {
    case 'Ironclad':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <path d="M18 17C23 13 29 11 32 11C35 11 41 13 46 17C43 24 38 28 32 31C26 28 21 24 18 17Z" fill="currentColor" />
          <path d="M15 24C21 28 24 35 24 47C17 44 12 37 11 29L15 24Z" fill="currentColor" opacity="0.82" />
          <path d="M49 24C43 28 40 35 40 47C47 44 52 37 53 29L49 24Z" fill="currentColor" opacity="0.82" />
          <path d="M24 47C24 37 28 33 32 31C36 33 40 37 40 47C37 51 35 53 32 54C29 53 27 51 24 47Z" fill="currentColor" opacity="0.44" />
        </svg>
      );
    case 'Bloodstorm':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <path d="M29 9L36 9L40 16L34 21L36 47L32 56L28 47L30 21L24 16L29 9Z" fill="currentColor" />
          <path d="M32 20L32 55" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" opacity="0.4" />
          <path d="M16 43C22 50 30 53 40 53C46 53 50 51 54 47" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.34" />
          <path d="M15 30C18 24 23 19 29 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.24" />
          <path d="M24 28L32 23L40 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.78" />
        </svg>
      );
    case 'Numina':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <path d="M30 8C30 6 31 5 32 5C33 5 34 6 34 8V14H30V8Z" fill="currentColor" opacity="0.9" />
          <path d="M32 14V19" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
          <path d="M25 21C26 18 29 16 32 16C35 16 38 18 39 21" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.82" />
          <path d="M24 24C24 21 27 19 32 19C37 19 40 21 40 24V29C40 37 37 43 32 48C27 43 24 37 24 29V24Z" fill="currentColor" />
          <path d="M20 25C20 23 21 21 24 21" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
          <path d="M44 25C44 23 43 21 40 21" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
          <path d="M20 33C20 44 26 50 32 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
          <path d="M44 33C44 44 38 50 32 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
          <path d="M27 55H37" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        </svg>
      );
    case 'Celestune':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <circle cx="32" cy="12" r="6" stroke="currentColor" strokeWidth="3.5" opacity="0.9" />
          <path d="M32 18V50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M20 26L32 20L44 26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 52C22 43 27 39 32 39C37 39 42 43 46 52" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M24 10L18 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M40 10L46 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M17 17L13 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M51 17L47 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case 'Dragon Roar':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <path d="M52 12C45 10 38 12 33 18C28 23 26 30 25 37C22 31 16 29 11 31C15 40 21 46 30 50C42 55 51 48 54 36C56 27 55 18 52 12Z" fill="currentColor" />
          <path d="M18 13C30 10 41 15 47 25C40 21 32 22 27 28C23 33 21 40 20 47C13 40 10 28 18 13Z" fill="currentColor" opacity="0.28" />
        </svg>
      );
    case 'Sylph':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <path d="M21 51C22 37 25 23 36 13C36 24 40 31 50 39C43 47 34 51 21 51Z" fill="currentColor" />
          <path d="M13 46C18 36 23 26 26 14C32 21 31 31 24 41C21 45 17 47 13 46Z" fill="currentColor" opacity="0.78" />
          <path d="M31 52C38 45 45 38 53 33C51 45 43 52 31 52Z" fill="currentColor" opacity="0.45" />
        </svg>
      );
    case 'Nightwalker':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <circle cx="31" cy="33" r="22" stroke="currentColor" strokeWidth="3.5" opacity="0.34" />
          <path d="M46 18C40 17 34 20 30 25C26 30 25 37 26 45C20 41 16 35 16 28C16 19 24 13 34 13C39 13 43 14 46 18Z" fill="currentColor" />
          <circle cx="18" cy="25" r="3" fill="currentColor" opacity="0.75" />
          <circle cx="47" cy="45" r="3" fill="currentColor" opacity="0.75" />
        </svg>
      );
    default:
      return null;
  }
}

export function ClassIcon({
  className,
  sizeClassName = 'h-10 w-10',
  wrapperClassName,
  iconClassName,
}: ClassIconProps) {
  const resolvedClassName = getKnownClassName(className);
  const visual = getClassVisual(className);

  if (!resolvedClassName || !visual) {
    return null;
  }

  return (
    <span
      className={joinClasses(
        'inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-[0_14px_28px_rgba(0,0,0,0.26)] ring-1',
        sizeClassName,
        visual.surfaceClassName,
        visual.ringClassName,
        wrapperClassName
      )}
      aria-hidden="true"
    >
      <span className={joinClasses('block', visual.accentClassName, iconClassName || 'h-[72%] w-[72%]')}>
        <ClassGlyph className={resolvedClassName} />
      </span>
    </span>
  );
}

interface ClassBadgeProps {
  className: string | null | undefined;
  emptyLabel?: string;
  textClassName?: string;
  badgeClassName?: string;
  iconSizeClassName?: string;
}

export function ClassBadge({
  className,
  emptyLabel = '—',
  textClassName = 'text-[#e6eff5]',
  badgeClassName,
  iconSizeClassName = 'h-9 w-9',
}: ClassBadgeProps) {
  const resolvedClassName = getKnownClassName(className);

  if (!resolvedClassName) {
    return <span className={textClassName}>{className || emptyLabel}</span>;
  }

  return (
    <span className={joinClasses('inline-flex items-center gap-3 min-w-0', badgeClassName)}>
      <ClassIcon className={resolvedClassName} sizeClassName={iconSizeClassName} />
      <span className={joinClasses('truncate', textClassName)}>{resolvedClassName}</span>
    </span>
  );
}
