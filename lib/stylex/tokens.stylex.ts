import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  ink: '#07090d',
  inkSoft: '#111419',
  paper: '#e8dfcf',
  paperStrong: '#f3ebde',
  paperMuted: 'rgba(224, 214, 196, 0.9)',
  paperSubtle: 'rgba(196, 182, 160, 0.92)',
  accent: '#82b9ad',
  accentStrong: 'rgba(236, 248, 244, 0.98)',
  accentSoft: 'rgba(130, 185, 173, 0.24)',
  accentMuted: 'rgba(130, 185, 173, 0.14)',
  accentGlow: 'rgba(120, 190, 170, 0.16)',
  overlay: 'rgba(16, 18, 23, 0.72)',
  panelTop: 'rgba(16, 18, 23, 0.92)',
  panelBottom: 'rgba(10, 12, 16, 0.92)',
  panelSolid: 'rgba(22, 25, 30, 0.86)',
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
