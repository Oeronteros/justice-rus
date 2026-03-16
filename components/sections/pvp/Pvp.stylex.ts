import * as stylex from '@stylexjs/stylex';
import { radius, typography } from '../../../lib/stylex/tokens.stylex';

export const pvpStyles = stylex.create({
  matchmakingBanner: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '24px',
    border: '1px solid rgba(74,222,128,0.24)',
    background: 'radial-gradient(circle at 12% 0%, rgba(74,222,128,0.18), transparent 40%), linear-gradient(145deg, rgba(7,18,14,0.96), rgba(8,12,18,0.92))',
    padding: '18px 20px',
    boxShadow: '0 18px 34px rgba(4,8,12,0.38)',
  },
  matchmakingContent: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gap: '8px',
  },
  matchmakingStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.82rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#86efac',
  },
  matchmakingDot: {
    width: '8px',
    height: '8px',
    borderRadius: radius.pill,
    backgroundColor: '#4ade80',
  },
  matchmakingTimer: {
    fontFamily: typography.display,
    fontSize: '2rem',
    color: '#f0fdf4',
    lineHeight: 1,
  },
  matchmakingMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    fontSize: '0.84rem',
    color: 'rgba(187,247,208,0.88)',
  },
  fxLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  pulse: {
    position: 'absolute',
    width: '240px',
    height: '240px',
    borderRadius: radius.pill,
    background: 'radial-gradient(circle, rgba(74,222,128,0.16), transparent 70%)',
    top: '-80px',
    right: '-60px',
  },
  pulseDelayed: {
    top: 'auto',
    bottom: '-120px',
    left: '-40px',
    right: 'auto',
    background: 'radial-gradient(circle, rgba(143,185,204,0.12), transparent 70%)',
  },
  scan: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
  },
  matchCard: {
    padding: '20px 24px',
    display: 'grid',
    gap: '20px',
  },
  matchHeader: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 640px)': 'flex-start',
    },
    justifyContent: 'space-between',
    gap: '12px',
  },
  matchKicker: {
    fontSize: '0.82rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#86efac',
    marginBottom: '8px',
  },
  matchTitle: {
    fontSize: '1.5rem',
    fontFamily: typography.display,
    fontWeight: 700,
    color: '#e6eff5',
  },
  matchMeta: {
    marginTop: '8px',
    fontSize: '0.875rem',
    color: 'rgba(156,163,175,0.95)',
  },
  duelGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, minmax(0, 1fr))',
    },
    gap: '16px',
  },
  duelCard: {
    borderRadius: '20px',
    border: '1px solid rgba(21,128,61,0.4)',
    background: 'rgba(20,83,45,0.22)',
    padding: '16px',
  },
  duelLabel: {
    fontSize: '0.82rem',
    color: 'rgba(156,163,175,0.95)',
    marginBottom: '4px',
  },
  duelNameRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    color: '#e6eff5',
    fontWeight: 600,
  },
  reportRow: {
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
  reportText: {
    fontSize: '0.875rem',
    color: 'rgba(156,163,175,0.95)',
  },
  reportAccent: {
    color: '#e6eff5',
  },
  reportButtons: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    gap: '12px',
  },
  reportNotice: {
    borderRadius: '20px',
    border: '1px solid rgba(21,128,61,0.45)',
    background: 'rgba(20,83,45,0.22)',
    padding: '12px 16px',
    fontSize: '0.75rem',
    color: '#86efac',
  },
});
