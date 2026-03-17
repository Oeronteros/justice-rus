import * as stylex from '@stylexjs/stylex';
import { colors, layout, motion, radius, spacing, typography } from './tokens.stylex';

export const appShellStyles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: colors.bgApp,
    backgroundImage:
      'radial-gradient(circle at 14% 8%, rgba(139, 64, 58, 0.08), transparent 34%), radial-gradient(circle at 84% 10%, rgba(201, 168, 106, 0.08), transparent 38%), linear-gradient(168deg, #141217 0%, #19161d 52%, #141217 100%)',
    color: colors.textPrimary,
    fontFamily: typography.body,
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLine,
  },
  container: {
    width: '100%',
    maxWidth: layout.container,
    marginInline: 'auto',
    paddingInline: spacing.xxl,
  },
});

export const surfaceStyles = stylex.create({
  panel: {
    backgroundColor: colors.bgPanel,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderSubtle,
    borderRadius: radius.lg,
    boxShadow: colors.shadowCard,
    padding: layout.cardPadding,
  },
  elevated: {
    backgroundColor: colors.bgElevated,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderDefault,
    borderRadius: radius.xl,
    boxShadow: colors.shadowLifted,
    padding: layout.cardPaddingLg,
  },
  interactive: {
    transitionProperty: 'background-color, border-color, transform, box-shadow',
    transitionDuration: motion.base,
    transitionTimingFunction: motion.easeStandard,
    ':hover': {
      backgroundColor: colors.bgHover,
      borderColor: colors.borderDefault,
      transform: 'translateY(-1px)',
    },
    ':focus-within': {
      borderColor: colors.accentEdgeStrong,
      boxShadow: `0 0 0 1px ${colors.accentSoft}, ${colors.shadowLifted}`,
    },
  },
});

export const textStyles = stylex.create({
  hero: {
    fontSize: typography.heroSize,
    lineHeight: typography.heroLine,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  h1: {
    fontSize: typography.h1Size,
    lineHeight: typography.h1Line,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: typography.h2Size,
    lineHeight: typography.h2Line,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  title: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLine,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  body: {
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLine,
    color: colors.textSecondary,
  },
  secondary: {
    fontSize: typography.secondarySize,
    lineHeight: typography.secondaryLine,
    color: colors.textSecondary,
  },
  micro: {
    fontSize: typography.microSize,
    lineHeight: typography.microLine,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    fontWeight: 600,
  },
  metric: {
    fontSize: typography.metricSize,
    lineHeight: typography.metricLine,
    color: colors.textPrimary,
    fontWeight: 700,
    fontFamily: typography.display,
  },
});

export const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingInline: spacing.lg,
    fontSize: typography.secondarySize,
    lineHeight: typography.secondaryLine,
    fontWeight: 600,
    textDecoration: 'none',
    transitionProperty: 'background-color, border-color, color, transform, box-shadow',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeStandard,
    ':focus-visible': {
      outline: `2px solid ${colors.focusRing}`,
      outlineOffset: '2px',
    },
  },
  primary: {
    minHeight: layout.buttonPrimaryHeight,
    background: `linear-gradient(120deg, ${colors.ember}, ${colors.accent})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.accentEdge,
    color: colors.textOnAccent,
    boxShadow: colors.shadowSoft,
    ':hover': {
      background: `linear-gradient(120deg, ${colors.emberStrong}, ${colors.accentStrong})`,
      transform: 'translateY(-1px)',
    },
  },
  secondary: {
    minHeight: layout.buttonSecondaryHeight,
    backgroundColor: colors.bgPanelAlt,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderDefault,
    color: colors.textPrimary,
    ':hover': {
      backgroundColor: colors.bgHover,
      borderColor: colors.borderStrong,
      transform: 'translateY(-1px)',
    },
  },
  ghost: {
    minHeight: layout.buttonGhostHeight,
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.textSecondary,
    ':hover': {
      color: colors.textPrimary,
      backgroundColor: colors.accentMuted,
    },
  },
});
