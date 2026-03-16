import * as stylex from '@stylexjs/stylex';
import { colors, radius, typography } from '../../lib/stylex/tokens.stylex';

export const asyncStateStyles = stylex.create({
  section: {
    paddingBlock: {
      default: '40px',
      '@media (min-width: 640px)': '48px',
    },
  },
  container: {
    width: '100%',
    maxWidth: '80rem',
    marginInline: 'auto',
    paddingInline: {
      default: '16px',
      '@media (min-width: 640px)': '24px',
      '@media (min-width: 1024px)': '32px',
    },
  },
  centerStack: {
    textAlign: 'center',
    paddingBlock: '48px',
  },
  heroStack: {
    display: 'grid',
    gap: '18px',
    marginBottom: {
      default: '32px',
      '@media (min-width: 640px)': '40px',
    },
  },
  heroHeader: {
    display: 'grid',
    gap: '10px',
  },
  heroKicker: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(222, 203, 170, 0.92)',
  },
  heroTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
    lineHeight: 1.05,
    color: colors.paperStrong,
    fontFamily: typography.display,
    fontWeight: 700,
  },
  heroIcon: {
    display: 'inline-grid',
    placeItems: 'center',
    width: {
      default: '42px',
      '@media (max-width: 640px)': '38px',
    },
    height: {
      default: '42px',
      '@media (max-width: 640px)': '38px',
    },
    borderRadius: '12px',
    backgroundColor: 'rgba(27, 22, 24, 0.78)',
    color: colors.accentStrong,
  },
  heroSubtitle: {
    maxWidth: '42rem',
    marginInline: 'auto',
    color: colors.paperSubtle,
    lineHeight: 1.7,
  },
  chipRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  skeletonChip: {
    display: 'inline-flex',
    minWidth: '84px',
    height: '12px',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(184, 160, 111, 0.2)',
  },
  skeletonChipWide: {
    minWidth: '132px',
  },
  grid: {
    display: 'grid',
    gap: {
      default: '18px',
      '@media (max-width: 640px)': '14px',
    },
  },
  cardsGrid: {
    gridTemplateColumns: {
      default: 'repeat(1, minmax(0, 1fr))',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 1280px)': 'repeat(3, minmax(0, 1fr))',
    },
  },
  listGrid: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  card: {
    display: 'grid',
    gap: '16px',
    padding: {
      default: '20px',
      '@media (min-width: 640px)': '24px',
    },
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
  },
  pill: {
    display: 'inline-flex',
    height: '12px',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(184, 160, 111, 0.16)',
    width: '68px',
  },
  pillWide: {
    width: '104px',
  },
  line: {
    display: 'block',
    width: '100%',
    height: '12px',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(184, 160, 111, 0.16)',
  },
  lineShort: {
    width: '38%',
  },
  lineTitle: {
    width: '72%',
    height: '16px',
  },
  lineBodyShort: {
    width: '54%',
  },
  block: {
    minHeight: {
      default: '96px',
      '@media (max-width: 640px)': '82px',
    },
    borderRadius: radius.md,
    backgroundColor: 'rgba(184, 160, 111, 0.1)',
  },
  emptyRoot: {
    textAlign: 'center',
    padding: {
      default: '40px 24px',
      '@media (min-width: 640px)': '48px 32px',
    },
  },
  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  iconSurface: {
    width: '80px',
    height: '80px',
    borderRadius: radius.pill,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 28, 31, 0.58)',
  },
  iconSurfaceError: {
    backgroundColor: colors.dangerSurfaceStrong,
  },
  badgeWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    minHeight: '28px',
    padding: '6px 12px',
    borderRadius: radius.pill,
    border: `1px solid ${colors.accentSoft}`,
    backgroundColor: colors.overlay,
    color: 'rgba(205, 225, 236, 0.94)',
    fontSize: '0.74rem',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.04em',
  },
  badgeError: {
    borderColor: 'rgba(181, 67, 67, 0.38)',
    backgroundColor: colors.dangerSurfaceStrong,
    color: 'rgba(252, 202, 202, 0.96)',
  },
  title: {
    marginBottom: '8px',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: colors.paperStrong,
  },
  titleError: {
    color: colors.dangerText,
  },
  description: {
    maxWidth: '28rem',
    marginInline: 'auto',
    marginBottom: '24px',
    color: colors.paperSubtle,
    lineHeight: 1.75,
  },
  errorIconSurface: {
    width: '64px',
    height: '64px',
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSurfaceStrong,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: colors.dangerText,
    marginBottom: '8px',
  },
  errorText: {
    maxWidth: '28rem',
    marginInline: 'auto',
    marginBottom: '24px',
    color: 'rgba(214, 196, 169, 0.9)',
  },
  spinner: {
    display: 'inline-block',
    borderRadius: radius.pill,
    borderTop: `2px solid ${colors.accent}`,
    borderBottom: `2px solid ${colors.accent}`,
    animationName: {
      default: 'spin',
    },
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  spinnerSm: {
    width: '16px',
    height: '16px',
  },
  spinnerMd: {
    width: '32px',
    height: '32px',
  },
  spinnerLg: {
    width: '48px',
    height: '48px',
  },
});
