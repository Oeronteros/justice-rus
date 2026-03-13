import eslintConfigNext from 'eslint-config-next';

const config = [
  {
    ignores: ['node_modules', '.next', 'dist', '**/dist', '.git', 'config.js', 'playwright-report', 'test-results'],
  },
  ...eslintConfigNext,
];

export default config;
