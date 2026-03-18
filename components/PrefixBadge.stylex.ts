import * as stylex from '@stylexjs/stylex';
import { colors, radius } from '../lib/stylex/tokens.stylex';

export const prefixBadgeStyles = stylex.create({
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: radius.pill,
    border: `1px solid ${colors.accentSoft}`,
    backgroundColor: 'rgba(19, 41, 55, 0.26)',
    color: colors.accentStrong,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  default: {
    padding: '0.25rem 0.625rem',
    fontSize: '11px',
    letterSpacing: '0.2em',
  },
  compact: {
    padding: '0.125rem 0.5rem',
    fontSize: '10px',
    letterSpacing: '0.16em',
  },
  marginTopSm: {
    marginTop: '8px',
  },
});
