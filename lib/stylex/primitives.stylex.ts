import * as stylex from '@stylexjs/stylex';
import { colors, layout, motion, radius, spacing, typography } from './tokens.stylex';

export const appShellStyles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: colors.bgApp,
    backgroundImage:
      `radial-gradient(circle at 14% 8%, ${colors.chromeGlowPrimary}, transparent 34%), radial-gradient(circle at 84% 10%, ${colors.chromeGlowSecondary}, transparent 38%), linear-gradient(168deg, ${colors.chromeStart} 0%, ${colors.chromeMid} 52%, ${colors.chromeEnd} 100%)`,
    color: colors.textPrimary,
    fontFamily: typography.body,
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLine,
    transitionProperty: 'background-color, background-image, color',
    transitionDuration: '240ms',
  },
  container: {
    width: '100%',
    maxWidth: layout.container,
    marginInline: 'auto',
    paddingInline: spacing.xxl,
  },
  contentShell: {
    position: 'relative',
    isolation: 'isolate',
  },
});

export const surfaceStyles = stylex.create({
  panel: {
    background: `linear-gradient(160deg, ${colors.panelTop}, ${colors.panelBottom})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderSubtle,
    borderRadius: radius.lg,
    boxShadow: colors.shadowCard,
    padding: layout.cardPadding,
  },
  card: {
    background:
      `radial-gradient(circle at 10% 0%, ${colors.surfaceGlowPrimary}, transparent 42%), radial-gradient(circle at 88% 10%, ${colors.surfaceGlowSecondary}, transparent 34%), linear-gradient(145deg, ${colors.surfaceBase}, ${colors.panelBottom})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderSubtle,
    borderRadius: radius.xl,
    boxShadow: colors.shadowCard,
    padding: layout.cardPaddingLg,
  },
  elevated: {
    background: `linear-gradient(160deg, ${colors.bgElevated}, ${colors.surfaceRaised})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderDefault,
    borderRadius: radius.xl,
    boxShadow: colors.shadowLifted,
    padding: layout.cardPaddingLg,
  },
  subdued: {
    background: `linear-gradient(160deg, ${colors.surfaceRaised}, ${colors.surfaceBase})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderDefault,
    borderRadius: radius.lg,
    boxShadow: colors.shadowInset,
  },
  interactive: {
    transitionProperty: 'background-color, border-color, transform, box-shadow',
    transitionDuration: motion.base,
    transitionTimingFunction: motion.easeStandard,
    ':hover': {
      backgroundColor: colors.controlSurfaceHover,
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
    cursor: 'pointer',
    borderRadius: radius.md,
    paddingInline: spacing.lg,
    fontSize: typography.secondarySize,
    lineHeight: typography.secondaryLine,
    fontWeight: 600,
    fontFamily: typography.body,
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
    background: `linear-gradient(120deg, ${colors.buttonPrimaryStart}, ${colors.buttonPrimaryEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.accentEdge,
    color: colors.textOnAccent,
    boxShadow: colors.shadowSoft,
    ':hover': {
      background: `linear-gradient(120deg, ${colors.buttonPrimaryHoverStart}, ${colors.buttonPrimaryHoverEnd})`,
      transform: 'translateY(-1px)',
    },
  },
  secondary: {
    minHeight: layout.buttonSecondaryHeight,
    background: `linear-gradient(160deg, ${colors.controlSurface}, ${colors.bgPanelAlt})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderDefault,
    color: colors.textPrimary,
    ':hover': {
      backgroundColor: colors.controlSurfaceHover,
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
  danger: {
    minHeight: layout.buttonSecondaryHeight,
    background: `linear-gradient(145deg, ${colors.dangerSurfaceStrong}, ${colors.dangerSurface})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.dangerBorder,
    color: colors.dangerText,
    ':hover': {
      transform: 'translateY(-1px)',
      boxShadow: colors.shadowCard,
    },
  },
});

export const formStyles = stylex.create({
  label: {
    color: colors.textSecondary,
    fontSize: typography.secondarySize,
    lineHeight: typography.secondaryLine,
    fontWeight: 600,
  },
  hint: {
    color: colors.textMuted,
    fontSize: typography.microSize,
    lineHeight: typography.microLine,
  },
  error: {
    color: colors.dangerText,
    fontSize: typography.microSize,
    lineHeight: typography.microLine,
  },
  field: {
    width: '100%',
    minHeight: layout.fieldHeight,
    borderRadius: radius.md,
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors.controlSurface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderDefault,
    color: colors.textPrimary,
    boxShadow: colors.shadowInset,
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeStandard,
    ':focus': {
      outline: 'none',
      borderColor: colors.fieldFocusBorder,
      boxShadow: `0 0 0 3px ${colors.focusGlow}`,
      backgroundColor: colors.controlSurfaceHover,
    },
  },
  input: {
    appearance: 'none',
  },
  select: {
    appearance: 'none',
  },
  textarea: {
    minHeight: '140px',
    resize: 'vertical',
  },
});

export const overlayStyles = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.overlayScrim,
    backdropFilter: 'blur(6px)',
  },
  panel: {
    position: 'relative',
    width: 'min(100%, 1120px)',
    maxHeight: 'min(92vh, 980px)',
    overflow: 'auto',
    borderRadius: '30px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.accentEdge,
    background:
      `radial-gradient(circle at 10% 0%, ${colors.surfaceGlowPrimary}, transparent 36%), radial-gradient(circle at 86% 10%, ${colors.surfaceGlowSecondary}, transparent 34%), linear-gradient(145deg, ${colors.overlaySurface}, ${colors.surfaceRaised})`,
    boxShadow: `0 20px 40px ${colors.shadowStrong}, inset 0 0 0 1px ${colors.borderSubtle}`,
  },
  panelNarrow: {
    maxWidth: '980px',
  },
  panelFullBleed: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
  },
});
