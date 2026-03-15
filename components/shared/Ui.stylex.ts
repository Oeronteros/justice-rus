import * as stylex from '@stylexjs/stylex';
import { colors, radius } from '../../lib/stylex/tokens.stylex';

export const uiStyles = stylex.create({
  sectionShell: {
    scrollMarginTop: 'calc(96px + var(--safe-top))',
    paddingBlock: {
      default: '40px',
      '@media (min-width: 640px)': '48px',
      '@media (max-width: 767px)': 'calc(40px + 84px + var(--safe-bottom))',
    },
  },
  sectionContainer: {
    width: '100%',
    maxWidth: '80rem',
    marginInline: 'auto',
    paddingInline: {
      default: '16px',
      '@media (min-width: 640px)': '24px',
      '@media (min-width: 1024px)': '32px',
    },
  },
  stackLg: {
    display: 'grid',
    gap: '24px',
  },
  card: {
    position: 'relative',
    borderRadius: '16px',
    border: '1px solid rgba(73, 110, 130, 0.4)',
    background:
      'radial-gradient(circle at 10% 0%, rgba(110, 190, 230, 0.07), transparent 45%), linear-gradient(145deg, rgba(10, 16, 24, 0.92), rgba(8, 12, 18, 0.88))',
    transitionProperty: 'border-color, transform, box-shadow',
    transitionDuration: '150ms',
    boxShadow: '0 18px 34px rgba(4, 8, 12, 0.42)',
    ':hover': {
      borderColor: 'rgba(170, 210, 230, 0.55)',
      boxShadow: '0 26px 46px rgba(4, 8, 12, 0.55)',
      transform: 'translateY(-1px)',
    },
    ':focus-within': {
      borderColor: 'rgba(180, 221, 239, 0.58)',
      boxShadow: '0 0 0 1px rgba(180, 221, 239, 0.18), 0 24px 44px rgba(4, 8, 12, 0.55)',
    },
  },
  sectionCard: {
    borderRadius: '24px',
  },
  buttonBase: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    borderRadius: '12px',
    padding: '10px 20px',
    minHeight: '44px',
    fontWeight: 600,
    color: '#fff',
    transitionProperty: 'transform, box-shadow, filter, background, border-color, background-color',
    transitionDuration: '160ms',
    ':active': {
      transform: 'translateY(1px) scale(0.992)',
    },
    ':focus-visible': {
      outlineOffset: '2px',
    },
    ':disabled': {
      cursor: 'progress',
      opacity: 0.72,
      transform: 'none',
    },
  },
  buttonPrimary: {
    background: 'linear-gradient(120deg, #2f6f90, #5d9cbc)',
    border: '1px solid rgba(174, 212, 231, 0.4)',
    boxShadow: '0 14px 28px rgba(8, 17, 24, 0.42)',
    ':hover': {
      background: 'linear-gradient(120deg, #3a7d9f, #6ba8c6)',
      boxShadow: '0 18px 32px rgba(8, 17, 24, 0.52)',
    },
    ':active': {
      filter: 'brightness(0.98)',
    },
    ':focus-visible': {
      outline: '2px solid rgba(205, 236, 248, 0.84)',
    },
    ':disabled': {
      boxShadow: '0 10px 20px rgba(8, 17, 24, 0.28)',
    },
  },
  buttonSecondary: {
    backgroundColor: 'rgba(10, 16, 24, 0.78)',
    border: '1px solid rgba(115, 153, 173, 0.35)',
    boxShadow: 'inset 0 0 0 1px rgba(93, 132, 153, 0.12)',
    ':hover': {
      backgroundColor: 'rgba(13, 24, 34, 0.92)',
      borderColor: 'rgba(165, 206, 225, 0.54)',
      boxShadow: '0 14px 28px rgba(4, 8, 12, 0.36)',
    },
    ':active': {
      backgroundColor: 'rgba(9, 17, 25, 0.96)',
    },
    ':focus-visible': {
      outline: '2px solid rgba(205, 236, 248, 0.68)',
    },
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    minHeight: '28px',
    padding: '6px 12px',
    borderRadius: radius.pill,
    border: '1px solid rgba(143, 185, 204, 0.22)',
    backgroundColor: 'rgba(11, 20, 29, 0.68)',
    color: 'rgba(205, 225, 236, 0.94)',
    fontSize: '0.74rem',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.04em',
  },
  badgeMuted: {
    color: 'rgba(170, 194, 208, 0.9)',
    backgroundColor: 'rgba(10, 16, 24, 0.78)',
  },
  badgeSuccess: {
    borderColor: colors.successBorder,
    backgroundColor: colors.successSurface,
    color: colors.successText,
  },
  badgeDanger: {
    borderColor: colors.dangerBorder,
    backgroundColor: colors.dangerSurface,
    color: 'rgba(254, 202, 202, 0.96)',
  },
  inlineTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
});
