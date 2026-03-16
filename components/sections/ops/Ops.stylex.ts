import * as stylex from '@stylexjs/stylex';
import { radius, typography } from '../../../lib/stylex/tokens.stylex';

export const opsStyles = stylex.create({
  splitGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 1024px)': 'repeat(5, minmax(0, 1fr))',
    },
    gap: {
      default: '20px',
      '@media (min-width: 640px)': '24px',
      '@media (min-width: 1024px)': '32px',
    },
    alignItems: 'start',
  },
  sideCol: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 1024px)': 'span 2',
    },
  },
  mainCol: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 1024px)': 'span 3',
    },
  },
  panel: {
    padding: {
      default: '20px',
      '@media (min-width: 640px)': '24px',
      '@media (min-width: 1024px)': '32px',
    },
  },
  iconTitleRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  iconWrap: {
    width: '48px',
    height: '48px',
    marginRight: '16px',
    borderRadius: radius.pill,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, rgba(47,110,141,0.3), rgba(143,185,204,0.3))',
  },
  panelTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    fontFamily: typography.display,
    color: '#e6eff5',
  },
  formStack: {
    display: 'grid',
    gap: '16px',
  },
  fieldGrid2: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 640px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: '16px',
  },
  fieldLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.875rem',
    color: 'rgba(156,163,175,0.95)',
  },
  helperInline: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: 'rgba(156,163,175,0.95)',
  },
  helperAccent: {
    marginLeft: '8px',
    color: '#c9deea',
  },
  errorBox: {
    fontSize: '0.875rem',
    marginTop: '8px',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(47,110,141,0.4)',
    backgroundColor: 'rgba(22,32,43,0.65)',
    color: '#bcd6e5',
  },
  toolbar: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    alignItems: {
      default: 'stretch',
      '@media (min-width: 640px)': 'center',
    },
    justifyContent: 'space-between',
    gap: '12px',
  },
  toolbarSurface: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    alignItems: {
      default: 'stretch',
      '@media (min-width: 640px)': 'center',
    },
    justifyContent: 'space-between',
    gap: '12px',
    padding: '14px',
    borderRadius: '20px',
    border: '1px solid rgba(73,110,130,0.38)',
    background: 'linear-gradient(145deg, rgba(10,16,24,0.88), rgba(8,12,18,0.86))',
  },
  actionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
  },
  listStack: {
    display: 'grid',
    gap: {
      default: '16px',
      '@media (min-width: 640px)': '20px',
    },
  },
  emptyCard: {
    padding: {
      default: '32px',
      '@media (min-width: 640px)': '40px',
    },
    textAlign: 'center',
  },
  emptyIconSurface: {
    width: '64px',
    height: '64px',
    borderRadius: radius.pill,
    display: 'grid',
    placeItems: 'center',
    border: '1px solid rgba(42,60,76,0.72)',
    backgroundColor: 'rgba(12,21,29,0.78)',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#e6eff5',
  },
  emptyDescription: {
    marginTop: '8px',
    color: 'rgba(156,163,175,0.95)',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: radius.pill,
    padding: '6px 12px',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  statusPending: {
    background: 'linear-gradient(to right, rgba(202,138,4,0.3), rgba(133,77,14,0.3))',
    color: '#facc15',
  },
  statusApproved: {
    background: 'linear-gradient(to right, rgba(22,163,74,0.3), rgba(21,128,61,0.3))',
    color: '#4ade80',
  },
  statusRejected: {
    background: 'linear-gradient(to right, rgba(220,38,38,0.3), rgba(127,29,29,0.3))',
    color: '#f87171',
  },
  statGrid2: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: {
      default: '16px',
      '@media (min-width: 640px)': '20px',
    },
    marginBottom: '16px',
  },
  statCard: {
    backgroundColor: 'rgba(31,41,55,0.5)',
    padding: '16px',
    borderRadius: '12px',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: 'rgba(156,163,175,0.95)',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#e6eff5',
  },
  bodyCard: {
    backgroundColor: 'rgba(31,41,55,0.5)',
    padding: '16px',
    borderRadius: '12px',
  },
  bodyText: {
    color: 'rgba(209,213,219,0.95)',
  },
});
