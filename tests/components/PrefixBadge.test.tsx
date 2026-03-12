import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PrefixBadge } from '@/components/PrefixBadge';

describe('PrefixBadge', () => {
  it('renders nothing for empty prefix values', () => {
    const { container } = render(<PrefixBadge prefix={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the trimmed prefix text', () => {
    render(<PrefixBadge prefix="  Raid Lead  " />);

    expect(screen.getByText('Raid Lead')).toBeInTheDocument();
  });
});
