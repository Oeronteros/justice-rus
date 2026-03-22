/**
 * Patch vinext to fix rolldown compatibility issues with Vite 8.
 *
 * vinext 0.0.29 uses Rollup-specific options that rolldown doesn't support:
 * - treeshake.preset: "recommended" → rolldown doesn't support 'preset'
 * - experimentalMinChunkSize: 10_000 → rolldown doesn't recognize this
 *
 * This script patches node_modules/vinext/dist/index.js to remove these options.
 * Run via postinstall: "postinstall": "node scripts/patch-vinext.mjs"
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

try {
  // Find vinext in node_modules
  const vinextPath = join(projectRoot, 'node_modules', 'vinext', 'dist', 'index.js');

  if (!existsSync(vinextPath)) {
    console.log('[patch-vinext] vinext not found, skipping');
    process.exit(0);
  }
  let content = readFileSync(vinextPath, 'utf-8');

  let patched = false;

  // Remove preset: "recommended" from clientTreeshakeConfig
  if (content.includes('preset: "recommended"')) {
    content = content.replace(
      /const clientTreeshakeConfig = \{\s*preset: "recommended",\s*moduleSideEffects: "no-external",\s*\};/,
      'const clientTreeshakeConfig = {\n    moduleSideEffects: "no-external",\n};'
    );
    patched = true;
    console.log('[patch-vinext] Removed treeshake.preset');
  }

  // Remove experimentalMinChunkSize from clientOutputConfig
  if (content.includes('experimentalMinChunkSize:')) {
    content = content.replace(
      /const clientOutputConfig = \{\s*manualChunks: clientManualChunks,\s*experimentalMinChunkSize: 10_000,\s*\};/,
      'const clientOutputConfig = {\n    manualChunks: clientManualChunks,\n};'
    );
    patched = true;
    console.log('[patch-vinext] Removed experimentalMinChunkSize');
  }

  if (patched) {
    writeFileSync(vinextPath, content, 'utf-8');
    console.log('[patch-vinext] Patched successfully');
  } else {
    console.log('[patch-vinext] No patches needed (already applied or vinext updated)');
  }
} catch (error) {
  console.error('[patch-vinext] Error:', error.message);
  // Don't fail the install
}
