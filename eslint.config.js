import eslintConfigNext from 'eslint-config-next';

const config = [
  {
    ignores: ['node_modules', '.next', 'dist', '.git', 'config.js'],
  },
  ...eslintConfigNext,
];

export default config;
