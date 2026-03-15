import * as stylex from '@stylexjs/stylex';
import { colors, typography } from '../lib/stylex/tokens.stylex';

export const rootLayoutStyles = stylex.create({
  body: {
    minHeight: '100vh',
    backgroundColor: colors.ink,
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
