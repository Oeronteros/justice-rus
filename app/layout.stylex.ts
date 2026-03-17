import * as stylex from '@stylexjs/stylex';
import { colors, typography } from '../lib/stylex/tokens.stylex';

export const rootLayoutStyles = stylex.create({
  body: {
    minHeight: '100vh',
    backgroundColor: colors.bgApp,
    backgroundImage:
      'radial-gradient(circle at 12% 8%, rgba(155, 76, 69, 0.14), transparent 32%), radial-gradient(circle at 88% 12%, rgba(201, 168, 106, 0.12), transparent 38%), linear-gradient(160deg, #141217 0%, #19161d 52%, #141217 100%)',
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
