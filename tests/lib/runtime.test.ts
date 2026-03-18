import { describe, expect, it } from 'vitest';
import { isWorkflowAutomationEnabled } from '@/lib/platform/runtime';

describe('runtime workflow flags', () => {
  it('enables workflow automation for explicit truthy values', () => {
    expect(isWorkflowAutomationEnabled('1')).toBe(true);
    expect(isWorkflowAutomationEnabled('true')).toBe(true);
  });

  it('keeps workflow automation disabled by default and falsy values', () => {
    expect(isWorkflowAutomationEnabled(undefined)).toBe(false);
    expect(isWorkflowAutomationEnabled('0')).toBe(false);
    expect(isWorkflowAutomationEnabled('false')).toBe(false);
  });
});
