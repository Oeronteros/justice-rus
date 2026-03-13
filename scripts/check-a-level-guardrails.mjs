import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const workspaceRoot = process.cwd();
const sourceRoots = ['app', 'components', 'lib'];
const ignoredDirectories = new Set([
  '.git',
  '.next',
  'dist',
  'node_modules',
  'playwright-report',
  'test-results',
  'coverage',
  'apps',
]);
const ignoredPathFragments = [
  `${path.sep}lib${path.sep}api${path.sep}generated${path.sep}`,
  `${path.sep}lib${path.sep}db${path.sep}`,
];
const allowedExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const forbiddenPatterns = [
  { label: '`as any`', regex: /\bas\s+any\b/g },
  { label: '`@ts-ignore`', regex: /@ts-ignore/g },
  { label: '`@ts-expect-error`', regex: /@ts-expect-error/g },
];

async function collectFiles(rootDirectory) {
  const results = [];

  async function walk(currentDirectory) {
    const entries = await readdir(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDirectory, entry.name);
      const relativePath = path.relative(workspaceRoot, absolutePath);

      if (entry.isDirectory()) {
        if (ignoredDirectories.has(entry.name)) {
          continue;
        }
        await walk(absolutePath);
        continue;
      }

      if (!allowedExtensions.has(path.extname(entry.name))) {
        continue;
      }

      if (ignoredPathFragments.some((fragment) => absolutePath.includes(fragment))) {
        continue;
      }

      results.push({ absolutePath, relativePath });
    }
  }

  await walk(path.join(workspaceRoot, rootDirectory));
  return results;
}

function findLineNumber(sourceText, matchIndex) {
  let line = 1;
  for (let index = 0; index < matchIndex; index += 1) {
    if (sourceText[index] === '\n') {
      line += 1;
    }
  }
  return line;
}

async function checkForbiddenTyping() {
  const violations = [];

  for (const root of sourceRoots) {
    const files = await collectFiles(root);

    for (const file of files) {
      const sourceText = await readFile(file.absolutePath, 'utf8');

      for (const pattern of forbiddenPatterns) {
        pattern.regex.lastIndex = 0;
        let match;
        while ((match = pattern.regex.exec(sourceText)) !== null) {
          violations.push(`${file.relativePath}:${findLineNumber(sourceText, match.index)} ${pattern.label}`);
        }
      }
    }
  }

  return violations;
}

async function checkPlaywrightVinextCoverage() {
  const configPath = path.join(workspaceRoot, 'playwright.config.ts');
  const configText = await readFile(configPath, 'utf8');
  const missing = [];

  if (!configText.includes("name: 'vinext-chromium'")) {
    missing.push("missing Playwright project `vinext-chromium`");
  }

  if (!configText.includes("testMatch: ['**/vinext-pilot.spec.ts', '**/vinext-pilot-a11y.spec.ts']")) {
    missing.push('missing vinext pilot testMatch coverage in Playwright config');
  }

  if (!configText.includes("command: 'npm run dev:vinext'")) {
    missing.push('missing vinext webServer command in Playwright config');
  }

  return missing;
}

async function main() {
  const violations = await checkForbiddenTyping();
  const playwrightIssues = await checkPlaywrightVinextCoverage();

  if (violations.length === 0 && playwrightIssues.length === 0) {
    console.log('A-level guardrails passed');
    return;
  }

  if (violations.length > 0) {
    console.error('Forbidden app-level typing patterns found:');
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
  }

  if (playwrightIssues.length > 0) {
    console.error('Playwright vinext guardrails failed:');
    for (const issue of playwrightIssues) {
      console.error(`- ${issue}`);
    }
  }

  process.exitCode = 1;
}

await main();
