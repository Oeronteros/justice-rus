import * as stylex from '@stylexjs/stylex';
import { radius } from '../../lib/stylex/tokens.stylex';

export const rsvpStyles = stylex.create({
  list: {
    display: 'grid',
    gap: '32px',
  },
  section: {
    display: 'grid',
    gap: '12px',
  },
  sectionHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: radius.pill,
  },
  statusGoing: { backgroundColor: '#2d5a3f' },
  statusMaybe: { backgroundColor: '#5a4a2d' },
  statusNo: { backgroundColor: '#5a2d2d' },
  statusPending: { backgroundColor: '#2d3a5a' },
  sectionTitle: {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: '#bcd6e5',
  },
  sectionMeta: {
    fontSize: '0.75rem',
    color: 'rgba(156,163,175,0.95)',
  },
  events: {
    display: 'grid',
    gap: '8px',
  },
  eventCard: {
    borderRadius: radius.md,
    border: '1px solid rgba(42,60,76,0.6)',
    backgroundColor: 'rgba(16,26,35,0.65)',
    padding: '16px',
  },
  eventHead: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  eventTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#e6eff5',
  },
  muted: {
    fontSize: '0.75rem',
    color: 'rgba(156,163,175,0.95)',
  },
  eventBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '10px',
    fontSize: '0.75rem',
  },
  eventBadgeGoing: { backgroundColor: 'rgba(45,90,63,0.3)', color: '#6fb98f' },
  eventBadgeMaybe: { backgroundColor: 'rgba(90,74,45,0.3)', color: '#b9a56f' },
  eventBadgeNo: { backgroundColor: 'rgba(90,45,45,0.3)', color: '#b96f6f' },
  exportRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  exportBtn: {
    padding: '6px',
    borderRadius: '8px',
    color: '#8fb9cc',
    transitionProperty: 'background-color, color',
    transitionDuration: '160ms',
    ':hover': {
      backgroundColor: 'rgba(26,42,58,0.6)',
    },
  },
});
