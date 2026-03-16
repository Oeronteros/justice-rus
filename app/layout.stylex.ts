import * as stylex from '@stylexjs/stylex';
import { colors, typography } from '../lib/stylex/tokens.stylex';

export const rootLayoutStyles = stylex.create({
  body: {
    minHeight: '100vh',
    backgroundColor: colors.ink,
    backgroundImage:
      'radial-gradient(circle at 12% 8%, rgba(169, 71, 63, 0.14), transparent 32%), radial-gradient(circle at 88% 12%, rgba(130, 185, 173, 0.14), transparent 38%), linear-gradient(160deg, rgba(7, 9, 13, 1), rgba(16, 20, 25, 1), rgba(7, 9, 13, 1))',
    color: colors.paper,
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
