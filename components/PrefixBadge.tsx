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

  return (
    <span
      {...variantStyles[variant]}
      className={cn(stylex.props(prefixBadgeStyles.badge).className, variantStyles[variant].className, className)}
    >
      {value}
    </span>
  );
}
