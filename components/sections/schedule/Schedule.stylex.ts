import * as stylex from '@stylexjs/stylex';
import { radius, typography } from '../../../lib/stylex/tokens.stylex';

export const scheduleStyles = stylex.create({
  shell: {
    width: '100%',
    maxWidth: '56rem',
    marginInline: 'auto',
  },
  navSurface: {
    display: 'flex',
    width: {
      default: '100%',
      '@media (min-width: 640px)': 'auto',
    },
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '20px',
    border: '1px solid rgba(73,110,130,0.38)',
    background: 'linear-gradient(145deg, rgba(10,16,24,0.88), rgba(8,12,18,0.86))',
  },
  navLabel: {
    minWidth: 0,
    flex: 1,
    paddingInline: '8px',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#e6eff5',
  },
  navChevron: {
    fontSize: '1.125rem',
    lineHeight: 1,
  },
  weekGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 640px)': 'repeat(3, minmax(0, 1fr))',
      '@media (min-width: 1024px)': 'repeat(7, minmax(0, 1fr))',
    },
    gap: '8px',
  },
  weekDayBtn: {
    borderRadius: radius.xl,
    border: '1px solid rgba(34,53,68,0.7)',
    padding: '12px 14px',
    textAlign: 'left',
    transitionProperty: 'border-color, background-color, transform, box-shadow',
    transitionDuration: '160ms',
    backgroundColor: 'rgba(12,21,29,0.85)',
    ':hover': {
      borderColor: 'rgba(75,111,132,0.8)',
      backgroundColor: 'rgba(16,29,39,0.95)',
    },
  },
  weekDayBtnActive: {
    borderColor: 'rgba(169,209,228,0.65)',
    background: 'linear-gradient(135deg, rgba(37,79,103,0.95), rgba(18,36,48,0.98))',
    boxShadow: '0 18px 30px rgba(5,10,15,0.42)',
  },
  weekDayHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  weekDayLabel: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#d3e3ec',
  },
  weekDayLabelActive: {
    color: '#f3fbff',
  },
  todayPill: {
    borderRadius: radius.pill,
    border: '1px solid rgba(52,211,153,0.35)',
    backgroundColor: 'rgba(16,185,129,0.1)',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: 500,
    color: '#86efac',
  },
  weekDayMeta: {
    marginTop: '8px',
    fontSize: '0.75rem',
    color: '#8aa4b3',
  },
  bannerCard: {
    padding: '16px 20px',
    borderRadius: radius.xl,
  },
  currentBanner: {
    border: '1px solid rgba(21,128,61,0.5)',
    background: 'linear-gradient(to right, rgba(20,83,45,0.3), rgba(22,101,52,0.2))',
  },
  nextBanner: {
    border: '1px solid rgba(143,185,204,0.3)',
    background: 'linear-gradient(to right, #1a2a3a, #1a1a2a)',
  },
  bannerTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#fff',
  },
  bannerMeta: {
    marginTop: '4px',
    fontSize: '0.875rem',
    color: 'rgba(156,163,175,0.95)',
  },
  bannerLiveRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#4ade80',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '8px',
  },
  bannerLiveDot: {
    width: '8px',
    height: '8px',
    borderRadius: radius.pill,
    backgroundColor: '#4ade80',
  },
  bannerHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  bannerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#8fb9cc',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '8px',
  },
  bannerCountdown: {
    textAlign: 'right',
  },
  bannerCountdownValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#8fb9cc',
  },
  emptyCard: {
    padding: {
      default: '32px',
      '@media (min-width: 640px)': '48px',
    },
    textAlign: 'center',
  },
  groupGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: {
      default: '16px',
      '@media (min-width: 640px)': '20px',
    },
  },
  groupCard: {
    overflow: 'hidden',
  },
  groupHeader: {
    padding: '12px 16px',
    borderBottom: '1px solid rgba(31,41,55,0.85)',
  },
  groupHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  groupTitle: {
    fontWeight: 600,
    color: '#fff',
  },
  groupCount: {
    borderRadius: radius.pill,
    backgroundColor: 'rgba(31,41,55,1)',
    padding: '4px 8px',
    fontSize: '0.75rem',
    color: 'rgba(107,114,128,0.95)',
  },
  eventsDivider: {
    borderTop: '1px solid rgba(31,41,55,0.5)',
  },
  eventRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 16px',
    transitionProperty: 'background-color, opacity',
    transitionDuration: '160ms',
    ':hover': {
      backgroundColor: 'rgba(31,41,55,0.3)',
    },
  },
  eventRowNow: {
    backgroundColor: 'rgba(20,83,45,0.2)',
  },
  eventRowNext: {
    backgroundColor: 'rgba(143,185,204,0.1)',
  },
  eventRowPast: {
    opacity: 0.5,
  },
  eventTime: {
    width: '4.5rem',
    flexShrink: 0,
    fontFamily: typography.display,
    fontSize: '0.875rem',
    color: 'rgba(107,114,128,0.95)',
  },
  eventTimeNow: {
    color: '#4ade80',
  },
  eventTimeNext: {
    color: '#8fb9cc',
  },
  eventIconMuted: {
    color: '#8fb9cc',
  },
  eventIconSuccess: {
    color: '#6b7280',
    flexShrink: 0,
  },
  eventBody: {
    flex: 1,
    minWidth: 0,
  },
  eventTitle: {
    color: 'rgba(229,231,235,0.95)',
  },
  eventTitleNow: {
    fontWeight: 500,
  },
  eventTitlePast: {
    color: 'rgba(107,114,128,0.95)',
  },
  eventMetaRow: {
    marginTop: '4px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    color: '#7f97a6',
  },
  microPill: {
    borderRadius: radius.pill,
    padding: '2px 8px',
    border: '1px solid rgba(41,68,84,0.7)',
    backgroundColor: 'rgba(15,28,37,0.8)',
  },
  recurringPill: {
    borderColor: 'rgba(53,89,106,0.7)',
    backgroundColor: 'rgba(16,32,42,0.8)',
    color: '#9dc5d7',
  },
  hiddenPill: {
    borderColor: 'rgba(245,158,11,0.3)',
    backgroundColor: 'rgba(245,158,11,0.1)',
    color: '#fcd34d',
  },
  liveNow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '4px',
    fontSize: '0.75rem',
    color: '#4ade80',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: radius.pill,
    backgroundColor: '#4ade80',
  },
  summary: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      default: '12px',
      '@media (min-width: 640px)': '16px',
    },
    fontSize: '0.875rem',
    color: 'rgba(107,114,128,0.95)',
  },
  summaryAccent: {
    color: '#8fb9cc',
  },
  editorShell: {
    width: '100%',
    maxWidth: '96rem',
    padding: 0,
    overflow: 'hidden',
  },
  editorGrid: {
    display: 'grid',
    maxHeight: '92vh',
    overflow: 'auto',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 1024px)': 'minmax(0,1.45fr) minmax(320px,0.95fr)',
    },
  },
  editorMain: {
    padding: {
      default: '24px',
      '@media (min-width: 768px)': '32px',
    },
  },
  editorModeRow: {
    marginBottom: '24px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    fontSize: '12px',
  },
  editorSectionHeader: {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  editorSectionTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#e6eff5',
  },
  editorSectionSubtitle: {
    marginTop: '4px',
    fontSize: '0.75rem',
    color: '#7f97a6',
    lineHeight: 1.5,
  },
  editorFieldGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: '16px',
  },
  editorTimeGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'minmax(0,1fr) minmax(0,1fr) 140px',
    },
    gap: '16px',
  },
  editorTitlesGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: '16px',
  },
  editorTitleZh: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 768px)': 'span 2',
    },
  },
  editorLabelStack: {
    display: 'grid',
    gap: '8px',
    fontSize: '0.875rem',
  },
  editorLabelText: {
    color: '#9ca3af',
  },
  editorFieldError: {
    fontSize: '0.75rem',
    color: '#fda4af',
  },
  editorHintText: {
    fontSize: '0.75rem',
    color: '#7f97a6',
    lineHeight: 1.5,
  },
  editorPresetRow: {
    marginTop: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  editorCheckboxRow: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    fontSize: '0.875rem',
  },
  editorActions: {
    marginTop: '24px',
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
  archiveButtonActive: {
    width: {
      default: '100%',
      '@media (min-width: 640px)': 'auto',
    },
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#fecaca',
    fontWeight: 500,
  },
  archiveButtonInactive: {
    width: {
      default: '100%',
      '@media (min-width: 640px)': 'auto',
    },
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(16, 185, 129, 0.35)',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#bbf7d0',
    fontWeight: 500,
  },
  previewAside: {
    borderTop: '1px solid #203342',
    background: 'radial-gradient(circle at top, rgba(47,111,144,0.22), transparent 45%), linear-gradient(180deg,#0d151c,#091017)',
    padding: {
      default: '24px',
      '@media (min-width: 768px)': '32px',
    },
    '@media (min-width: 1024px)': {
      borderLeft: '1px solid #203342',
      borderTop: '0',
    },
  },
  previewHeader: {
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  previewHeaderTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#eff8fd',
  },
  previewHeaderSubtitle: {
    marginTop: '4px',
    fontSize: '0.875rem',
    color: '#8ba4b4',
  },
  previewCard: {
    borderRadius: '28px',
    border: '1px solid #2a4454',
    backgroundColor: 'rgba(12,21,29,0.92)',
    padding: '20px',
    boxShadow: '0 20px 40px rgba(3,8,12,0.45)',
  },
  previewCardTop: {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  previewEyebrow: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    color: '#7d99aa',
  },
  previewCardTitle: {
    marginTop: '8px',
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#f1f8fd',
  },
  previewOrderPill: {
    borderRadius: radius.pill,
    border: '1px solid #35596a',
    backgroundColor: 'rgba(16,32,42,0.8)',
    padding: '4px 12px',
    fontSize: '0.75rem',
    color: '#9dc5d7',
  },
  previewFacts: {
    display: 'grid',
    gap: '12px',
    fontSize: '0.875rem',
    color: '#c8d9e3',
  },
  previewFactRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    borderRadius: radius.xl,
    border: '1px solid #223544',
    backgroundColor: 'rgba(17,28,36,0.85)',
    padding: '12px 16px',
  },
  previewFactLabel: {
    color: '#86a4b5',
  },
  previewFactValue: {
    color: '#eef9ff',
  },
  previewFactValueMono: {
    fontFamily: typography.mono,
  },
  previewLocalesGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 640px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 1024px)': '1fr',
      '@media (min-width: 1280px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: '12px',
  },
  previewLocaleWide: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 640px)': 'span 2',
      '@media (min-width: 1024px)': 'auto',
      '@media (min-width: 1280px)': 'span 2',
    },
  },
  previewLocaleCard: {
    borderRadius: radius.xl,
    border: '1px solid #223544',
    backgroundColor: 'rgba(17,28,36,0.85)',
    padding: '12px 16px',
  },
  previewLocaleLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: '#6f8b9b',
  },
  previewLocaleValue: {
    marginTop: '8px',
    fontSize: '0.875rem',
    color: '#eef9ff',
  },
  tipsCard: {
    marginTop: '24px',
    borderRadius: '24px',
    border: '1px solid #223544',
    backgroundColor: 'rgba(12,21,29,0.82)',
    padding: '20px',
  },
  tipsTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#e6eff5',
  },
  tipsList: {
    marginTop: '12px',
    display: 'grid',
    gap: '12px',
    fontSize: '0.875rem',
    color: '#9db3c1',
  },
  tipRow: {
    display: 'flex',
    gap: '12px',
  },
  tipIcon: {
    marginTop: '2px',
    flexShrink: 0,
    color: '#86efac',
  },
  liveDotPulse: {
    animationName: 'pulseSoft',
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
  },
});
