import * as stylex from '@stylexjs/stylex';
import { colors, layout, motion, radius, spacing, typography } from './tokens.stylex';

const chromeBackground =
  `radial-gradient(circle at 14% 8%, ${colors.chromeGlowPrimary}, transparent 34%), radial-gradient(circle at 84% 10%, ${colors.chromeGlowSecondary}, transparent 38%), linear-gradient(168deg, ${colors.chromeStart} 0%, ${colors.chromeMid} 52%, ${colors.chromeEnd} 100%)`;

export const appShellStyles = stylex.create({
  chromeSurface: {
    background: chromeBackground,
    color: colors.textPrimary,
    fontFamily: typography.body,
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLine,
    transitionProperty: 'background-color, background-image, color',
    transitionDuration: motion.slow,
  },
  page: {
    minHeight: '100vh',
    background: chromeBackground,
    color: colors.textPrimary,
    fontFamily: typography.body,
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLine,
    transitionProperty: 'background-color, background-image, color',
    transitionDuration: motion.slow,
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
    background: `linear-gradient(160deg, ${colors.panelSurfaceStart}, ${colors.panelSurfaceEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.panelBorder,
    borderRadius: radius.lg,
    boxShadow: colors.shadowCard,
    color: colors.textPrimary,
    padding: layout.cardPadding,
  },
  chrome: {
    background:
      `radial-gradient(circle at 0% 0%, ${colors.surfaceGlowPrimary}, transparent 44%), radial-gradient(circle at 100% 0%, ${colors.surfaceGlowSecondary}, transparent 34%), linear-gradient(160deg, ${colors.panelSurfaceStart}, ${colors.panelSurfaceEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.chromeBorder,
    borderRadius: radius.xl,
    boxShadow: colors.shadowCard,
    color: colors.textPrimary,
  },
  card: {
    background:
      `radial-gradient(circle at 10% 0%, ${colors.surfaceGlowPrimary}, transparent 42%), radial-gradient(circle at 88% 10%, ${colors.surfaceGlowSecondary}, transparent 34%), linear-gradient(145deg, ${colors.cardSurfaceStart}, ${colors.cardSurfaceEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.panelBorder,
    borderRadius: radius.xl,
    boxShadow: colors.shadowCard,
    color: colors.textPrimary,
    padding: layout.cardPaddingLg,
  },
  elevated: {
    background: `linear-gradient(160deg, ${colors.elevatedSurfaceStart}, ${colors.elevatedSurfaceEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.panelBorderStrong,
    borderRadius: radius.xl,
    boxShadow: colors.shadowLifted,
    color: colors.textPrimary,
    padding: layout.cardPaddingLg,
  },
  subdued: {
    background: `linear-gradient(160deg, ${colors.subduedSurfaceStart}, ${colors.subduedSurfaceEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.panelBorderStrong,
    borderRadius: radius.lg,
    boxShadow: colors.shadowInset,
    color: colors.textPrimary,
  },
  interactive: {
    transitionProperty: 'background-color, border-color, transform, box-shadow',
    transitionDuration: motion.base,
    transitionTimingFunction: motion.easeStandard,
    ':hover': {
      backgroundColor: colors.controlSurfaceHover,
      borderColor: colors.panelBorderStrong,
      transform: 'translateY(-1px)',
    },
    ':focus-within': {
      borderColor: colors.chromeBorderStrong,
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
    background: `linear-gradient(160deg, ${colors.buttonSecondaryStart}, ${colors.buttonSecondaryEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.panelBorderStrong,
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
      backgroundColor: colors.buttonGhostHover,
    },
    ':active': {
      backgroundColor: colors.buttonGhostActive,
    },
  },
  danger: {
    minHeight: layout.buttonSecondaryHeight,
    background: `linear-gradient(145deg, ${colors.buttonDangerStart}, ${colors.buttonDangerEnd})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.dangerBorder,
    color: colors.dangerText,
    ':hover': {
      transform: 'translateY(-1px)',
      boxShadow: colors.shadowCard,
    },
  },
  touch: {
    minHeight: layout.buttonTouchHeight,
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
    backgroundColor: colors.fieldSurface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.panelBorderStrong,
    color: colors.textPrimary,
    boxShadow: colors.shadowInset,
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeStandard,
    ':hover': {
      backgroundColor: colors.fieldSurfaceHover,
      borderColor: colors.borderDefault,
    },
    ':focus': {
      outline: 'none',
      borderColor: colors.fieldFocusBorder,
      boxShadow: `0 0 0 3px ${colors.focusGlow}`,
      backgroundColor: colors.fieldSurfaceActive,
    },
    '::placeholder': {
      color: colors.textMuted,
      opacity: 1,
    },
  },
  input: {
    appearance: 'none',
  },
  select: {
    appearance: 'none',
  },
  textarea: {
    minHeight: layout.textareaMinHeight,
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
    width: `min(100%, ${layout.overlayWidth})`,
    maxHeight: layout.overlayMaxHeight,
    overflow: 'auto',
    borderRadius: radius.overlay,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.chromeBorder,
    background:
      `radial-gradient(circle at 10% 0%, ${colors.surfaceGlowPrimary}, transparent 36%), radial-gradient(circle at 86% 10%, ${colors.surfaceGlowSecondary}, transparent 34%), linear-gradient(145deg, ${colors.overlayPanelStart}, ${colors.overlayPanelEnd})`,
    boxShadow: `0 20px 40px ${colors.shadowStrong}, inset 0 0 0 1px ${colors.borderSubtle}`,
  },
  panelNarrow: {
    maxWidth: layout.overlayWidthNarrow,
  },
  panelFullBleed: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
  },
});

export const themePrimitives = {
  pageChrome: [appShellStyles.page, appShellStyles.contentShell],
  pageChromeSurface: [appShellStyles.chromeSurface],
  pageContainer: [appShellStyles.container],
  chromePanel: [surfaceStyles.chrome],
  card: [surfaceStyles.card, surfaceStyles.interactive],
  cardStatic: [surfaceStyles.card],
  panel: [surfaceStyles.panel],
  panelInteractive: [surfaceStyles.panel, surfaceStyles.interactive],
  elevatedPanel: [surfaceStyles.elevated, surfaceStyles.interactive],
  subduedPanel: [surfaceStyles.subdued],
  primaryButton: [buttonStyles.base, buttonStyles.primary],
  secondaryButton: [buttonStyles.base, buttonStyles.secondary],
  touchButton: [buttonStyles.base, buttonStyles.secondary, buttonStyles.touch],
  ghostButton: [buttonStyles.base, buttonStyles.ghost],
  dangerButton: [buttonStyles.base, buttonStyles.danger],
  fieldLabel: [formStyles.label],
  fieldHint: [formStyles.hint],
  fieldError: [formStyles.error],
  input: [formStyles.field, formStyles.input],
  select: [formStyles.field, formStyles.select],
  textarea: [formStyles.field, formStyles.textarea],
  overlayBackdrop: [overlayStyles.backdrop],
  overlayPanel: [overlayStyles.panel],
  overlayPanelNarrow: [overlayStyles.panel, overlayStyles.panelNarrow],
  overlayPanelFullBleed: [overlayStyles.panel, overlayStyles.panelFullBleed],
} as const;

export const themePrimitiveProbeContract = [
  'pageChrome',
  'card',
  'panel',
  'button',
  'input',
  'overlayPanelNarrow',
] as const;

export const themePrimitiveProbeStyles = {
  pageChrome: themePrimitives.pageChrome,
  card: themePrimitives.cardStatic,
  panel: themePrimitives.panel,
  button: themePrimitives.secondaryButton,
  input: themePrimitives.input,
  overlayPanelNarrow: themePrimitives.overlayPanelNarrow,
} as const satisfies Record<(typeof themePrimitiveProbeContract)[number], readonly unknown[]>;

export const themePrimitiveProbeEntries = [
  { testId: 'theme-probe-page', primitive: 'pageChrome', styles: themePrimitiveProbeStyles.pageChrome },
  { testId: 'theme-probe-card', primitive: 'card', styles: themePrimitiveProbeStyles.card },
  { testId: 'theme-probe-panel', primitive: 'panel', styles: themePrimitiveProbeStyles.panel },
  { testId: 'theme-probe-button', primitive: 'button', styles: themePrimitiveProbeStyles.button },
  { testId: 'theme-probe-input', primitive: 'input', styles: themePrimitiveProbeStyles.input },
  { testId: 'theme-probe-overlay', primitive: 'overlayPanelNarrow', styles: themePrimitiveProbeStyles.overlayPanelNarrow },
] as const satisfies ReadonlyArray<{
  testId: string;
  primitive: (typeof themePrimitiveProbeContract)[number];
  styles: readonly unknown[];
}>;
