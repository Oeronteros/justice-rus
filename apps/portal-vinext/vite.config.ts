import path from 'node:path';
import { defineConfig } from 'vite';
import vinext from 'vinext';

export default defineConfig({
  envDir: path.resolve(__dirname, '../../'),
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
                runtimeInjection: false,
                enableInlinedConditionalMerge: true,
                treeshakeCompensation: true,
                aliases: {
                  '@/*': [path.resolve(__dirname, '../../*')],
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
  ],
  publicDir: path.resolve(__dirname, '../../public'),
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: /^fonts\//,
        replacement: `${path.resolve(__dirname, '../../node_modules/katex/dist/fonts')}/`,
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, '../../'),
      },
      {
        find: 'pg-native',
        replacement: path.resolve(__dirname, './shims/pg-native.ts'),
      },
    ],
  },
  server: {
    host: '127.0.0.1',
    port: 3101,
    fs: {
      allow: [path.resolve(__dirname, '../../')],
    },
  },
  ssr: {
    external: ['jsonwebtoken', 'semver', 'pg'],
  },
});
