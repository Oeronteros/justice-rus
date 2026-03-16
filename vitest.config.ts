import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: true,
              runtimeInjection: false,
              enableInlinedConditionalMerge: true,
              treeshakeCompensation: true,
              unstable_moduleResolution: {
                type: 'commonJS',
              },
            },
          ],
        ],
      },
    }),
  ],
  test: {
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    pool: 'forks',
    maxWorkers: 1,
    testTimeout: 15000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
