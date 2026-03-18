import * as stylex from '@stylexjs/stylex';
import { colors, motion, radius, spacing, typography } from '../../../lib/stylex/tokens.stylex';

export const guildOperationsDeckStyles = stylex.create({
  grid: {
    display: 'grid',
    gap: spacing.xl,
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 1180px)': 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
    },
  },
  card: {
    display: 'grid',
    gap: spacing.lg,
    minHeight: '100%',
    padding: {
      default: spacing.xl,
      '@media (min-width: 640px)': spacing.xxl,
    },
  },
  chartCard: {
    background:
      `radial-gradient(circle at 8% 0%, ${colors.infoSurface}, transparent 32%), radial-gradient(circle at 90% 4%, ${colors.accentMuted}, transparent 28%), linear-gradient(160deg, ${colors.bgPanelAlt}, ${colors.bgPanel})`,
  },
  sideRail: {
    display: 'grid',
    gap: spacing.xl,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.lg,
    flexWrap: 'wrap',
  },
  titleBlock: {
    display: 'grid',
    gap: spacing.xs,
  },
  kicker: {
    fontSize: typography.microSize,
    lineHeight: typography.microLine,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: colors.textMuted,
    fontWeight: 700,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: typography.display,
    fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
    lineHeight: 1.05,
  },
  body: {
    color: colors.textSecondary,
    lineHeight: 1.6,
  },
  chartGrid: {
    display: 'grid',
    gap: spacing.lg,
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 900px)': 'minmax(0, 1.15fr) minmax(280px, 0.85fr)',
    },
  },
  chartShell: {
    minHeight: '280px',
    padding: spacing.lg,
    borderRadius: radius.xl,
    border: `1px solid ${colors.borderDefault}`,
    backgroundColor: colors.bgPanel,
  },
  signalList: {
    display: 'grid',
    gap: spacing.md,
  },
  signalItem: {
    display: 'grid',
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    border: `1px solid ${colors.borderDefault}`,
    backgroundColor: colors.bgPanel,
  },
  signalHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  signalLabel: {
    color: colors.textPrimary,
    fontSize: typography.titleSize,
    fontWeight: 700,
  },
  signalMeta: {
    color: colors.textMuted,
    fontSize: typography.secondarySize,
    lineHeight: 1.45,
  },
  controlsCard: {
    display: 'grid',
    gap: spacing.lg,
  },
  controlsGrid: {
    display: 'grid',
    gap: spacing.md,
  },
  controlRow: {
    display: 'grid',
    gap: spacing.md,
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: radius.lg,
    border: `1px solid ${colors.borderDefault}`,
    backgroundColor: colors.bgPanel,
  },
  controlTitle: {
    color: colors.textPrimary,
    fontSize: typography.secondarySize,
    fontWeight: 700,
  },
  controlDescription: {
    marginTop: spacing.xs,
    color: colors.textMuted,
    fontSize: typography.secondarySize,
    lineHeight: 1.45,
  },
  switchButton: {
    position: 'relative',
    width: '52px',
    height: '30px',
    borderRadius: radius.pill,
    border: `1px solid ${colors.borderDefault}`,
    backgroundColor: colors.bgField,
    transitionProperty: 'background-color, border-color, transform',
    transitionDuration: motion.fast,
  },
  switchButtonActive: {
    background: `linear-gradient(120deg, ${colors.ember}, ${colors.accent})`,
    borderColor: colors.accentEdge,
  },
  switchKnob: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    width: '22px',
    height: '22px',
    borderRadius: radius.pill,
    backgroundColor: colors.paperBright,
    boxShadow: colors.shadowLifted,
    transitionProperty: 'transform',
    transitionDuration: motion.fast,
  },
  switchKnobActive: {
    transform: 'translateX(22px)',
  },
  actionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  messengerGrid: {
    display: 'grid',
    gap: spacing.md,
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 760px)': 'repeat(3, minmax(0, 1fr))',
    },
  },
  messengerCard: {
    display: 'grid',
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    border: `1px solid ${colors.borderDefault}`,
    backgroundColor: colors.bgPanel,
    color: colors.textPrimary,
    textDecoration: 'none',
    transitionProperty: 'transform, border-color',
    transitionDuration: motion.fast,
    ':hover': {
      transform: 'translateY(-1px)',
      borderColor: colors.borderStrong,
    },
  },
  messengerTitle: {
    color: colors.textPrimary,
    fontWeight: 700,
    fontSize: typography.titleSize,
  },
  messengerText: {
    color: colors.textSecondary,
    fontSize: typography.secondarySize,
    lineHeight: 1.5,
  },
  messengerFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    color: colors.textMuted,
    fontSize: typography.microSize,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  nextEventBadge: {
    color: colors.textPrimary,
    fontWeight: 700,
  },
});
