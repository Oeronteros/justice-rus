import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  ink: '#0d1014',
  inkSoft: '#171b21',
  paper: '#e6dccb',
  paperStrong: '#f0e8da',
  paperMuted: 'rgba(224, 214, 194, 0.88)',
  paperSubtle: 'rgba(191, 178, 155, 0.86)',
  accent: '#b8a06f',
  accentStrong: 'rgba(248, 236, 210, 0.98)',
  accentSoft: 'rgba(184, 160, 111, 0.22)',
  accentMuted: 'rgba(184, 160, 111, 0.12)',
  accentGlow: 'rgba(184, 160, 111, 0.14)',
  overlay: 'rgba(20, 22, 28, 0.72)',
  panelTop: 'rgba(20, 22, 28, 0.92)',
  panelBottom: 'rgba(13, 15, 20, 0.92)',
  panelSolid: 'rgba(24, 27, 33, 0.86)',
  shadowStrong: 'rgba(2, 3, 5, 0.62)',
  shadowSoft: 'rgba(2, 3, 5, 0.42)',
  dangerText: '#fca5a5',
  dangerSurface: 'rgba(127, 29, 29, 0.2)',
  dangerSurfaceStrong: 'rgba(70, 22, 22, 0.22)',
  dangerBorder: 'rgba(248, 113, 113, 0.3)',
  warningText: 'rgba(253, 230, 138, 0.96)',
  warningSurface: 'rgba(120, 53, 15, 0.2)',
  warningBorder: 'rgba(245, 158, 11, 0.28)',
  successText: 'rgba(167, 243, 208, 0.96)',
  successSurface: 'rgba(20, 83, 45, 0.22)',
  successBorder: 'rgba(74, 222, 128, 0.3)',
});

export const typography = stylex.defineVars({
  body: "var(--font-body), 'Noto Sans', 'Segoe UI', sans-serif",
  display: "var(--font-display), 'Noto Serif SC', 'Times New Roman', serif",
});

export const radius = stylex.defineVars({
  sm: '12px',
  md: '16px',
  lg: '22px',
  xl: '24px',
  pill: '999px',
});
