import * as stylex from '@stylexjs/stylex';
import { colors, radius } from '../../lib/stylex/tokens.stylex';

export const toastStyles = stylex.create({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto auto',
    alignItems: 'start',
    gap: '12px',
    width: '100%',
    maxWidth: '28rem',
    padding: '14px 16px',
    borderRadius: radius.xl,
    border: `1px solid ${colors.accentMuted}`,
    background:
      'linear-gradient(145deg, rgba(10, 18, 26, 0.94), rgba(8, 12, 18, 0.96))',
    boxShadow: `0 18px 36px ${colors.shadowSoft}`,
  },
  exiting: {
    opacity: 0.45,
    transform: 'translateY(-6px)',
    transitionDuration: '300ms',
  },
  iconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: radius.pill,
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  content: {
    minWidth: 0,
    display: 'grid',
    gap: '4px',
  },
  title: {
    color: colors.paperStrong,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  message: {
    color: colors.paperSubtle,
    lineHeight: 1.5,
    fontSize: '0.92rem',
  },
  action: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '36px',
    padding: '0 12px',
    borderRadius: radius.pill,
    border: `1px solid ${colors.accentSoft}`,
    backgroundColor: 'rgba(11, 20, 29, 0.72)',
    color: colors.accentStrong,
    fontWeight: 600,
    cursor: 'pointer',
  },
  dismiss: {
    display: 'inline-grid',
    placeItems: 'center',
    width: '32px',
    height: '32px',
    borderRadius: radius.pill,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.paperSubtle,
    cursor: 'pointer',
  },
  info: {
    borderColor: 'rgba(47, 110, 141, 0.4)',
  },
  success: {
    borderColor: colors.successBorder,
  },
  warning: {
    borderColor: colors.warningBorder,
  },
  error: {
    borderColor: colors.dangerBorder,
  },
  iconInfo: {
    color: colors.accentStrong,
    backgroundColor: 'rgba(22, 32, 43, 0.8)',
  },
  iconSuccess: {
    color: colors.successText,
    backgroundColor: colors.successSurface,
  },
  iconWarning: {
    color: colors.warningText,
    backgroundColor: colors.warningSurface,
  },
  iconError: {
    color: colors.dangerText,
    backgroundColor: colors.dangerSurface,
  },
});
