import * as stylex from '@stylexjs/stylex';
import { colors, typography } from '../lib/stylex/tokens.stylex';

export const rootLayoutStyles = stylex.create({
  body: {
    minHeight: '100vh',
    backgroundColor: colors.bgApp,
    backgroundImage:
      'linear-gradient(160deg, #0B0C1A 0%, #1A1F35 50%, #0B0C1A 100%)',
    color: colors.textPrimary,
    fontFamily: typography.body,
    transitionProperty: 'background-color, background-image, color',
    transitionDuration: '240ms',
  },
  bodyLight: {
    backgroundImage:
      'radial-gradient(circle at 14% 10%, rgba(116, 167, 217, 0.12), transparent 28%), radial-gradient(circle at 86% 12%, rgba(143, 90, 81, 0.12), transparent 26%), linear-gradient(180deg, #f8fbff 0%, #eef2f7 52%, #e5ecf4 100%)',
  },
  fallback: {
    position: 'relative',
    zIndex: 10,
    minHeight: '100vh',
  },
  content: {
    position: 'relative',
    zIndex: 10,
  },
});
