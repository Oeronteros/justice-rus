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
});
