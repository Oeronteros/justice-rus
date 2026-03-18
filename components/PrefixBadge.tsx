'use client';

import * as stylex from '@stylexjs/stylex';
import { cn } from '@/lib/utils';
import { prefixBadgeStyles } from '@/components/PrefixBadge.stylex';

type PrefixBadgeVariant = 'default' | 'compact';

interface PrefixBadgeProps {
  prefix: string | null | undefined;
  variant?: PrefixBadgeVariant;
  className?: string;
}

const variantStyles: Record<PrefixBadgeVariant, ReturnType<typeof stylex.props>> = {
  default: stylex.props(prefixBadgeStyles.default),
  compact: stylex.props(prefixBadgeStyles.compact),
};

export function PrefixBadge({ prefix, variant = 'default', className }: PrefixBadgeProps) {
  const value = prefix?.trim();

  if (!value) {
    return null;
  }
  const extraClassName = className?.replace('mt-2', '').trim() || undefined;

  return (
    <span
      {...stylex.props(
        prefixBadgeStyles.badge,
        variant === 'compact' ? prefixBadgeStyles.compact : prefixBadgeStyles.default,
        className?.includes('mt-2') && prefixBadgeStyles.marginTopSm
      )}
      className={cn(extraClassName)}
    >
      {value}
    </span>
  );
}
