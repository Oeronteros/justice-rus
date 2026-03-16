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
      'radial-gradient(circle at 14% 10%, rgba(139, 64, 58, 0.12), transparent 42%), radial-gradient(circle at 86% 16%, rgba(184, 160, 111, 0.1), transparent 36%), linear-gradient(145deg, rgba(18, 20, 26, 0.96), rgba(10, 12, 16, 0.98))',
    boxShadow: `0 12px 24px ${colors.shadowSoft}`,
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
    backgroundColor: 'rgba(245, 237, 222, 0.08)',
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
    border: `1px solid ${colors.accentMuted}`,
    backgroundColor: 'rgba(25, 21, 24, 0.76)',
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
