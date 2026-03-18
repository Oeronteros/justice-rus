import * as stylex from '@stylexjs/stylex';
import { colors, radius, typography } from '../../../lib/stylex/tokens.stylex';

export const registrationStyles = stylex.create({
  identityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
  },
  identityAvatar: {
    borderRadius: radius.pill,
    border: '1px solid #385264',
    backgroundColor: '#0c151d',
    flexShrink: 0,
    objectFit: 'cover',
  },
  identityAvatarCompact: {
    width: '44px',
    height: '44px',
  },
  identityAvatarDefault: {
    width: '36px',
    height: '36px',
  },
  identityAvatarFallback: {
    borderRadius: radius.pill,
    border: '1px solid #385264',
    background: 'linear-gradient(to bottom right, #223544, #4a90b0)',
    color: '#f7fbff',
    fontWeight: 600,
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
  },
  identityAvatarFallbackCompact: {
    width: '44px',
    height: '44px',
    fontSize: '0.75rem',
  },
  identityAvatarFallbackDefault: {
    width: '36px',
    height: '36px',
    fontSize: '11px',
  },
  identityMeta: {
    minWidth: 0,
  },
  identityPrimary: {
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  identitySecondary: {
    fontSize: '0.75rem',
    color: 'rgba(156, 163, 175, 0.95)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  kpiValueGood: {
    color: '#4ade80',
    fontWeight: 500,
  },
  kpiValueMedium: {
    color: '#facc15',
    fontWeight: 500,
  },
  kpiValueBad: {
    color: '#f87171',
    fontWeight: 500,
  },
  kpiIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  kpiDot: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: radius.pill,
    backgroundColor: 'currentColor',
  },
  kpiIndicatorText: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(3, minmax(0, 1fr))',
    },
    gap: {
      default: '16px',
      '@media (min-width: 640px)': '20px',
    },
  },
  statTile: {
    padding: '14px 16px',
    borderRadius: radius.md,
    border: '1px solid rgba(42, 60, 76, 0.72)',
    backgroundColor: 'rgba(16, 26, 35, 0.7)',
    textAlign: 'center',
  },
  statValue: {
    marginBottom: '8px',
    fontSize: '1.875rem',
    fontWeight: 700,
    fontFamily: typography.display,
  },
  statValueTotal: {
    color: '#f87171',
  },
  statValueOnline: {
    color: '#4ade80',
  },
  statValueKpiGood: {
    color: '#4ade80',
  },
  statValueKpiMedium: {
    color: '#facc15',
  },
  statValueKpiBad: {
    color: '#f87171',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#c7dbe7',
  },
  filterCard: {
    display: 'grid',
    gap: '18px',
    borderRadius: '24px',
    border: '1px solid rgba(73, 110, 130, 0.38)',
    background:
      'radial-gradient(circle at 12% 0%, rgba(110, 190, 230, 0.08), transparent 38%), linear-gradient(145deg, rgba(10, 16, 24, 0.92), rgba(8, 12, 18, 0.9))',
    boxShadow: '0 18px 36px rgba(4, 8, 12, 0.38)',
    padding: {
      default: '16px',
      '@media (min-width: 640px)': '24px',
    },
  },
  filtersGrid: {
    display: 'grid',
    gap: {
      default: '12px',
      '@media (min-width: 640px)': '16px',
    },
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 1024px)': 'minmax(0,1.3fr) repeat(3,minmax(0,0.72fr))',
    },
    alignItems: {
      default: 'stretch',
      '@media (min-width: 1024px)': 'center',
    },
  },
  renamePanel: {
    borderRadius: '20px',
    border: '1px solid rgba(42, 60, 76, 0.72)',
    backgroundColor: 'rgba(12, 21, 29, 0.78)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.02)',
    padding: {
      default: '16px',
      '@media (min-width: 640px)': '20px',
    },
  },
  renameHeader: {
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
  headingKicker: {
    marginBottom: '4px',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: '#9ec5d8',
  },
  mutedText: {
    fontSize: '0.875rem',
    color: 'rgba(156, 163, 175, 0.95)',
    lineHeight: 1.6,
  },
  actionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  renameGrid: {
    marginTop: '16px',
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 640px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 1280px)': 'repeat(3, minmax(0, 1fr))',
    },
    gap: '12px',
  },
  labelStack: {
    display: 'grid',
    gap: '8px',
    fontSize: '0.875rem',
  },
  fieldLabel: {
    color: 'rgba(156, 163, 175, 0.95)',
  },
  renameActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    paddingTop: '8px',
    gridColumn: {
      default: 'auto',
      '@media (min-width: 640px)': 'span 2',
      '@media (min-width: 1280px)': 'span 3',
    },
  },
  emptyCard: {
    padding: '40px 24px',
    textAlign: 'center',
    display: 'grid',
    gap: '12px',
    justifyItems: 'center',
  },
  emptyIconSurface: {
    width: '64px',
    height: '64px',
    borderRadius: radius.pill,
    display: 'grid',
    placeItems: 'center',
    border: '1px solid rgba(42, 60, 76, 0.72)',
    backgroundColor: 'rgba(12, 21, 29, 0.78)',
  },
  emptyTitle: {
    fontSize: '1.125rem',
    color: '#d9e9f2',
    fontWeight: 600,
  },
  emptyText: {
    fontSize: '0.875rem',
    color: '#9fb5c3',
  },
  mobileCardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '14px',
  },
  mobileCard: {
    display: 'grid',
    gap: '14px',
    borderRadius: '24px',
    border: '1px solid rgba(42, 60, 76, 0.72)',
    background: 'linear-gradient(145deg, rgba(10, 18, 26, 0.9), rgba(8, 12, 18, 0.9))',
    padding: '18px',
    boxShadow: '0 16px 28px rgba(4, 8, 12, 0.28)',
  },
  mobileCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  mobileCardLead: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    minWidth: 0,
  },
  mobileCardMeta: {
    minWidth: 0,
  },
  mobileCardIndex: {
    marginBottom: '4px',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#9ec5d8',
  },
  mobileCardNameRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
  },
  mobileCardName: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#e6eff5',
  },
  mobileCardDiscord: {
    marginTop: '4px',
    fontSize: '0.875rem',
    color: 'rgba(156, 163, 175, 0.95)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  mobileSection: {
    display: 'grid',
    gap: '10px',
  },
  mobileMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '12px',
    fontSize: '0.875rem',
  },
  mobileMetricTile: {
    display: 'grid',
    gap: '6px',
    minHeight: '72px',
    padding: '12px',
    borderRadius: radius.md,
    border: '1px solid rgba(34, 53, 68, 0.7)',
    backgroundColor: 'rgba(12, 21, 29, 0.82)',
  },
  mobileMetricLabel: {
    fontSize: '0.73rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'rgba(145, 170, 186, 0.88)',
  },
  mobileMetricValue: {
    color: '#e6eff5',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  fullSpan: {
    gridColumn: 'span 2',
  },
  mobileEditButton: {
    width: '100%',
    minHeight: '48px',
  },
  desktopIndex: {
    color: '#f87171',
    fontWeight: 500,
  },
  desktopNicknameCell: {
    fontWeight: 500,
  },
  desktopNicknameRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
  },
  desktopIdentityCell: {
    minWidth: '220px',
  },
  modalBodyGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: '16px',
    marginBottom: '24px',
  },
  modalFieldFull: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 768px)': 'span 2',
    },
  },
  modalPreview: {
    borderRadius: '20px',
    border: '1px solid rgba(47, 110, 141, 0.35)',
    backgroundColor: 'rgba(18, 32, 43, 0.55)',
    padding: '12px 16px',
  },
  modalNumbersGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 640px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 1024px)': 'repeat(3, minmax(0, 1fr))',
    },
    gap: '16px',
  },
  modalError: {
    marginTop: '24px',
  },
  modalActions: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    gap: '12px',
    justifyContent: {
      default: 'flex-start',
      '@media (min-width: 640px)': 'flex-end',
    },
  },
  modalShellPadded: {
    padding: {
      default: '24px',
      '@media (min-width: 768px)': '32px',
    },
  },
});
