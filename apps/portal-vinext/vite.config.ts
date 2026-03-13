import path from 'node:path';
import { defineConfig } from 'vite';
import vinext from 'vinext';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  envDir: path.resolve(__dirname, '../../'),
  plugins: [
    vinext(),
    tsconfigPaths(),
  ],
  publicDir: path.resolve(__dirname, '../../public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../'),
      'pg-native': path.resolve(__dirname, './shims/pg-native.ts'),
    },
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
