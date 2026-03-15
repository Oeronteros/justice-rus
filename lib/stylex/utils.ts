import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type StylexSpreadProps = {
  className?: string;
  style?: CSSProperties;
};

export function mergeStylexProps(styleProps: StylexSpreadProps, className?: string): StylexSpreadProps {
  return {
    ...styleProps,
    className: cn(styleProps.className, className),
  };
}
