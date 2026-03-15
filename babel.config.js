import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dev = process.env.NODE_ENV !== 'production';
const rootDir = fileURLToPath(new URL('.', import.meta.url));

const config = {
  presets: ['next/babel'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev,
        runtimeInjection: false,
        enableInlinedConditionalMerge: true,
        treeshakeCompensation: true,
        aliases: {
          '@/*': [path.join(rootDir, '*')],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
        },
      },
    ],
  ],
};

export default config;
