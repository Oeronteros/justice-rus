'use client';

import * as stylex from '@stylexjs/stylex';
import { rootLayoutStyles } from '@/app/layout.stylex';
import { useTheme } from '@/lib/theme/context';
import { mergeStylexProps } from '@/lib/stylex/utils';
import { moonlitTheme, wuxiaTheme } from '@/lib/stylex/theme.stylex';

export default function AppThemeBoundary({ children }: { children: React.ReactNode }) {
  const { mode, resolvedTheme } = useTheme();

  const themeProps = mergeStylexProps(
    stylex.props(
      resolvedTheme === 'light' ? moonlitTheme : wuxiaTheme,
      rootLayoutStyles.body,
      resolvedTheme === 'light' && rootLayoutStyles.bodyLight
    ),
    `theme-wuxia theme-${resolvedTheme}`
  );

  return (
    <div {...themeProps} data-theme={resolvedTheme} data-theme-mode={mode}>
      {children}
    </div>
  );
}
