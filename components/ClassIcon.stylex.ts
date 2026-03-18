import * as stylex from '@stylexjs/stylex';
import { radius, spacing, typography } from '../lib/stylex/tokens.stylex';

export const classIconStyles = stylex.create({
  wrapper: {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.xl,
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.26)',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  icon: {
    display: 'block',
    width: '72%',
    height: '72%',
  },
  sizeMd: {
    width: '36px',
    height: '36px',
  },
  sizeLg: {
    width: '40px',
    height: '40px',
  },
  sizeXl: {
    width: '44px',
    height: '44px',
  },
  badge: {
    display: 'inline-flex',
    minWidth: 0,
    alignItems: 'center',
    gap: spacing.md,
  },
  badgeFull: {
    width: '100%',
  },
  badgeTight: {
    gap: spacing.sm,
  },
  label: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#e6eff5',
  },
  labelMuted: {
    color: '#d2e5ef',
  },
  labelSuccess: {
    color: '#86efac',
  },
  labelXs: {
    fontSize: typography.microSize,
    lineHeight: typography.microLine,
  },
  labelBase: {
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLine,
  },
  labelMedium: {
    fontWeight: 600,
  },
  marginTopSm: {
    marginTop: spacing.sm,
  },
});
