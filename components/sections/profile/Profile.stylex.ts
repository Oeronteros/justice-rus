import * as stylex from '@stylexjs/stylex';
import { colors, radius } from '../../../lib/stylex/tokens.stylex';

export const profileStyles = stylex.create({
  headingKicker: {
    marginBottom: '8px',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: '#9ec5d8',
  },
  headingKickerSpacious: {
    marginBottom: '12px',
  },
  mutedText: {
    color: 'rgba(156, 163, 175, 0.95)',
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  heroActionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: {
      default: 'flex-start',
      '@media (min-width: 768px)': 'flex-end',
    },
  },
  overviewRail: {
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(3, minmax(0, 1fr))',
    },
  },
  overviewRailCard: {
    display: 'grid',
    gap: '8px',
    padding: '18px 20px',
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(3, minmax(0, 1fr))',
      '@media (min-width: 1280px)': 'repeat(6, minmax(0, 1fr))',
    },
    gap: '16px',
    fontSize: '0.875rem',
  },
  metricTile: {
    padding: '14px 16px',
    borderRadius: radius.md,
    border: '1px solid rgba(42, 60, 76, 0.72)',
    backgroundColor: 'rgba(16, 26, 35, 0.7)',
  },
  metricLabel: {
    marginBottom: '4px',
    color: 'rgba(156, 163, 175, 0.95)',
  },
  metricValue: {
    color: colors.paperStrong,
    fontWeight: 500,
  },
  notificationGroup: {
    display: 'grid',
    gap: '16px',
  },
  notificationItem: {
    display: 'flex',
    alignItems: {
      default: 'center',
      '@media (max-width: 639px)': 'flex-start',
    },
    flexDirection: {
      default: 'row',
      '@media (max-width: 639px)': 'column',
    },
    justifyContent: 'space-between',
    gap: '16px',
    padding: '14px 16px',
    borderRadius: '14px',
    backgroundColor: 'rgba(10, 18, 26, 0.65)',
    border: '1px solid rgba(85, 119, 138, 0.18)',
  },
  notificationLabel: {
    flex: '1 1 auto',
    minWidth: 0,
  },
  notificationTitle: {
    color: 'rgba(230, 239, 245, 0.98)',
    fontWeight: 600,
    fontSize: '0.92rem',
  },
  notificationDescription: {
    color: 'rgba(159, 184, 198, 0.88)',
    fontSize: '0.82rem',
    marginTop: '3px',
  },
  notificationToggleWrap: {
    flex: '0 0 auto',
    width: {
      default: 'auto',
      '@media (max-width: 639px)': '100%',
    },
    display: {
      default: 'block',
      '@media (max-width: 639px)': 'flex',
    },
    justifyContent: {
      default: 'flex-start',
      '@media (max-width: 639px)': 'flex-end',
    },
  },
  toggleSwitch: {
    position: 'relative',
    width: '52px',
    height: '28px',
    backgroundColor: 'rgba(85, 119, 138, 0.35)',
    borderRadius: radius.pill,
    cursor: 'pointer',
    transitionProperty: 'background',
    transitionDuration: '200ms',
  },
  toggleSwitchActive: {
    backgroundColor: 'rgba(74, 222, 128, 0.6)',
  },
  toggleKnob: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    width: '22px',
    height: '22px',
    backgroundColor: 'rgba(230, 239, 245, 0.98)',
    borderRadius: radius.pill,
    transitionProperty: 'transform',
    transitionDuration: '200ms',
  },
  toggleKnobActive: {
    transform: 'translateX(24px)',
  },
  spaceY5: {
    display: 'grid',
    gap: '20px',
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 1280px)': 'repeat(3, minmax(0, 1fr))',
    },
    gap: '16px',
    fontSize: '0.875rem',
  },
  roleCard: {
    borderRadius: radius.xl,
    border: '1px solid rgba(42, 60, 76, 0.72)',
    backgroundColor: 'rgba(12, 21, 29, 0.78)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.02)',
    padding: '16px',
    display: 'grid',
    gap: '12px',
  },
  roleCardActive: {
    borderColor: 'rgba(47, 110, 141, 0.7)',
    backgroundColor: 'rgba(22, 48, 66, 0.45)',
  },
  roleHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  roleTitle: {
    color: colors.paperStrong,
    fontWeight: 600,
  },
  roleCurrent: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: colors.accent,
  },
  roleSummary: {
    color: 'rgba(209, 213, 219, 0.95)',
    fontSize: '0.75rem',
    lineHeight: 1.6,
  },
  capabilityList: {
    display: 'grid',
    gap: '8px',
  },
  capabilityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '0.75rem',
    color: '#c8dce8',
  },
  capabilityDot: {
    marginTop: '4px',
    display: 'inline-flex',
    width: '6px',
    height: '6px',
    flexShrink: 0,
    borderRadius: radius.pill,
    backgroundColor: '#8fb9cc',
  },
  activityCard: {
    borderRadius: radius.xl,
    border: '1px solid rgba(42, 60, 76, 0.72)',
    backgroundColor: 'rgba(12, 21, 29, 0.78)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.02)',
    padding: '16px',
  },
  activityHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px',
  },
  activityLabel: {
    color: colors.paperStrong,
    fontWeight: 500,
  },
  activityHint: {
    marginTop: '4px',
    fontSize: '0.75rem',
    color: 'rgba(156, 163, 175, 0.95)',
  },
  activitySwitch: {
    position: 'relative',
    display: 'inline-flex',
    height: '32px',
    width: '64px',
    flexShrink: 0,
    borderRadius: radius.pill,
    border: '1px solid rgba(248, 113, 113, 0.5)',
    backgroundColor: 'rgba(239, 68, 68, 0.75)',
  },
  activitySwitchActive: {
    borderColor: 'rgba(74, 222, 128, 0.6)',
    backgroundColor: 'rgba(34, 197, 94, 0.8)',
  },
  activityKnob: {
    position: 'absolute',
    left: '4px',
    top: '4px',
    display: 'inline-flex',
    height: '24px',
    width: '24px',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.95)',
    boxShadow: '0 6px 14px rgba(0,0,0,0.28)',
    transitionProperty: 'transform',
    transitionDuration: '200ms',
  },
  activityKnobActive: {
    transform: 'translateX(32px)',
  },
  activityPill: {
    marginTop: '16px',
    display: 'inline-flex',
    borderRadius: radius.pill,
    padding: '4px 12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: 'rgba(254, 202, 202, 0.96)',
  },
  activityPillActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    color: 'rgba(134, 239, 172, 0.96)',
  },
  statsCard: {
    display: 'grid',
    gap: '24px',
    padding: {
      default: '20px',
      '@media (min-width: 640px)': '24px',
    },
  },
  statsHeader: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    alignItems: {
      default: 'stretch',
      '@media (min-width: 640px)': 'center',
    },
    justifyContent: {
      default: 'flex-start',
      '@media (min-width: 640px)': 'space-between',
    },
    gap: '12px',
  },
  actionRow: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    gap: '8px',
    alignItems: {
      default: 'stretch',
      '@media (min-width: 640px)': 'center',
    },
    justifyContent: {
      default: 'flex-start',
      '@media (min-width: 640px)': 'flex-end',
    },
  },
  statsMetricGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 1024px)': 'repeat(5, minmax(0, 1fr))',
    },
    gap: '16px',
    fontSize: '0.875rem',
  },
  statsMetricTile: {
    padding: '14px 16px',
    borderRadius: radius.md,
    border: '1px solid rgba(42, 60, 76, 0.72)',
    backgroundColor: 'rgba(16, 26, 35, 0.7)',
  },
  statsMetricGood: {
    borderColor: 'rgba(34, 197, 94, 0.35)',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    color: 'rgba(134, 239, 172, 0.96)',
  },
  statsMetricMedium: {
    borderColor: 'rgba(234, 179, 8, 0.35)',
    backgroundColor: 'rgba(234, 179, 8, 0.12)',
    color: 'rgba(253, 224, 71, 0.96)',
  },
  statsMetricBad: {
    borderColor: 'rgba(239, 68, 68, 0.35)',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    color: 'rgba(252, 165, 165, 0.96)',
  },
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(3, minmax(0, 1fr))',
    },
    gap: '16px',
    fontSize: '0.875rem',
  },
  labelStack: {
    display: 'grid',
    gap: '8px',
  },
  fieldLabel: {
    color: 'rgba(156, 163, 175, 0.95)',
  },
  classPreview: {
    borderRadius: radius.xl,
    border: '1px solid rgba(47, 110, 141, 0.35)',
    backgroundColor: 'rgba(18, 32, 43, 0.55)',
    padding: '12px 16px',
  },
  activityGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 1280px)': 'repeat(3, minmax(0, 1fr))',
    },
    gap: '16px',
    fontSize: '0.875rem',
  },
  accountsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '16px',
  },
  accountsTitle: {
    color: colors.paperStrong,
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  loadingText: {
    color: 'rgba(156, 163, 175, 0.95)',
    fontSize: '0.875rem',
  },
  nicknameCell: {
    fontWeight: 500,
  },
});
