import path from 'node:path';
import { defineConfig } from 'vite';
import vinext from 'vinext';
import { nitro } from 'nitro/vite';

const vinextDevOrigin = process.env.VINEXT_DEV_ORIGIN?.replace(/\/$/, '');

export default defineConfig({
  envDir: path.resolve(__dirname),
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [
    vinext({
      react: {
        babel: {
          plugins: [
            [
              '@stylexjs/babel-plugin',
              {
                dev: process.env.NODE_ENV !== 'production',
                test: process.env.NODE_ENV === 'test',
                runtimeInjection: false,
                enableInlinedConditionalMerge: true,
                treeshakeCompensation: true,
                aliases: {
                  '@/*': [path.resolve(__dirname, '*')],
                },
                unstable_moduleResolution: {
                  type: 'commonJS',
                },
              },
            ],
          ],
        },
      },
    }),
    nitro(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname),
      },
      {
        find: 'pg-native',
        replacement: path.resolve(__dirname, './shims/pg-native.ts'),
      },
    ],
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    origin: vinextDevOrigin,
  },
  ssr: {
    external: ['jsonwebtoken', 'semver', 'pg'],
  },
});