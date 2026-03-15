import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  ink: '#0a0f14',
  inkSoft: '#111821',
  paper: '#dfe8f2',
  paperStrong: '#e9f1f7',
  paperMuted: 'rgba(191, 209, 220, 0.9)',
  paperSubtle: 'rgba(159, 181, 195, 0.92)',
  accent: '#8fb9cc',
  accentStrong: 'rgba(225, 241, 249, 0.98)',
  accentSoft: 'rgba(143, 185, 204, 0.22)',
  accentMuted: 'rgba(143, 185, 204, 0.14)',
  accentGlow: 'rgba(95, 178, 214, 0.12)',
  overlay: 'rgba(11, 20, 29, 0.68)',
  panelTop: 'rgba(10, 18, 26, 0.88)',
  panelBottom: 'rgba(8, 12, 18, 0.88)',
  panelSolid: 'rgba(13, 24, 34, 0.8)',
  shadowStrong: 'rgba(4, 8, 12, 0.5)',
  shadowSoft: 'rgba(4, 8, 12, 0.3)',
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
  body: "'Manrope', 'Noto Sans', 'Segoe UI', sans-serif",
  display: "'Rajdhani', 'Trebuchet MS', sans-serif",
});

export const radius = stylex.defineVars({
  sm: '12px',
  md: '16px',
  lg: '22px',
  xl: '24px',
  pill: '999px',
});
