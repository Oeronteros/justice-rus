import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Wuxia theme colors from globals.css
        wuxia: {
          ink: 'var(--wuxia-ink)',
          'ink-soft': 'var(--wuxia-ink-soft)',
          paper: 'var(--wuxia-paper)',
          vermillion: 'var(--wuxia-vermillion)',
          crimson: 'var(--wuxia-crimson)',
          gold: 'var(--wuxia-gold)',
          jade: 'var(--wuxia-jade)',
          shadow: 'var(--wuxia-shadow)',
          ice: 'var(--wuxia-ice)',
          steel: 'var(--wuxia-steel)',
          glass: 'var(--wuxia-glass)',
          line: 'var(--wuxia-line)',
          glow: 'var(--wuxia-glow)',
        },
      },
      fontFamily: {
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
