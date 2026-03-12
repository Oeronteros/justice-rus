'use client';

import { cn } from '@/lib/utils';

type PrefixBadgeVariant = 'default' | 'compact';

interface PrefixBadgeProps {
  prefix: string | null | undefined;
  variant?: PrefixBadgeVariant;
  className?: string;
}

const variantClasses: Record<PrefixBadgeVariant, string> = {
  default: 'px-2.5 py-1 text-[11px] tracking-[0.2em]',
  compact: 'px-2 py-0.5 text-[10px] tracking-[0.16em]',
};

export function PrefixBadge({ prefix, variant = 'default', className }: PrefixBadgeProps) {
  const value = prefix?.trim();

  if (!value) {
    return null;
  }

  return (
    <span
      className={cn(
        'inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 font-semibold uppercase text-cyan-100',
        variantClasses[variant],
        className
      )}
    >
      {value}
    </span>
  );
}
