import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarkdownRenderer } from '@/components/guides/MarkdownRenderer';

describe('MarkdownRenderer safety', () => {
  it('does not render raw HTML from guide content', () => {
    const { container } = render(
      <MarkdownRenderer content={'# Title\n\n<img src="https://example.com/x.png" alt="Injected">\n<script>alert(1)</script>'} />
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('script')).toBeNull();
    expect(screen.queryByText('Injected')).not.toBeInTheDocument();
  });

  it('neutralizes javascript links', () => {
    const { container } = render(
      <MarkdownRenderer content={'[Bad link](javascript:alert(1))'} />
    );

    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('#');
  });
});
