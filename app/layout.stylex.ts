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
