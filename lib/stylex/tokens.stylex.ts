import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  bgApp: '#0B0C1A',
  bgShell: 'rgba(26, 31, 53, 0.94)',
  bgPanel: 'rgba(33, 38, 58, 0.94)',
  bgPanelAlt: 'rgba(39, 44, 64, 0.9)',
  bgElevated: 'rgba(45, 50, 70, 0.92)',
  bgField: 'rgba(11, 12, 26, 0.98)',
  bgOverlay: 'rgba(11, 12, 26, 0.74)',
  bgHover: 'rgba(52, 57, 77, 0.94)',
  bgActive: 'rgba(59, 64, 84, 0.94)',

  textPrimary: '#f3efe7',
  textSecondary: '#c7bfaf',
  textMuted: '#9d9385',
  textDisabled: '#675f55',
  textOnAccent: '#181411',

  accent: '#c9a86a',
  accentStrong: '#e2c48a',
  accentSoft: 'rgba(201, 168, 106, 0.18)',
  accentMuted: 'rgba(201, 168, 106, 0.12)',
  accentGlow: 'rgba(201, 168, 106, 0.16)',
  accentEdge: 'rgba(221, 196, 152, 0.4)',
  accentEdgeStrong: 'rgba(236, 218, 185, 0.72)',

  ember: '#8b403a',
  emberStrong: '#9b4c45',
  jade: '#7ca38e',
  ice: '#a9d0e2',

  borderSubtle: 'rgba(255, 255, 255, 0.07)',
  borderDefault: 'rgba(255, 255, 255, 0.11)',
  borderStrong: 'rgba(255, 255, 255, 0.18)',

  success: '#72c08f',
  successText: 'rgba(190, 241, 207, 0.96)',
  successSurface: 'rgba(20, 83, 45, 0.22)',
  successBorder: 'rgba(74, 222, 128, 0.3)',

  warning: '#d9a85f',
  warningText: 'rgba(253, 230, 138, 0.96)',
  warningSurface: 'rgba(120, 53, 15, 0.2)',
  warningBorder: 'rgba(245, 158, 11, 0.28)',

  danger: '#d07a72',
  dangerText: '#fca5a5',
  dangerSurface: 'rgba(127, 29, 29, 0.2)',
  dangerSurfaceStrong: 'rgba(70, 22, 22, 0.22)',
  dangerBorder: 'rgba(248, 113, 113, 0.3)',

  info: '#74a7d9',
  infoText: 'rgba(216, 235, 249, 0.96)',
  infoSurface: 'rgba(18, 47, 70, 0.22)',
  infoBorder: 'rgba(116, 167, 217, 0.32)',

  focusRing: 'rgba(232, 215, 187, 0.72)',
  focusGlow: 'rgba(201, 168, 106, 0.22)',
  shadowStrong: 'rgba(2, 3, 5, 0.72)',
  shadowSoft: 'rgba(2, 3, 5, 0.52)',
  shadowCard: '0 12px 24px rgba(4, 8, 12, 0.34)',
  shadowLifted: '0 16px 30px rgba(2, 3, 5, 0.44)',
  shadowInset: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',

  ink: '#0B0C1A',
  inkSoft: '#1A1F35',
  paper: '#f3efe7',
  paperStrong: '#f7f2ea',
  paperBright: '#fffaf1',
  paperMuted: 'rgba(199, 191, 175, 0.88)',
  paperSubtle: 'rgba(157, 147, 133, 0.86)',
  overlay: 'rgba(11, 12, 26, 0.74)',
  panelTop: 'rgba(33, 38, 58, 0.94)',
  panelBottom: 'rgba(26, 31, 53, 0.96)',
  panelSolid: 'rgba(39, 44, 64, 0.92)',
  surfaceBase: 'rgba(33, 38, 58, 0.94)',
  surfaceRaised: 'rgba(39, 44, 64, 0.9)',
  surfaceSoft: 'rgba(45, 50, 70, 0.82)',
  surfaceField: 'rgba(11, 12, 26, 0.98)',
  lineSoft: 'rgba(255, 255, 255, 0.07)',
  lineMuted: 'rgba(255, 255, 255, 0.11)',
  lineStrong: 'rgba(255, 255, 255, 0.18)',
});

export const typography = stylex.defineVars({
  body: "var(--font-body), 'Segoe UI', sans-serif",
  display: "var(--font-display), 'Times New Roman', serif",
  mono: "'JetBrains Mono', 'Consolas', monospace",
  heroSize: '24px',
  heroLine: '30px',
  h1Size: '20px',
  h1Line: '26px',
  h2Size: '18px',
  h2Line: '24px',
  titleSize: '15px',
  titleLine: '20px',
  bodySize: '14px',
  bodyLine: '20px',
  secondarySize: '12px',
  secondaryLine: '16px',
  microSize: '11px',
  microLine: '14px',
  metricSize: '32px',
  metricLine: '36px',
});

export const radius = stylex.defineVars({
  xs: '8px',
  sm: '10px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  pill: '999px',
});

export const spacing = stylex.defineVars({
  xxs: '2px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
  section: '40px',
});

export const layout = stylex.defineVars({
  container: '1280px',
  shellContainer: '80rem',
  headerHeight: '64px',
  headerCompactHeight: '56px',
  cardPadding: '16px',
  cardPaddingLg: '20px',
  fieldHeight: '40px',
  buttonPrimaryHeight: '40px',
  buttonSecondaryHeight: '36px',
  buttonGhostHeight: '32px',
  chipHeight: '22px',
});

export const motion = stylex.defineVars({
  fast: '120ms',
  base: '180ms',
  slow: '260ms',
  easeStandard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
});
