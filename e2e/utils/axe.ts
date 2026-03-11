import { expect, type Page } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeScriptPath = require.resolve('axe-core/axe.min.js');

type AxeViolation = {
  id: string;
  impact?: string;
  help: string;
  nodes: Array<{ target: string[] }>;
};

export async function expectNoSeriousA11yViolations(page: Page) {
  await page.addScriptTag({ path: axeScriptPath });

  const violations = await page.evaluate(async () => {
    const axe = (window as typeof window & {
      axe: {
        run: (context?: Element | Document, options?: unknown) => Promise<{ violations: AxeViolation[] }>;
      };
    }).axe;

    const result = await axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });

    return result.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');
  });

  expect(
    violations,
    violations
      .map((violation) => `${violation.id}: ${violation.help} -> ${violation.nodes.map((node) => node.target.join(' > ')).join(', ')}`)
      .join('\n')
  ).toEqual([]);
}
